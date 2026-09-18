import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../database/voting_system.sqlite');

let dbInstance = null;

const initDb = async () => {
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await dbInstance.exec('PRAGMA foreign_keys = ON');

  // Create tables
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'voter',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS elections (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'UPCOMING',
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      election_id TEXT NOT NULL,
      name TEXT NOT NULL,
      party TEXT,
      position TEXT,
      symbol TEXT,
      image TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS votes (
      id TEXT PRIMARY KEY,
      election_id TEXT NOT NULL,
      candidate_id TEXT NOT NULL,
      voter_id TEXT NOT NULL,
      voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
      FOREIGN KEY (voter_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(election_id, voter_id)
    );
  `);

  // Insert demo admin user
  try {
    await dbInstance.run(`
      INSERT INTO users (id, name, email, password, role) 
      VALUES ('admin_001', 'System Admin', 'admin@blockvote.local', '$2a$10$tZ2R.dKxS.o8E/0n/1F3u.bA.nZz1gP3nO/5rFmZk6sK.zN/u.1hS', 'admin')
    `);
  } catch (err) {
    // Ignore UNIQUE constraint error if admin already exists
  }

  console.log('SQLite database initialized successfully');
};

initDb();

const pool = {
  query: async (sql, params = []) => {
    // Basic wait mechanism if db is not ready yet
    let retries = 0;
    while (!dbInstance && retries < 10) {
      await new Promise(r => setTimeout(r, 100));
      retries++;
    }
    if (!dbInstance) {
      throw new Error("Database not initialized yet");
    }

    const isSelect = sql.trim().toUpperCase().startsWith('SELECT');
    
    // SQLite uses slightly different parameter format for some queries, but standard '?' works perfectly.
    // However, some queries like COUNT(*) return [{ count: 5 }] or [{'COUNT(*)': 5}]
    
    if (isSelect) {
      const rows = await dbInstance.all(sql, params);
      
      // In our mysql code, we often queried SELECT COUNT(*) as count. SQLite handles this exactly the same.
      return [rows, null];
    } else {
      const result = await dbInstance.run(sql, params);
      return [{ insertId: result.lastID, affectedRows: result.changes }];
    }
  }
};

export default pool;
