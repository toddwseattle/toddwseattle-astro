import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  className = "",
  onClick,
}) => {
  const baseClasses =
    "min-h-11 rounded-lg px-6 py-3 font-sans font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal";
  const variantClasses = primary
    ? "bg-accent-teal text-paper-50 hover:bg-ink-800"
    : "border border-accent-teal bg-transparent text-accent-teal hover:bg-paper-200 dark:hover:bg-graphite-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
