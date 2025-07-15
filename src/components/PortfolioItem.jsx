// PortfolioItem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

const PortfolioItem = ({ id, title, description, category, images,headers, github,onToggleOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

 
  const toggleShow = () => {
  setIsOpen((prev) => {
    const newState = !prev;
    onToggleOpen(newState); // tell parent to pause or resume
    return newState;
  });
};


  return (
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

  );
};

export default PortfolioItem;
