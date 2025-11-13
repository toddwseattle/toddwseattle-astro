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
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-gray-200 text-indigo-900 hover:bg-gray-300";

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
