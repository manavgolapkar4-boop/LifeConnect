/**
 * LifeConnect Backend — Auth Middleware
 * ---------------------------------------------------------------------------
 * Protects routes that require a logged-in user. Expects the frontend to
 * send the token from login as:
 *   Authorization: Bearer <token>
 *
 * On success, attaches the decoded token payload to req.user (id, email,
 * role) so downstream route handlers can use it without re-reading the
 * Authorization header themselves.
 * ---------------------------------------------------------------------------
 */

const { verifyToken } = require("../utils/token");
const { findById, toSafeUser } = require("../utils/userStore");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, message: "Authentication required." });
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired session. Please log in again." });
  }

  const user = findById(payload.id);
  if (!user) {
    return res.status(401).json({ success: false, message: "Account no longer exists." });
  }

  req.user = toSafeUser(user);
  next();
}

/**
 * Optional role check, used after requireAuth, e.g.:
 *   router.get("/donor-only", requireAuth, requireRole("donor"), handler)
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "You do not have access to this resource." });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
