import { html } from '../jsx.js';
import { galleryCards } from '../data.js';

export function GallerySection() {
  return html`
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="fade-in mb-8 max-w-3xl">
        <div className="section-kicker">Vintage Postcard Album</div>
        <h2 className="font-serif text-4xl sm:text-5xl">A gallery pinned like memories from old Italy.</h2>
        <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground)/0.72)]">Each frame is styled like a keepsake card mailed home after one unforgettable supper in Rome.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        ${galleryCards.map((card, index) => html`
          <article key=${card.id} className=${`fade-in postcard rotate-${(index % 4) + 1} rounded-[var(--radius-lg)] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[var(--shadow-lg)]`}>
            <div className="gallery-art gallery-${card.id}"></div>
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
  `;
}