/**
 * LifeConnect — Storage Helper
 * ---------------------------------------------------------------------------
 * Thin wrapper around localStorage so the rest of the app never touches
 * `window.localStorage` directly. This keeps a single seam to swap in
 * real session/auth storage later without hunting through every file.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  const PREFIX = "lifeconnect:";

  function set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn("LCStorage: unable to save", key, err);
      return false;
    }
  }

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function remove(key) {
    localStorage.removeItem(PREFIX + key);
  }

  /* ---- Demo auth (frontend-only — see login.html for details) ---- */
  function setDemoSession(role) {
    set("demoSession", { role, since: new Date().toISOString() });
  }

  function getDemoSession() {
    return get("demoSession", null);
  }

  function clearDemoSession() {
    remove("demoSession");
  }

  global.LCStorage = { set, get, remove, setDemoSession, getDemoSession, clearDemoSession };
})(window);
