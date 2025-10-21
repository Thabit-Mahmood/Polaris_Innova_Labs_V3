'use client';

import { useEffect, useState } from 'react';

export default function FloatingDoodles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const doodles = [
    // Top right corner
    {
      shape: 'triangle',
      style: {
        top: '10%',
        left: '5%',
        width: '60px',
        height: '60px',
        opacity: 0.1,
        animation: 'float 8s ease-in-out infinite',
      },
    },
    // Top left corner
    {
      shape: 'circle',
      style: {
        top: '15%',
        right: '8%',
        width: '40px',
        height: '40px',
        opacity: 0.08,
        animation: 'float 6s ease-in-out infinite 1s',
      },
    },
    // Middle right
    {
      shape: 'square',
      style: {
        top: '40%',
        left: '3%',
        width: '50px',
        height: '50px',
        opacity: 0.12,
        animation: 'float 10s ease-in-out infinite 2s',
      },
    },
    // Middle left
    {
      shape: 'diamond',
      style: {
        top: '50%',
        right: '5%',
        width: '45px',
        height: '45px',
        opacity: 0.1,
        animation: 'float 7s ease-in-out infinite 1.5s',
      },
    },
    // Bottom right
    {
      shape: 'hexagon',
      style: {
        bottom: '20%',
        left: '7%',
        width: '55px',
        height: '55px',
        opacity: 0.09,
        animation: 'float 9s ease-in-out infinite 3s',
      },
    },
    // Bottom left
    {
      shape: 'pentagon',
      style: {
        bottom: '15%',
        right: '10%',
        width: '48px',
        height: '48px',
        opacity: 0.11,
        animation: 'float 11s ease-in-out infinite 2.5s',
      },
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {doodles.map((doodle, index) => (
        <div
          key={index}
          className="doodle absolute"
          style={doodle.style}
        >
          {doodle.shape === 'triangle' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
              />
            </svg>
          )}

          {doodle.shape === 'circle' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
              />
            </svg>
          )}

          {doodle.shape === 'square' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
                transform="rotate(15 50 50)"
              />
            </svg>
          )}

          {doodle.shape === 'diamond' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,50 50,90 10,50"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
              />
            </svg>
          )}

          {doodle.shape === 'hexagon' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
              />
            </svg>
          )}

          {doodle.shape === 'pentagon' && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 85,40 70,85 30,85 15,40"
                fill="none"
                stroke="#daff00"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
