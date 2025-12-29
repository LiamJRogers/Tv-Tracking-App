const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/series/:id/seasons", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, season_number AS "seasonNumber" FROM seasons WHERE series_id = $1 ORDER BY season_number ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch seasons" });
  }
});

router.get("/series/:id/episodes", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT e.id, e.name, e.episode_number AS "episodeNumber", e.season_id AS "seasonId", e.description
       FROM episodes e
       JOIN seasons s ON e.season_id = s.id
       WHERE s.series_id = $1
       ORDER BY s.season_number, e.episode_number`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

router.get("/series/:id/cast", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, name, avatar_url AS "avatarUrl", character_name AS "characterName"
       FROM "cast"
       WHERE series_id = $1
       ORDER BY id ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cast" });
  }
});

module.exports = router;
