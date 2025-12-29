const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/discover", async (req, res) => {
  try {
    const newlyAdded = await pool.query(
      `SELECT * FROM series WHERE release_date IS NOT NULL ORDER BY release_date DESC LIMIT 10`
    );
    const topRated = await pool.query(
      `SELECT * FROM series WHERE rating IS NOT NULL ORDER BY rating DESC LIMIT 10`
    );
    res.json({
      newlyAdded: newlyAdded.rows,
      topRated: topRated.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch discover data" });
  }
});

module.exports = router;
