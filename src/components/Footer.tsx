import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-ink-950 dark:bg-ink-950 text-paper-100 py-8 mt-auto">
    <div className="container mx-auto px-4">
      <div className="flex justify-center gap-8">
        <a
          href="https://linkedin.com/in/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-graphite-400 hover:decoration-paper-100 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-graphite-400 hover:decoration-paper-100 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-graphite-400 hover:decoration-paper-100 transition-colors"
        >
          Twitter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
