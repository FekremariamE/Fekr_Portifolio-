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
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) {
        onComplete();
      }
      if (infinite) {
        const resetTimeout = setTimeout(() => {
          setCurrentText('');
          setCurrentIndex(0);
        }, 2000);
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [currentIndex, delay, infinite, text, onComplete]);

  return <>{currentText}</>;
};

export default TypingEffect;