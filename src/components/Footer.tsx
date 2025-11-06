import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-indigo-900 text-white py-8 mt-auto">
    <div className="container mx-auto px-4">
      <div className="flex justify-center gap-8">
        <a
          href="https://linkedin.com/in/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-white hover:text-indigo-300 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-white hover:text-indigo-300 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/toddwseattle"
          rel="noreferrer noopener"
          target="_blank"
          className="text-white hover:text-indigo-300 transition-colors"
        >
          Twitter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
