const pool = require("../config/db");

async function createSeasonReviewsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS season_reviews (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      series_id INTEGER REFERENCES series(id) ON DELETE CASCADE,
      season_id INTEGER REFERENCES seasons(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      review TEXT,
      contains_spoilers BOOLEAN DEFAULT FALSE,
      dismissed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, season_id)
    );
  `);
}

module.exports = { createSeasonReviewsTable };
