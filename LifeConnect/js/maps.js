/**
 * LifeConnect — Map Module
 * ---------------------------------------------------------------------------
 * Frontend integration structure for the Google Maps JavaScript API.
 *
 * ⚠ NO REAL API KEY IS USED OR STORED HERE.
 * To connect real maps later:
 *   1. Get a Google Maps JavaScript API key.
 *   2. Set window.LC_CONFIG.GOOGLE_MAPS_API_KEY (see config note below).
 *   3. Load the Maps script with that key.
 *   4. Replace the renderPlaceholder() calls in each function with real
 *      google.maps.Map / google.maps.Marker calls — the function names
 *      and call sites elsewhere in the app do not need to change.
 *
 * Until then, every function below renders a labelled placeholder panel
 * so the layout and UX can be reviewed without a live API key.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  // Placeholder configuration object. Replace GOOGLE_MAPS_API_KEY with a
  // real key via a secure build/config step — never commit a real key.
  const LC_MAP_CONFIG = {
    GOOGLE_MAPS_API_KEY: null, // e.g. injected at build time from an env variable
    defaultCenter: { lat: 19.0760, lng: 72.8777 }, // mock center (Mumbai)
    defaultZoom: 12
  };

  /**
   * Initializes the map instance for a given container element.
   * Currently renders a placeholder; swap in `new google.maps.Map(...)`
   * once LC_MAP_CONFIG.GOOGLE_MAPS_API_KEY is set.
   */
  function initializeMap(containerId, options) {
    const el = document.getElementById(containerId);
    if (!el) return null;
    renderPlaceholder(el, (options && options.label) || "Map preview");
    return { containerId, mock: true };
  }

  /** Shows hospital markers on the map (mock data driven for now). */
  function showHospitals(mapHandle, hospitals) {
    if (!mapHandle) return;
    const el = document.getElementById(mapHandle.containerId);
    if (!el) return;
    renderPlaceholder(el, `${hospitals.length} partner hospitals nearby`, hospitals.map((h) => h.name));
  }

  /** Shows the approximate location tied to a blood request. */
  function showRequestLocation(mapHandle, request) {
    if (!mapHandle) return;
    const el = document.getElementById(mapHandle.containerId);
    if (!el) return;
    renderPlaceholder(el, `Approximate location: ${request.area}, ${request.city}`);
  }

  /** Shows approximate donor-dense areas without exposing exact addresses. */
  function showNearbyLocations(mapHandle, areas) {
    if (!mapHandle) return;
    const el = document.getElementById(mapHandle.containerId);
    if (!el) return;
    renderPlaceholder(el, "Nearby donor areas (approximate)", areas);
  }

  function renderPlaceholder(el, label, listItems) {
    const items = (listItems || [])
      .slice(0, 4)
      .map((i) => `<span class="badge-lc badge-inactive-lc">${i}</span>`)
      .join(" ");
    el.innerHTML = `
      <div class="map-placeholder-lc">
        <i class="bi bi-geo-alt"></i>
        <strong>${label}</strong>
        <span class="form-hint-lc">Google Maps JavaScript API connects here — configuration placeholder only.</span>
        <div class="d-flex flex-wrap gap-2 justify-content-center mt-2">${items}</div>
      </div>`;
  }

  global.LCMaps = {
    LC_MAP_CONFIG,
    initializeMap,
    showHospitals,
    showRequestLocation,
    showNearbyLocations
  };
})(window);
