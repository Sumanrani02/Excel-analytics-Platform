import React from "react";
export const ErrorMessage = ({ message }) => {
  return message ? (
    <p className="text-sm text-red-600 mt-1">{message}</p>
  ) : null;
};
