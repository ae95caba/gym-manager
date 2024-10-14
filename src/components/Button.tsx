import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // To allow custom classes if needed
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
}) => {
  const baseStyles =
    "bg-white text-black p-1 rounded border border-gray-300 hover:bg-gray-200";

  // Use a regular expression to remove background color classes from base styles if provided in `className`
  const hasBgClass = className.match(/\bbg-[^\s]+\b/);
  const finalStyles = hasBgClass
    ? baseStyles.replace(/\bbg-[^\s]+\b/, "") // Remove the `bg-white` class if there's a background class in `className`
    : baseStyles;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${finalStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
