/**
 * LifeConnect Backend — Server Entry Point
 * ---------------------------------------------------------------------------
 * Run with:  npm install   (first time only)
 *            npm start     (or: node server.js)
 *
 * Starts an Express API on http://localhost:PORT (default 4000).
 * The frontend (see ../js/auth.js) talks to this over the Fetch API.
 * ---------------------------------------------------------------------------
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Local student-project setup: the frontend is often opened straight from
// disk (file://), which sends Origin: null, or served from a simple static
// server on a different port than this API. CORS_ORIGIN="*" keeps that easy
// during development — tighten this to your real frontend URL for anything
// beyond local use (see backend/.env.example).
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Basic request log — handy for a student project while debugging fetch calls.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "lifeconnect-backend" });
});

app.use("/api/auth", authRoutes);

// 404 for anything not matched above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Central error handler — keeps stack traces out of API responses.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ success: false, message: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`LifeConnect backend running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
