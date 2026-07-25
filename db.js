import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'dummy_key';

// Mock in-memory database store for fallback demonstration when Supabase credentials are mock
class InMemoryStore {
  constructor() {
    this.users = [
      {
        id: 'a1111111-1111-1111-1111-111111111111',
        email: 'admin@leaddesk.io',
        password_hash: '$2a$12$K8yR2u/2Z8fXp.xLw9l41.v98f7r1a5z.6e7.7e8e9f0a1b2c3d4e', // Password123!
        full_name: 'System Administrator',
        role: 'super_admin',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'b2222222-2222-2222-2222-222222222222',
        email: 'sarah.rep@leaddesk.io',
        password_hash: '$2a$12$K8yR2u/2Z8fXp.xLw9l41.v98f7r1a5z.6e7.7e8e9f0a1b2c3d4e', // Password123!
        full_name: 'Sarah Rep',
        role: 'sales_rep',
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];

    this.leads = [
      {
        id: 'c3333333-3333-3333-3333-333333333333',
        full_name: 'Alexander Wright',
        email: 'alex.wright@acmecorp.com',
        phone: '+1-555-0198',
        company: 'Acme Corporation',
        budget: 75000,
        message: 'Interested in Enterprise AI CRM implementation for 50 users.',
        status: 'New',
        score_value: 95,
        score_tier: 'Hot',
        sentiment: 'Positive',
        summary: 'Hot prospect from Acme Corporation seeking Enterprise AI CRM implementation for 50 users with $75,000 budget.',
        ai_email_subject: 'Tailored AI Demo & CRM Strategy for Acme Corporation',
        ai_email_body: `Hi Alexander,

Thank you for reaching out to LeadDesk AI! We reviewed your inquiry regarding Enterprise AI CRM implementation for 50 users.

Based on your team's goals and estimated budget of $75,000, LeadDesk AI CRM can help streamline your sales pipeline, automate lead scoring, and boost conversion rates by up to 35%.

Would you be open for a brief 15-minute product demonstration later this week?

Best regards,
The Sales Operations Team
LeadDesk AI CRM`,
        assigned_to: 'b2222222-2222-2222-2222-222222222222',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      },
      {
        id: 'd4444444-4444-4444-4444-444444444444',
        full_name: 'Brenda Vance',
        email: 'brenda@hooli.com',
        phone: '+1-555-0144',
        company: 'Hooli Inc',
        budget: 35000,
        message: 'Looking for automated lead scoring and routing dashboard.',
        status: 'Contacted',
        score_value: 65,
        score_tier: 'Warm',
        sentiment: 'Positive',
        summary: 'Warm prospect from Hooli Inc seeking automated lead scoring and routing dashboard with $35,000 budget.',
        ai_email_subject: 'Tailored AI Demo & CRM Strategy for Hooli Inc',
        ai_email_body: `Hi Brenda,

Thank you for reaching out to LeadDesk AI! We reviewed your inquiry regarding automated lead scoring and routing.

Based on your team's budget of $35,000, LeadDesk AI CRM can optimize your team's workflow and lead qualification.

Would you be open for a brief demo?

Best regards,
The Sales Operations Team
LeadDesk AI CRM`,
        assigned_to: 'b2222222-2222-2222-2222-222222222222',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      },
      {
        id: 'e5555555-5555-5555-5555-555555555555',
        full_name: 'Charlie Davis',
        email: 'charlie@gmail.com',
        phone: '+1-555-0112',
        company: 'Davis Agency',
        budget: 5000,
        message: 'General inquiry regarding basic pricing tiers.',
        status: 'New',
        score_value: 30,
        score_tier: 'Cold',
        sentiment: 'Hesitant',
        summary: 'Cold prospect from Davis Agency inquiring about basic pricing tiers with $5,000 budget.',
        ai_email_subject: 'LeadDesk AI CRM Pricing & Features Information',
        ai_email_body: `Hi Charlie,

Thank you for your interest in LeadDesk AI CRM!

We offer flexible plans tailored for growing agencies. You can review our standard features and schedule a call anytime.

Best regards,
LeadDesk Support`,
        assigned_to: null,
        created_at: new Date(Date.now() - 14400000).toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }
    ];

    this.notes = [];
    this.auditLogs = [];
  }
}

export const inMemoryDB = new InMemoryStore();
export const supabase = createClient(supabaseUrl, supabaseKey);
