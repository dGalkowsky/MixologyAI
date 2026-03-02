import React from "react";

const MartiniGlassIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* bowl */}
    <path d="M4 4h16l-8 8-8-8Z" />

    {/* stem */}
    <path d="M12 12v6" />

    {/* base */}
    <path d="M9 21h6" />

    {/* top rim accent */}
    <path d="M4 4h16" />
  </svg>
);

export default MartiniGlassIcon;