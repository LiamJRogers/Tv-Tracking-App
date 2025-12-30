const pool = require("../config/db");

async function createWatchlistTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS watchlist (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      series_id INTEGER REFERENCES series(id) ON DELETE CASCADE,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, series_id)
    );
  `);
}

module.exports = { createWatchlistTable };
