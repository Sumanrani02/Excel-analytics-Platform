import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`flex h-screen w-screen items-center justify-center bg-green-50 ${className}`}>
      {children}
    </div>
  );
};