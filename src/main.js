import React from 'https://esm.sh/react@19.2.0';
import ReactDOM from 'https://esm.sh/react-dom@19.2.0/client?deps=react@19.2.0';
import { html } from './jsx.js';
import { Providers } from './mainProviders.js';
import { App } from './App.js';

// Firebase SDK imports from esm.sh for better compatibility in ESM environments
import { initializeApp } from "https://esm.sh/firebase@11.1.0/app";
import { getAnalytics } from "https://esm.sh/firebase@11.1.0/analytics";
import { getDatabase, ref, push, set } from "https://esm.sh/firebase@11.1.0/database";

// Firebase credentials for roma-candelia project
const firebaseConfig = {
  apiKey: "AIzaSyAijw0yYDJTBPYtcWPm1OAGzWwurWHlnRU",
  authDomain: "roma-candelia.firebaseapp.com",
  databaseURL: "https://roma-candelia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roma-candelia",
  storageBucket: "roma-candelia.firebasestorage.app",
  messagingSenderId: "797525250869",
  appId: "1:797525250869:web:da5b7e4d478648905d727c",
  measurementId: "G-ZM3CCR0E35"
};

let database = null;
let analytics = null;

try {
  const app = initializeApp(firebaseConfig);
  
  // Initialize Database using the explicit URL for the regional instance
  database = getDatabase(app, firebaseConfig.databaseURL);
  
  // Initialize Analytics
  try {
    analytics = getAnalytics(app);
  } catch (analyticsError) {
    console.warn("Firebase Analytics could not be initialized:", analyticsError);
  }
} catch (e) {
  console.error("Firebase initialization failed:", e);
}

/**
 * Generic function to add a booking to the Realtime Database.
 * Directly writes to the live Firebase instance.
 */
export async function addBooking(data = null) {
  if (!database) {
    const error = new Error("Database not initialized. Check Firebase configuration.");
    console.error(error);
    throw error;
  }

  try {
    // Reference the 'reservations' node
    const reservationsListRef = ref(database, 'reservations');
    
    // Create a new location with a unique key
    const newReservationRef = push(reservationsListRef);
    
    const bookingData = data || {
      customerName: "Test Guest",
      date: "Tonight",
      time: "20:00",
      guests: 2,
      status: "pending",
      table: "T-TEST",
      timestamp: new Date().toISOString(),
      isTest: true
    };

    // Attempt to write the data
    await set(newReservationRef, bookingData);
    console.log("Reservation successfully recorded. ID:", newReservationRef.key);
    
    // Feedback for the 'Test Backend' button
    if (!data) {
      alert("Success! Real reservation added to Firebase.\nPath: /reservations/" + newReservationRef.key);
    }
    
    return newReservationRef.key;
  } catch (e) {
    console.error("Firebase Database Error:", e);
    
    // User-friendly feedback for write failures (often security rules)
    if (!data) {
       alert("Database Write Failed: " + e.message + "\n\nPlease ensure your Security Rules are set to test mode.");
    }
    throw e;
  }
}

// Attach listener to the test button in index.html
const testButton = document.getElementById('testBackendButton');
if (testButton) {
  testButton.addEventListener('click', () => {
    addBooking().catch(err => {
      console.error("Test booking failed:", err);
    });
  });
}

// Expose functions globally for legacy or external access
window.addBooking = addBooking;
window.addTestBooking = addBooking;
export const addTestBooking = addBooking;

ReactDOM.createRoot(document.getElementById('root')).render(
  html`<${Providers}><${App} /></${Providers}>`
);