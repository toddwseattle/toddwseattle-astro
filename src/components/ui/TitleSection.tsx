import React from "react";

interface Section {
  id: string;
  label: string;
}

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  sections?: Section[];
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subtitle,
  center = false,
  className = "",
  sections,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`mb-8 ${center ? "text-center" : ""} ${className}`.trim()}>
      <h2 className="text-3xl md:text-4xl font-bold text-ink-800 dark:text-paper-100 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-graphite-400 dark:text-graphite-400">
          {subtitle}
        </p>
      )}
      {sections && sections.length > 0 && (
        <nav className="mt-6 flex flex-wrap justify-center gap-4 font-sans">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className="min-h-11 rounded-lg bg-accent-teal px-4 py-2 font-medium text-paper-50 transition-colors duration-200 hover:bg-ink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal"
            >
              {section.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

export default TitleSection;
