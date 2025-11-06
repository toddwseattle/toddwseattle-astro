import React from "react";

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subtitle,
  center = false,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""} ${className}`.trim()}>
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
        {title}
      </h2>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default TitleSection;
