/**
 * LifeConnect Backend — User Store
 * ---------------------------------------------------------------------------
 * A tiny wrapper around backend/data/users.json so the rest of the backend
 * never touches the filesystem directly. This is intentionally simple: for
 * a college project, a JSON file stands in for a real database.
 *
 * IMPORTANT (read this before Phase 4):
 * This is NOT how a production app should store data — there is no locking,
 * so two requests writing at the exact same millisecond could in theory
 * clobber each other, and everything is read into memory on every call.
 * Swapping this file's internals for a real database (MongoDB, MySQL,
 * PostgreSQL) is the intended upgrade path — routes/controllers never touch
 * the filesystem directly, so only this file needs to change later.
 * ---------------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const USERS_FILE = path.join(__dirname, "..", "data", "users.json");

/** Reads and parses users.json. Returns [] if the file is missing/empty. */
function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    if (!raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    console.error("userStore: failed to read users.json", err);
    return [];
  }
}

/** Overwrites users.json with the given array (pretty-printed for readability). */
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

function findByEmail(email) {
  const normalized = String(email).trim().toLowerCase();
  return readUsers().find((u) => u.email.toLowerCase() === normalized) || null;
}

function findById(id) {
  return readUsers().find((u) => u.id === id) || null;
}

/**
 * Appends a new user record and persists it. Expects the caller
 * (authController) to have already hashed the password.
 */
function addUser({ name, email, phone, passwordHash, role }) {
  const users = readUsers();
  const user = {
    id: crypto.randomUUID(),
    name,
    email: String(email).trim().toLowerCase(),
    phone,
    passwordHash,
    role,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeUsers(users);
  return user;
}

/** Strips the password hash before a user object ever reaches the frontend. */
function toSafeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

module.exports = { readUsers, writeUsers, findByEmail, findById, addUser, toSafeUser };
