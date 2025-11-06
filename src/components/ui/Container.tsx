import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  section?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  section = false,
  className = "",
}) => {
  const baseClasses = "container mx-auto px-4";
  const sectionClasses = section ? "py-12 md:py-16" : "";

  return (
    <div className={`${baseClasses} ${sectionClasses} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Container;
