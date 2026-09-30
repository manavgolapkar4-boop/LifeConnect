// Firebase SDK
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// LifeConnect Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAERDLVqLwbStZYYUG_6QKDgJSV0StQ2js",
  authDomain: "life-connect-eb1b6.firebaseapp.com",
  projectId: "life-connect-eb1b6",
  storageBucket: "life-connect-eb1b6.firebasestorage.app",
  messagingSenderId: "775308433608",
  appId: "1:775308433608:web:ae6a50c5bcf19e13fdadfd",
  measurementId: "G-KR9PCPG48B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

export { app, auth, db };