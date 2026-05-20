import { html } from '../jsx.js';
import {MapPin, Navigation, Clock3, Phone} from 'https://esm.sh/lucide-react?deps=react@19.2.0';

export function VisitSection() {
  return html`
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-md)] sm:p-8">
          <div className="section-kicker">Visit Us</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Find the glow at Via delle Sette Lune 14.</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[hsl(var(--foreground)/0.74)]">
            <div className="flex gap-3"><${MapPin} size=${18} /> <span>Via delle Sette Lune 14, Trastevere-inspired dining quarter, open nightly for dinner service.</span></div>
            <div className="flex gap-3"><${Clock3} size=${18} /> <span>Mon–Thu 5:30 PM–10:00 PM • Fri–Sun 5:00 PM–11:00 PM</span></div>
            <div className="flex gap-3"><${Phone} size=${18} /> <span>Reservations desk: +39 06 4827 1148</span></div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Via+delle+Sette+Lune+14+Rome" className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition hover:-translate-y-0.5"><${Navigation} size=${16} /> Open in Google Maps</a>
            <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/dir/?api=1&destination=Via+delle+Sette+Lune+14+Rome" className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.76)] px-5 py-3 text-sm font-medium transition hover:bg-[hsl(var(--secondary)/0.55)]">Get Directions</a>
          </div>
        </div>

        <div className="fade-in overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-lg)]">
          <div className="map-card relative min-h-[360px] rounded-[calc(var(--radius-lg)-0.35rem)] border border-[hsl(var(--border))] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.4),hsl(var(--background)))] p-6">
            <div className="absolute left-[18%] top-[22%] h-20 w-20 rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.5)]"></div>
            <div className="absolute left-[52%] top-[18%] h-28 w-28 rounded-[2rem] border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--primary)/0.08)]"></div>
            <div className="absolute left-[28%] top-[52%] h-32 w-32 rounded-[2rem] border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--secondary)/0.45)]"></div>
            <div className="absolute left-[63%] top-[58%] h-16 w-16 rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.65)]"></div>
            <div className="absolute inset-0 opacity-70" style=${{ backgroundImage: 'linear-gradient(hsl(var(--border)/0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)/0.35) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white shadow-[var(--shadow-lg)]">🍝</div>
              <div className="mt-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.92)] px-4 py-2 text-sm shadow-[var(--shadow-sm)]">Roma Candlelight</div>
            </div>
            <div className="absolute bottom-4 right-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.92)] p-3 text-sm shadow-[var(--shadow-sm)]">
              <div className="font-medium">8 minutes from central tram stop</div>
              <div className="text-[hsl(var(--foreground)/0.65)]">Street parking after 7 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}