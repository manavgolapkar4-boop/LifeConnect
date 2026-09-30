/**
 * LifeConnect Backend — Auth Controller
 * ---------------------------------------------------------------------------
 * Request/response logic for POST /signup, POST /login, GET /me and
 * POST /logout. Password hashing (bcrypt) and JSON-file persistence live in
 * utils/userStore.js and utils/token.js — this file just wires them together.
 * ---------------------------------------------------------------------------
 */

const bcrypt = require("bcrypt");
const { validateSignup, validateLogin } = require("../utils/validators");
const { findByEmail, addUser, toSafeUser } = require("../utils/userStore");
const { signToken } = require("../utils/token");

const SALT_ROUNDS = 10;

/* ------------------------------------------------------------------ */
/* POST /api/auth/signup                                               */
/* ------------------------------------------------------------------ */
async function signup(req, res) {
  try {
    const errors = validateSignup(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    const { name, email, phone, password, role } = req.body;

    if (findByEmail(email)) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = addUser({ name: name.trim(), email, phone: phone.trim(), passwordHash, role });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. You can now log in.",
      user: toSafeUser(user)
    });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong while creating your account." });
  }
}

/* ------------------------------------------------------------------ */
/* POST /api/auth/login                                                */
/* ------------------------------------------------------------------ */
async function login(req, res) {
  try {
    const errors = validateLogin(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    const { email, password } = req.body;
    const user = findByEmail(email);

    // Deliberately generic message — never reveal whether the email or the
    // password was the part that was wrong.
    const genericError = { success: false, message: "Invalid email or password." };

    if (!user) return res.status(401).json(genericError);

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) return res.status(401).json(genericError);

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: toSafeUser(user),
      token
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong while logging in." });
  }
}

/* ------------------------------------------------------------------ */
/* GET /api/auth/me  (protected — requireAuth runs first)              */
/* ------------------------------------------------------------------ */
function me(req, res) {
  // req.user is attached by authMiddleware.requireAuth
  return res.status(200).json({ success: true, user: req.user });
}

/* ------------------------------------------------------------------ */
/* POST /api/auth/logout                                               */
/* ------------------------------------------------------------------ */
function logout(req, res) {
  // JWTs are stateless — see the comment in utils/token.js. There is no
  // server-side session to destroy; this endpoint exists for a clean,
  // predictable API shape. The frontend performs the actual logout by
  // deleting its stored token (see js/auth.js -> LCAuth.logout()).
  return res.status(200).json({ success: true, message: "Logged out." });
}

module.exports = { signup, login, me, logout };
