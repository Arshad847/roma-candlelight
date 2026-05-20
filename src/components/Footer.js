import { html } from '../jsx.js';

export function Footer() {
  return html`
    <footer className="border-t border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.6)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[hsl(var(--foreground)/0.68)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="font-serif text-2xl text-[hsl(var(--foreground))]">Roma Candlelight</div>
          <div>Italian dining shaped by family recipes, warm brick, and evening rituals.</div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#/home" className="transition hover:text-[hsl(var(--primary))]">Home</a>
          <a href="#/menu" className="transition hover:text-[hsl(var(--primary))]">Menu</a>
          <a href="#/reserve" className="transition hover:text-[hsl(var(--primary))]">Reserve</a>
          <a href="#/story" className="transition hover:text-[hsl(var(--primary))]">Story</a>
        </div>
      </div>
    </footer>
  `;
}