const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/season-reviews", async (req, res) => {
  const {
    userId,
    seriesId,
    seasonId,
    rating,
    review,
    containsSpoilers,
    dismissed,
  } = req.body;
  if (!userId || !seriesId || !seasonId)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    if (dismissed) {
      await pool.query(
        `INSERT INTO season_reviews (user_id, series_id, season_id, dismissed)
         VALUES ($1, $2, $3, TRUE)
         ON CONFLICT (user_id, season_id) DO UPDATE SET dismissed = TRUE`,
        [userId, seriesId, seasonId]
      );
      return res.json({ success: true });
    }

    if (!rating) return res.status(400).json({ error: "Missing rating" });

    await pool.query(
      `INSERT INTO season_reviews (user_id, series_id, season_id, rating, review, contains_spoilers, dismissed)
       VALUES ($1, $2, $3, $4, $5, $6, FALSE)
       ON CONFLICT (user_id, season_id) DO UPDATE SET rating = $4, review = $5, contains_spoilers = $6, dismissed = FALSE`,
      [userId, seriesId, seasonId, rating, review, containsSpoilers]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

router.get("/season-reviews", async (req, res) => {
  const { userId, seasonId } = req.query;
  if (!userId || !seasonId)
    return res.status(400).json({ error: "Missing userId or seasonId" });
  try {
    const result = await pool.query(
      `SELECT * FROM season_reviews WHERE user_id = $1 AND season_id = $2 LIMIT 1`,
      [userId, seasonId]
    );
    res.json({ review: result.rows[0] || null });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch review" });
  }
});

module.exports = router;
