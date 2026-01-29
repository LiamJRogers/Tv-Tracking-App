const pool = require("../config/db");

async function createFriendsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS friends (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(20) NOT NULL,
      requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      responded_at TIMESTAMP,
      friends_since TIMESTAMP, 
      UNIQUE (user_id, friend_id)
    );
  `);
}

async function createBlockedUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blocked_users (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      blocked_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, blocked_user_id)
    );
  `);
}

module.exports = { createFriendsTable, createBlockedUsersTable };
