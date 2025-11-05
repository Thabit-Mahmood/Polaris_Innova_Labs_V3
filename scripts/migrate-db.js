const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'contacts.db');
const db = new Database(dbPath);

try {
  const tableInfo = db.pragma('table_info(blogs)');
  
  // Check if display_order column exists
  const hasDisplayOrder = tableInfo.some(col => col.name === 'display_order');
  if (!hasDisplayOrder) {
    console.log('Adding display_order column...');
    db.exec('ALTER TABLE blogs ADD COLUMN display_order INTEGER DEFAULT 0');
    console.log('✅ display_order column added');
  } else {
    console.log('✅ display_order column already exists');
  }

  // Check if images column exists
  const hasImages = tableInfo.some(col => col.name === 'images');
  if (!hasImages) {
    console.log('Adding images column...');
    db.exec('ALTER TABLE blogs ADD COLUMN images TEXT DEFAULT "[]"');
    console.log('✅ images column added');
  } else {
    console.log('✅ images column already exists');
  }

  console.log('✅ All migrations completed successfully!');
  db.close();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
