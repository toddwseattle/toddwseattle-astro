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
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              TW
            </div>
            <span className="text-xl font-bold text-indigo-900">
              Todd Warren
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item, index) => (
              <a
                key={`nav-item-${index}`}
                href={item.slug}
                className="text-indigo-900 hover:text-indigo-600 font-medium transition-colors"
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
              className={`block h-0.5 bg-indigo-900 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-indigo-900 transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-indigo-900 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
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
                className="text-indigo-900 hover:text-indigo-600 font-medium py-2"
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
