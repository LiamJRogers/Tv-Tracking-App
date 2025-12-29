const pool = require("../config/db");

async function createCastTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "cast" (
      id SERIAL PRIMARY KEY,
      series_id INTEGER REFERENCES series(id) ON DELETE CASCADE,
      person_id INTEGER,
      name VARCHAR(255),
      character_name VARCHAR(255),
      avatar_url TEXT,
      UNIQUE (series_id, person_id)
    );
  `);
}

module.exports = { createCastTable };
