import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Code2, Database } from 'lucide-react';
import { ReactComponent as Logo } from './file22.svg';
import img from './fekir.jpg';
import ChatAssistant from './ChatAssistant';
import Portfolio from './Portfolio';
import './Home.css';
import './logoDraw.css';

const highlights = [
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Full Stack', icon: Code2 },
  { label: 'Data Systems', icon: Database },
];

function Home() {
  const svgRef = useRef(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

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
      path.style.stroke = 'url(#hero-gradient)';
    });

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1800,
      delay: (_element, index) => index * 120,
      complete: () => {
        paths.forEach((path) => {
          path.style.strokeDasharray = 'none';
        });
      },
    });
  }, []);

  return (
    <div className="home-page">
      <ChatAssistant />

      <section className="hero-section">
        <div className="hero-layout">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-kicker">Portfolio / Data Analytics / Development</div>
            <h1>Building practical software and insight-driven data experiences.</h1>
            <p className="hero-summary">
              I am Fekremariam Engida, a data analyst and full stack developer focused on dashboards,
              web platforms, mobile systems, and machine learning prototypes that help teams understand
              their work and act faster.
            </p>

            <div className="hero-actions">
              <button
                className="portfolio-btn primary"
                type="button"
                onClick={() => setShowPortfolio((currentState) => !currentState)}
              >
                {showPortfolio ? 'Hide Work' : 'View Work'}
                <ArrowRight size={18} />
              </button>
              <Link className="portfolio-btn secondary" to="/contact">
                Contact Me
              </Link>
            </div>

            <div className="hero-highlights" aria-label="Professional focus areas">
              {highlights.map(({ label, icon: Icon }) => (
                <span key={label}>
                  <Icon size={18} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            
            <div className="logo-container" aria-hidden="true">
              <svg viewBox="0 100 500 500">
                <defs>
                  <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a85823" />
                    <stop offset="100%" stopColor="#086959" />
                  </linearGradient>
                </defs>
                <Logo ref={svgRef} />
              </svg>
            </div>

            <div className="portrait-card">
              <img src={img} alt="Fekremariam Engida portrait" className="portfolio-image" />
              <div className="portrait-caption">
                <strong>Available for impactful digital work</strong>
                <span>Dashboards, full stack apps, and analytics systems</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {showPortfolio && (
        <motion.section
          className="featured-work"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Portfolio />
        </motion.section>
      )}
    </div>
  );
}

export default Home;
