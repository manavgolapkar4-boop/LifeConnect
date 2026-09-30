/**
 * LifeConnect — Navigation Module
 * ---------------------------------------------------------------------------
 * Renders the ONE reusable navbar and footer into every page. Rendering via
 * JS (instead of an HTML `fetch()` include) means the site still works when
 * opened directly from disk, with no local server required.
 *
 * Usage on any page:
 *   <div id="lc-navbar-root"></div>
 *   ...
 *   <div id="lc-footer-root"></div>
 *   <script src="js/navigation.js"></script>
 *   <script>LCNav.mount({ base: "", active: "home" });</script>
 *
 * `base` is the relative path back to the project root (e.g. "../../" from
 * pages/public/). `active` matches a key in NAV_LINKS so the current page
 * is highlighted. See components/navbar.html and components/footer.html for
 * a static reference copy of this same markup.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  const NAV_LINKS = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "find-blood", label: "Find Blood", href: "pages/public/find-blood.html" },
    { key: "hospitals", label: "Hospitals", href: "pages/public/hospitals.html" },
    { key: "about", label: "About", href: "pages/public/about.html" }
  ];

  /* Donor-role navigation (Phase 2). Separate list so the public navbar
     above is untouched — see renderDonorNavbar(). */
  const DONOR_NAV_LINKS = [
    { key: "dashboard", label: "Dashboard", href: "pages/donor/dashboard.html" },
    { key: "find-blood", label: "Find Blood", href: "pages/public/find-blood.html" },
    { key: "blood-requests", label: "Blood Requests", href: "pages/donor/blood-requests.html" },
    { key: "donation-history", label: "Donation History", href: "pages/donor/donation-history.html" },
    { key: "notifications", label: "Notifications", href: "pages/donor/notifications.html" },
    { key: "profile", label: "Profile", href: "pages/donor/profile.html" }
  ];

  /* Requester-role navigation (Phase 4). Separate list, same pattern as
     DONOR_NAV_LINKS above — see renderRequesterNavbar(). */
  const REQUESTER_NAV_LINKS = [
    { key: "dashboard", label: "Dashboard", href: "pages/requester/dashboard.html" },
    { key: "create-request", label: "Create Request", href: "pages/requester/create-request.html" },
    { key: "my-requests", label: "My Requests", href: "pages/requester/my-requests.html" },
    { key: "emergency", label: "Emergency", href: "pages/public/emergency-request.html" },
    { key: "profile", label: "Profile", href: "pages/requester/profile.html" }
  ];

  /* Admin sidebar navigation (Phase 4). Rendered into a sidebar, not a top
     navbar — see mountAdminShell() near the bottom of this file. */
  const ADMIN_NAV_LINKS = [
    { key: "dashboard", label: "Dashboard", icon: "bi-speedometer2", href: "pages/admin/dashboard.html" },
    { key: "users", label: "Users", icon: "bi-people", href: "pages/admin/users.html" },
    { key: "donors", label: "Donors", icon: "bi-droplet", href: "pages/admin/donors.html" },
    { key: "requests", label: "Blood Requests", icon: "bi-inbox", href: "pages/admin/requests.html" },
    { key: "hospitals", label: "Hospitals", icon: "bi-hospital", href: "pages/admin/hospitals.html" },
    { key: "reports", label: "Reports", icon: "bi-bar-chart", href: "pages/admin/reports.html" },
    { key: "settings", label: "Settings", icon: "bi-gear", href: "pages/admin/settings.html" }
  ];

  const BRAND_MARK_SVG = `
    <svg class="brand-mark-lc" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="drop-fill" d="M20 4C20 4 9 17.5 9 25.2C9 31.2 13.9 36 20 36C26.1 36 31 31.2 31 25.2C31 17.5 20 4 20 4Z" fill="var(--primary)"/>
      <circle cx="15.5" cy="25" r="2" fill="#fff" opacity="0.9"/>
      <circle cx="24.5" cy="25" r="2" fill="#fff" opacity="0.9"/>
      <circle cx="20" cy="19" r="2" fill="#fff" opacity="0.9"/>
      <path d="M15.5 25L20 19L24.5 25" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
    </svg>`;

  function buildNavLinks(base, active) {
    return NAV_LINKS.map((link) => {
      const current = link.key === active ? ' aria-current="page"' : "";
      return `<a href="${base}${link.href}"${current}>${link.label}</a>`;
    }).join("\n");
  }

  function renderNavbar(target, opts) {
    const base = opts.base || "";
    const active = opts.active || "";
    target.innerHTML = `
      <header class="lc-navbar">
        <div class="container-lc">
          <a class="brand-lc" href="${base}index.html">
            ${BRAND_MARK_SVG}
            <span>LifeConnect</span>
          </a>

          <nav class="lc-nav-links" id="lcNavLinks" aria-label="Primary">
            ${buildNavLinks(base, active)}
            <div class="lc-nav-actions-mobile">
              <a href="${base}pages/public/emergency-request.html" class="btn-lc btn-emergency-lc btn-block-lc">
                <i class="bi bi-lightning-charge-fill"></i> Emergency Request
              </a>
              <a href="${base}pages/public/signup.html" class="btn-lc btn-outline-lc btn-block-lc">Become a Donor</a>
              <a href="${base}pages/public/login.html" class="btn-lc btn-ghost-lc btn-block-lc">Login</a>
            </div>
          </nav>

          <div class="lc-nav-actions lc-nav-actions-desktop">
            <a href="${base}pages/public/emergency-request.html" class="btn-lc btn-emergency-lc btn-sm-lc">
              <i class="bi bi-lightning-charge-fill"></i> Emergency Request
            </a>
            <a href="${base}pages/public/signup.html" class="btn-lc btn-outline-lc btn-sm-lc">Become a Donor</a>
            <a href="${base}pages/public/login.html" class="btn-lc btn-ghost-lc btn-sm-lc">Login</a>
          </div>

          <button class="lc-nav-toggle" id="lcNavToggle" aria-expanded="false" aria-controls="lcNavLinks" aria-label="Toggle navigation menu">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </header>`;

    const toggle = target.querySelector("#lcNavToggle");
    const links = target.querySelector("#lcNavLinks");
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
  }

  function buildDonorNavLinks(base, active) {
    return DONOR_NAV_LINKS.map((link) => {
      const current = link.key === active ? ' aria-current="page"' : "";
      const badge =
        link.key === "notifications" && global.LCData && typeof global.LCData.getUnreadNotificationCount === "function"
          ? unreadBadgeHtml(global.LCData.getUnreadNotificationCount())
          : "";
      return `<a href="${base}${link.href}"${current}>${link.label}${badge}</a>`;
    }).join("\n");
  }

  function unreadBadgeHtml(count) {
    if (!count) return "";
    return ` <span class="badge-lc badge-danger-lc" style="margin-left:2px;">${count}</span>`;
  }

  /**
   * Shows the signed-in user's first name when a real backend session
   * exists (Phase 3); falls back to the given demo label for the Phase 2
   * demo-access flow, so both keep working from the same navbar.
   */
  function roleBadgeLabel(fallback) {
    if (global.LCAuth && typeof global.LCAuth.getCurrentUser === "function") {
      const user = global.LCAuth.getCurrentUser();
      if (user && user.name) return user.name.split(" ")[0];
    }
    return fallback;
  }

  function donorBadgeLabel() {
    return roleBadgeLabel("Demo Donor");
  }

  function requesterBadgeLabel() {
    return roleBadgeLabel("Demo Requester");
  }

  /**
   * Renders the role-based Donor navbar (Dashboard / Find Blood / Blood
   * Requests / Donation History / Notifications / Profile / Logout). This
   * is a distinct render path from renderNavbar() above so the public
   * navbar and its markup are never touched by Donor-section changes.
   */
  function renderDonorNavbar(target, opts) {
    const base = opts.base || "";
    const active = opts.active || "";

    target.innerHTML = `
      <header class="lc-navbar">
        <div class="container-lc">
          <a class="brand-lc" href="dashboard.html">
            ${BRAND_MARK_SVG}
            <span>LifeConnect</span>
          </a>

          <nav class="lc-nav-links" id="lcNavLinks" aria-label="Donor">
            ${buildDonorNavLinks(base, active)}
            <div class="lc-nav-actions-mobile">
              <button type="button" class="btn-lc btn-outline-lc btn-block-lc" id="lcLogoutBtnMobile">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </nav>

          <div class="lc-nav-actions lc-nav-actions-desktop">
            <span class="badge-lc badge-success-lc" style="padding:0.45rem 0.8rem;">
              <span class="badge-dot-lc"></span> ${donorBadgeLabel()}
            </span>
            <button type="button" class="btn-lc btn-ghost-lc btn-sm-lc" id="lcLogoutBtn">
              <i class="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>

          <button class="lc-nav-toggle" id="lcNavToggle" aria-expanded="false" aria-controls="lcNavLinks" aria-label="Toggle navigation menu">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </header>`;

    const toggle = target.querySelector("#lcNavToggle");
    const links = target.querySelector("#lcNavLinks");
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    const doLogout = () => {
      // Phase 3: prefer the real auth module when it's loaded on this page
      // (it also clears the Phase 2 demo session, so Logout always fully
      // signs the user out regardless of which kind of session was active).
      if (global.LCAuth && typeof global.LCAuth.logout === "function") {
        global.LCAuth.logout();
      } else if (global.LCStorage) {
        global.LCStorage.clearDemoSession();
      }
      window.location.href = `${base}pages/public/login.html`;
    };
    const logoutBtn = target.querySelector("#lcLogoutBtn");
    const logoutBtnMobile = target.querySelector("#lcLogoutBtnMobile");
    if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", doLogout);
  }

  function buildRequesterNavLinks(base, active) {
    return REQUESTER_NAV_LINKS.map((link) => {
      const current = link.key === active ? ' aria-current="page"' : "";
      return `<a href="${base}${link.href}"${current}>${link.label}</a>`;
    }).join("\n");
  }

  /**
   * Renders the role-based Requester navbar (Dashboard / Create Request /
   * My Requests / Emergency / Profile / Logout). Mirrors renderDonorNavbar()
   * above as its own render path, so Donor pages are never affected by
   * Requester-section changes and vice versa.
   */
  function renderRequesterNavbar(target, opts) {
    const base = opts.base || "";
    const active = opts.active || "";

    target.innerHTML = `
      <header class="lc-navbar">
        <div class="container-lc">
          <a class="brand-lc" href="dashboard.html">
            ${BRAND_MARK_SVG}
            <span>LifeConnect</span>
          </a>

          <nav class="lc-nav-links" id="lcNavLinks" aria-label="Requester">
            ${buildRequesterNavLinks(base, active)}
            <div class="lc-nav-actions-mobile">
              <button type="button" class="btn-lc btn-outline-lc btn-block-lc" id="lcLogoutBtnMobile">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </nav>

          <div class="lc-nav-actions lc-nav-actions-desktop">
            <span class="badge-lc badge-success-lc" style="padding:0.45rem 0.8rem;">
              <span class="badge-dot-lc"></span> ${requesterBadgeLabel()}
            </span>
            <button type="button" class="btn-lc btn-ghost-lc btn-sm-lc" id="lcLogoutBtn">
              <i class="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>

          <button class="lc-nav-toggle" id="lcNavToggle" aria-expanded="false" aria-controls="lcNavLinks" aria-label="Toggle navigation menu">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </header>`;

    const toggle = target.querySelector("#lcNavToggle");
    const links = target.querySelector("#lcNavLinks");
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    const doLogout = () => {
      if (global.LCAuth && typeof global.LCAuth.logout === "function") {
        global.LCAuth.logout();
      } else if (global.LCStorage) {
        global.LCStorage.clearDemoSession();
      }
      window.location.href = `${base}pages/public/login.html`;
    };
    const logoutBtn = target.querySelector("#lcLogoutBtn");
    const logoutBtnMobile = target.querySelector("#lcLogoutBtnMobile");
    if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", doLogout);
  }

  function renderFooter(target, opts) {
    const base = opts.base || "";
    target.innerHTML = `
      <footer class="lc-footer">
        <div class="container-lc">
          <div class="alert-lc alert-warning-lc mb-5" style="background-color:#2A1E10;border-color:#4A3822;color:#E8C89A;">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <div>Always contact appropriate emergency medical services for life-threatening situations. LifeConnect is a college project demonstration and does not replace professional medical or emergency services.</div>
          </div>
          <div class="row gy-5">
            <div class="col-lg-4 col-md-12">
              <a class="brand-lc" href="${base}index.html">
                ${BRAND_MARK_SVG}
                <span>LifeConnect</span>
              </a>
              <p class="mt-3" style="max-width:32ch;">Connecting blood donors with people who need them.</p>
              <div class="lc-footer-social">
                <a href="#" aria-label="LifeConnect on X"><i class="bi bi-twitter-x"></i></a>
                <a href="#" aria-label="LifeConnect on Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" aria-label="LifeConnect on LinkedIn"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-6">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="${base}index.html">Home</a></li>
                <li><a href="${base}pages/public/find-blood.html">Find Donor</a></li>
                <li><a href="${base}pages/public/emergency-request.html">Blood Request</a></li>
                <li><a href="${base}pages/public/hospitals.html">Emergency / Hospitals</a></li>
                <li><a href="${base}pages/public/signup.html">Become a Donor</a></li>
                <li><a href="${base}pages/public/about.html">About</a></li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-4 col-6">
              <h5>Support</h5>
              <ul>
                <li><a href="${base}pages/public/about.html#contact">Help</a></li>
                <li><a href="${base}pages/public/about.html#contact">Contact</a></li>
                <li><a href="${base}pages/public/emergency-request.html">Emergency Information</a></li>
                <li><a href="${base}pages/public/legal.html#privacy">Privacy</a></li>
                <li><a href="${base}pages/public/legal.html#terms">Terms</a></li>
                <li><a href="${base}pages/public/legal.html#disclaimer">Disclaimer</a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-4">
              <h5>LifeConnect</h5>
              <p style="max-width:26ch;">A TYIT Semester 5 academic project. Not a real emergency medical service.</p>
            </div>
          </div>
          <div class="lc-footer-bottom">
            <span>&copy; 2026 LifeConnect. Built for academic purposes.</span>
            <span>Made by Team LifeConnect</span>
          </div>
        </div>
      </footer>`;
  }

  function mount(opts) {
    const options = opts || {};
    const navRoot = document.getElementById("lc-navbar-root");
    const footerRoot = document.getElementById("lc-footer-root");
    if (navRoot) {
      if (options.role === "donor") renderDonorNavbar(navRoot, options);
      else if (options.role === "requester") renderRequesterNavbar(navRoot, options);
      else renderNavbar(navRoot, options);
    }
    if (footerRoot) renderFooter(footerRoot, options);
  }

  function buildAdminSidebarLinks(base, active) {
    return ADMIN_NAV_LINKS.map((link) => {
      const current = link.key === active ? ' aria-current="page"' : "";
      return `<a href="${base}${link.href}"${current}><i class="bi ${link.icon}"></i><span>${link.label}</span></a>`;
    }).join("\n");
  }

  /**
   * Renders the Admin SIDEBAR (Dashboard/Users/Donors/Requests/Hospitals/
   * Reports/Settings/Logout). Admin uses a fundamentally different shell
   * (sidebar + topbar) than the public/donor/requester top-navbar layout,
   * per the original project brief — see mountAdminShell() below and
   * css/admin.css for the layout rules.
   */
  function renderAdminSidebar(target, opts) {
    const base = opts.base || "";
    const active = opts.active || "";
    target.innerHTML = `
      <div class="lc-admin-sidebar-inner">
        <a class="brand-lc lc-admin-brand" href="${base}pages/admin/dashboard.html">
          ${BRAND_MARK_SVG}
          <span>LifeConnect</span>
        </a>
        <span class="lc-admin-role-tag">Admin</span>
        <nav class="lc-admin-nav" aria-label="Admin">
          ${buildAdminSidebarLinks(base, active)}
        </nav>
        <button type="button" class="btn-lc btn-outline-lc btn-block-lc lc-admin-logout" id="lcAdminLogoutBtn">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>`;

    const doLogout = () => {
      if (global.LCAuth && typeof global.LCAuth.logout === "function") {
        global.LCAuth.logout();
      } else if (global.LCStorage) {
        global.LCStorage.clearDemoSession();
      }
      window.location.href = `${base}pages/public/login.html`;
    };
    const logoutBtn = target.querySelector("#lcAdminLogoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
  }

  /** Renders the Admin TOPBAR: sidebar toggle (mobile), page title, role badge. */
  function renderAdminTopbar(target, opts) {
    const pageTitle = opts.pageTitle || "Dashboard";
    target.innerHTML = `
      <div class="lc-admin-topbar-inner">
        <button class="lc-admin-sidebar-toggle" id="lcAdminSidebarToggle" aria-label="Toggle menu" aria-expanded="false">
          <i class="bi bi-list"></i>
        </button>
        <h1 class="lc-admin-page-title">${pageTitle}</h1>
        <div class="lc-admin-topbar-actions">
          ${global.LCUtils ? global.LCUtils.notificationBellHtml() : ""}
          <span class="badge-lc badge-success-lc"><span class="badge-dot-lc"></span> ${roleBadgeLabel("Demo Admin")}</span>
        </div>
      </div>`;

    const toggle = target.querySelector("#lcAdminSidebarToggle");
    toggle.addEventListener("click", () => {
      const shell = document.querySelector(".lc-admin-shell");
      if (shell) shell.classList.toggle("sidebar-open");
    });

    if (global.LCUtils && typeof global.LCUtils.mountNotificationBell === "function") {
      global.LCUtils.mountNotificationBell(target, null);
    }
  }

  /**
   * Mounts the Admin shell. Usage on any pages/admin/*.html page:
   *   <div class="lc-admin-shell">
   *     <aside id="lc-admin-sidebar-root"></aside>
   *     <div class="lc-admin-content">
   *       <header id="lc-admin-topbar-root"></header>
   *       <main id="main-content">...</main>
   *     </div>
   *   </div>
   *   <script>LCNav.mountAdminShell({ base: "../../", active: "dashboard", pageTitle: "Dashboard" });</script>
   */
  function mountAdminShell(opts) {
    const options = opts || {};
    const sidebarRoot = document.getElementById("lc-admin-sidebar-root");
    const topbarRoot = document.getElementById("lc-admin-topbar-root");
    if (sidebarRoot) renderAdminSidebar(sidebarRoot, options);
    if (topbarRoot) renderAdminTopbar(topbarRoot, options);
  }

  global.LCNav = { mount, mountAdminShell, NAV_LINKS, DONOR_NAV_LINKS, REQUESTER_NAV_LINKS, ADMIN_NAV_LINKS };
})(window);
