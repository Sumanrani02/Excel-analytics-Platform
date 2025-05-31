import React from "react";

export const Button = ({ children, className, type = "submit" , ...props }) => {
  return (
    <button
    type={type}
      className={`w-full rounded-lg bg-green-600 py-2 text-white font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
