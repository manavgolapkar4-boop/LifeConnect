/**
 * LifeConnect Backend — Input Validation
 * ---------------------------------------------------------------------------
 * Small, dependency-free validators for signup/login. Kept separate from
 * authController.js so the controller stays focused on request/response flow.
 * ---------------------------------------------------------------------------
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{10}$/;
const ALLOWED_ROLES = ["donor", "requester"]; // "admin" is intentionally excluded — see README

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

function isValidPhone(phone) {
  return typeof phone === "string" && PHONE_RE.test(phone.trim());
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function isValidRole(role) {
  return ALLOWED_ROLES.includes(role);
}

/**
 * Validates a signup payload and returns an array of human-readable error
 * messages. An empty array means the payload is valid.
 */
function validateSignup(body) {
  const errors = [];
  const { name, email, phone, password, role } = body || {};

  if (!name || !String(name).trim()) errors.push("Name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email address is required.");
  if (!phone || !isValidPhone(phone)) errors.push("Phone number must be exactly 10 digits.");
  if (!password || !isValidPassword(password)) errors.push("Password must be at least 6 characters.");
  if (!role || !isValidRole(role)) errors.push('Role must be either "donor" or "requester".');

  return errors;
}

function validateLogin(body) {
  const errors = [];
  const { email, password } = body || {};
  if (!email || !isValidEmail(email)) errors.push("A valid email address is required.");
  if (!password) errors.push("Password is required.");
  return errors;
}

module.exports = { isValidEmail, isValidPhone, isValidPassword, isValidRole, validateSignup, validateLogin, ALLOWED_ROLES };
