// Lightbox.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

// Animation variants for the lightbox backdrop and image
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

const Lightbox = ({ images, selectedIndex, onClose, onPrev, onNext }) => {
  // Effect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev(e);
      if (e.key === 'ArrowRight') onNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Prevent event propagation on buttons and image
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <motion.div
      className="lightbox-backdrop"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.button className="lightbox-nav prev" onClick={onPrev} aria-label="Previous image">
        &#10094;
      </motion.button>

      <motion.img
        key={selectedIndex} // <-- Important for re-triggering animation on change
        src={images[selectedIndex]}
        alt={`Enlarged preview ${selectedIndex + 1}`}
        className="lightbox-image"
        onClick={stopPropagation}
        variants={imageVariants}
      />

      <motion.button className="lightbox-nav next" onClick={onNext} aria-label="Next image">
        &#10095;
      </motion.button>
      
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        &times;
      </button>
    </motion.div>
  );
};

export default Lightbox;