import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: "text" | "number"; // Support for both text and number types
  min?: number;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text", // Default type is text
  min,

  required = false,
}) => {
  const inputStyle = "text-black pl-2";
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      className={inputStyle}
      min={type === "number" ? min : undefined} // Only apply min if type is number
      onKeyDown={
        type === "number"
          ? (e) => {
              if (
                e.key.match(/[^0-9]/) &&
                e.key !== "Backspace" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight"
              ) {
                e.preventDefault();
              }
            }
          : undefined
      } // Apply keyDown restriction only for numbers
    />
  );
};

export default Input;
