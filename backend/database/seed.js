import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding initial voting system data...');

  try {
    // 1. Seed Admin
    const [existingAdmin] = await pool.query('SELECT id FROM users WHERE email = ?', ['admin@blockvote.local']);
    if (existingAdmin.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin123', salt);
      const [adminUser] = await pool.query(
        'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
        ['System Admin', 'admin@blockvote.local', hash, 'ADMIN']
      );
      await pool.query(
        'INSERT INTO admins (user_id, department) VALUES (?, ?)',
        [adminUser.insertId, 'Elections Commission']
      );
      console.log('Admin user created (admin@blockvote.local / admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // 2. Seed Demo Voter
    const [existingVoter] = await pool.query('SELECT id FROM users WHERE email = ?', ['voter@blockvote.local']);
    if (existingVoter.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('voter123', salt);
      const [voterUser] = await pool.query(
        'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)',
        ['Elena Vance', 'voter@blockvote.local', hash, 'VOTER']
      );
      await pool.query(
        'INSERT INTO voters (user_id, voterId, is_verified) VALUES (?, ?, ?)',
        [voterUser.insertId, 'VT-2026-10482', true]
      );
      console.log('Demo voter created (voter@blockvote.local / voter123, ID: VT-2026-10482)');
    } else {
      console.log('Demo voter already exists');
    }

    // 3. Seed Active Election (General Election 2026)
    const [existingElection] = await pool.query('SELECT id FROM elections WHERE title LIKE ?', ['%General Election 2026%']);
    let electionId;
    if (existingElection.length === 0) {
      const [elResult] = await pool.query(
        `INSERT INTO elections (title, description, status, startDate, endDate) 
         VALUES (?, ?, ?, '2026-08-15 00:00:00', '2026-08-31 23:59:59')`,
        [
          'General Election 2026 (GE-2026)',
          'National digital general election for federal parliamentary representatives.',
          'ACTIVE',
        ]
      );
      electionId = elResult.insertId;
      console.log(`Election created with ID ${electionId}`);

      // Seed 4 Candidates
      const candidates = [
        { name: 'Sarah Johnson', party: 'Progressive Alliance', description: 'Advancing healthcare, education, and digital equality.' },
        { name: 'Michael Chang', party: 'People First', description: 'Economic innovation and small enterprise empowerment.' },
        { name: 'Elena Rodriguez', party: 'National Reform', description: 'Environmental stewardship and open government.' },
        { name: 'David Okafor', party: 'United Citizens', description: 'Infrastructure resilience and community technology access.' },
      ];

      for (const cand of candidates) {
        await pool.query(
          'INSERT INTO candidates (electionId, name, party, description) VALUES (?, ?, ?, ?)',
          [electionId, cand.name, cand.party, cand.description]
        );
      }
      console.log('Candidates seeded successfully');
    } else {
      electionId = existingElection[0].id;
      console.log(`Active election already exists with ID ${electionId}`);
    }

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
