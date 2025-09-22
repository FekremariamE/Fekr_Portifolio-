import React, { useState,useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { motion } from 'framer-motion';
import { ReactComponent as Logo } from './file22.svg';
import img from './img2.png';
import TypingEffect from './TypingEffect';
// ;
import './Home.css';
import './logoDraw.css'; // optional for stroke styling
import Portfolio from './Portfolio'
import ChatAssistant from './ChatAssistant';

function Home() {
  const svgRef = useRef(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
   // State to control visibility of elements that appear after typing
  const [typingComplete, setTypingComplete] = useState(false); 
//   function handlePortfolio(){
//     return {showPortfolio ? <Portfolio />:""}
//   }
const handleToggle = () => {
  setShowPortfolio(prev => !prev);
};
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll(
      'path, line, polyline, polygon, circle, rect'
    );

    paths.forEach((path) => {
      const length = path.getTotalLength?.() || 0;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.strokeWidth = '4px';
      path.style.stroke = 'url(#gradient)';
    });

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: (el, i) => i * 600,
      complete: () => {
        paths.forEach((path) => {
          path.style.strokeDasharray = 'none';
        });
      }
    });
  }, []);

  const introText = "Welcome! 👋 I'm  Fekir,";

  const callToActionText = "a versatile Data Analyst and a passionate developer creating impactful Web and Mobile applications. and Dive in to explore how I transform data into insights and ideas into intuitive digital experiences."
  return (
    <div className="portfolio-container">
      <main className="main-content">
        <section className="hero-section">
          <ChatAssistant />
          <div className="hero-layout">
            <div className="logo-container">
              <svg style={{ width: '100%', height: '100%' }}>
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
                    fill: 'none'
                  }}
                />
              </svg>
            </div>

            <div className="hero-text-container">
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
   <p className="intro-text">
                  <TypingEffect
                    text={introText}
                    delay={50} // Adjust typing speed
                    // No onComplete here if you want it to flow directly into the next line
                  />
                </p>

                {/* Typing Effect for Profession Text (can start after intro, or slightly overlapping) */}
                {/* You might use a state to chain these, or just rely on delay for simpler cases */}
             

                {/* Typing Effect for Call to Action */}
                <p className="call-to-action-text"> {/* Add a class for specific styling if needed */}
                  <TypingEffect
                    text={callToActionText}
                    delay={35} // Another speed
                  />
                </p>


        {showPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <Portfolio />
          </motion.div>
        )}

        <motion.div
          className="portfolio-btn-wrapper"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <button className="portfolio-btn" onClick={handleToggle}>
            {showPortfolio ? "Close Portfolio" : "View Portfolio"}
          </button>
        </motion.div>
      </motion.div>
    </div>

            <motion.div
              className="hero-image-container"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img src={img} alt="Portrait" className="portfolio-image"/>
            </motion.div>
          </div>
          
        </section>
        
      </main>
    </div>
  );
}

export default Home;
