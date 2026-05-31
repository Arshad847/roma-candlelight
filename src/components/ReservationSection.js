import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import { reservationsSeed } from '../data.js';
import {CheckCircle2, Clock3, PartyPopper, MapPinHouse, Mail, Phone} from 'https://esm.sh/lucide-react?deps=react@19.2.0';
import { addBooking } from '../main.js';

function levelLabel(level) {
  if (level === 'peak') return 'Peak';
  if (level === 'steady') return 'Steady';
  return 'Calm';
}

function levelClass(level) {
  if (level === 'peak') return 'bg-[hsl(var(--primary)/0.14)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.28)]';
  if (level === 'steady') return 'bg-[hsl(var(--secondary)/0.7)] text-[hsl(var(--foreground))] border-[hsl(var(--border))]';
  return 'bg-[hsl(var(--muted)/0.75)] text-[hsl(var(--foreground))] border-[hsl(var(--border))]';
}

export function ReservationSection({ standalone = false, compactTop = false }) {
  const [timeId, setTimeId] = React.useState('t3');
  const [tableId, setTableId] = React.useState('E5');
  const [guestName, setGuestName] = React.useState('Giulia Rossi');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [guests, setGuests] = React.useState(2);
  const [note, setNote] = React.useState('Quiet corner if available');
  const [selectedExtras, setSelectedExtras] = React.useState(['Anniversary prosecco chill']);
  const [loading, setLoading] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const selectedTime = reservationsSeed.times.find((time) => time.id === timeId);
  const selectedTable = reservationsSeed.tables.find((table) => table.id === tableId);

  const toggleExtra = (extra) => {
    setSelectedExtras((current) => current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra]);
  };

  if (confirmed) {
    return html`
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <div className="fade-in flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] shadow-[var(--shadow-lg)]">
            <${CheckCircle2} size=${40} />
          </div>
          <h2 className="font-serif text-5xl">Ci vediamo presto, ${guestName.split(' ')[0]}.</h2>
          <p className="mt-4 text-lg text-[hsl(var(--foreground)/0.72)]">Your table at <strong>${selectedTime.time}</strong> is secured. A confirmation has been sent to your email.</p>
          <div className="mt-8 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-left">
            <div className="text-sm uppercase tracking-widest text-[hsl(var(--foreground)/0.5)]">Reservation Reference</div>
            <div className="mt-2 font-mono text-xl uppercase tracking-tighter">${Math.random().toString(36).substr(2, 9)}</div>
          </div>
          <button onClick=${() => window.location.hash = '#/home'} className="mt-10 text-sm font-medium underline underline-offset-4">Return to Home</button>
        </div>
      </section>
    `;
  }

  const submitReservation = async () => {
    setLoading(true);
    const reservationData = {
      customer_name: guestName,
      customer_email: email,
      customer_phone: phone,
      number_of_guests: guests,
      reservation_note: note,
      selected_time_id: timeId,
      selected_time: selectedTime?.time || 'N/A',
      selected_table_id: tableId,
      selected_table_name: selectedTable?.spot || 'N/A',
      extras: selectedExtras,
      status: "pending", 
      timestamp: new Date().toISOString()
    };

    try {
      await addBooking(reservationData);
      setConfirmed(true);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to make reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return html`
    <section className=${`mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 ${standalone ? 'pt-12' : compactTop ? 'pt-8' : 'pt-20'}`}>
      <div className="fade-in mb-8 max-w-3xl">
        <div className="section-kicker">Live Reservations</div>
        <h2 className="font-serif text-4xl sm:text-5xl">Choose your table like you’re already inside.</h2>
        <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground)/0.72)]">See tonight’s rhythm at a glance, pick the exact table mood you want, add a celebration touch, and receive an instant confirmation flourish.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--secondary)/0.18))] p-5 shadow-[var(--shadow-md)] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--foreground)/0.55)]">${reservationsSeed.date}</div>
              <div className="font-serif text-3xl">Dining Room Map</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1.5 text-sm text-[hsl(var(--primary))]"><${Clock3} size=${15} /> Instant confirmation</div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            ${reservationsSeed.times.map((slot) => html`
              <button key=${slot.id} onClick=${() => setTimeId(slot.id)} className=${`rounded-2xl border p-3 text-left transition ${timeId === slot.id ? 'border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.12)] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--background)/0.7)] hover:bg-[hsl(var(--secondary)/0.5)]'}`}>
                <div className="font-medium">${slot.time}</div>
                <div className=${`mt-2 inline-flex rounded-full border px-2 py-1 text-xs ${levelClass(slot.level)}`}>${levelLabel(slot.level)}</div>
              </button>
            `)}
          </div>

          <div className="mt-6 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.68)] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-[hsl(var(--foreground)/0.72)]"><${MapPinHouse} size=${15} /> Select your preferred table</div>
            <div className="table-grid">
              ${reservationsSeed.tables.map((table) => html`
                <button key=${table.id} onClick=${() => setTableId(table.id)} className=${`table-tile ${tableId === table.id ? 'table-selected' : ''}`}>
                  <div className="font-serif text-2xl">${table.id}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--foreground)/0.55)]">${table.seats} seats</div>
                  <div className="mt-2 text-sm font-medium">${table.spot}</div>
                  <div className="mt-1 text-xs text-[hsl(var(--foreground)/0.68)]">${table.mood}</div>
                </button>
              `)}
            </div>
          </div>
        </div>

        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[var(--shadow-lg)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="section-kicker">Reservation Details</div>
              <div className="font-serif text-3xl">Confirm your evening</div>
            </div>
            <div className="rounded-full bg-[hsl(var(--secondary)/0.6)] px-3 py-1 text-sm">${selectedTime.time}</div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[hsl(var(--foreground)/0.72)]">Guest name</span>
              <input value=${guestName} onInput=${(e) => setGuestName(e.target.value)} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[hsl(var(--foreground)/0.72)]">Email Address</span>
              <input type="email" value=${email} onInput=${(e) => setEmail(e.target.value)} placeholder="giulia@example.it" className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]" />
            </label>
          </div>
          
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[hsl(var(--foreground)/0.72)]">Phone Number</span>
              <input type="tel" value=${phone} onInput=${(e) => setPhone(e.target.value)} placeholder="+39 ..." className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[hsl(var(--foreground)/0.72)]">Party size</span>
              <select value=${String(guests)} onChange=${(e) => setGuests(Number(e.target.value))} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]">
                ${[2, 3, 4, 5, 6].map((count) => html`<option key=${count} value=${String(count)}>${count} guests</option>`)}
              </select>
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="text-[hsl(var(--foreground)/0.72)]">Special request</span>
            <textarea value=${note} onInput=${(e) => setNote(e.target.value)} rows="3" className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] px-4 py-3 outline-none transition focus:border-[hsl(var(--primary)/0.45)]"></textarea>
          </label>

          <div className="mt-5">
            <div className="mb-3 inline-flex items-center gap-2 text-sm text-[hsl(var(--foreground)/0.72)]"><${PartyPopper} size=${15} /> Special occasion add-ons</div>
            <div className="flex flex-wrap gap-2">
              ${reservationsSeed.extras.map((extra) => html`
                <button key=${extra} onClick=${() => toggleExtra(extra)} className=${`rounded-full border px-4 py-2 text-sm transition ${selectedExtras.includes(extra) ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--background)/0.7)] text-[hsl(var(--foreground))]'}`}>
                  ${extra}
                </button>
              `)}
            </div>
          </div>

          <div className="mt-6 rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.35),hsl(var(--background)/0.7))] p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--foreground)/0.58)]">Reservation summary</div>
            <div className="mt-2 font-serif text-2xl">${guestName}</div>
            <div className="mt-2 text-sm text-[hsl(var(--foreground)/0.75)]">${guests} guests • ${selectedTime.time} • Table ${selectedTable.id} — ${selectedTable.spot}</div>
            <div className="mt-1 text-sm text-[hsl(var(--foreground)/0.68)]">Room energy: ${levelLabel(selectedTime.level)} • Extras: ${selectedExtras.length ? selectedExtras.join(', ') : 'None selected'}</div>
          </div>

          <button 
            id="submitReservationButton"
            disabled=${loading || !guestName.trim() || !email.trim()} 
            onClick=${submitReservation} 
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            ${loading ? 'Securing your table...' : 'Confirm Reservation'}
          </button>

          ${!guestName.trim() || !email.trim() ? html`
            <div className="mt-3 rounded-2xl border border-dashed border-[hsl(var(--border))] p-3 text-sm text-[hsl(var(--foreground)/0.65)]">Add the guest name to complete the reservation.</div>
          ` : null}
        </div>
      </div>
    </section>
  `;
}