import { html } from '../jsx.js';
import {Play, Sparkles, Music4} from 'https://esm.sh/lucide-react?deps=react@19.2.0';

export function Hero() {
  return html`
    <section className="relative overflow-hidden border-b border-[hsl(var(--border)/0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_38%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.16),transparent_28%)]"></div>
      <div className="hero-film absolute inset-0"></div>
      <div className="hero-overlay absolute inset-0"></div>
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pb-16">
        <div className="fade-in max-w-3xl rounded-[calc(var(--radius-lg)+0.5rem)] border border-[hsl(var(--border)/0.55)] bg-[hsl(var(--background)/0.38)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card)/0.75)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[hsl(var(--foreground)/0.72)]">
            <${Music4} size=${14} /> Accordions at dusk • Jazz after eight
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">Step into a Roman trattoria lit by flame, flour, and old songs.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">Slow-motion pasta ribbons, wood-fired blistered crusts, and a dining room washed in terracotta glow. Reserve for tonight, browse chef notes by region, and linger over wine pairings chosen for every course.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#/reserve" className="glow-cta inline-flex items-center justify-center rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lg)] transition hover:-translate-y-1">Reserve a Table</a>
            <a href="#/menu" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/16">
              <${Play} size=${16} /> Explore the Menu
            </a>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/85">
              <div className="text-xs uppercase tracking-[0.26em] text-white/55">Signature</div>
              <div className="mt-1 font-serif text-2xl">Tonnarelli Cacio e Pepe</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/85">
              <div className="text-xs uppercase tracking-[0.26em] text-white/55">Tonight’s vibe</div>
              <div className="mt-1 font-serif text-2xl">Candlelit • Brass • Warm brick</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/85">
              <div className="text-xs uppercase tracking-[0.26em] text-white/55">Best seats</div>
              <div className="mt-1 font-serif text-2xl">Wine cellar nook</div>
            </div>
          </div>
        </div>

        <div className="mt-8 fade-in grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--card)/0.8)] p-5 shadow-[var(--shadow-md)] backdrop-blur-md">
            <div className="mb-2 inline-flex rounded-full bg-[hsl(var(--primary)/0.12)] p-2 text-[hsl(var(--primary))]"><${Sparkles} size=${16} /></div>
            <div className="font-serif text-2xl">Wood-fired cinema</div>
            <p className="mt-2 text-sm text-[hsl(var(--foreground)/0.7)]">Animated firelight and faux-film movement recreate the rhythm of a live kitchen.</p>
          </div>
          <div className="rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--card)/0.8)] p-5 shadow-[var(--shadow-md)] backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--foreground)/0.55)]">Microinteraction</div>
            <div className="mt-1 font-serif text-2xl">Accordion pulse</div>
            <p className="mt-2 text-sm text-[hsl(var(--foreground)/0.7)]">Buttons glow and breathe gently, like music passing through the room.</p>
          </div>
          <div className="rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--card)/0.8)] p-5 shadow-[var(--shadow-md)] backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--foreground)/0.55)]">Guest favorite</div>
            <div className="mt-1 font-serif text-2xl">Peak-time guidance</div>
            <p className="mt-2 text-sm text-[hsl(var(--foreground)/0.7)]">Choose a lively prime hour or settle into a quieter late dinner seating.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}