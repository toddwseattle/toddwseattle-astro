import React, { useState } from "react";

interface MainNavItem {
  title: string;
  slug: string;
}

const mainNavItems: MainNavItem[] = [
  {
    title: "Home",
    slug: "/",
  },
  {
    title: "Teaching",
    slug: "/teaching/",
  },
  {
    title: "Writing",
    slug: "/writing/",
  },
  {
    title: "AutoSoft Today",
    slug: "/autosoft-today/",
  },
  {
    title: "Consulting",
    slug: "/consulting/",
  },
  {
    title: "About",
    slug: "/about/",
  },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-paper-50 dark:bg-graphite-700 border-b border-graphite-600/20 dark:border-graphite-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-ink-800 dark:bg-paper-100 flex items-center justify-center text-paper-50 dark:text-ink-800 font-bold">
              TW
            </div>
            <span className="text-xl font-bold text-ink-800 dark:text-paper-100">
              Todd Warren
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item, index) => (
              <a
                key={`nav-item-${index}`}
                href={item.slug}
                className="text-ink-800 dark:text-paper-100 font-medium hover:underline decoration-graphite-400 hover:decoration-ink-800 dark:hover:decoration-paper-100 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 bg-ink-800 dark:bg-paper-100 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink-800 dark:bg-paper-100 transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink-800 dark:bg-paper-100 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            {mainNavItems.map((item, index) => (
              <a
                key={`mobile-nav-item-${index}`}
                href={item.slug}
                className="text-ink-800 dark:text-paper-100 font-medium py-2 hover:underline"
              >
                {item.title}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
