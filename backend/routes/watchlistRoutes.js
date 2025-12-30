const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/watchlist", async (req, res) => {
  const { userId, seriesId } = req.body;
  if (!userId || !seriesId)
    return res.status(400).json({ error: "Missing userId or seriesId" });
  try {
    await pool.query(
      `INSERT INTO watchlist (user_id, series_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [userId, seriesId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
});

router.get("/watchlist/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT s.* FROM watchlist w JOIN series s ON w.series_id = s.id WHERE w.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

router.delete("/watchlist", async (req, res) => {
  const { userId, seriesId } = req.body;
  if (!userId || !seriesId)
    return res.status(400).json({ error: "Missing userId or seriesId" });
  try {
    await pool.query(
      `DELETE FROM watchlist WHERE user_id = $1 AND series_id = $2`,
      [userId, seriesId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from watchlist" });
  }
});

module.exports = router;
