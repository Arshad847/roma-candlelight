import { html } from '../jsx.js';
import { storyCards } from '../data.js';

export function StorySection() {
  return html`
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(160deg,hsl(var(--secondary)/0.42),hsl(var(--card)))] p-6 shadow-[var(--shadow-md)] sm:p-8">
          <div className="section-kicker">House Story</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Family recipes carried across decades, then plated for now.</h2>
          <p className="mt-4 text-sm leading-7 text-[hsl(var(--foreground)/0.74)]">Roma Candlelight is imagined as a room where inherited recipes meet a modern dining rhythm. The result is warm and cinematic rather than theatrical: parchment menus, brass glow, flour-dusted prep, and dishes allowed to speak clearly.</p>
          <div className="postcard mt-6 rounded-[var(--radius-md)] p-5">
            <div className="font-serif text-3xl">From Nonna Livia’s notebook</div>
            <p className="mt-2 text-sm leading-7 text-[hsl(var(--foreground)/0.8)]">“Pepper first, then patience. Pasta listens when water rolls hard and the sauce waits kindly.”</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          ${storyCards.map((card) => html`
            <article key=${card.id} className="fade-in rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
              <div className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--primary))]">${card.eyebrow}</div>
              <h3 className="mt-2 font-serif text-3xl leading-tight">${card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground)/0.74)]">${card.text}</p>
            </article>
          `)}
        </div>
      </div>
    </section>
  `;
}