import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // To allow custom classes if needed
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseStyles =
    "bg-white text-black p-1 rounded border border-gray-300 hover:bg-gray-200";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
