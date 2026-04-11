import React from "react";

const Footer: React.FC = () => (
  <footer className="mt-auto bg-ink-950 py-8 font-sans text-paper-100 dark:bg-ink-950">
    <div className="container mx-auto px-4">
      <div className="flex justify-center gap-8">
        <a
          href="https://linkedin.com/in/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-accent-teal hover:decoration-paper-100 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-accent-teal hover:decoration-paper-100 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-paper-100 underline decoration-accent-teal hover:decoration-paper-100 transition-colors"
        >
          Twitter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
