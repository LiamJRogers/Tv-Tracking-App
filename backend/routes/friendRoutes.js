const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/users/search", async (req, res) => {
  const { q, userId } = req.query;
  if (!q || !userId) return res.json([]);
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.name, u.profile_pic_url,
              EXISTS(
                SELECT 1 FROM friends f
                WHERE f.user_id = $2 AND f.friend_id = u.id AND f.status = 'pending'
              ) AS requested,
              EXISTS(
                SELECT 1 FROM friends f
                WHERE f.user_id = u.id AND f.friend_id = $2 AND f.status = 'pending'
              ) AS incoming_request
       FROM users u
       WHERE (u.username ILIKE $1 OR u.name ILIKE $1)
         AND u.id != $2
         AND u.id NOT IN (
           SELECT blocked_user_id FROM blocked_users WHERE user_id = $2
         )
         AND u.id NOT IN (
           SELECT user_id FROM blocked_users WHERE blocked_user_id = $2
         )
         AND u.id NOT IN (
           SELECT friend_id FROM friends WHERE user_id = $2 AND status = 'accepted'
           UNION
           SELECT user_id FROM friends WHERE friend_id = $2 AND status = 'accepted'
         )
       LIMIT 20`,
      [`%${q}%`, userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to search users:", err);
    res.status(500).json({ error: "Failed to search users" });
  }
});

router.get("/friends/suggestions", async (req, res) => {
  const { userId, limit = 8 } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.name, u.profile_pic_url
       FROM users u
       WHERE u.id != $1
         AND u.id NOT IN (SELECT blocked_user_id FROM blocked_users WHERE user_id = $1)
         AND u.id NOT IN (SELECT user_id FROM blocked_users WHERE blocked_user_id = $1)
         AND u.id NOT IN (
           SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'accepted'
           UNION
           SELECT user_id FROM friends WHERE friend_id = $1 AND status = 'accepted'
         )
         AND u.id NOT IN (
           SELECT friend_id FROM friends WHERE user_id = $1 AND status = 'pending'
           UNION
           SELECT user_id FROM friends WHERE friend_id = $1 AND status = 'pending'
         )
       ORDER BY RANDOM()
       LIMIT $2`,
      [userId, Number(limit)],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch friend suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

router.post("/friends/request", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId || userId === friendId)
    return res.status(400).json({ error: "Invalid fields" });

  try {
    const blockCheck = await pool.query(
      `SELECT 1 FROM blocked_users
       WHERE (user_id = $1 AND blocked_user_id = $2)
          OR (user_id = $2 AND blocked_user_id = $1)`,
      [userId, friendId],
    );
    if (blockCheck.rows.length > 0) {
      return res
        .status(403)
        .json({ error: "Cannot send request: one of the users is blocked" });
    }

    const relRes = await pool.query(
      `SELECT user_id, friend_id, status
       FROM friends
       WHERE (user_id = $1 AND friend_id = $2)
          OR (user_id = $2 AND friend_id = $1)`,
      [userId, friendId],
    );

    if (relRes.rows.some((r) => r.status === "accepted")) {
      return res.status(409).json({ error: "Already friends" });
    }

    if (relRes.rows.some((r) => r.status === "pending")) {
      return res.status(409).json({ error: "Friend request already pending" });
    }

    await pool.query(
      `INSERT INTO friends (user_id, friend_id, status, requested_at)
       VALUES ($1, $2, 'pending', CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, friend_id)
       DO UPDATE SET status = 'pending', requested_at = CURRENT_TIMESTAMP`,
      [userId, friendId],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send friend request:", err);
    res.status(500).json({ error: "Failed to send request" });
  }
});

router.get("/friends/requests", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  try {
    const result = await pool.query(
      `SELECT f.user_id AS requester_id,
              u.id, u.username, u.name, u.profile_pic_url, f.requested_at
       FROM friends f
       JOIN users u ON f.user_id = u.id
       WHERE f.friend_id = $1 AND f.status = 'pending'
       ORDER BY f.requested_at DESC`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch friend requests:", err);
    res.status(500).json({ error: "Failed to fetch friend requests" });
  }
});

router.post("/friends/withdraw", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const result = await pool.query(
      `DELETE FROM friends
       WHERE user_id = $1 AND friend_id = $2 AND status = 'pending'`,
      [userId, friendId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No pending request found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to withdraw friend request:", err);
    res.status(500).json({ error: "Failed to withdraw request" });
  }
});

router.post("/friends/accept", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId)
    return res.status(400).json({ error: "Missing fields" });
  try {
    await pool.query(
      `UPDATE friends SET status = 'accepted', responded_at = CURRENT_TIMESTAMP
       WHERE user_id = $2 AND friend_id = $1 AND status = 'pending'`,
      [userId, friendId],
    );
    await pool.query(
      `INSERT INTO friends (user_id, friend_id, status, responded_at)
       VALUES ($1, $2, 'accepted', CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, friend_id) DO UPDATE SET status = 'accepted', responded_at = CURRENT_TIMESTAMP`,
      [userId, friendId],
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to accept request" });
  }
});

router.post("/friends/reject", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId)
    return res.status(400).json({ error: "Missing fields" });
  try {
    await pool.query(
      `UPDATE friends SET status = 'rejected', responded_at = CURRENT_TIMESTAMP
       WHERE user_id = $2 AND friend_id = $1 AND status = 'pending'`,
      [userId, friendId],
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to reject request" });
  }
});

router.get("/friends/list", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const result = await pool.query(
      `
      SELECT u.id, u.username, u.name, u.profile_pic_url
      FROM friends f
      JOIN users u ON u.id = f.friend_id
      WHERE f.user_id = $1 AND f.status = 'accepted'
      UNION
      SELECT u2.id, u2.username, u2.name, u2.profile_pic_url
      FROM friends f2
      JOIN users u2 ON u2.id = f2.user_id
      WHERE f2.friend_id = $1 AND f2.status = 'accepted'
      ORDER BY name ASC
      `,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch friends list:", err);
    res.status(500).json({ error: "Failed to fetch friends list" });
  }
});

module.exports = router;
