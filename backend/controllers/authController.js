const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function getRefreshTokenExpiry() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  return expires;
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
    const userResult = await pool.query(
      "SELECT id, username, email, password FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "15m" }
    );
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
    const userResult = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }
    const user = userResult.rows[0];
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "15m" }
    );
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
