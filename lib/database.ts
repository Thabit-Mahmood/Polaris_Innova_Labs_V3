import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { config } from './config';

const dataDir = path.dirname(config.dbPath);
const dbPath = config.dbPath;

let db: Database.Database;

export function getDatabase() {
  if (!db) {
    try {
      console.log('🔧 Initializing database...');
      console.log('Data directory:', dataDir);
      console.log('Database path:', dbPath);
      
      // Create data directory if it doesn't exist
      if (!fs.existsSync(dataDir)) {
        console.log('Creating data directory...');
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      console.log('Opening database...');
      db = new Database(dbPath);
      db.pragma('journal_mode = WAL');
      console.log('✅ Database opened');

      // Create contacts table
      console.log('Creating contacts table...');
      db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          country_code TEXT,
          phone TEXT,
          service TEXT,
          industry_sector TEXT,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          ip_address TEXT,
          user_agent TEXT
        )
      `);
      
      // Migration: Add new columns if they don't exist
      try {
        const tableInfo = db.prepare("PRAGMA table_info(contacts)").all() as any[];
        const hasCountryCode = tableInfo.some((col: any) => col.name === 'country_code');
        const hasIndustrySector = tableInfo.some((col: any) => col.name === 'industry_sector');
        
        if (!hasCountryCode) {
          console.log('Adding country_code column to contacts table...');
          db.exec('ALTER TABLE contacts ADD COLUMN country_code TEXT');
        }
        if (!hasIndustrySector) {
          console.log('Adding industry_sector column to contacts table...');
          db.exec('ALTER TABLE contacts ADD COLUMN industry_sector TEXT');
        }
        
        // Make email nullable if it's not already
        const emailColumn = tableInfo.find((col: any) => col.name === 'email');
        if (emailColumn && emailColumn.notnull === 1) {
          console.log('Email column migration: Creating new table with nullable email...');
          db.exec(`
            CREATE TABLE contacts_new (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT,
              country_code TEXT,
              phone TEXT,
              service TEXT,
              industry_sector TEXT,
              message TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              ip_address TEXT,
              user_agent TEXT
            );
            INSERT INTO contacts_new SELECT id, name, email, country_code, phone, service, industry_sector, message, created_at, ip_address, user_agent FROM contacts;
            DROP TABLE contacts;
            ALTER TABLE contacts_new RENAME TO contacts;
          `);
        }
      } catch (migrationError) {
        console.log('Migration check skipped or failed:', migrationError);
      }

      // Create newsletter table
      console.log('Creating newsletter table...');
      db.exec(`
        CREATE TABLE IF NOT EXISTS newsletter (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          ip_address TEXT
        )
      `);

      // Create rate limit table
      console.log('Creating rate_limits table...');
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

      // Create blogs table
      console.log('Creating blogs table...');
      db.exec(`
        CREATE TABLE IF NOT EXISTS blogs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          image_url TEXT,
          images TEXT,
          author TEXT DEFAULT 'Polaris Innova Labs',
          published BOOLEAN DEFAULT 0,
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Migration: Add images column if it doesn't exist
      try {
        const tableInfo = db.prepare("PRAGMA table_info(blogs)").all() as any[];
        const hasImagesColumn = tableInfo.some((col: any) => col.name === 'images');
        if (!hasImagesColumn) {
          console.log('Adding images column to blogs table...');
          db.exec('ALTER TABLE blogs ADD COLUMN images TEXT');
          console.log('✅ Images column added');
        }
      } catch (migrationError) {
        console.log('Migration check skipped or failed:', migrationError);
      }
      
      console.log('✅ All tables created successfully');
    } catch (error) {
      console.error('❌ Database initialization error:', error);
      throw error;
    }
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
    email?: string;
    countryCode?: string;
    phone?: string;
    service?: string;
    industrySector?: string;
    message: string;
    ip_address?: string;
    user_agent?: string;
  }) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, country_code, phone, service, industry_sector, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.name,
      data.email || null,
      data.countryCode || null,
      data.phone || null,
      data.service || null,
      data.industrySector || null,
      data.message,
      data.ip_address || null,
      data.user_agent || null
    );
  },

  insertNewsletter: (email: string, ip_address?: string) => {
    try {
      const db = getDatabase();
      const stmt = db.prepare(`
        INSERT INTO newsletter (email, ip_address)
        VALUES (?, ?)
      `);
      const result = stmt.run(email, ip_address || null);
      console.log('✅ Newsletter inserted:', { email, id: result.lastInsertRowid });
      return result;
    } catch (error) {
      console.error('❌ Error inserting newsletter:', error);
      throw error;
    }
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
  },

  // Blog queries
  getAllBlogs: (publishedOnly: boolean = true) => {
    const db = getDatabase();
    const query = publishedOnly 
      ? `SELECT * FROM blogs WHERE published = 1 ORDER BY display_order DESC, created_at DESC`
      : `SELECT * FROM blogs ORDER BY display_order DESC, created_at DESC`;
    const stmt = db.prepare(query);
    return stmt.all();
  },

  getBlogBySlug: (slug: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`SELECT * FROM blogs WHERE slug = ?`);
    return stmt.get(slug);
  },

  insertBlog: (data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url?: string;
    images?: string[];
    author?: string;
    published: boolean;
    display_order?: number;
  }) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, image_url, images, author, published, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.image_url || null,
      JSON.stringify(data.images || []),
      data.author || 'Polaris Innova Labs',
      data.published ? 1 : 0,
      data.display_order || 0
    );
  },

  updateBlog: (id: number, data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url?: string;
    images?: string[];
    author?: string;
    published: boolean;
    display_order?: number;
  }) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE blogs 
      SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, images = ?, author = ?, published = ?, display_order = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    return stmt.run(
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.image_url || null,
      JSON.stringify(data.images || []),
      data.author || 'Polaris Innova Labs',
      data.published ? 1 : 0,
      data.display_order || 0,
      id
    );
  },

  updateBlogOrder: (id: number, order: number) => {
    const db = getDatabase();
    const stmt = db.prepare(`UPDATE blogs SET display_order = ? WHERE id = ?`);
    return stmt.run(order, id);
  },

  deleteBlog: (id: number) => {
    const db = getDatabase();
    const stmt = db.prepare(`DELETE FROM blogs WHERE id = ?`);
    return stmt.run(id);
  },

  // Newsletter queries
  getAllSubscribers: () => {
    const db = getDatabase();
    const stmt = db.prepare(`SELECT * FROM newsletter ORDER BY subscribed_at DESC`);
    return stmt.all();
  },

  unsubscribeNewsletter: (email: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`DELETE FROM newsletter WHERE email = ?`);
    return stmt.run(email);
  },

  checkSubscription: (email: string) => {
    try {
      const db = getDatabase();
      const stmt = db.prepare(`SELECT * FROM newsletter WHERE email = ?`);
      const result = stmt.get(email);
      console.log('Subscription check for', email, ':', result ? 'EXISTS' : 'NOT FOUND');
      return result;
    } catch (error) {
      console.error('❌ Error checking subscription:', error);
      throw error;
    }
  }
};
