const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);
  try {
    const result = await pool.query(
      `SELECT *, similarity(name, $1) AS sim
       FROM series
       WHERE name % $1
       ORDER BY sim DESC, name
       LIMIT 20`,
      [query]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to search series" });
  }
});

router.get("/trending-searches", async (req, res) => {
  try {
    const newestHighRated = await pool.query(
      `SELECT id, name
       FROM series
       WHERE rating IS NOT NULL AND release_date IS NOT NULL
       ORDER BY release_date DESC, rating DESC
       LIMIT 2`
    );

    const highestRated = await pool.query(
      `SELECT id, name
       FROM series
       WHERE rating IS NOT NULL
         AND id NOT IN (${
           newestHighRated.rows.map((s) => s.id).join(",") || "NULL"
         })
       ORDER BY rating DESC, release_date DESC
       LIMIT 1`
    );

    const newestReleased = await pool.query(
      `SELECT id, name
       FROM series
       WHERE release_date IS NOT NULL
         AND id NOT IN (${
           [...newestHighRated.rows, ...highestRated.rows]
             .map((s) => s.id)
             .join(",") || "NULL"
         })
       ORDER BY release_date DESC
       LIMIT 1`
    );

    const others = await pool.query(
      `SELECT id, name
       FROM series
       WHERE id NOT IN (${
         [...newestHighRated.rows, ...highestRated.rows, ...newestReleased.rows]
           .map((s) => s.id)
           .join(",") || "NULL"
       })
       ORDER BY rating DESC, release_date DESC
       LIMIT 1`
    );

    const trending = [
      ...newestHighRated.rows,
      ...highestRated.rows,
      ...newestReleased.rows,
      ...others.rows,
    ]
      .map((s) => s.name)
      .slice(0, 5);

    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending searches" });
  }
});

module.exports = router;
