const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/watching/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
        s.*,
        -- Find the most recently watched episode for this user and series
        (
          SELECT json_build_object(
            'seasonNumber', se2.season_number,
            'episodeNumber', e2.episode_number
          )
          FROM watched_episodes we2
          JOIN episodes e2 ON we2.episode_id = e2.id
          JOIN seasons se2 ON e2.season_id = se2.id
          WHERE we2.user_id = $1
            AND se2.series_id = s.id
          ORDER BY we2.watched_at DESC, e2.season_id DESC, e2.episode_number DESC
          LIMIT 1
        ) AS "lastWatched"
      FROM series s
      JOIN seasons se ON se.series_id = s.id
      JOIN episodes e ON e.season_id = se.id
      LEFT JOIN (
        SELECT episode_id
        FROM watched_episodes
        WHERE user_id = $1
      ) we ON we.episode_id = e.id
      GROUP BY s.id
      HAVING COUNT(we.episode_id) > 0
         AND COUNT(we.episode_id) < (
           SELECT COUNT(*)
           FROM episodes e2
           JOIN seasons se2 ON e2.season_id = se2.id
           WHERE se2.series_id = s.id
         )
      `,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watching series" });
  }
});

router.get("/completed/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT s.*
      FROM series s
      JOIN seasons se ON se.series_id = s.id
      JOIN episodes e ON e.season_id = se.id
      LEFT JOIN (
        SELECT episode_id
        FROM watched_episodes
        WHERE user_id = $1
      ) we ON we.episode_id = e.id
      GROUP BY s.id
      HAVING COUNT(e.id) > 0 AND COUNT(e.id) = COUNT(we.episode_id)
      `,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch completed series" });
  }
});

module.exports = router;
