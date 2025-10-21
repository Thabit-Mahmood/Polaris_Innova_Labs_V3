import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'contacts.db');

let db: Database.Database;

export function getDatabase() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

    // Create contacts table
    db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      )
    `);

    // Create newsletter table
    db.exec(`
      CREATE TABLE IF NOT EXISTS newsletter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT
      )
    `);

    // Create rate limit table
    db.exec(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        endpoint TEXT NOT NULL,
        attempts INTEGER DEFAULT 1,
        last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
        blocked_until DATETIME
      )
    `);
  }

  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
  }
}

// Prepared statements for security (prevents SQL injection)
export const queries = {
  insertContact: (data: {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
    ip_address?: string;
    user_agent?: string;
  }) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, service, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.name,
      data.email,
      data.phone || null,
      data.service || null,
      data.message,
      data.ip_address || null,
      data.user_agent || null
    );
  },

  insertNewsletter: (email: string, ip_address?: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO newsletter (email, ip_address)
      VALUES (?, ?)
    `);
    return stmt.run(email, ip_address || null);
  },

  checkRateLimit: (ip_address: string, endpoint: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT * FROM rate_limits
      WHERE ip_address = ? AND endpoint = ?
      AND (blocked_until IS NULL OR blocked_until > datetime('now'))
      ORDER BY last_attempt DESC
      LIMIT 1
    `);
    return stmt.get(ip_address, endpoint);
  },

  updateRateLimit: (ip_address: string, endpoint: string, attempts: number, blockedUntil?: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO rate_limits (ip_address, endpoint, attempts, blocked_until)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(ip_address, endpoint) DO UPDATE SET
        attempts = ?,
        last_attempt = datetime('now'),
        blocked_until = ?
    `);
    return stmt.run(ip_address, endpoint, attempts, blockedUntil || null, attempts, blockedUntil || null);
  },

  cleanOldRateLimits: () => {
    const db = getDatabase();
    const stmt = db.prepare(`
      DELETE FROM rate_limits
      WHERE last_attempt < datetime('now', '-1 day')
    `);
    return stmt.run();
  }
};
