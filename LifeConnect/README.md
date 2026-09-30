# LifeConnect — Local Blood Donation & Emergency Medical Contact Hub

A frontend-first prototype connecting blood donors, requesters and hospitals.
Built as a TYIT Semester 5 college project by a two-student team.

> **Status:** Phase 1 (Public Website), Phase 2 (Donor), Phase 3 (Backend
> & Authentication) and Phase 4 (Requester, Admin, final frontend polish)
> complete. This was the final planned frontend phase — see "What Phase 4
> added" below for what's demo-only and what still needs a real backend.

## Tech stack

- HTML5, CSS3, vanilla JavaScript
- Bootstrap 5 (layout/grid, modals, form primitives)
- Bootstrap Icons
- Google Fonts: Fraunces (display) + Inter (body/UI)
- Chart.js and the Google Maps JavaScript API are reserved for later phases
  (analytics dashboards and real maps) — see `js/maps.js`.

Donor/hospital/request data still runs on a frontend mock-data layer
(`js/mock-data.js`) so those pages work standalone — see "Mock data layer"
below. As of Phase 3, **signup/login/logout are real**, backed by the
Node.js + Express API in `backend/` (see sections C–H below for setup).

## A. Requirements

You need two things installed on your computer:

1. **Node.js** (version 18 or newer — this project uses `crypto.randomUUID()`
   and the built-in `fetch`-friendly APIs). Check with:
   ```bash
   node --version
   ```
   If that fails, install Node from https://nodejs.org (the "LTS" version).
2. A modern browser (Chrome, Edge, Firefox). No other software is required —
   the frontend has no build step.

## B. Folder structure

```
LifeConnect/
├── index.html                  Home page
├── pages/
│   ├── public/                 Phase 1 — public website (complete)
│   │   ├── find-blood.html
│   │   ├── emergency-request.html
│   │   ├── hospitals.html      Phase 4: + blood bank badges, emergency contacts
│   │   ├── about.html
│   │   ├── legal.html          Phase 4 — Privacy / Terms / Disclaimer
│   │   ├── login.html          Phase 3: real login; Phase 4: routes all 3 roles
│   │   └── signup.html         Phase 3: real signup, wired to the backend
│   ├── donor/                  Phase 2 — donor section (complete)
│   │   ├── dashboard.html      Phase 3: guarded — requires donor login
│   │   ├── profile.html        Phase 3: guarded — requires donor login
│   │   ├── donation-history.html   Phase 3: guarded — requires donor login
│   │   ├── blood-requests.html Phase 3: guarded — requires donor login
│   │   └── notifications.html  Phase 3: guarded — requires donor login
│   ├── requester/              Phase 4 — requester section (new, complete)
│   │   ├── dashboard.html      Guarded — requires requester login
│   │   ├── create-request.html Guarded — requires requester login
│   │   ├── my-requests.html    Guarded — requires requester login
│   │   └── profile.html        Guarded — requires requester login
│   └── admin/                  Phase 4 — admin section (new, frontend-only)
│       ├── dashboard.html      Guarded — requires admin login
│       ├── users.html          Guarded — requires admin login
│       ├── donors.html         Guarded — requires admin login
│       ├── requests.html       Guarded — requires admin login
│       ├── hospitals.html      Guarded — requires admin login
│       ├── reports.html        Guarded — requires admin login (Chart.js)
│       └── settings.html       Guarded — requires admin login
├── css/
│   ├── variables.css           Design tokens (color, type, spacing, radius)
│   ├── global.css              Base resets, typography, buttons, forms
│   ├── components.css          Navbar, footer, cards, badges, modals, notif. bell
│   ├── responsive.css          Breakpoint overrides
│   ├── dashboard.css           Donor/Requester dashboard patterns (top-navbar layout)
│   └── admin.css               Phase 4 — Admin sidebar + topbar shell layout
├── js/
│   ├── main.js                 Shared UI utilities: toasts, counters, validation,
│   │                           Phase 4: loading state, confirm dialog, notif. bell
│   ├── navigation.js           Renders the public/Donor/Requester navbars AND the
│   │                           Admin sidebar+topbar shell (LCNav.mount /
│   │                           LCNav.mountAdminShell)
│   ├── mock-data.js            Single source of mock data + accessor functions
│   │                           (Phase 4: + requester & admin data/functions)
│   ├── storage.js              localStorage wrapper + demo-session helper
│   ├── auth.js                 Phase 3 — talks to the backend (signup, login,
│   │                           logout, role-based route guard) — see section H
│   └── maps.js                 Google Maps integration scaffold (placeholder UI)
├── components/
│   ├── navbar.html             Static reference copy of the public navbar
│   └── footer.html             Static reference copy of the footer
├── assets/
│   ├── images/
│   └── icons/
├── backend/                    Phase 3 — Node.js + Express API
│   ├── server.js               Entry point — run this to start the API
│   ├── package.json
│   ├── .env.example            Copy to .env and fill in — see section C
│   ├── .gitignore              Excludes node_modules/ and your real .env
│   ├── routes/
│   │   └── authRoutes.js       Maps URLs to controller functions
│   ├── controllers/
│   │   └── authController.js   Signup / login / me / logout request logic
│   ├── middleware/
│   │   └── authMiddleware.js   Protects routes that require a logged-in user
│   ├── utils/
│   │   ├── userStore.js        Reads/writes data/users.json
│   │   ├── validators.js       Signup/login field validation
│   │   └── token.js            JWT sign/verify wrapper
│   └── data/
│       └── users.json          Your "database" for this project — plain JSON
└── README.md
```

Phase 4 was scoped as **frontend completion only** — no new backend routes
were added. `backend/routes/requesterRoutes.js`, `donorRoutes.js` and
`adminRoutes.js` (real per-role APIs) are the natural next backend step —
see "What requires backend integration later" below.

### Why the navbar/footer are JS-rendered, not `fetch()`-included

`components/navbar.html` and `components/footer.html` are kept as readable
reference copies of the markup, but the site actually renders them via
`js/navigation.js` → `LCNav.mount({ base, active, role })` (or
`LCNav.mountAdminShell({...})` for the Admin sidebar). Opening HTML partials
with `fetch()` fails under `file://` (no local server) in most browsers, so
JS-rendering keeps the site fully reusable and viewable by just double-clicking
`index.html`. If you *do* serve the project, both approaches work — no dev
setup is required. Every page includes `<div id="lc-navbar-root"></div>` and
`<div id="lc-footer-root"></div>` and mounts with the correct relative `base`
path for its location; Admin pages instead use `<aside id="lc-admin-sidebar-root">`
and `<header id="lc-admin-topbar-root">` — see any `pages/admin/*.html` file.

## C. Installation

Open a terminal **in the `backend/` folder** and run:

```bash
cd LifeConnect/backend
npm install
```

This downloads Express, bcrypt, jsonwebtoken, cors and dotenv into
`backend/node_modules/` (not committed to the project — see `.gitignore`).

Then create your own environment file:

```bash
# still inside backend/
cp .env.example .env
```

Open the new `backend/.env` file and replace the placeholder `JWT_SECRET`
with your own random string. One easy way to generate one:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the output after `JWT_SECRET=` in `.env`. Nothing else in `.env`
needs to change for local use.

## D. How to start the backend

From inside `backend/`:

```bash
npm start
```

(this just runs `node server.js` — both work identically). You should see:

```
LifeConnect backend running at http://localhost:4000
Health check: http://localhost:4000/api/health
```

Leave this terminal window open — the server keeps running there. Every
signup/login request from the frontend needs this running in the background.

To confirm it's alive, open http://localhost:4000/api/health in a browser —
you should see `{"status":"ok","service":"lifeconnect-backend"}`.

**Data persistence:** every signup is saved to `backend/data/users.json`.
Stopping and restarting the server does **not** lose your accounts — they're
read from that file again on the next start. Deleting `users.json` (or
replacing its contents with `[]`) resets all accounts.

## E. How to open/run the frontend

In a **second** terminal (keep the backend running in the first one), from
the `LifeConnect/` project root:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser. (You can also just
double-click `index.html` to open it directly from disk — everything except
the Phase 3 login/signup/donor pages works identically either way. Login,
signup and the donor pages need the backend running regardless of which way
you open the frontend.)

## F. API endpoints

All routes are mounted under `/api/auth` (base URL `http://localhost:4000`):

| Method | Path                | Auth required | Purpose                                |
|--------|---------------------|:-------------:|-----------------------------------------|
| GET    | `/api/health`       | No            | Confirms the server is running          |
| POST   | `/api/auth/signup`  | No            | Create a donor or requester account     |
| POST   | `/api/auth/login`   | No            | Log in, returns a token + safe user info|
| GET    | `/api/auth/me`      | Yes (Bearer)  | Returns the current logged-in user      |
| POST   | `/api/auth/logout`  | No            | Acknowledges logout (see note below)    |

**Signup** body:
```json
{ "name": "...", "email": "...", "phone": "9812345678", "password": "...", "role": "donor" }
```
`role` must be `"donor"` or `"requester"` — the signup page's UI doesn't offer
`"admin"` and the backend rejects it even if sent directly.

**Login** body:
```json
{ "email": "...", "password": "..." }
```
Returns `{ success, message, user: { id, name, email, role, ... }, token }`
on success. The password hash is never included in any response.

**Protected requests** (`/api/auth/me`) must include:
```
Authorization: Bearer <token>
```

HTTP status codes used: `200` success, `201` signup created, `400` invalid
input, `401` invalid/missing auth, `403` wrong role, `409` duplicate email,
`404` unknown route, `500` unexpected server error (stack traces are never
sent to the browser — only a generic message).

## G. Test Signup / Login / Logout

With the backend running (section D) and the frontend open (section E):

**Test Signup**
1. Go to `pages/public/signup.html` (the "Become a Donor" or "Create
   Account" links get you there).
2. Fill the form and submit.
3. You should see a green "Account created" toast, then be redirected to the
   login page after about a second.
4. Try submitting the exact same email again — you should get a red
   "Signup failed" toast saying the email is already registered (409).
5. Open `backend/data/users.json` in a text editor — your new account should
   be there, with a long `passwordHash` value, never your real password.

**Test Login**
1. On `pages/public/login.html`, enter the email/password you just signed up
   with.
2. You should see "Welcome back" and be redirected: donor accounts go to
   `pages/donor/dashboard.html`; requester accounts go to
   `pages/public/find-blood.html` for now (the full requester dashboard is
   Phase 4 — see "Roadmap").
3. Try logging in with the wrong password — you should get a red "Login
   failed" toast with a generic message (it deliberately does not say
   whether the email or the password was wrong).
4. Try visiting `pages/donor/dashboard.html` directly **without** logging in
   first (or after logging out) — you should be redirected straight to the
   login page.

**Test Logout**
1. While logged in on any Donor page, click **Logout** in the navbar
   (desktop) or the mobile menu.
2. You're sent back to the login page.
3. Try navigating back to `pages/donor/dashboard.html` — you should be
   redirected to login again, confirming the session was actually cleared.

## H. What is implemented in Phase 3

- **Backend** (`backend/`) — a small Express API: `POST /api/auth/signup`,
  `POST /api/auth/login`, `GET /api/auth/me` (protected), `POST
  /api/auth/logout`. Users are stored in `backend/data/users.json`;
  passwords are hashed with bcrypt before they're ever written to disk and
  are never sent back to the browser. Login issues a JWT (`jsonwebtoken`),
  which the frontend stores and sends back as `Authorization: Bearer
  <token>` on protected requests.
- **`js/auth.js`** (new) — the frontend's only point of contact with the
  backend: `LCAuth.signup()`, `LCAuth.login()`, `LCAuth.logout()`,
  `LCAuth.fetchMe()`, `LCAuth.isAuthenticated()`, `LCAuth.getCurrentUser()`,
  and `LCAuth.guard(role, base)` for protecting pages. The token and safe
  user object are stored in `localStorage` (via the existing `LCStorage`
  wrapper) — **the password itself is never stored client-side, at any
  point.**
- **Login/Signup pages** — genuinely call the backend over `fetch()` now.
  No more "Login unavailable" placeholder message from Phase 1/2. Signup
  shows real backend validation errors (e.g. duplicate email); login shows a
  generic invalid-credentials message on failure and redirects by role on
  success.
- **Route protection** — every Donor page now calls `LCAuth.guard("donor",
  "../../")` before rendering. An unauthenticated visit redirects to login
  with a `?next=` parameter so (on a server-hosted setup) login can send the
  person back to the page they wanted.
- **Phase 2 demo access preserved** — the "Continue as Donor (Demo)" button
  on the login page still works and still reaches the donor dashboard,
  because `guard()` accepts *either* a real backend session *or* a Phase 2
  demo session. Logout clears both, whichever was active.
- **Role-based redirect** — donor accounts land on the donor dashboard;
  requester accounts land on Find Blood for now (their own dashboard is
  Phase 4 — there's nowhere real to send them yet).
- **`admin` is not offered or accepted** — the signup UI only has Donor/
  Requester options, and the backend validator (`backend/utils/
  validators.js`) rejects any other role value even if sent directly to the
  API. The auth *middleware* already supports role checks
  (`requireRole("admin")`) so a real admin system can be added later without
  changing this file.

### Honest limitations of this implementation

- **JSON-file storage, not a real database.** `backend/utils/userStore.js`
  reads/writes the whole file on every request — fine for a class project
  with a handful of test accounts, not for concurrent real users. The file
  is the one intended seam for swapping in MongoDB/MySQL/PostgreSQL later —
  nothing in `routes/` or `controllers/` would need to change.
- **JWT logout is client-side only.** A JWT is stateless — the server has no
  list of "logged in" tokens to revoke. `POST /api/auth/logout` exists for a
  clean API shape, but the actual logout happens by the frontend deleting
  its stored token. This is a normal, well-known trade-off of plain JWT
  auth for a project at this scale, not an oversight — see the comment in
  `backend/utils/token.js`.
- **This is not production security.** There's no rate limiting, no email
  verification, no password-reset flow, no HTTPS enforcement, and
  `CORS_ORIGIN=*` is a development convenience, not a security boundary.
  Treat this exactly as what it is: a learning-focused, student-project
  authentication system.
- **The route guard is a UX convenience, not real protection.** Since this
  is a static frontend, the donor dashboard's mock data (Phase 2) ships in
  the JS bundle regardless of login state — `guard()` stops an
  unauthenticated *person* from casually landing on the page, but it can't
  hide data that was never secret to begin with. Real protection starts
  once a page fetches real per-user data from the API instead of
  `mock-data.js` — see Phase 4 below.
- **Donor dashboard data is still `mock-data.js`, not the logged-in
  account.** Phase 3's job was authentication, not rewiring every donor
  page to pull real data per-user — the Donor dashboard still shows the
  Phase 2 fictional "Rohan Mehta" profile regardless of which account you
  logged in as. Connecting real per-user data is Phase 4 work.

## I. Phase 3 → Phase 4 handoff (historical note)

Section I originally previewed what Phase 4 would build. It's kept here for
history; Phase 4 is now complete — see the new sections J–N below for what
actually shipped, and "What requires backend integration later" for what's
still ahead.

## J. What is implemented in Phase 4

Phase 4 was scoped as **frontend completion and polish only** — see the
"IMPORTANT BACKEND RULE" the brief used: no new database, no new backend
routes, Phase 3 auth untouched.

- **Requester section** (`pages/requester/`, new) — Dashboard (stats, quick
  actions, recent requests), Create Blood Request (full validated form with
  urgency levels and a live character counter), My Requests (status tabs,
  view-details modal, cancel with a confirmation dialog, a genuine loading
  state before results render), and Profile (view/edit/save/cancel, same
  pattern as the Donor profile). All guarded — `LCAuth.guard("requester",
  "../../")` — and reachable via real login (signup role = requester) or the
  login page's "Continue as Requester (Demo)" button.
- **Admin section** (`pages/admin/`, new) — a genuinely different shell
  (sidebar + topbar, collapsible on mobile — see `css/admin.css`) rather
  than reusing the donor/requester top-navbar layout, matching the original
  brief. Dashboard (5 stat cards + a pending-verification callout + recent
  requests table), Users (search/filter/suspend/activate), Donors (search/
  filter/verify, with a detail modal), Blood Requests (search/filter/
  approve/cancel), Hospitals (search + view, add/edit clearly marked
  demo-only and disabled), Reports (4 live Chart.js charts computed from the
  current mock dataset), Settings (account info + demo notification
  toggles + a disabled "danger zone"). Admin has no signup path — see
  "Role-based access" below.
- **Role-based navigation** — `js/navigation.js` now renders four distinct
  navs from one file: the original public navbar, the Phase 2 Donor navbar,
  a new Requester navbar (Dashboard / Create Request / My Requests /
  Emergency / Profile / Logout), and the new Admin sidebar. All four share
  the same logout logic, the same `roleBadgeLabel()` helper, and the same
  design tokens — nothing about the Phase 1–3 navbars changed.
- **Reusable UI components added to `js/main.js`** — `LCUtils.loadingHtml()`
  (a real loading state used on Find Blood search and My Requests, not an
  instant flash), `LCUtils.confirmDialog()` (one reusable confirm/cancel
  modal instead of a one-off per page — used by every admin verify/suspend/
  approve action and by the Requester's cancel-request flow), and
  `LCUtils.mountNotificationBell()` (a bell-icon dropdown, wired into the
  Admin topbar) alongside the existing toast/counter/validation helpers.
- **Footer & legal** — the footer now includes the required emergency
  disclaimer banner ("Always contact appropriate emergency medical
  services…") and Privacy/Terms/Disclaimer links to a new
  `pages/public/legal.html`, while keeping every original footer link
  (Become a Donor, Hospitals, Help, Contact, Emergency Information) intact.
- **Hospitals page enhancements** — an Emergency Contacts callout (clearly
  labelled demo numbers) and a "Blood Bank" badge per hospital (new
  `bloodBank` field on the existing hospital records), both on the card grid
  and the detail modal.
- **Centralized demo data, extended** — `js/mock-data.js` gained
  `CURRENT_REQUESTER_DEFAULTS`/`REQUESTER_REQUESTS_DEFAULTS` and admin
  accessor functions (`getAdminStats`, `getAdminDonors`, `getAdminUsers`,
  `getAdminRequests`, `getAdminHospitals`, `adminVerifyDonor`,
  `adminSetUserStatus`, `adminUpdateRequestStatus`), all following the same
  pattern as the Phase 2 donor functions: lazy `localStorage` hydration, one
  accessor/mutator per concern, nothing scattered in HTML.
- **Role-based access, enforced two ways** — (1) the signup form has never
  offered "Admin" as an option (Phase 3), and (2) `backend/utils/
  validators.js` rejects `role: "admin"` server-side even if sent directly
  to the API — so there is no path, UI or API, to become an admin through
  signup. The only way into the Admin section is the login page's
  "Continue as Admin (Demo)" button, exactly like Requester/Donor demo
  access.

## K. Which frontend features are COMPLETE

Fully built, wired to either the mock-data layer (with working `localStorage`
persistence) or the real Phase 3 backend: Home, Find Blood, Hospitals (+
blood bank/emergency contacts), Emergency Request, About, Legal, Login/
Signup/Logout (real backend), Donor dashboard/profile/donation-history/
blood-requests/notifications, Requester dashboard/create-request/
my-requests/profile, Admin dashboard/users/donors/requests/hospitals/
reports/settings, role-based navigation for all four roles, toasts, loading
states, confirm dialogs, empty states, form validation, responsive layout
down to mobile.

## L. Which features are DEMO ONLY

Everything under Donor/Requester/Admin that isn't signup/login/logout itself:
donor and hospital search results, match scores, donation history,
donor "verification," blood group demand labels, admin stats/charts, and
every Verify/Suspend/Approve/Cancel action. These mutate `js/mock-data.js`'s
in-memory data (persisted to `localStorage` so they survive a reload) — none
of it reaches the backend or a real database. This is stated on-page in
several places (e.g. the Admin dashboard's top banner, the Create Request
sidebar note) so it's never presented as real.

## M. Which features require backend/database integration later

- Real per-role REST endpoints (`/api/donors`, `/api/requests`, `/api/
  hospitals`, `/api/admin/...`) to replace `js/mock-data.js`'s in-memory
  arrays — the accessor-function pattern used throughout (`getDonors()`,
  `getAdminUsers()`, etc.) means only the *inside* of those functions needs
  to change to real `fetch()` calls; call sites elsewhere should not need to
  change.
- Wiring the Donor/Requester dashboards to the actual logged-in account
  (`LCAuth.getCurrentUser()`) instead of the fixed demo profiles
  (`getCurrentDonor()` / `getCurrentRequester()`).
- A real `admin` role in the backend (`backend/utils/validators.js`'s
  `ALLOWED_ROLES` + a seed script or manual `users.json` edit), since
  admin still can't be created through signup by design.
- Real hospital/blood-bank data and a live Google Maps key (`js/maps.js` →
  `LC_MAP_CONFIG.GOOGLE_MAPS_API_KEY`) — every map on the site is currently
  a graceful placeholder panel.
- Persisting Admin Settings' notification toggles and swapping JSON-file
  storage (`backend/utils/userStore.js`) for a real database — both already
  flagged as the intended upgrade seam in the Phase 3 README section.

## Roadmap

Phase 4 was the final planned **frontend** phase — see the brief's own
"IMPORTANT BACKEND RULE": no new database, no new backend routes, no Phase 5
in this pass. What's next is backend expansion to match the frontend that
now exists — see section M above ("Which features require backend/database
integration later") for the concrete list.

## Design system

Defined once in `css/variables.css` as CSS custom properties (`--primary`,
`--secondary`, `--background`, `--surface`, `--success`, `--warning`,
`--danger`, etc.) and used everywhere instead of hardcoded colors. Palette:
deep crimson primary, dark navy secondary, soft off-white background — red is
reserved for branding, emergency actions and status, not decoration.

## Mock data layer

All fictional sample data (donors, hospitals, blood requests, notifications,
dashboard stats, users, and — as of Phase 2 — the current donor's profile,
donation history and inbox) lives in `js/mock-data.js` behind accessor
functions: `getDonors()`, `getBloodRequests()`, `getHospitals()`,
`getNotifications()`, `getDashboardStats()`, `createBloodRequest()`,
`updateDonorAvailability()`, plus the Phase 2 additions listed below.
No real personal data is used anywhere.

### Phase 2 additions to the data layer

- `getCurrentDonor()` / `updateDonorProfile(partial)` — the signed-in demo
  donor's profile (no real auth exists — see Login's demo-access block).
- `setCurrentDonorAvailability(bool)` / `updateEmergencyAvailability(bool)` —
  the two dashboard toggles.
- `getDonationHistory(filters)` — supports `search`, `status`, `sort`.
- `getDonorRequests(filters)` / `getDonorRequestById(id)` /
  `updateBloodRequestStatus(id, status)` — the donor's request inbox with
  Accept/Decline.
- `getNotifications()` / `markNotificationRead(id)` /
  `markAllNotificationsRead()` / `getUnreadNotificationCount()`.
- `getRecentActivity()` / `addRecentActivity(icon, text)` — dashboard feed;
  session-only (not persisted), auto-logged on accept/decline.
- `getDonorDashboardStats()` — derived live from the data above (no separate
  counter to keep in sync).

Profile edits, availability toggles, request accept/decline and notification
read-state are persisted via `js/storage.js` (`localStorage`, prefixed
`lifeconnect:`) so they survive a page reload — donation history itself is
read-only in this phase. Hydration from `localStorage` is **lazy** (runs on
first data access, not at file-load time) because `mock-data.js` loads
before `storage.js` on every page — see the comment block in `mock-data.js`.

## Phase 1 — what's implemented

- **Home** — hero, animated stats, "How it works", features grid, blood
  group grid (links into Find Blood with a pre-filled filter), emergency
  CTA, nearby hospitals preview with map placeholder, final CTA.
- **Find Blood** — filters (blood group, location, distance, availability,
  emergency-only), sorting (best match / nearest / available first), donor
  cards, profile modal, empty state.
- **Emergency Request** — full form with validation, generates a fictional
  request ID on submit, shows a live status timeline (Created → Searching →
  Donor Found → Accepted → Completed).
- **Hospitals** — search/filter by location, distance and emergency
  availability; hospital cards; detail modal; map placeholder. Exact donor
  addresses are never shown, per the privacy requirement.
- **About** — mission, how it works, why donation matters, blood-group
  reference grid, team section (placeholder students, no invented names),
  contact section with a demo form.
- **Login** — email/password form with validation, plus a clearly-separated
  "demo access" block that starts a mock session (`LCStorage`) for previewing
  role dashboards. Not real authentication.
- **Sign Up** — donor/requester role toggle, full registration form with
  validation.

Interactions implemented across these pages: form validation, search,
filtering, sorting, modals, toast notifications, mobile hamburger menu,
empty states, and a map-module placeholder ready for a real Google Maps key.

## Phase 2 — what's implemented

All Donor pages share one role-based navbar (`LCNav.mount({ role: "donor",
... })` in `navigation.js`) — Dashboard / Find Blood / Blood Requests /
Donation History / Notifications / Profile / Logout — built as a second
render path so the Phase 1 public navbar is untouched. The Donor's "Find
Blood" link reuses the existing public `find-blood.html` page directly,
rather than duplicating the search UI.

- **Dashboard** — welcome header, two functional availability toggles
  (Donor Availability, Emergency Availability), four icon stat cards (Total
  Donations, Requests Received, Requests Accepted, Successful Connections —
  all derived live from data, never a separately-tracked number), Quick
  Actions tiles, a Recent Activity feed that logs toggle/accept/decline/
  profile-save events, and a Profile Completion progress bar.
- **Profile** — read view + a separate edit form (Edit → Save/Cancel), full
  field set (name, blood group, area, city, phone, email, availability,
  emergency availability, last donation date, registration date), live
  validation on save.
- **Donation History** — search, status filter, newest/oldest sort; a real
  `<table>` on tablet/desktop that becomes stacked cards on mobile (no
  horizontal scrolling); empty state.
- **Blood Requests** — tabs (All / Pending / Accepted / Declined), request
  cards with Accept / Decline, a details modal, and a decline confirmation
  dialog. Accepting/declining updates status, dashboard stats and the
  activity feed, and shows a toast — clearly a frontend demo interaction,
  not a real hospital handshake.
- **Notifications** — icon + title + message + time + read/unread state,
  per-item "Mark as read" and a page-level "Mark all as read", unread count
  in the header and (via a small badge) in the navbar link.

## Configuration placeholders

- **Google Maps API key** — `js/maps.js` → `LC_MAP_CONFIG.GOOGLE_MAPS_API_KEY`
  is `null` by design. No key is stored or exposed anywhere in the repo.
  Every map surface renders a labelled placeholder panel until a real key is
  wired in at build time.
- **Backend API base URL** — `js/auth.js` → `API_BASE` defaults to
  `http://localhost:4000/api`. Override it by setting
  `window.LC_API_BASE = "..."` in an inline `<script>` before `auth.js`
  loads, if you ever run the backend on a different host/port.
- **Backend secrets** — `backend/.env` (real secrets — not committed) vs
  `backend/.env.example` (placeholder values — committed). See section C.
- **Donor/Requester/Admin/hospital/request data** — still `js/mock-data.js`,
  unrelated to the Phase 3 backend. Swapping its internals for real
  `fetch()` calls to new backend endpoints (once they exist) is the next
  backend milestone — call sites elsewhere in the app should not need to
  change. See section M.
- **Chart.js** (Admin → Reports) loads from a CDN like Bootstrap does; no
  key or config needed, but it does require internet access to load the
  script the same way the Google Fonts/Bootstrap CDN links do.

## Known issues / things to revisit

- Emergency request form's "Location" and "Hospital" fields don't yet cross-
  validate against the hospital's actual city (mock data keeps them loosely
  coupled on purpose for now).
- No real geolocation — all "distance" values are static mock numbers, not
  computed from an actual user position.
- The Donor "Recent Activity" feed is session-only (resets on reload) by
  design — only profile/availability/request state is persisted to
  `localStorage`. A real backend would serve this as an activity log.
- Donation History is read-only (no reschedule/cancel action) since the
  brief only asked for search/filter/sort here.
- Admin's Hospitals "Add"/"Edit" buttons are intentionally disabled with a
  tooltip explaining why — the brief was explicit that Admin is frontend
  controls only in this phase, not real CRUD.
- Admin Settings' notification toggles show a toast but don't persist —
  flagged on-page and here so it's never mistaken for a real save.
- The route guard (`LCAuth.guard()`) is a UX convenience, not real security,
  for the same reason noted in the Phase 3 section: this is a static
  frontend, so mock data ships in the JS bundle regardless of login state.
- See "Honest limitations of this implementation" under section H for the
  Phase 3 (auth/backend) caveats — JSON-file storage, stateless JWT logout,
  and CORS_ORIGIN="*" being a dev convenience, not a security boundary.

## N. Moving this project into VS Code

1. Download or copy the whole `LifeConnect/` folder (including `backend/`)
   onto your computer, keeping the folder structure exactly as-is.
2. Open VS Code → **File → Open Folder…** → select the `LifeConnect/`
   folder itself (not a file inside it).
3. Install two free VS Code extensions (Extensions panel, left sidebar):
   - **Live Server** (by Ritwick Dey) — right-click `index.html` → "Open with
     Live Server" to run the frontend with hot-reload instead of
     `python3 -m http.server`.
   - Optionally **ESLint** if you want inline JS linting while you work.
4. Open a VS Code terminal (`` Ctrl+` `` / `` Cmd+` ``), `cd backend`, and
   run the same `npm install` / `npm start` commands from section C/D — VS
   Code's terminal is just a normal terminal.
5. Keep two terminal tabs open side by side: one running the backend
   (`npm start` in `backend/`), one free for frontend commands or Live
   Server's own output.

## O. Downloading/exporting the complete project as ONE ZIP

To make sure nothing is missing (especially dotfiles like
`backend/.env.example` and `.gitignore`, which some zip tools skip by
default):

**From this chat:** use the download/export option your interface provides
for the project files, then verify the zip contains a `backend/` folder
with `node_modules` absent (that's expected and correct — see next point)
but `server.js`, `package.json`, `routes/`, `controllers/`, `middleware/`,
`utils/`, and `data/` all present.

**From a terminal, if you already have the folder on disk** (most reliable
way to guarantee nothing is missed, including hidden files):
```bash
cd /path/to/parent-folder-containing-LifeConnect
zip -r LifeConnect.zip LifeConnect -x "LifeConnect/backend/node_modules/*"
```
The `-x` flag deliberately excludes `node_modules/` — it's large,
machine-specific, and regenerated by `npm install` on any computer, so it
should never be zipped or emailed. Everything else, including hidden files
like `.env.example` and `.gitignore`, is included by default with this
command (unlike some GUI "compress" tools, which sometimes hide dotfiles).

**If you use a file manager's "Compress"/"Send to → Zip" option instead:**
select the `LifeConnect` folder itself (not its contents individually), and
afterward double-check the zip for a `backend` folder — a common mistake is
compressing only what's visible in a window that has hidden files toggled
off, which can silently skip `.env.example`/`.gitignore`.

Before sending the zip to anyone, confirm `backend/.env` (the real one, not
`.env.example`) is **not** inside it — it shouldn't exist in this delivered
copy at all (see section C), but it's worth a final check if you've since
created one locally while testing.
