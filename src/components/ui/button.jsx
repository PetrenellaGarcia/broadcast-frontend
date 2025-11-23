import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
