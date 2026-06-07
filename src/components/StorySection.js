import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import { storyCards, galleryCards, reviews } from '../data.js';
import { ChevronLeft, ChevronRight, Star } from 'https://esm.sh/lucide-react?deps=react@19.2.0';

export function StorySection() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  const currentReview = reviews[index];

  return html`
    <div className="flex flex-col gap-14 pt-32 pb-14">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(160deg,hsl(var(--secondary)/0.42),hsl(var(--card)))] p-6 shadow-[var(--shadow-md)] sm:p-10">
          <div className="max-w-3xl">
            <div className="section-kicker">House Story</div>
            <h2 className="font-serif text-4xl sm:text-6xl">Family recipes carried across decades, then plated for now.</h2>
            <p className="mt-6 text-base leading-8 text-[hsl(var(--foreground)/0.74)]">Roma Candlelight is imagined as a room where inherited recipes meet a modern dining rhythm. The result is warm and cinematic rather than theatrical: parchment menus, brass glow, flour-dusted prep, and dishes allowed to speak clearly.</p>
            <div className="postcard mt-8 max-w-xl rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-sm)]">
              <div className="font-serif text-3xl italic">From Nonna Livia’s notebook</div>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground)/0.8)]">“Pepper first, then patience. Pasta listens when water rolls hard and the sauce waits kindly. Never rush the ragù; it has stories to tell.”</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          ${storyCards.map((card) => html`
            <article key=${card.id} className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--secondary)/0.15))] p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
              <div className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--primary))]">${card.eyebrow}</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight">${card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[hsl(var(--foreground)/0.74)]">${card.text}</p>
            </article>
          `)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in mb-8 max-w-3xl">
          <div className="section-kicker">Atmosphere</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Vintage Postcard Album</h2>
          <p className="mt-3 text-sm text-[hsl(var(--foreground)/0.72)]">Each frame is styled like a keepsake card mailed home after one unforgettable supper in Rome.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          ${galleryCards.map((card, index) => html`
            <article key=${card.id} className=${`fade-in postcard rotate-${(index % 4) + 1} rounded-[var(--radius-lg)] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[var(--shadow-lg)]`}>
              <div className="gallery-art overflow-hidden bg-[hsl(var(--muted)/0.3)]">
                <img src=${card.image} alt=${card.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl">${card.title}</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--foreground)/0.72)]">${card.note}</p>
                </div>
                <div className="stamp">${card.stamp}</div>
              </div>
            </article>
          `)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--secondary)/0.24))] p-6 shadow-[var(--shadow-md)] sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="section-kicker">Guest Reviews</div>
              <h2 className="font-serif text-4xl sm:text-5xl">Guests leave with stories.</h2>
            </div>
            <div className="flex gap-2">
              <button onClick=${() => setIndex((index - 1 + reviews.length) % reviews.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] transition hover:bg-[hsl(var(--secondary)/0.55)]"><${ChevronLeft} size=${18} /></button>
              <button onClick=${() => setIndex((index + 1) % reviews.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.75)] transition hover:bg-[hsl(var(--secondary)/0.55)]"><${ChevronRight} size=${18} /></button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.78)] p-6 shadow-[var(--shadow-sm)] min-h-[240px] flex flex-col justify-center">
              <div className="mb-4 flex gap-1 text-[hsl(var(--primary))]">
                ${Array.from({ length: currentReview.rating }).map((_, starIndex) => html`<${Star} key=${starIndex} size=${18} fill="currentColor" />`)}
              </div>
              <blockquote className="font-serif text-3xl leading-tight sm:text-4xl">“${currentReview.text}”</blockquote>
              <div className="mt-6 text-sm text-[hsl(var(--foreground)/0.72)]">${currentReview.name} • ${currentReview.detail}</div>
            </div>
            <div className="flex flex-wrap gap-3">
              ${reviews.map((review, reviewIndex) => html`
                <button key=${review.id} onClick=${() => setIndex(reviewIndex)} className=${`rounded-2xl border px-4 py-3 text-left transition ${reviewIndex === index ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.12)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]'}`}>
                  <div className="font-medium text-sm">${review.name}</div>
                </button>
              `)}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}