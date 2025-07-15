import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { ReactComponent as Logo } from './file22.svg'; // Ensure this path is correct
import './logoDraw.css'; // Optional for additional styling

const Exprience = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    // Select all animatable elements
    const paths = svgRef.current.querySelectorAll(
      'path, line, polyline, polygon, circle, rect, ellipse'
    );

    // Set up dash animation and add color
    paths.forEach((path) => {
      const length = path.getTotalLength?.() || 0;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.strokeWidth = '4px';
      path.style.stroke = 'url(#gradient)'; // Apply gradient stroke
    });

    // Animate drawing effect
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: (el, i) => i * 150,
      direction: 'alternate',
  loop: false,
      complete: () => {
        // Optional: Make the stroke fully visible after animation
        paths.forEach((path) => {
          path.style.strokeDasharray = 'none';
        });
      }
    });
  }, []);

  return (
    <div className="logo-container">
      <svg width="100vh" height="100vh">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff7e5f', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#feb47b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <Logo
          ref={svgRef}
          style={{
            width: '100%',
            height: '100%',
            fill: 'none', // Keep the logo outline visible
          }}
        />
      </svg>
    </div>
  );
};

export default Exprience;