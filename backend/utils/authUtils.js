const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function generate2FACode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getRefreshTokenExpiry() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  return expires;
}

function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "15m" }
  );
}

module.exports = {
  generateRefreshToken,
  generate2FACode,
  getRefreshTokenExpiry,
  generateAccessToken,
};
