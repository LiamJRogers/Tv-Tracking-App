const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  generate2FACode,
  getRefreshTokenExpiry,
  generateAccessToken,
} = require("../utils/authUtils");
const { send2FACodeEmail } = require("../utils/email");

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT id, username, email, password, is_2fa_enabled FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(
    "SELECT id, username, email, two_fa_secret FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

exports.signup = async (req, res) => {
  let { username, email, password, name } = req.body;
  username = validator.trim(validator.escape(username || ""));
  email = validator.normalizeEmail(email || "");
  name = name ? validator.trim(validator.escape(name)) : null;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (username.length < 3 || username.length > 20) {
    return res
      .status(400)
      .json({ error: "Username must be 3-20 characters long" });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({
      error: "Username can only contain letters, numbers, and underscores",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!validator.matches(password, passwordPolicy)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.",
    });
  }

  try {
    const userExists = await pool.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password, name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, name, created_date`,
      [username, email, hashedPassword, name]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkUsername = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ available: false });
  try {
    const user = await pool.query("SELECT id FROM users WHERE username = $1", [
      username,
    ]);
    res.json({ available: user.rows.length === 0 });
  } catch (err) {
    res.status(500).json({ available: false });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  email = validator.normalizeEmail(email || "");
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.is_2fa_enabled) {
      const code = generate2FACode();
      await pool.query("UPDATE users SET two_fa_secret = $1 WHERE id = $2", [
        code,
        user.id,
      ]);
      await send2FACodeEmail(user.email, code);
      return res.json({
        user: { id: user.id, username: user.username, email: user.email },
        requires2FA: true,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, refreshToken, expiresAt]
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" });
  }
  try {
    const result = await pool.query(
      "SELECT user_id, expires_at FROM refresh_tokens WHERE token = $1",
      [refreshToken]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const { user_id, expires_at } = result.rows[0];
    if (new Date() > expires_at) {
      await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
        refreshToken,
      ]);
      return res.status(401).json({ error: "Refresh token expired" });
    }
    const user = await findUserById(user_id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" });
  }
  try {
    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
      refreshToken,
    ]);
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.enable2FA = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    await pool.query("UPDATE users SET is_2fa_enabled = TRUE WHERE id = $1", [
      userId,
    ]);
    res.json({ message: "2FA enabled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verify2FA = async (req, res) => {
  const { userId, code } = req.body;
  if (!userId || !code) {
    return res.status(400).json({ error: "Missing userId or code" });
  }
  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (user.two_fa_secret !== code) {
      return res.status(401).json({ error: "Invalid code" });
    }
    await pool.query("UPDATE users SET two_fa_secret = NULL WHERE id = $1", [
      userId,
    ]);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();
    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, refreshToken, expiresAt]
    );
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.resend2FA = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    const user = await pool.query(
      "SELECT email, username FROM users WHERE id = $1",
      [userId]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const { email } = user.rows[0];
    const code = generate2FACode();
    await pool.query("UPDATE users SET two_fa_secret = $1 WHERE id = $2", [
      code,
      userId,
    ]);
    await send2FACodeEmail(email, code, true);
    res.json({ message: "2FA code resent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
