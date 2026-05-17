// PortfolioItem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

const PortfolioItem = ({ id, title, description, category, images, headers, github, onToggleOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleShow = () => {
    setIsOpen(prev => {
      const newState = !prev;
      onToggleOpen(newState);
      return newState;
    });
  };

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <motion.div
        className="portfolio-card"
        whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={headers} alt={`${title} preview`} className="portfolio-thumb" />

        <div className="card-content">
          <h3>{title}</h3>
          <p className="category">{category}</p>
          <p className="description">{description}</p>

          <button className="view-btn" onClick={toggleShow}>
            {isOpen ? 'Close Project' : 'View Project'}
          </button>

          {isOpen && (
            <div className="image-gallery-wrapper">
              <div className="image-gallery">
                {images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`${title} screenshot ${index + 1}`}
                    className="project-screenshot"
                    onClick={() => openImage(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Professional Lightbox */}
      {selectedIndex !== null && (
        <div
          className="image-lightbox"
          onClick={closeImage}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={closeImage}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>

          <button
            onClick={showPrev}
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              fontSize: '3rem',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            &#10094;
          </button>

          <img
            src={images[selectedIndex]}
            alt={`Preview ${selectedIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
              transition: 'all 0.3s ease',
            }}
          />

          <button
            onClick={showNext}
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              fontSize: '3rem',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
