import React from 'react';

const Logo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.6 13.71C16.6 13.71 14.36 15.08 12 15.08C9.64 15.08 7.4 13.71 7.4 13.71C7.15 13.56 7 13.28 7 13C7 12.33 8.34 10.67 12 8C15.66 10.67 17 12.33 17 13C17 13.28 16.85 13.56 16.6 13.71Z"
      fill="#34D399" // A bright green matching the design
    />
  </svg>
);

export default Logo;