import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import { reviews } from '../data.js';
import {ChevronLeft, ChevronRight, Star} from 'https://esm.sh/lucide-react?deps=react@19.2.0';

export function ReviewsSection() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  const current = reviews[index];

  return html`
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--secondary)/0.24))] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker">Guest Reviews</div>
            <h2 className="font-serif text-4xl sm:text-5xl">Guests leave with stories, not just receipts.</h2>
          </div>
          <div className="flex gap-2">
            <button onClick=${() => setIndex((index - 1 + reviews.length) % reviews.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] transition hover:bg-[hsl(var(--secondary)/0.55)]"><${ChevronLeft} size=${18} /></button>
            <button onClick=${() => setIndex((index + 1) % reviews.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] transition hover:bg-[hsl(var(--secondary)/0.55)]"><${ChevronRight} size=${18} /></button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-center">
          <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.78)] p-6 shadow-[var(--shadow-sm)]">
            <div className="mb-4 flex gap-1 text-[hsl(var(--primary))]">
              ${Array.from({ length: current.rating }).map((_, starIndex) => html`<${Star} key=${starIndex} size=${18} fill="currentColor" />`)}
            </div>
            <blockquote className="font-serif text-3xl leading-tight sm:text-4xl">“${current.text}”</blockquote>
            <div className="mt-5 text-sm text-[hsl(var(--foreground)/0.72)]">${current.name} • ${current.detail}</div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            ${reviews.map((review, reviewIndex) => html`
              <button key=${review.id} onClick=${() => setIndex(reviewIndex)} className=${`rounded-2xl border p-4 text-left transition ${reviewIndex === index ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.12)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]'}`}>
                <div className="font-medium">${review.name}</div>
                <div className="mt-1 text-sm text-[hsl(var(--foreground)/0.68)]">${review.detail}</div>
              </button>
            `)}
          </div>
        </div>
      </div>
    </section>
  `;
}