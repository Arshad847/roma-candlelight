import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import {Moon, Sun, Menu, X} from 'https://esm.sh/lucide-react?deps=react@19.2.0';

const navItems = [
  { href: '#/home', label: 'Home', route: 'home' },
  { href: '#/menu', label: 'Menu', route: 'menu' },
  { href: '#/reserve', label: 'Reserve', route: 'reserve' },
  { href: '#/story', label: 'Our Story', route: 'story' }
];

export function Header({ route, darkMode, onToggleDark }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [route]);

  return html`
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#/home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.28),transparent_60%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--secondary)/0.35))] text-lg shadow-[var(--shadow-sm)]">🍷</div>
          <div>
            <div className="font-serif text-2xl leading-none text-[hsl(var(--foreground))]">Roma Candlelight</div>
            <div className="text-xs uppercase tracking-[0.35em] text-[hsl(var(--foreground)/0.6)]">Trattoria & Vino</div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          ${navItems.map((item) => html`
            <a key=${item.route} href=${item.href} className=${`rounded-full px-4 py-2 text-sm transition duration-300 ${route === item.route ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground)/0.78)] hover:bg-[hsl(var(--secondary)/0.55)] hover:text-[hsl(var(--foreground))]'}`}>
              ${item.label}
            </a>
          `)}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Toggle evening mode" onClick=${onToggleDark} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
            ${darkMode ? html`<${Sun} size=${18} />` : html`<${Moon} size=${18} />`}
          </button>
          <a href="#/reserve" className="hidden rounded-full bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] md:inline-flex">Reserve a Table</a>
          <button onClick=${() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] md:hidden">
            ${open ? html`<${X} size=${18} />` : html`<${Menu} size=${18} />`}
          </button>
        </div>
      </div>
      ${open ? html`
        <div className="border-t border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.98)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            ${navItems.map((item) => html`
              <a key=${item.route} href=${item.href} className=${`rounded-2xl px-4 py-3 ${route === item.route ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]' : 'bg-[hsl(var(--secondary)/0.35)] text-[hsl(var(--foreground))]'}`}>
                ${item.label}
              </a>
            `)}
          </div>
        </div>
      ` : null}
    </header>
  `;
}