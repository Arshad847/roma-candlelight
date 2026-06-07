import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import { Lock, LogOut, RefreshCcw, Users, Calendar, Mail, Phone, MapPin } from 'https://esm.sh/lucide-react?deps=react@19.2.0';

const SUPABASE_URL = 'https://hyvwamfyqtjvihrbcjhx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dndhbWZ5cXRqdmlocmJjamh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDM2NjMsImV4cCI6MjA5MjUxOTY2M30.M1LOmY9QmfRH200KPVyfpTMdj7lm5Y1bWEks8kylfIE';

export function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [reservations, setReservations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/reservations?select=*&order=timestamp.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
      alert('Error loading reservations. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'roma2024') {
      setIsLoggedIn(true);
      fetchReservations();
    } else {
      alert('Incorrect password. Access denied.');
    }
  };

  if (!isLoggedIn) {
    return html`
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-32">
        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[var(--shadow-lg)]">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
              <${Lock} size=${24} />
            </div>
            <h2 className="font-serif text-3xl">Restaurant Staff</h2>
            <p className="mt-2 text-sm text-[hsl(var(--foreground)/0.65)]">Enter password to access dashboard</p>
          </div>
          <form onSubmit=${handleLogin} className="space-y-4">
            <input 
              type="password" 
              value=${password} 
              onInput=${(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]"
            />
            <button className="w-full rounded-full bg-[hsl(var(--primary))] py-3 font-semibold text-white shadow-[var(--shadow-md)] transition hover:-translate-y-0.5">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </section>
    `;
  }

  return html`
    <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
      <div className="fade-in mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="section-kicker">Management Portal</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Tonight’s Ledger</h2>
        </div>
        <div className="flex gap-3">
          <button onClick=${fetchReservations} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm transition hover:bg-[hsl(var(--secondary)/0.5)]">
            <${RefreshCcw} size=${16} className=${loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick=${() => setIsLoggedIn(false)} className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--muted))] px-4 py-2 text-sm transition hover:bg-[hsl(var(--destructive)/0.1)] hover:text-[hsl(var(--destructive))]">
            <${LogOut} size=${16} /> Logout
          </button>
        </div>
      </div>

      <div className="fade-in overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-md)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] text-xs uppercase tracking-widest text-[hsl(var(--foreground)/0.6)]">
              <tr>
                <th className="px-6 py-4 font-medium">Guest Details</th>
                <th className="px-6 py-4 font-medium">Party</th>
                <th className="px-6 py-4 font-medium">Time / Table</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Booked At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border)/0.5)]">
              ${reservations.map((res) => html`
                <tr key=${res.id} className="transition hover:bg-[hsl(var(--secondary)/0.15)]">
                  <td className="px-6 py-4">
                    <div className="font-serif text-lg text-[hsl(var(--foreground))]">${res.customer_name}</div>
                    <div className="mt-1 flex flex-col gap-1 text-xs text-[hsl(var(--foreground)/0.6)]">
                      <span className="flex items-center gap-1"><${Mail} size=${12} /> ${res.customer_email}</span>
                      <span className="flex items-center gap-1"><${Phone} size=${12} /> ${res.customer_phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-[hsl(var(--primary))] font-medium">
                      <${Users} size=${14} /> ${res.number_of_guests}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium"><${Calendar} size=${14} /> ${res.selected_time}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[hsl(var(--foreground)/0.6)]"><${MapPin} size=${12} /> ${res.selected_table_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className=${`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${res.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      ${res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-[hsl(var(--foreground)/0.5)]">
                    ${new Date(res.created_at || res.timestamp).toLocaleString()}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
          ${!loading && reservations.length === 0 && html`
            <div className="py-20 text-center">
              <div className="font-serif text-2xl">The ledger is empty today.</div>
              <p className="mt-2 text-[hsl(var(--foreground)/0.5)]">New reservations will appear here once guests book.</p>
            </div>
          `}
        </div>
      </div>
    </section>
  `;
}