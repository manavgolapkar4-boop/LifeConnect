/**
 * LifeConnect — Auth Module (Phase 3)
 * ---------------------------------------------------------------------------
 * Talks to the real backend (backend/server.js) over the Fetch API for
 * signup, login, logout and route protection. Depends on js/storage.js
 * (LCStorage) for persisting the session — load storage.js first.
 *
 * What's stored client-side: only the JWT and the SAFE user object the
 * backend returns (id, name, email, role). The password is never stored
 * anywhere in the browser, at any point — see login()/signup() below.
 *
 * Route guarding here is a UX convenience, not real security: this is a
 * static frontend, so the mock dashboard data already ships in the JS
 * bundle regardless of auth state. Real protection happens server-side,
 * in authMiddleware.js, for any endpoint that returns real user data.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  // Change this if your backend runs on a different host/port. Every page
  // that includes this file talks to the same API regardless of how deep
  // in pages/ that page lives — no relative-path math needed here.
  const API_BASE = global.LC_API_BASE || "http://localhost:4000/api";

  const SESSION_KEY = "authSession"; // -> LCStorage key "lifeconnect:authSession"

  /* ------------------------------------------------------------------ */
  /* Low-level request helper                                            */
  /* ------------------------------------------------------------------ */
  async function apiRequest(path, options) {
    const opts = options || {};
    let response;
    try {
      response = await fetch(`${API_BASE}${path}`, {
        method: opts.method || "GET",
        headers: Object.assign(
          { "Content-Type": "application/json" },
          opts.auth ? authHeader() : {}
        ),
        body: opts.body ? JSON.stringify(opts.body) : undefined
      });
    } catch (networkErr) {
      // Most common student-project cause: the backend isn't running yet.
      return {
        ok: false,
        status: 0,
        data: { success: false, message: "Couldn't reach the LifeConnect server. Is the backend running (node server.js)?" }
      };
    }

    let data = {};
    try {
      data = await response.json();
    } catch (parseErr) {
      data = { success: false, message: "Unexpected server response." };
    }
    return { ok: response.ok, status: response.status, data };
  }

  function authHeader() {
    const session = getSession();
    return session && session.token ? { Authorization: `Bearer ${session.token}` } : {};
  }

  /* ------------------------------------------------------------------ */
  /* Session storage                                                     */
  /* ------------------------------------------------------------------ */
  function getSession() {
    return global.LCStorage ? global.LCStorage.get(SESSION_KEY, null) : null;
  }

  function setSession(token, user) {
    if (global.LCStorage) global.LCStorage.set(SESSION_KEY, { token, user });
  }

  function clearSession() {
    if (global.LCStorage) global.LCStorage.remove(SESSION_KEY);
  }

  function getCurrentUser() {
    const session = getSession();
    return session ? session.user : null;
  }

  function isAuthenticated() {
    return !!getSession();
  }

  /* ------------------------------------------------------------------ */
  /* Public actions                                                      */
  /* ------------------------------------------------------------------ */

  /** POST /api/auth/signup. Returns { ok, status, data }. Never touches localStorage with the password. */
  async function signup(payload) {
    return apiRequest("/auth/signup", { method: "POST", body: payload });
  }

  /** POST /api/auth/login. On success, persists { token, user } (not the password). */
  async function login(email, password) {
    const result = await apiRequest("/auth/login", { method: "POST", body: { email, password } });
    if (result.ok && result.data && result.data.token) {
      setSession(result.data.token, result.data.user);
    }
    return result;
  }

  /** GET /api/auth/me — re-validates the stored token against the server. */
  async function fetchMe() {
    return apiRequest("/auth/me", { method: "GET", auth: true });
  }

  /**
   * Clears the local session (real auth AND the Phase 2 demo session, so
   * Logout always fully signs the user out regardless of which kind of
   * session was active) and best-effort notifies the backend. Does not
   * wait for the network call — logout should feel instant.
   */
  function logout() {
    const hadRealSession = isAuthenticated();
    if (hadRealSession) {
      apiRequest("/auth/logout", { method: "POST", auth: true }).catch(() => {});
    }
    clearSession();
    if (global.LCStorage) global.LCStorage.clearDemoSession();
  }

  /**
   * Resolves the "active role" for guarding pages: a real authenticated
   * session takes priority; a Phase 2 demo session (see login.html's
   * "demo access" block) is accepted as a fallback so existing demo-preview
   * links keep working. Returns null if neither is present.
   */
  function getActiveRole() {
    const session = getSession();
    if (session && session.user && session.user.role) return session.user.role;
    const demo = global.LCStorage ? global.LCStorage.getDemoSession() : null;
    return demo && demo.role ? demo.role : null;
  }

  /**
   * Call at the top of a protected page:
   *   if (!LCAuth.guard("donor", "../../")) { /* redirect already triggered *\/ }
   * `base` is the same relative-path-to-root string used by LCNav.mount().
   * Returns true if the page may proceed, false if a redirect was issued.
   */
  function guard(requiredRole, base) {
    const role = getActiveRole();
    if (role === requiredRole) return true;

    const relBase = base || "";
    const next = encodeURIComponent(global.location.pathname);
    global.location.replace(`${relBase}pages/public/login.html?next=${next}`);
    return false;
  }

  global.LCAuth = {
    API_BASE,
    signup,
    login,
    logout,
    fetchMe,
    getSession,
    getCurrentUser,
    isAuthenticated,
    getActiveRole,
    guard
  };
})(window);
