import React from 'react';

/**
 * Signet Premium Icon Collection
 * A set of modern, unique, and glowing icons tailored for the Signet aesthetic.
 */

export const MessageIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
        d="M8 10H16M8 14H13M12 22L8 18H5C3.89543 18 3 17.1046 3 16V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V16C21 17.1046 20.1046 18 19 18H16L12 22Z" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="12" cy="10.5" r="5" fill="currentColor" fillOpacity="0.05" className="animate-pulse" />
  </svg>
);

export const NotificationIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M10 22H14C15.1046 22 16 21.1046 16 20H8C8 21.1046 8.89543 22 10 22Z" fill="currentColor" />
    <circle cx="17" cy="7" r="3" fill="#D3F36B" stroke="#000000" strokeWidth="1.5" />
  </svg>
);

export const LikeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27421 16.45 2.59143 12 6.39429C7.55 2.59143 2 4.27421 2 9.1371Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const CommentIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10897 20.6391 10.5124 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    <circle cx="8" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const TransmissionIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 2L3 14H12V22L22 10H13V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 2L3 14H12V22L22 10H13V2Z" fill="currentColor" fillOpacity="0.1" />
  </svg>
);
