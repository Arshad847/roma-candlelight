import React from 'https://esm.sh/react@19.2.0';
import { html } from './jsx.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { MenuSection } from './components/MenuSection.js';
import { ReservationSection } from './components/ReservationSection.js';
import { StorySection } from './components/StorySection.js';
import { GallerySection } from './components/GallerySection.js';
import { ReviewsSection } from './components/ReviewsSection.js';
import { VisitSection } from './components/VisitSection.js';
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
  const [darkMode, setDarkMode] = React.useState(false);

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
        <${GallerySection} />
        <${ReviewsSection} />
      </div>`;
    }
    return html`<div>
      <${Hero} />
      <${MenuSection} />
      <${ReservationSection} />
      <${StorySection} />
      <${GallerySection} />
      <${ReviewsSection} />
      <${VisitSection} />
    </div>`;
  };

  return html`
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-[hsl(var(--primary)/0.25)]">
      <${ScrollToTopOnRoute} />
      <div className="steam steam-1"></div>
      <div className="steam steam-2"></div>
      <div className="steam steam-3"></div>
      <${Header} route=${route} darkMode=${darkMode} onToggleDark=${() => setDarkMode(!darkMode)} />
      <main>${renderPage()}</main>
      <${Footer} />
      <a href="#/reserve" className="mobile-booking-bar md:hidden">Reserve a Table</a>
    </div>
  `;
}