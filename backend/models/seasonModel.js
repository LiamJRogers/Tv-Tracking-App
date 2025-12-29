const pool = require("../config/db");

async function createSeasonsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS seasons (
      id SERIAL PRIMARY KEY,
      series_id INTEGER REFERENCES series(id) ON DELETE CASCADE,
      season_number INTEGER NOT NULL,
      last_fetched TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (series_id, season_number)
    );
  `);
}

module.exports = { createSeasonsTable };
