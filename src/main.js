import React from 'https://esm.sh/react@19.2.0';
import ReactDOM from 'https://esm.sh/react-dom@19.2.0/client?deps=react@19.2.0';
import { html } from './jsx.js';
import { Providers } from './mainProviders.js';
import { App } from './App.js';

// Supabase credentials for roma-candlelight project
const SUPABASE_URL = 'https://hyvwamfyqtjvihrbcjhx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dndhbWZ5cXRqdmlocmJjamh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDM2NjMsImV4cCI6MjA5MjUxOTY2M30.M1LOmY9QmfRH200KPVyfpTMdj7lm5Y1bWEks8kylfIE';

/**
 * Function to add a booking to Supabase.
 */
export async function addBooking(data = null) {
  const bookingData = data || {
    customer_name: "Test Guest",
    customer_email: "test@example.com",
    customer_phone: "+39 000 000 000",
    number_of_guests: 2,
    reservation_note: "Test booking",
    selected_time_id: "t1",
    selected_time: "20:00",
    selected_table_id: "A1",
    selected_table_name: "Test Table",
    extras: [],
    status: "pending"
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    console.log("Reservation successfully saved to Supabase!");

    if (!data) {
      alert("Success! Test reservation saved to Supabase!");
    }

  } catch (e) {
    console.error("Supabase Error:", e);
    if (!data) {
      alert("Failed to save reservation: " + e.message);
    }
    throw e;
  }
}

// Expose functions globally
window.addBooking = addBooking;

ReactDOM.createRoot(document.getElementById('root')).render(
  html`<${Providers}><${App} /></${Providers}>`
);