/**
 * LifeConnect — Mock Data Layer
 * ---------------------------------------------------------------------------
 * This file is the ONLY place raw mock data lives. Every other script reads
 * data through the getter functions below instead of touching the arrays
 * directly. When a real backend exists, replace the body of each function
 * with a `fetch()`/API call — nothing that calls these functions should
 * need to change.
 *
 * All names, phone numbers and addresses are fictional placeholders.
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  /* ------------------------------------------------------------------ */
  /* Raw mock records                                                    */
  /* ------------------------------------------------------------------ */

  const DONORS = [
    { id: "D-1001", name: "Rohan Mehta", bloodGroup: "O+", area: "Andheri West", city: "Mumbai", distanceKm: 2.4, available: true, emergencyAvailable: true, lastDonation: "2026-04-12", donationsCount: 6, phone: "98XXXXXX10", matchScore: 96, verified: true  },
    { id: "D-1002", name: "Ananya Kulkarni", bloodGroup: "A+", area: "Kothrud", city: "Pune", distanceKm: 4.1, available: true, emergencyAvailable: false, lastDonation: "2026-02-03", donationsCount: 3, phone: "98XXXXXX21", matchScore: 88, verified: false  },
    { id: "D-1003", name: "Farhan Sheikh", bloodGroup: "B+", area: "Banjara Hills", city: "Hyderabad", distanceKm: 6.7, available: false, emergencyAvailable: false, lastDonation: "2025-11-20", donationsCount: 9, phone: "98XXXXXX32", matchScore: 74, verified: true  },
    { id: "D-1004", name: "Priya Nair", bloodGroup: "O-", area: "Indiranagar", city: "Bengaluru", distanceKm: 1.8, available: true, emergencyAvailable: true, lastDonation: "2026-05-01", donationsCount: 11, phone: "98XXXXXX43", matchScore: 99, verified: true  },
    { id: "D-1005", name: "Karan Malhotra", bloodGroup: "AB+", area: "Rajouri Garden", city: "Delhi", distanceKm: 8.2, available: true, emergencyAvailable: false, lastDonation: "2026-01-15", donationsCount: 2, phone: "98XXXXXX54", matchScore: 66, verified: false  },
    { id: "D-1006", name: "Sneha Iyer", bloodGroup: "A-", area: "Adyar", city: "Chennai", distanceKm: 3.5, available: true, emergencyAvailable: true, lastDonation: "2026-03-28", donationsCount: 5, phone: "98XXXXXX65", matchScore: 91, verified: true  },
    { id: "D-1007", name: "Aditya Verma", bloodGroup: "B-", area: "Vastrapur", city: "Ahmedabad", distanceKm: 5.9, available: false, emergencyAvailable: false, lastDonation: "2025-09-09", donationsCount: 4, phone: "98XXXXXX76", matchScore: 58, verified: false  },
    { id: "D-1008", name: "Meera Joshi", bloodGroup: "O+", area: "Viman Nagar", city: "Pune", distanceKm: 2.9, available: true, emergencyAvailable: true, lastDonation: "2026-05-19", donationsCount: 8, phone: "98XXXXXX87", matchScore: 94, verified: true  },
    { id: "D-1009", name: "Vikram Singh", bloodGroup: "AB-", area: "Salt Lake", city: "Kolkata", distanceKm: 7.3, available: true, emergencyAvailable: false, lastDonation: "2026-02-27", donationsCount: 1, matchScore: 61, phone: "98XXXXXX98", verified: false },
    { id: "D-1010", name: "Divya Reddy", bloodGroup: "O+", area: "Gachibowli", city: "Hyderabad", distanceKm: 1.2, available: true, emergencyAvailable: true, lastDonation: "2026-06-02", donationsCount: 7, phone: "98XXXXXX09", matchScore: 97, verified: true  },
    { id: "D-1011", name: "Nikhil Bhatt", bloodGroup: "A+", area: "Satellite", city: "Ahmedabad", distanceKm: 9.4, available: false, emergencyAvailable: false, lastDonation: "2025-12-11", donationsCount: 3, phone: "98XXXXXX11", matchScore: 52, verified: false  },
    { id: "D-1012", name: "Kavya Menon", bloodGroup: "B+", area: "Marine Lines", city: "Mumbai", distanceKm: 3.1, available: true, emergencyAvailable: true, lastDonation: "2026-04-30", donationsCount: 10, phone: "98XXXXXX22", matchScore: 93, verified: true  }
  ];

  const HOSPITALS = [
    { id: "H-201", name: "Sunrise General Hospital", area: "Andheri West", city: "Mumbai", distanceKm: 1.5, phone: "022-XXXX-1201", emergencyAvailable: true, bloodBank: true, lat: 19.1367, lng: 72.8296, status: "active" },
    { id: "H-202", name: "Lotus Multispeciality Hospital", area: "Kothrud", city: "Pune", distanceKm: 3.2, phone: "020-XXXX-1202", emergencyAvailable: true, bloodBank: true, lat: 18.5074, lng: 73.8077, status: "active" },
    { id: "H-203", name: "Riverside Care Hospital", area: "Banjara Hills", city: "Hyderabad", distanceKm: 5.0, phone: "040-XXXX-1203", emergencyAvailable: false, bloodBank: false, lat: 17.4126, lng: 78.4482, status: "active" },
    { id: "H-204", name: "Greenfield City Hospital", area: "Indiranagar", city: "Bengaluru", distanceKm: 2.1, phone: "080-XXXX-1204", emergencyAvailable: true, bloodBank: true, lat: 12.9716, lng: 77.6412, status: "active" },
    { id: "H-205", name: "St. Xavier Trust Hospital", area: "Rajouri Garden", city: "Delhi", distanceKm: 6.4, phone: "011-XXXX-1205", emergencyAvailable: true, bloodBank: false, lat: 28.6469, lng: 77.1225, status: "active" },
    { id: "H-206", name: "Coastline Medical Centre", area: "Adyar", city: "Chennai", distanceKm: 2.8, phone: "044-XXXX-1206", emergencyAvailable: false, bloodBank: true, lat: 13.0067, lng: 80.2570, status: "active" }
  ];

  const BLOOD_REQUESTS = [
    { id: "REQ-58231", patientName: "Amit Kulkarni", bloodGroup: "O+", hospital: "Sunrise General Hospital", area: "Andheri West", city: "Mumbai", units: 2, requiredDate: "2026-09-10", emergencyLevel: "Critical", status: "Searching", createdAt: "2026-09-08T09:12:00", contact: "98XXXXXX01" },
    { id: "REQ-58214", patientName: "Sunita Deshmukh", bloodGroup: "A+", hospital: "Lotus Multispeciality Hospital", area: "Kothrud", city: "Pune", units: 1, requiredDate: "2026-09-09", emergencyLevel: "Urgent", status: "Donor Found", createdAt: "2026-09-07T14:40:00", contact: "98XXXXXX02" },
    { id: "REQ-58190", patientName: "Rakesh Prabhu", bloodGroup: "B+", hospital: "Riverside Care Hospital", area: "Banjara Hills", city: "Hyderabad", units: 3, requiredDate: "2026-09-05", emergencyLevel: "Normal", status: "Completed", createdAt: "2026-09-02T08:05:00", contact: "98XXXXXX03" },
    { id: "REQ-58177", patientName: "Fatima Sheikh", bloodGroup: "O-", hospital: "Greenfield City Hospital", area: "Indiranagar", city: "Bengaluru", units: 2, requiredDate: "2026-09-04", emergencyLevel: "Critical", status: "Accepted", createdAt: "2026-09-01T20:22:00", contact: "98XXXXXX04" },
    { id: "REQ-58150", patientName: "Manoj Tiwari", bloodGroup: "AB+", hospital: "St. Xavier Trust Hospital", area: "Rajouri Garden", city: "Delhi", units: 1, requiredDate: "2026-08-30", emergencyLevel: "Urgent", status: "Cancelled", createdAt: "2026-08-28T11:15:00", contact: "98XXXXXX05" }
  ];

  const NOTIFICATIONS = [
    { id: "N-1", type: "emergency", title: "Critical emergency request nearby", message: "O+ blood needed at Sunrise General Hospital, 1.5 km away.", time: "10 min ago", read: false },
    { id: "N-2", type: "match", title: "You're a match", message: "A requester is looking for A- donors in your area.", time: "1 hr ago", read: false },
    { id: "N-3", type: "accepted", title: "Request accepted", message: "Your blood request REQ-58214 found a donor.", time: "3 hrs ago", read: true },
    { id: "N-4", type: "profile", title: "Profile reminder", message: "Update your availability so nearby requesters can find you.", time: "1 day ago", read: true }
  ];

  const DASHBOARD_STATS = {
    registeredDonors: 24680,
    activeRequests: 132,
    partnerHospitals: 214,
    successfulConnections: 18940
  };

  /**
   * The signed-in demo donor. LifeConnect has no real authentication yet
   * (see login.html's "demo access" block), so every Donor page reads this
   * single fictional profile. Persisted edits are layered on top of these
   * defaults in LCStorage under the "donorProfile" key — see hydration below.
   */
  const CURRENT_DONOR_DEFAULTS = {
    id: "D-1001",
    name: "Rohan Mehta",
    bloodGroup: "O+",
    area: "Andheri West",
    city: "Mumbai",
    email: "rohan.mehta@example.com",
    phone: "98XXXXXX10",
    available: true,
    emergencyAvailable: true,
    lastDonation: "2026-04-12",
    registeredOn: "2025-11-02",
    donationsCount: 6
  };

  const DONATION_HISTORY = [
    { id: "DN-901", date: "2026-04-12", hospital: "Sunrise General Hospital", location: "Andheri West, Mumbai", bloodGroup: "O+", status: "Completed" },
    { id: "DN-887", date: "2026-01-08", hospital: "Lotus Multispeciality Hospital", location: "Kothrud, Pune", bloodGroup: "O+", status: "Completed" },
    { id: "DN-862", date: "2025-10-22", hospital: "Sunrise General Hospital", location: "Andheri West, Mumbai", bloodGroup: "O+", status: "Verified" },
    { id: "DN-840", date: "2025-07-15", hospital: "Greenfield City Hospital", location: "Indiranagar, Bengaluru", bloodGroup: "O+", status: "Completed" },
    { id: "DN-811", date: "2025-04-02", hospital: "St. Xavier Trust Hospital", location: "Rajouri Garden, Delhi", bloodGroup: "O+", status: "Completed" },
    { id: "DN-905", date: "2026-09-25", hospital: "Sunrise General Hospital", location: "Andheri West, Mumbai", bloodGroup: "O+", status: "Scheduled" }
  ];

  /**
   * Blood requests routed to the current donor because their blood group,
   * location or emergency availability matched. Separate from the public
   * BLOOD_REQUESTS list (which represents requester-submitted requests
   * broadcast to the network) — this is the donor's personal inbox view.
   */
  const DONOR_REQUESTS_DEFAULTS = [
    { id: "REQ-77410", bloodGroup: "O+", hospital: "Sunrise General Hospital", location: "Andheri West, Mumbai", requiredDate: "2026-09-11", units: 2, emergencyLevel: "Emergency", status: "Pending", requestDate: "2026-09-08", contact: "98XXXXXX71", notes: "Patient in ICU, surgery scheduled tomorrow morning." },
    { id: "REQ-77398", bloodGroup: "O+", hospital: "Greenfield City Hospital", location: "Indiranagar, Bengaluru", requiredDate: "2026-09-13", units: 1, emergencyLevel: "Urgent", status: "Pending", requestDate: "2026-09-07", contact: "98XXXXXX82", notes: "Scheduled transfusion for ongoing treatment." },
    { id: "REQ-77340", bloodGroup: "O+", hospital: "Lotus Multispeciality Hospital", location: "Kothrud, Pune", requiredDate: "2026-09-06", units: 1, emergencyLevel: "Normal", status: "Accepted", requestDate: "2026-09-02", contact: "98XXXXXX63", notes: "Routine pre-surgery blood bank top-up." },
    { id: "REQ-77299", bloodGroup: "O+", hospital: "St. Xavier Trust Hospital", location: "Rajouri Garden, Delhi", requiredDate: "2026-08-29", units: 2, emergencyLevel: "Normal", status: "Declined", requestDate: "2026-08-26", contact: "98XXXXXX44", notes: "Requester found another donor closer by." }
  ];

  /**
   * Session-only recent-activity feed for the dashboard. Seeded with a few
   * demo entries; new entries are prepended as the donor interacts with the
   * app (accepting a request, updating their profile, etc). Not persisted
   * across reloads — a real backend would serve this as an activity log.
   */
  const RECENT_ACTIVITY_SEED = [
    { icon: "bi-inbox-fill", text: "New blood request received from Sunrise General Hospital.", time: "2 hrs ago" },
    { icon: "bi-check-circle-fill", text: "Accepted a request from Lotus Multispeciality Hospital.", time: "1 day ago" },
    { icon: "bi-droplet-fill", text: "Donation completed at Sunrise General Hospital.", time: "5 days ago" },
    { icon: "bi-person-check", text: "Profile availability updated.", time: "1 week ago" }
  ];
  let RECENT_ACTIVITY = RECENT_ACTIVITY_SEED.slice();

  const USERS = [
    { id: "U-01", name: "Rohan Mehta", role: "Donor", email: "rohan.mehta@example.com", status: "Active", registeredOn: "2025-11-02" },
    { id: "U-02", name: "Sunita Deshmukh", role: "Requester", email: "sunita.d@example.com", status: "Active", registeredOn: "2025-12-19" },
    { id: "U-03", name: "Admin Account", role: "Admin", email: "admin@lifeconnect.example", status: "Active", registeredOn: "2025-08-01" },
    { id: "U-04", name: "Ananya Kulkarni", role: "Donor", email: "ananya.k@example.com", status: "Active", registeredOn: "2026-01-14" },
    { id: "U-05", name: "Karan Malhotra", role: "Requester", email: "karan.m@example.com", status: "Active", registeredOn: "2026-02-08" },
    { id: "U-06", name: "Farhan Sheikh", role: "Donor", email: "farhan.s@example.com", status: "Suspended", registeredOn: "2025-10-30" },
    { id: "U-07", name: "Priya Nair", role: "Requester", email: "priya.n@example.com", status: "Active", registeredOn: "2026-03-22" }
  ];

  /**
   * The signed-in demo requester. Mirrors CURRENT_DONOR_DEFAULTS in shape and
   * intent — see that comment above. Persisted edits layer on top of these
   * defaults in LCStorage under "requesterProfile".
   */
  const CURRENT_REQUESTER_DEFAULTS = {
    id: "RQ-501",
    name: "Sunita Deshmukh",
    email: "sunita.d@example.com",
    phone: "98XXXXXX02",
    city: "Pune",
    registeredOn: "2025-12-19"
  };

  /**
   * Requests the signed-in requester has submitted. Separate from the public
   * BLOOD_REQUESTS broadcast list and from DONOR_REQUESTS (the donor's
   * inbox) — this is "My Requests" for the requester's own dashboard.
   */
  const REQUESTER_REQUESTS_DEFAULTS = [
    { id: "RR-3301", patientName: "Aunt Meena", bloodGroup: "A+", units: 1, hospital: "Lotus Multispeciality Hospital", location: "Kothrud", city: "Pune", requiredDate: "2026-09-06", urgency: "Normal", contact: "98XXXXXX02", message: "Routine pre-surgery blood bank top-up.", status: "Fulfilled", createdAt: "2026-09-02T08:00:00" },
    { id: "RR-3315", patientName: "Grandfather", bloodGroup: "B+", units: 2, hospital: "Riverside Care Hospital", location: "Banjara Hills", city: "Hyderabad", requiredDate: "2026-09-14", urgency: "Urgent", contact: "98XXXXXX02", message: "Scheduled dialysis-related transfusion.", status: "Matching", createdAt: "2026-09-09T10:30:00" },
    { id: "RR-3320", patientName: "Neighbour's son", bloodGroup: "O-", units: 3, hospital: "Greenfield City Hospital", location: "Indiranagar", city: "Bengaluru", requiredDate: "2026-09-12", urgency: "Critical", contact: "98XXXXXX02", message: "Road accident — ICU, needs blood urgently.", status: "Pending", createdAt: "2026-09-10T06:45:00" }
  ];

  /* ------------------------------------------------------------------ */
  /* Mutable state + localStorage hydration                              */
  /* ------------------------------------------------------------------ */
  /*
   * The arrays/objects above are the DEFAULTS shipped with the app. The
   * donor-facing pages need edits (availability toggles, accept/decline,
   * profile saves, read notifications) to survive a page reload, so those
   * three pieces of state are layered with localStorage via LCStorage.
   *
   * Hydration is lazy (ensureHydrated(), called at the top of every donor
   * accessor/mutator) rather than running at file-load time, because
   * mock-data.js is intentionally loaded before storage.js on every page —
   * calling this eagerly would run before LCStorage exists.
   */

  let CURRENT_DONOR = Object.assign({}, CURRENT_DONOR_DEFAULTS);
  let DONOR_REQUESTS = DONOR_REQUESTS_DEFAULTS.map((r) => Object.assign({}, r));
  let CURRENT_REQUESTER = Object.assign({}, CURRENT_REQUESTER_DEFAULTS);
  let REQUESTER_REQUESTS = REQUESTER_REQUESTS_DEFAULTS.map((r) => Object.assign({}, r));
  let hydrated = false;

  function ensureHydrated() {
    if (hydrated) return;
    hydrated = true;
    if (!global.LCStorage) return;

    const savedProfile = global.LCStorage.get("donorProfile", null);
    if (savedProfile) CURRENT_DONOR = Object.assign({}, CURRENT_DONOR_DEFAULTS, savedProfile);

    const savedStatuses = global.LCStorage.get("donorRequestStatuses", null);
    if (savedStatuses) {
      DONOR_REQUESTS.forEach((r) => {
        if (savedStatuses[r.id]) r.status = savedStatuses[r.id];
      });
    }

    const savedReadState = global.LCStorage.get("notificationReadState", null);
    if (savedReadState) {
      NOTIFICATIONS.forEach((n) => {
        if (typeof savedReadState[n.id] === "boolean") n.read = savedReadState[n.id];
      });
    }

    const savedRequesterProfile = global.LCStorage.get("requesterProfile", null);
    if (savedRequesterProfile) CURRENT_REQUESTER = Object.assign({}, CURRENT_REQUESTER_DEFAULTS, savedRequesterProfile);

    const savedRequesterRequests = global.LCStorage.get("requesterRequests", null);
    if (savedRequesterRequests) REQUESTER_REQUESTS = savedRequesterRequests;

    const savedVerification = global.LCStorage.get("adminDonorVerification", null);
    if (savedVerification) {
      DONORS.forEach((d) => {
        if (typeof savedVerification[d.id] === "boolean") d.verified = savedVerification[d.id];
      });
    }

    const savedUserStatus = global.LCStorage.get("adminUserStatus", null);
    if (savedUserStatus) {
      USERS.forEach((u) => {
        if (savedUserStatus[u.id]) u.status = savedUserStatus[u.id];
      });
    }

    const savedRequestOverrides = global.LCStorage.get("adminRequestStatusOverrides", null);
    if (savedRequestOverrides) {
      BLOOD_REQUESTS.forEach((r) => {
        if (savedRequestOverrides[r.id]) r.status = savedRequestOverrides[r.id];
      });
    }
  }

  function persistDonorProfile() {
    if (global.LCStorage) global.LCStorage.set("donorProfile", CURRENT_DONOR);
  }

  function persistRequestStatuses() {
    if (!global.LCStorage) return;
    const map = {};
    DONOR_REQUESTS.forEach((r) => { map[r.id] = r.status; });
    global.LCStorage.set("donorRequestStatuses", map);
  }

  function persistNotificationReadState() {
    if (!global.LCStorage) return;
    const map = {};
    NOTIFICATIONS.forEach((n) => { map[n.id] = n.read; });
    global.LCStorage.set("notificationReadState", map);
  }

  function persistRequesterProfile() {
    if (global.LCStorage) global.LCStorage.set("requesterProfile", CURRENT_REQUESTER);
  }

  function persistRequesterRequests() {
    if (global.LCStorage) global.LCStorage.set("requesterRequests", REQUESTER_REQUESTS);
  }

  function persistDonorVerification() {
    if (!global.LCStorage) return;
    const map = {};
    DONORS.forEach((d) => { map[d.id] = d.verified; });
    global.LCStorage.set("adminDonorVerification", map);
  }

  function persistUserStatus() {
    if (!global.LCStorage) return;
    const map = {};
    USERS.forEach((u) => { map[u.id] = u.status; });
    global.LCStorage.set("adminUserStatus", map);
  }

  function persistRequestOverrides() {
    if (!global.LCStorage) return;
    const map = {};
    BLOOD_REQUESTS.forEach((r) => { map[r.id] = r.status; });
    global.LCStorage.set("adminRequestStatusOverrides", map);
  }

  /* ------------------------------------------------------------------ */
  /* Accessor functions — UI code should only call these                */
  /* ------------------------------------------------------------------ */

  function getDonors(filters) {
    let results = DONORS.slice();
    if (filters) {
      if (filters.bloodGroup) {
        results = results.filter((d) => d.bloodGroup === filters.bloodGroup);
      }
      if (filters.availability === "available") {
        results = results.filter((d) => d.available);
      }
      if (filters.emergencyOnly) {
        results = results.filter((d) => d.emergencyAvailable);
      }
      if (typeof filters.maxDistance === "number") {
        results = results.filter((d) => d.distanceKm <= filters.maxDistance);
      }
      if (filters.location) {
        const q = filters.location.trim().toLowerCase();
        results = results.filter(
          (d) => d.area.toLowerCase().includes(q) || d.city.toLowerCase().includes(q)
        );
      }
    }
    return results;
  }

  function getDonorById(id) {
    return DONORS.find((d) => d.id === id) || null;
  }

  function getBloodRequests(filters) {
    let results = BLOOD_REQUESTS.slice();
    if (filters) {
      if (filters.status) results = results.filter((r) => r.status === filters.status);
      if (filters.bloodGroup) results = results.filter((r) => r.bloodGroup === filters.bloodGroup);
    }
    return results;
  }

  function getHospitals(filters) {
    let results = HOSPITALS.slice();
    if (filters) {
      if (filters.emergencyOnly) results = results.filter((h) => h.emergencyAvailable);
      if (typeof filters.maxDistance === "number") {
        results = results.filter((h) => h.distanceKm <= filters.maxDistance);
      }
      if (filters.location) {
        const q = filters.location.trim().toLowerCase();
        results = results.filter(
          (h) => h.area.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
        );
      }
    }
    return results;
  }

  function getNotifications() {
    ensureHydrated();
    return NOTIFICATIONS.slice();
  }

  function markNotificationRead(id) {
    ensureHydrated();
    const n = NOTIFICATIONS.find((x) => x.id === id);
    if (n) {
      n.read = true;
      persistNotificationReadState();
    }
    return getNotifications();
  }

  function markAllNotificationsRead() {
    ensureHydrated();
    NOTIFICATIONS.forEach((n) => { n.read = true; });
    persistNotificationReadState();
    return getNotifications();
  }

  function getUnreadNotificationCount() {
    ensureHydrated();
    return NOTIFICATIONS.filter((n) => !n.read).length;
  }

  /* ---- Current donor profile ---- */

  function getCurrentDonor() {
    ensureHydrated();
    return Object.assign({}, CURRENT_DONOR);
  }

  function updateDonorProfile(partial) {
    ensureHydrated();
    CURRENT_DONOR = Object.assign({}, CURRENT_DONOR, partial);
    persistDonorProfile();
    return Object.assign({}, CURRENT_DONOR);
  }

  function setCurrentDonorAvailability(available) {
    return updateDonorProfile({ available });
  }

  function updateEmergencyAvailability(available) {
    return updateDonorProfile({ emergencyAvailable: available });
  }

  /* ---- Donation history ---- */

  function getDonationHistory(filters) {
    let results = DONATION_HISTORY.slice();
    if (filters) {
      if (filters.status) results = results.filter((d) => d.status === filters.status);
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        results = results.filter(
          (d) => d.hospital.toLowerCase().includes(q) || d.location.toLowerCase().includes(q)
        );
      }
    }
    results.sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date);
      return filters && filters.sort === "oldest" ? -diff : diff;
    });
    return results;
  }

  /* ---- Blood requests received by the donor ---- */

  function getDonorRequests(filters) {
    ensureHydrated();
    let results = DONOR_REQUESTS.slice();
    if (filters) {
      if (filters.status) results = results.filter((r) => r.status === filters.status);
      if (filters.emergencyLevel) results = results.filter((r) => r.emergencyLevel === filters.emergencyLevel);
    }
    return results;
  }

  function getDonorRequestById(id) {
    ensureHydrated();
    return DONOR_REQUESTS.find((r) => r.id === id) || null;
  }

  function updateBloodRequestStatus(id, status) {
    ensureHydrated();
    const req = DONOR_REQUESTS.find((r) => r.id === id);
    if (!req) return null;
    req.status = status;
    persistRequestStatuses();

    if (status === "Accepted") {
      addRecentActivity("bi-check-circle-fill", `Accepted a request from ${req.hospital}.`);
    } else if (status === "Declined") {
      addRecentActivity("bi-x-circle-fill", `Declined a request from ${req.hospital}.`);
    }
    return Object.assign({}, req);
  }

  /* ---- Recent activity feed (session-only, see comment above) ---- */

  function getRecentActivity() {
    return RECENT_ACTIVITY.slice();
  }

  function addRecentActivity(icon, text) {
    RECENT_ACTIVITY.unshift({ icon, text, time: "Just now" });
    RECENT_ACTIVITY = RECENT_ACTIVITY.slice(0, 6);
    return getRecentActivity();
  }

  /* ---- Donor dashboard statistics (derived, always live) ---- */

  function getDonorDashboardStats() {
    ensureHydrated();
    return {
      totalDonations: CURRENT_DONOR.donationsCount,
      requestsReceived: DONOR_REQUESTS.length,
      requestsAccepted: DONOR_REQUESTS.filter((r) => r.status === "Accepted").length,
      successfulConnections: DONATION_HISTORY.filter((d) => d.status === "Completed").length
    };
  }

  function getDashboardStats() {
    return Object.assign({}, DASHBOARD_STATS);
  }

  /* ------------------------------------------------------------------ */
  /* Requester section (Phase 4)                                         */
  /* ------------------------------------------------------------------ */

  function getCurrentRequester() {
    ensureHydrated();
    return Object.assign({}, CURRENT_REQUESTER);
  }

  function updateRequesterProfile(partial) {
    ensureHydrated();
    CURRENT_REQUESTER = Object.assign({}, CURRENT_REQUESTER, partial);
    persistRequesterProfile();
    return Object.assign({}, CURRENT_REQUESTER);
  }

  function getRequesterRequests(filters) {
    ensureHydrated();
    let results = REQUESTER_REQUESTS.slice();
    if (filters) {
      if (filters.status) results = results.filter((r) => r.status === filters.status);
      if (filters.urgency) results = results.filter((r) => r.urgency === filters.urgency);
    }
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getRequesterRequestById(id) {
    ensureHydrated();
    return REQUESTER_REQUESTS.find((r) => r.id === id) || null;
  }

  /**
   * Creates a new requester-submitted blood request (the "Create Blood
   * Request" form). Frontend-only for now — in production this becomes a
   * POST to a backend endpoint (see README "Phase 5" notes).
   */
  function createRequesterRequest(data) {
    ensureHydrated();
    const id = "RR-" + Math.floor(3000 + Math.random() * 6999);
    const record = Object.assign(
      { id, status: "Pending", createdAt: new Date().toISOString() },
      data
    );
    REQUESTER_REQUESTS.unshift(record);
    persistRequesterRequests();
    return Object.assign({}, record);
  }

  function cancelRequesterRequest(id) {
    ensureHydrated();
    const req = REQUESTER_REQUESTS.find((r) => r.id === id);
    if (!req) return null;
    req.status = "Cancelled";
    persistRequesterRequests();
    return Object.assign({}, req);
  }

  function getRequesterDashboardStats() {
    ensureHydrated();
    return {
      activeRequests: REQUESTER_REQUESTS.filter((r) => r.status === "Pending" || r.status === "Matching").length,
      donorsFound: REQUESTER_REQUESTS.filter((r) => r.status === "Matching" || r.status === "Fulfilled").length,
      successfulRequests: REQUESTER_REQUESTS.filter((r) => r.status === "Fulfilled").length
    };
  }

  /* ------------------------------------------------------------------ */
  /* Admin section (Phase 4) — frontend-only demo controls, see README   */
  /* ------------------------------------------------------------------ */

  function getAdminStats() {
    ensureHydrated();
    return {
      totalDonors: DONORS.length,
      totalRequesters: USERS.filter((u) => u.role === "Requester").length,
      activeRequests: BLOOD_REQUESTS.filter((r) => ["Searching", "Donor Found", "Accepted"].includes(r.status)).length,
      completedRequests: BLOOD_REQUESTS.filter((r) => r.status === "Completed").length,
      pendingVerification: DONORS.filter((d) => !d.verified).length
    };
  }

  function getAdminDonors(filters) {
    ensureHydrated();
    let results = DONORS.slice();
    if (filters) {
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        results = results.filter((d) => d.name.toLowerCase().includes(q) || d.area.toLowerCase().includes(q) || d.city.toLowerCase().includes(q));
      }
      if (filters.bloodGroup) results = results.filter((d) => d.bloodGroup === filters.bloodGroup);
      if (filters.verified === "verified") results = results.filter((d) => d.verified);
      if (filters.verified === "unverified") results = results.filter((d) => !d.verified);
    }
    return results;
  }

  function getAdminUsers(filters) {
    ensureHydrated();
    let results = USERS.slice();
    if (filters) {
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        results = results.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
      }
      if (filters.role) results = results.filter((u) => u.role === filters.role);
      if (filters.status) results = results.filter((u) => u.status === filters.status);
    }
    return results;
  }

  function getAdminRequests(filters) {
    ensureHydrated();
    let results = BLOOD_REQUESTS.slice();
    if (filters) {
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        results = results.filter((r) => r.id.toLowerCase().includes(q) || r.hospital.toLowerCase().includes(q) || r.patientName.toLowerCase().includes(q));
      }
      if (filters.status) results = results.filter((r) => r.status === filters.status);
      if (filters.emergencyLevel) results = results.filter((r) => r.emergencyLevel === filters.emergencyLevel);
    }
    return results;
  }

  function getAdminHospitals(filters) {
    return getHospitals(filters);
  }

  function adminVerifyDonor(id) {
    ensureHydrated();
    const donor = getDonorById(id);
    if (!donor) return null;
    donor.verified = true;
    persistDonorVerification();
    return Object.assign({}, donor);
  }

  function adminSetUserStatus(id, status) {
    ensureHydrated();
    const user = USERS.find((u) => u.id === id);
    if (!user) return null;
    user.status = status;
    persistUserStatus();
    return Object.assign({}, user);
  }

  function adminUpdateRequestStatus(id, status) {
    ensureHydrated();
    const req = BLOOD_REQUESTS.find((r) => r.id === id);
    if (!req) return null;
    req.status = status;
    persistRequestOverrides();
    return Object.assign({}, req);
  }

  function getUsers() {
    return USERS.slice();
  }

  function getBloodGroups() {
    return BLOOD_GROUPS.slice();
  }

  /**
   * Creates a new blood request from form input and returns the fictional
   * record, including a generated request ID. In production this becomes
   * a POST request to the backend.
   */
  function createBloodRequest(data) {
    const id = "REQ-" + Math.floor(50000 + Math.random() * 9000);
    const record = Object.assign(
      {
        id,
        status: "Searching",
        createdAt: new Date().toISOString()
      },
      data
    );
    BLOOD_REQUESTS.unshift(record);
    return record;
  }

  function updateDonorAvailability(donorId, available) {
    const donor = getDonorById(donorId);
    if (donor) donor.available = available;
    return donor;
  }

  global.LCData = {
    getDonors,
    getDonorById,
    getBloodRequests,
    getHospitals,
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadNotificationCount,
    getDashboardStats,
    getUsers,
    getBloodGroups,
    createBloodRequest,
    updateDonorAvailability,
    // Donor section (Phase 2)
    getCurrentDonor,
    updateDonorProfile,
    setCurrentDonorAvailability,
    updateEmergencyAvailability,
    getDonationHistory,
    getDonorRequests,
    getDonorRequestById,
    updateBloodRequestStatus,
    getRecentActivity,
    addRecentActivity,
    getDonorDashboardStats,
    // Requester section (Phase 4)
    getCurrentRequester,
    updateRequesterProfile,
    getRequesterRequests,
    getRequesterRequestById,
    createRequesterRequest,
    cancelRequesterRequest,
    getRequesterDashboardStats,
    // Admin section (Phase 4 — frontend-only demo controls)
    getAdminStats,
    getAdminDonors,
    getAdminUsers,
    getAdminRequests,
    getAdminHospitals,
    adminVerifyDonor,
    adminSetUserStatus,
    adminUpdateRequestStatus
  };
})(window);
