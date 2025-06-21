import React from "react";

export function Button({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`transition duration-150 focus:outline-none ${className}`}>
      {children}
    </button>
  );
}
