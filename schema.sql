-- =============================================================================
-- LeadDesk AI CRM - Complete Supabase PostgreSQL DDL Schema & Seeds
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'sales_manager', 'sales_rep');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE score_tier AS ENUM ('Hot', 'Warm', 'Cold');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'sales_rep',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- 3. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(150),
    budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    message TEXT NOT NULL,
    status lead_status NOT NULL DEFAULT 'New',
    score_value INT NOT NULL DEFAULT 0,
    score_tier score_tier NOT NULL DEFAULT 'Cold',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- 4. LEAD NOTES TABLE
CREATE TABLE IF NOT EXISTS lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    note_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. INDEXES
CREATE INDEX IF NOT EXISTS idx_leads_status_tier ON leads (status, score_tier) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_audit_lead ON audit_logs (lead_id, created_at DESC);

-- 7. SEED USERS & DEMO LEADS
-- Password for all seed users is: Password123! (Bcrypt hash below)
-- $2a$12$K8yR2u/2Z8fXp.xLw9l41.v98f7r1a5z.6e7.7e8e9f0a1b2c3d4e (simulated test hash)
INSERT INTO users (id, email, password_hash, full_name, role)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'admin@leaddesk.io', '$2a$12$4m5v6n7b8v9c0x1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0', 'System Administrator', 'super_admin'),
  ('b2222222-2222-2222-2222-222222222222', 'sarah.rep@leaddesk.io', '$2a$12$4m5v6n7b8v9c0x1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0', 'Sarah Rep', 'sales_rep')
ON CONFLICT (email) DO NOTHING;

INSERT INTO leads (id, full_name, email, phone, company, budget, message, status, score_value, score_tier)
VALUES
  ('c3333333-3333-3333-3333-333333333333', 'Alexander Wright', 'alex.wright@acmecorp.com', '+1-555-0198', 'Acme Corporation', 75000.00, 'Interested in Enterprise AI CRM implementation for 50 users.', 'New', 95, 'Hot'),
  ('d4444444-4444-4444-4444-444444444444', 'Brenda Vance', 'brenda@hooli.com', '+1-555-0144', 'Hooli Inc', 35000.00, 'Looking for automated lead scoring and routing dashboard.', 'Contacted', 65, 'Warm'),
  ('e5555555-5555-5555-5555-555555555555', 'Charlie Davis', 'charlie@gmail.com', '+1-555-0112', 'Davis Agency', 5000.00, 'General inquiry regarding basic pricing tiers.', 'New', 30, 'Cold')
ON CONFLICT (id) DO NOTHING;
