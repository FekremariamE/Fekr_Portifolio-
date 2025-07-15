import React, { useState,useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { motion } from 'framer-motion';
import { ReactComponent as Logo } from './file22.svg';
import img from './img2.png';
// ;
import './Home.css';
import './logoDraw.css'; // optional for stroke styling
import Portfolio from './Portfolio'

function Home() {
  const svgRef = useRef(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
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

  return (
    <div className="portfolio-container">
      <main className="main-content">
        <section className="hero-section">
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
        <p className="intro-text">I am</p>

        <motion.h2
          className="profession"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="highlighted-keyword">Interactive Data Analyst</span>,
          and I believe every dataset holds a{" "}
          <motion.span
            whileHover={{ color: "#00bcd4", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="emphasize"
          >
            unique story
          </motion.span>{" "}
          waiting to be told. I specialize in{" "}
          <motion.span
            whileHover={{ color: "#4caf50", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="emphasize"
          >
            transforming raw numbers
          </motion.span>{" "}
          into compelling narratives and actionable insights. Let’s unlock the{" "}
          <motion.span
            whileHover={{ color: "#ff9800", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="emphasize"
          >
            hidden potential
          </motion.span>{" "}
          within your data to drive smarter decisions and shape a more informed future.
        </motion.h2>

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
