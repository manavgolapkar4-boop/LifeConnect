/**
 * LifeConnect Backend — Auth Routes
 * ---------------------------------------------------------------------------
 * All routes are mounted under /api/auth in server.js, so the full paths are:
 *   POST /api/auth/signup
 *   POST /api/auth/login
 *   GET  /api/auth/me        (protected)
 *   POST /api/auth/logout
 * ---------------------------------------------------------------------------
 */

const express = require("express");
const router = express.Router();

const { signup, login, me, logout } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

module.exports = router;
