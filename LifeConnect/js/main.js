/**
 * LifeConnect — Shared UI Utilities
 * ---------------------------------------------------------------------------
 * Small, framework-free helpers used across pages: toast notifications,
 * animated counters, and basic form-validation helpers. Page-specific logic
 * lives in its own file (e.g. donor.js, requester.js) and calls into these.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Toasts                                                              */
  /* ------------------------------------------------------------------ */
  function ensureToastRegion() {
    let region = document.querySelector(".lc-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "lc-toast-region";
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      document.body.appendChild(region);
    }
    return region;
  }

  const TOAST_ICONS = {
    success: "bi-check-circle-fill",
    danger: "bi-exclamation-octagon-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill"
  };

  function showToast(title, message, type) {
    const region = ensureToastRegion();
    const variant = type || "info";
    const toast = document.createElement("div");
    toast.className = `lc-toast ${variant}`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `
      <i class="bi ${TOAST_ICONS[variant] || TOAST_ICONS.info}" style="color:var(--${variant === "info" ? "secondary" : variant});"></i>
      <div class="lc-toast-body">
        <div class="lc-toast-title">${title}</div>
        <div class="lc-toast-msg">${message}</div>
      </div>
      <button class="lc-toast-close" aria-label="Dismiss notification">&times;</button>`;
    region.appendChild(toast);

    const remove = () => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 200);
    };
    toast.querySelector(".lc-toast-close").addEventListener("click", remove);
    setTimeout(remove, 5000);
  }

  /* ------------------------------------------------------------------ */
  /* Animated counters (stats section)                                   */
  /* ------------------------------------------------------------------ */
  function animateCounters(selector) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.countTo, 10) || 0;
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-IN");
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString("en-IN");
      }
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      els.forEach((el) => observer.observe(el));
    } else {
      els.forEach(animate);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Form validation helpers                                             */
  /* ------------------------------------------------------------------ */
  function validateField(input) {
    const isValid = input.checkValidity();
    input.classList.toggle("is-invalid-lc", !isValid);
    return isValid;
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      if (!validateField(input)) valid = false;
    });
    return valid;
  }

  function attachLiveValidation(form) {
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid-lc")) validateField(input);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Loading state                                                        */
  /* ------------------------------------------------------------------ */
  /**
   * Returns markup for an inline loading state (Bootstrap's spinner, no
   * extra dependency). Assign to a container's innerHTML before a search/
   * fetch, then overwrite with real results once ready. Phase 4 has no real
   * network calls yet, so callers pair this with a short setTimeout to make
   * the loading state visibly real rather than an instant flash — see
   * find-blood.html for the pattern.
   */
  function loadingHtml(message) {
    return `
      <div class="text-center py-5 text-muted-lc">
        <div class="spinner-border" role="status" style="color:var(--primary);"></div>
        <p class="mt-3 mb-0">${message || "Loading…"}</p>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Confirmation dialog (reusable, replaces one-off modals per page)     */
  /* ------------------------------------------------------------------ */
  /**
   * Shows a confirm/cancel modal and resolves to true/false.
   *   const ok = await LCUtils.confirmDialog({
   *     title: "Cancel this request?",
   *     message: "This can't be undone.",
   *     confirmLabel: "Cancel Request",
   *     variant: "danger"
   *   });
   */
  function confirmDialog(options) {
    const opts = options || {};
    const title = opts.title || "Are you sure?";
    const message = opts.message || "This action cannot be undone.";
    const confirmLabel = opts.confirmLabel || "Confirm";
    const variantClass = opts.variant === "danger" ? "btn-emergency-lc" : "btn-primary-lc";

    return new Promise((resolve) => {
      let modalEl = document.getElementById("lcConfirmModal");
      if (!modalEl) {
        modalEl = document.createElement("div");
        modalEl.className = "modal fade";
        modalEl.id = "lcConfirmModal";
        modalEl.tabIndex = -1;
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="lcConfirmModalTitle"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="lcConfirmModalBody"></div>
              <div class="modal-footer">
                <button type="button" class="btn-lc btn-outline-lc" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn-lc" id="lcConfirmOkBtn"></button>
              </div>
            </div>
          </div>`;
        document.body.appendChild(modalEl);
      }

      modalEl.querySelector("#lcConfirmModalTitle").textContent = title;
      modalEl.querySelector("#lcConfirmModalBody").textContent = message;
      const okBtn = modalEl.querySelector("#lcConfirmOkBtn");
      okBtn.textContent = confirmLabel;
      okBtn.className = `btn-lc ${variantClass}`;

      const modal = global.bootstrap.Modal.getOrCreateInstance(modalEl);
      let resolved = false;

      function onOk() {
        resolved = true;
        modal.hide();
        resolve(true);
      }
      function onHidden() {
        okBtn.removeEventListener("click", onOk);
        modalEl.removeEventListener("hidden.bs.modal", onHidden);
        if (!resolved) resolve(false);
      }
      okBtn.addEventListener("click", onOk);
      modalEl.addEventListener("hidden.bs.modal", onHidden);
      modal.show();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Notification bell dropdown (reusable component)                     */
  /* ------------------------------------------------------------------ */
  /** Markup for a bell icon + unread badge + collapsible dropdown panel. */
  function notificationBellHtml() {
    return `
      <div class="lc-notif-bell" id="lcNotifBell">
        <button type="button" class="lc-notif-bell-btn" id="lcNotifBellBtn" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">
          <i class="bi bi-bell"></i>
          <span class="lc-notif-bell-badge d-none" id="lcNotifBellBadge"></span>
        </button>
        <div class="lc-notif-dropdown d-none" id="lcNotifDropdown" role="menu"></div>
      </div>`;
  }

  /**
   * Wires up a bell rendered via notificationBellHtml() inside `root`.
   * `viewAllHref` is where "View all notifications" links to (pass null to
   * hide that link on roles with no dedicated notifications page yet).
   */
  function mountNotificationBell(root, viewAllHref) {
    const bellBtn = root.querySelector("#lcNotifBellBtn");
    const dropdown = root.querySelector("#lcNotifDropdown");
    const badge = root.querySelector("#lcNotifBellBadge");
    if (!bellBtn || !dropdown || !global.LCData) return;

    function renderDropdown() {
      const notifications = global.LCData.getNotifications().slice(0, 4);
      const unread = global.LCData.getUnreadNotificationCount();
      badge.textContent = unread > 9 ? "9+" : String(unread);
      badge.classList.toggle("d-none", unread === 0);

      if (!notifications.length) {
        dropdown.innerHTML = `<div class="lc-notif-dropdown-empty">No notifications yet.</div>`;
        return;
      }
      const items = notifications
        .map(
          (n) => `
        <div class="lc-notif-dropdown-item ${n.read ? "" : "unread"}">
          <div class="lc-notif-dropdown-title">${n.title}</div>
          <div class="lc-notif-dropdown-msg">${n.message}</div>
          <div class="lc-notif-dropdown-time">${n.time}</div>
        </div>`
        )
        .join("");
      const viewAll = viewAllHref ? `<a href="${viewAllHref}" class="lc-notif-dropdown-viewall">View all notifications</a>` : "";
      dropdown.innerHTML = items + viewAll;
    }

    renderDropdown();

    bellBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = dropdown.classList.contains("d-none");
      dropdown.classList.toggle("d-none", !willOpen);
      bellBtn.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) renderDropdown();
    });
    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) {
        dropdown.classList.add("d-none");
        bellBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Misc                                                                 */
  /* ------------------------------------------------------------------ */
  function setYear(selector) {
    const el = document.querySelector(selector);
    if (el) el.textContent = new Date().getFullYear();
  }

  global.LCUtils = {
    showToast,
    animateCounters,
    validateField,
    validateForm,
    attachLiveValidation,
    setYear,
    loadingHtml,
    confirmDialog,
    notificationBellHtml,
    mountNotificationBell
  };
})(window);
