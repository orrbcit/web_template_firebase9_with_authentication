// src/authentication.js
// -------------------------------------------------------------
// This file contains all Firebase Authentication logic.
// It imports the Firebase "auth" instance (from firebaseConfig.js)
// and provides reusable functions for:
//   - Logging in users
//   - Signing up new users
//   - Logging out
//   - Checking user authentication state
//
// These functions can be imported and used across your pages.
// -------------------------------------------------------------

// Import the initialized Firebase Authentication object
import { auth } from "/src/firebaseConfig.js";

// Import specific functions from the Firebase Auth SDK
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// -------------------------------------------------------------
// loginUser(email, password)
// -------------------------------------------------------------
// Logs an existing user into Firebase Authentication.
//
// Parameters:
//   email (string)    - user's email
//   password (string) - user's password
//
// Returns: Promise resolving to the user credential object.
// Usage:
//   await loginUser("user@example.com", "password123");
// -------------------------------------------------------------
export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// -------------------------------------------------------------
// signupUser(name, email, password)
// -------------------------------------------------------------
// Creates a new user account with Firebase Authentication,
// then updates the user's profile with a display name.
//
// Parameters:
//   name (string)     - user's display name
//   email (string)    - user's email
//   password (string) - user's password
//
// Returns: the created user object.
// Usage:
//   const user = await signupUser("Alice", "alice@email.com", "secret");
// -------------------------------------------------------------
export async function signupUser(name, email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
}

// -------------------------------------------------------------
// logoutUser()
// -------------------------------------------------------------
// Signs out the currently logged-in user and redirects them
// back to the login page (index.html).
//
// Usage:
//   await logoutUser();
// -------------------------------------------------------------
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html";
}

// -------------------------------------------------------------
// checkAuthState()
// -------------------------------------------------------------
// Observes changes in the user's authentication state (login/logout)
// and updates the UI or redirects accordingly.
//
// If the user is on "main.html":
//   - If logged in → displays "Hello, [Name]!"
//   - If not logged in → redirects to "index.html"
//
// This function should be called once when the page loads.
//
// Usage:
//   checkAuthState();
// -------------------------------------------------------------
export function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (window.location.pathname.endsWith("main.html")) {
      if (user) {
        const displayName = user.displayName || user.email;
        $("#welcomeMessage").text(`Hello, ${displayName}!`);
      } else {
        window.location.href = "index.html";
      }
    }
  });
}

export function onAuthReady(callback) {
  // Runs callback with (user) when Firebase resolves auth state
  return onAuthStateChanged(auth, callback);
}

// Converts Firebase Auth error codes to readable messages
export function authErrorMessage(error) {
  const code = (error?.code || "").toLowerCase();

  const map = {
    "auth/invalid-credential": "Wrong email or password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/email-already-in-use": "That email address is already in use.",
    "auth/weak-password": "Please choose a stronger password (at least 6 characters).",
    "auth/missing-password": "Password cannot be empty.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
  };

  // Return the mapped message, or a generic fallback
  return map[code] || "Something went wrong. Please try again.";
}

