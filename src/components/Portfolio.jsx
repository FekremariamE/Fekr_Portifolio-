import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';
import PortfolioItem from './PortfolioItem';

import img1 from './screenshot/001.jpg';
import img2 from './screenshot/002.jpg';
import img3 from './screenshot/003.jpg';
import img4 from './screenshot/004.jpg';
import img5 from './screenshot/005.jpg';
import img6 from './screenshot/006.jpg';
import img7 from './screenshot/007.jpg';
import img8 from './screenshot/008.jpg';
import img9 from './screenshot/009.jpg';

import loan from './screenshot/Dashboard/loan.jpeg'
import digital from './screenshot/Dashboard/digital.jpeg'
import Deposit from './screenshot/Dashboard/Deposit.jpeg'
import summary from './screenshot/Dashboard/summary.jpeg'
import finance from './screenshot/Dashboard/finance.jpeg'
import branch from './screenshot/Dashboard/branch.jpeg'

import ML1 from './screenshot/Machine-Learning/ML1.jpeg'
import ML2 from './screenshot/Machine-Learning/ML2.jpeg'

import MOH1 from './screenshot/MOH/MOH1.jpeg'
import MOH2 from './screenshot/MOH/MOH2.jpeg'
import MOH3 from './screenshot/MOH/MOH3.jpeg'
import MOH4 from './screenshot/MOH/MOH4.jpeg'
import MOH5 from './screenshot/MOH/MOH5.jpeg'
import MOH6 from './screenshot/MOH/MOH6.jpeg'
import MOH7 from './screenshot/MOH/MOH7.jpeg'





function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Data Visualization Dashboard",
      description: "A real-time dashboard displaying overall bank performance metrics like revenue, deposits, loans, and branch analytics for better decision-making.",
      category: "Data Analysis",
      images: [summary,loan, digital, Deposit,finance,branch],
      headers: summary,
      github: "https://github.com/FekremariamE",
    },
     {
      id: 6,
      title: "Ministry of Health OTC",
      description: "A centralized web platform for Ethiopia's Ministry of Health (MOH) designed to monitor, manage, and report cash collections and payment transactions across diverse healthcare service points.",
      category: "Web Development",
      images: [MOH7, MOH6, MOH1, MOH2, MOH3,MOH5],
      headers: img8,
      github: "https://github.com/yourusername/marketing-analytics",
    },
      {
      id: 5,
      title: "Android Healthcare System",
      description: "An interactive platform that improves doctor-patient communication through real-time messaging, appointment booking, and secure medical info sharing",
      category: "Mobile App Development",
      images: [img4, img1, img2, img3, img5,img7],
      headers: img9,
      github: "https://github.com/yourusername/marketing-analytics",
    },
    {
      id: 2,
      title: "Tesla Stock Price Prediction",
      description: "Machine learning model to Predict ",
      category: "Machine Learning",
      images: [ML1, ML2,ML1, ML2,ML1, ML2],
      headers: ML2,
      github: "https://github.com/yourusername/customer-segmentation",
    },
    {
      id: 3,
      title: "Sales Forecast Tool",
      description: "Predictive analytics for quarterly sales",
      category: "Data Science",
      images: ["/screenshots/forecast1.png", "/screenshots/forecast2.png"],
      headers: img1,
      github: "https://github.com/yourusername/sales-forecast",
    },
    {
      id: 4,
      title: "Marketing Analytics Report",
      description: "Comprehensive analysis of campaign performance",
      category: "Business Intelligence",
      images: ["/screenshots/marketing1.png", "/screenshots/marketing2.png", "/screenshots/marketing3.png"],
      headers: img1,
      github: "https://github.com/yourusername/marketing-analytics",
    },
  
   
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false); // <-- new
  useEffect(() => {
    if (isProjectOpen) return; // Skip interval if a project is open

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === portfolioItems.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isProjectOpen]); // include isProjectOpen in deps



  const nextItem = () => {
    if (currentIndex < portfolioItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = portfolioItems[currentIndex];

  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="portfolio-title">My Data Analytics Portfolio</h1>

      <div >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioItem
              {...currentItem}
              onToggleOpen={(open) => setIsProjectOpen(open)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="portfolio-navigation">
        <button onClick={prevItem} disabled={currentIndex === 0} className="nav-btn">Previous</button>
        <span className="portfolio-counter">
          {currentIndex + 1} of {portfolioItems.length}
        </span>
        <button onClick={nextItem} disabled={currentIndex === portfolioItems.length - 1} className="nav-btn">Next</button>
      </div>
    </motion.div>
  );
}

export default Portfolio;
