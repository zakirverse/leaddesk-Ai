import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store database.sqlite in backend directory
const dbPath = path.resolve(__dirname, '../../database.sqlite');
sqlite3.verbose();

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('[DB] Failed to open SQLite database:', err.message);
  } else {
    console.log('[DB] Connected to SQLite local database at:', dbPath);
  }
});

// Helper function to wrap db.all / db.get / db.run into Promises
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Initialize schema and seed data
export const initSqliteDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Users Table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          full_name TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'sales_rep',
          is_active INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL
        )
      `);

      // 2. Leads Table
      db.run(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          budget REAL NOT NULL DEFAULT 0,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'New',
          score_value INTEGER NOT NULL DEFAULT 0,
          score_tier TEXT NOT NULL DEFAULT 'Cold',
          sentiment TEXT DEFAULT 'Neutral',
          summary TEXT,
          ai_email_subject TEXT,
          ai_email_body TEXT,
          assigned_to TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        )
      `);

      // 3. Lead Notes Table
      db.run(`
        CREATE TABLE IF NOT EXISTS lead_notes (
          id TEXT PRIMARY KEY,
          lead_id TEXT NOT NULL,
          author_id TEXT NOT NULL,
          note_text TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      // 4. Audit Logs Table
      db.run(`
        CREATE TABLE IF NOT EXISTS audit_logs (
          id TEXT PRIMARY KEY,
          actor_id TEXT,
          lead_id TEXT,
          action TEXT NOT NULL,
          previous_state TEXT,
          new_state TEXT,
          ip_address TEXT,
          created_at TEXT NOT NULL
        )
      `);

      // Seed Users if empty
      db.get('SELECT count(*) as count FROM users', (err, row) => {
        if (!err && row.count === 0) {
          const stmt = db.prepare(`
            INSERT INTO users (id, email, password_hash, full_name, role, is_active, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);
          stmt.run('a1111111-1111-1111-1111-111111111111', 'admin@leaddesk.io', '$2a$12$K8yR2u/2Z8fXp.xLw9l41.v98f7r1a5z.6e7.7e8e9f0a1b2c3d4e', 'System Administrator', 'super_admin', 1, new Date().toISOString());
          stmt.run('b2222222-2222-2222-2222-222222222222', 'sarah.rep@leaddesk.io', '$2a$12$K8yR2u/2Z8fXp.xLw9l41.v98f7r1a5z.6e7.7e8e9f0a1b2c3d4e', 'Sarah Rep', 'sales_rep', 1, new Date().toISOString());
          stmt.finalize();
          console.log('[DB] Seeded initial SQLite admin and rep users.');
        }
      });

      // Seed Leads if empty
      db.get('SELECT count(*) as count FROM leads', (err, row) => {
        if (!err && row.count === 0) {
          const stmt = db.prepare(`
            INSERT INTO leads (id, full_name, email, phone, company, budget, message, status, score_value, score_tier, sentiment, summary, ai_email_subject, ai_email_body, assigned_to, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);
          stmt.run(
            'c3333333-3333-3333-3333-333333333333',
            'Alexander Wright',
            'alex.wright@acmecorp.com',
            '+1-555-0198',
            'Acme Corporation',
            75000,
            'Interested in Enterprise AI CRM implementation for 50 users.',
            'New',
            95,
            'Hot',
            'Positive',
            'Hot prospect from Acme Corporation seeking Enterprise AI CRM implementation for 50 users with $75,000 budget.',
            'Tailored AI Demo & CRM Strategy for Acme Corporation',
            'Hi Alexander,\n\nThank you for reaching out to LeadDesk AI! We reviewed your inquiry regarding Enterprise AI CRM implementation for 50 users.\n\nBased on your team\'s goals and estimated budget of $75,000, LeadDesk AI CRM can help streamline your sales pipeline, automate lead scoring, and boost conversion rates by up to 35%.\n\nWould you be open for a brief 15-minute product demonstration later this week?\n\nBest regards,\nThe Sales Operations Team\nLeadDesk AI CRM',
            'b2222222-2222-2222-2222-222222222222',
            new Date(Date.now() - 3600000).toISOString(),
            new Date().toISOString()
          );
          stmt.run(
            'd4444444-4444-4444-4444-444444444444',
            'Brenda Vance',
            'brenda@hooli.com',
            '+1-555-0144',
            'Hooli Inc',
            35000,
            'Looking for automated lead scoring and routing dashboard.',
            'Contacted',
            65,
            'Warm',
            'Positive',
            'Warm prospect from Hooli Inc seeking automated lead scoring and routing dashboard with $35,000 budget.',
            'Tailored AI Demo & CRM Strategy for Hooli Inc',
            'Hi Brenda,\n\nThank you for reaching out to LeadDesk AI! We reviewed your inquiry regarding automated lead scoring and routing.\n\nBased on your team\'s budget of $35,000, LeadDesk AI CRM can optimize your team\'s workflow and lead qualification.\n\nWould you be open for a brief demo?\n\nBest regards,\nThe Sales Operations Team\nLeadDesk AI CRM',
            'b2222222-2222-2222-2222-222222222222',
            new Date(Date.now() - 7200000).toISOString(),
            new Date().toISOString()
          );
          stmt.finalize();
          console.log('[DB] Seeded initial SQLite demo leads.');
        }
        resolve(true);
      });
    });
  });
};
