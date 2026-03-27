'use client';

import { useRef, useEffect } from 'react';

export default function ShimmerText({ children, className = '', as: Tag = 'span', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Inject keyframes once
    if (!document.getElementById('shimmer-text-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'shimmer-text-keyframes';
      styleSheet.textContent = `
        @keyframes shimmerSlide {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const shimmerStyle = {
    background: 'linear-gradient(90deg, #F5F5F5 0%, #F5F5F5 35%, #FF6A1A 50%, #F5F5F5 65%, #F5F5F5 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shimmerSlide 4s linear infinite',
    ...style,
  };

  return (
    <Tag ref={ref} className={className} style={shimmerStyle}>
      {children}
    </Tag>
  );
}
