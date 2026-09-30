/**
 * LifeConnect Backend — Token Helper
 * ---------------------------------------------------------------------------
 * Thin wrapper around jsonwebtoken so the controller doesn't need to know
 * the secret/expiry details directly.
 *
 * Note on "logout" with JWTs: a JWT is stateless — the server doesn't keep
 * a list of "logged in" tokens, so there is nothing server-side to delete
 * on logout. POST /api/auth/logout exists for a clean API shape and so the
 * frontend has a single place to call, but the actual logout happens by the
 * frontend deleting its stored token. This is a normal, well-known
 * trade-off of plain JWT auth — flagged honestly rather than hidden.
 * ---------------------------------------------------------------------------
 */

const jwt = require("jsonwebtoken");

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Copy backend/.env.example to backend/.env and set one.");
  }
  return secret;
}

function signToken(payload) {
  return jwt.sign(payload, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

function verifyToken(token) {
  return jwt.verify(token, getSecret());
}

module.exports = { signToken, verifyToken };
