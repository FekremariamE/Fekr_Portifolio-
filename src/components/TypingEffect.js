// src/TypingEffect.jsx
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, delay = 50, infinite = false, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout); // Cleanup on unmount or re-render
    } else {
      // Typing is complete
      if (onComplete) {
        onComplete(); // Call callback when typing finishes
      }
      if (infinite) {
        const resetTimeout = setTimeout(() => {
          setCurrentText('');
          setCurrentIndex(0);
        }, 2000); // Wait 2 seconds before re-typing if infinite
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [currentIndex, delay, infinite, text, onComplete]); // Add onComplete to dependencies

  return <>{currentText}</>;
};

export default TypingEffect;