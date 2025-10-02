const pool = require("../config/db");

async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      password VARCHAR(255) NOT NULL,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      profile_pic_url TEXT,
      is_active BOOLEAN DEFAULT TRUE
    );
  `);
}

module.exports = { createUsersTable };
