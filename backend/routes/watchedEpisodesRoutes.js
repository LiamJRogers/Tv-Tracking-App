const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/watched-episodes/batch", async (req, res) => {
  const { userId, episodeIds, seriesId } = req.body;
  if (!userId || !Array.isArray(episodeIds) || !seriesId)
    return res
      .status(400)
      .json({ error: "Missing userId, seriesId or episodeIds" });
  try {
    const values = episodeIds.map((id) => `('${userId}', ${id})`).join(",");
    await pool.query(
      `INSERT INTO watched_episodes (user_id, episode_id) VALUES ${values} ON CONFLICT DO NOTHING`
    );

    const { rows: totalEpisodesRows } = await pool.query(
      `SELECT COUNT(*) FROM episodes e
       JOIN seasons se ON e.season_id = se.id
       WHERE se.series_id = $1`,
      [seriesId]
    );
    const { rows: watchedEpisodesRows } = await pool.query(
      `SELECT COUNT(*) FROM watched_episodes we
       JOIN episodes e ON we.episode_id = e.id
       JOIN seasons se ON e.season_id = se.id
       WHERE we.user_id = $1 AND se.series_id = $2`,
      [userId, seriesId]
    );
    const totalEpisodes = parseInt(totalEpisodesRows[0].count, 10);
    const watchedEpisodes = parseInt(watchedEpisodesRows[0].count, 10);

    if (totalEpisodes > 0 && totalEpisodes === watchedEpisodes) {
      await pool.query(
        `DELETE FROM watchlist WHERE user_id = $1 AND series_id = $2`,
        [userId, seriesId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to batch mark as watched" });
  }
});

router.post("/watched-episodes/batch-delete", async (req, res) => {
  const { userId, episodeIds } = req.body;
  if (!userId || !Array.isArray(episodeIds))
    return res.status(400).json({ error: "Missing userId or episodeIds" });
  try {
    await pool.query(
      `DELETE FROM watched_episodes WHERE user_id = $1 AND episode_id = ANY($2::int[])`,
      [userId, episodeIds]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to batch unmark as watched" });
  }
});

router.get("/watched-episodes/:userId/:seriesId", async (req, res) => {
  const { userId, seriesId } = req.params;
  try {
    const result = await pool.query(
      `SELECT episode_id FROM watched_episodes we
       JOIN episodes e ON we.episode_id = e.id
       JOIN seasons s ON e.season_id = s.id
       WHERE we.user_id = $1 AND s.series_id = $2`,
      [userId, seriesId]
    );
    res.json(result.rows.map((row) => row.episode_id));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watched episodes" });
  }
});

module.exports = router;
