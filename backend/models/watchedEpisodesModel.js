const pool = require("../config/db");

async function createWatchedEpisodesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS watched_episodes (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
      watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, episode_id)
    );
  `);
}

module.exports = { createWatchedEpisodesTable };