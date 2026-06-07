import React from 'https://esm.sh/react@19.2.0';
import { html } from './jsx.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { MenuSection } from './components/MenuSection.js';
import { ReservationSection } from './components/ReservationSection.js';
import { StorySection } from './components/StorySection.js';
import { VisitSection } from './components/VisitSection.js';
import { AdminPanel } from './components/AdminPanel.js';
import { Footer } from './components/Footer.js';

function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash || '#/home';
    return hash.replace('#/', '') || 'home';
  };
  const [route, setRoute] = React.useState(getRoute());
  React.useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function ScrollToTopOnRoute() {
  const route = useHashRoute();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);
  return null;
}

export function App() {
  const route = useHashRoute();
  const [darkMode, setDarkMode] = React.useState(() => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 7; // Auto-enable dark mode between 6 PM and 7 AM
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const renderPage = () => {
    if (route === 'menu') {
      return html`<div>
        <${MenuSection} standalone=${true} />
        <${ReservationSection} compactTop=${true} />
      </div>`;
    }
    if (route === 'reserve') {
      return html`<${ReservationSection} standalone=${true} />`;
    }
    if (route === 'story') {
      return html`<div>
        <${StorySection} />
      </div>`;
    }
    if (route === 'admin') {
      return html`<div>
        <${AdminPanel} />
      </div>`;
    }
    return html`<div>
      <${Hero} />
      <${MenuSection} />
      <${ReservationSection} />
      <${StorySection} />
      <${VisitSection} />
    </div>`;
  };

  return html`
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-[hsl(var(--primary)/0.25)]">
      <${ScrollToTopOnRoute} />
      <div className="steam steam-1"></div>
      <div className="steam steam-2"></div>
      <div className="steam steam-3"></div>
      <${Header} route=${route} darkMode=${darkMode} onToggleDark=${() => setDarkMode(!darkMode)} />
      <main className="flex-1">${renderPage()}</main>
      <${Footer} />
      <a href="#/reserve" className="mobile-booking-bar md:hidden">Reserve a Table</a>
    </div>
  `;
}