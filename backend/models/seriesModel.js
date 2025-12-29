const pool = require("../config/db");

async function createSeriesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS series (
      id SERIAL PRIMARY KEY,
      external_id INTEGER UNIQUE, 
      name VARCHAR(255) NOT NULL,
      genres TEXT[],
      rating DECIMAL(5,2),
      description TEXT,
      release_date DATE,
      poster_url TEXT,
      background_url TEXT,
      last_fetched TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { createSeriesTable };
