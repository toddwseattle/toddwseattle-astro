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
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-colors";
  const variantClasses = primary
    ? "bg-ink-800 text-paper-50 hover:bg-ink-950 dark:bg-paper-100 dark:text-ink-800 dark:hover:bg-paper-200"
    : "bg-paper-200 text-ink-800 hover:bg-graphite-400/20 dark:bg-graphite-600 dark:text-paper-100 dark:hover:bg-graphite-700";

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
