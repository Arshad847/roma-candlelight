import React from 'https://esm.sh/react@19.2.0';
import { html } from '../jsx.js';
import {Flame, Leaf, WheatOff, Wine, MapPinned, ChefHat, Search, Filter} from 'https://esm.sh/lucide-react?deps=react@19.2.0';
import { menuCategories } from '../data.js';

function DietaryBadge({ type }) {
  const labelMap = {
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    'gluten-free': 'Gluten-Free'
  };
  const iconMap = {
    vegetarian: html`<${Leaf} size=${14} />`,
    vegan: html`<${Leaf} size=${14} />`,
    'gluten-free': html`<${WheatOff} size=${14} />`
  };
  return html`<span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--secondary)/0.7)] px-2.5 py-1 text-xs text-[hsl(var(--foreground)/0.8)]">${iconMap[type]} ${labelMap[type]}</span>`;
}

function SpiceMeter({ level }) {
  return html`<div className="flex items-center gap-1">
    ${[1, 2, 3].map((item) => html`<span key=${item} className=${`inline-flex h-2.5 w-2.5 rounded-full ${item <= level ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--border))]'}`}></span>`)}
  </div>`;
}

function MenuCard({ item }) {
  return html`
    <div className="menu-card group relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--secondary)/0.25))] p-5 shadow-[var(--shadow-sm)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      ${item.image && html`
        <div className="mb-5 -mx-5 -mt-5 h-48 overflow-hidden">
          <img src=${item.image} alt=${item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
      `}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-3xl leading-tight">${item.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[hsl(var(--foreground)/0.72)]">${item.ingredients}</p>
        </div>
        <div className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.8)] px-3 py-1 font-serif text-xl">€${item.price}</div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        ${item.dietary.map((type) => html`<${DietaryBadge} key=${type} type=${type} />`)}
        <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--primary)/0.12)] px-2.5 py-1 text-xs text-[hsl(var(--primary))]"><${Flame} size=${14} /> Spice <${SpiceMeter} level=${item.spice} /></span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.52)] p-3 text-sm">
          <div className="mb-1 inline-flex items-center gap-2 text-[hsl(var(--foreground)/0.62)]"><${Wine} size=${14} /> Wine Pairing</div>
          <div className="font-medium">${item.wine}</div>
        </div>
        <div className="rounded-2xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.52)] p-3 text-sm">
          <div className="mb-1 inline-flex items-center gap-2 text-[hsl(var(--foreground)/0.62)]"><${MapPinned} size=${14} /> Origin</div>
          <div className="font-medium">${item.origin}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.52)] p-3 text-sm">
        <div className="mb-1 inline-flex items-center gap-2 font-medium text-[hsl(var(--primary))]"><${ChefHat} size=${14} /> Chef Note</div>
        <p className="leading-6 text-[hsl(var(--foreground)/0.82)]">${item.chefNote}</p>
      </div>
    </div>
  `;
}

export function MenuSection({ standalone = false }) {
  const [active, setActive] = React.useState(menuCategories[0].id);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [dietFilter, setDietFilter] = React.useState('all');

  const current = menuCategories.find((cat) => cat.id === active);

  const filteredItems = current.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.ingredients.toLowerCase().includes(search.toLowerCase());
    const matchesDiet = dietFilter === 'all' || item.dietary.includes(dietFilter);
    return matchesSearch && matchesDiet;
  });

  const switchTab = (id) => {
    setLoading(true);
    window.setTimeout(() => {
      setActive(id);
      setLoading(false);
    }, 260);
  };

  return html`
    <section className=${`mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 ${standalone ? 'pt-12' : 'pt-20'}`}>
      <div className="fade-in mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="section-kicker">Illustrated Menu Journey</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Taste by course, region, and candlelit mood.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--foreground)/0.72)]">Hover each dish to uncover Chef Matteo’s notes and the Italian region behind it. Every plate comes with dietary guidance, spice level, and a thoughtful glass recommendation.</p>
        </div>
        <a href="#/reserve" className="inline-flex rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-medium shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">Pair this with a reservation</a>
      </div>

      <div className="fade-in no-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2">
        ${menuCategories.map((cat) => html`
          <button key=${cat.id} onClick=${() => switchTab(cat.id)} className=${`min-w-max rounded-full border px-4 py-3 text-left transition ${active === cat.id ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--secondary)/0.5)]'}`}>
            <span className="mr-2 text-lg">${cat.icon}</span>${cat.label}
          </button>
        `)}
      </div>

      <div className="fade-in mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.86)] p-5 shadow-[var(--shadow-sm)]">
          <div className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--foreground)/0.55)]">${current.label}</div>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[hsl(var(--foreground)/0.72)]">${current.description}</p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/0.4)]" size=${16} />
            <input 
              value=${search} 
              onInput=${(e) => setSearch(e.target.value)}
              placeholder="Find ingredients..." 
              className="w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[hsl(var(--primary)/0.4)] sm:w-64" 
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5">
            <${Filter} size=${14} className="text-[hsl(var(--foreground)/0.5)]" />
            <select 
              value=${dietFilter} 
              onChange=${(e) => setDietFilter(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer"
            >
              <option value="all">All Dishes</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>
        </div>
      </div>

      ${loading ? html`
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          ${[1, 2, 3].map((n) => html`<div key=${n} className="h-72 animate-pulse rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))]"></div>`)}
        </div>
      ` : filteredItems.length ? html`
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          ${filteredItems.map((item) => html`<${MenuCard} key=${item.id} item=${item} />`)}
        </div>
      ` : html`
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/0.65)] p-8 text-center">
          <div className="font-serif text-3xl">This course is resting between seasons.</div>
          <p className="mt-2 text-sm text-[hsl(var(--foreground)/0.7)]">Check back after the next market delivery or explore another region above.</p>
        </div>
      `}
    </section>
  `;
}