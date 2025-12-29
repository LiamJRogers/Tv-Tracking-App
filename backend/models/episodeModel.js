const pool = require("../config/db");

async function createEpisodesTable() {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS episodes (
    id SERIAL PRIMARY KEY,
    season_id INTEGER REFERENCES seasons(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    name VARCHAR(255),
    description TEXT,
    last_fetched TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (season_id, episode_number)
  );
`);
}

module.exports = { createEpisodesTable };
