import React from 'react';
import './Services.css';
import {motion} from 'framer-motion'

const Service = () => {
  return (
    <div className="services-container" >
      <h1>Services That I Can Provide to You</h1>
  
 
      <div className="service-list">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          >
        <div className="service-card">
          <h3>Data Cleaning & Preparation</h3>
          <p>
            Remove inconsistencies, fill in missing values, and ensure your data is accurate and ready for analysis.
          </p>
        </div>
        </motion.div>
         
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:0.2, duration: 1 }}
          >
        <div className="service-card">
          <h3>Data Visualization</h3>
          <p>
            Use charts, graphs, and dashboards to make complex data easy to understand using tools like Power BI, Tableau, or Python.
          </p>
        </div>
        </motion.div>
         <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:0.4, duration: 1 }}
          >
        <div className="service-card">
          <h3>Machine Learning Model</h3>
          <p>
          I develop simple machine learning models to help you gain insights and make data-driven decisions. 
          These models are easy to understand, efficient, and tailored to your specific needs. </p>
        </div>
</motion.div>
 <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:0.6, duration: 1 }}
          >
        <div className="service-card">
          <h3>Business Reporting</h3>
          <p>
            Generate professional reports and presentations to support decision-making with data-driven insights.
          </p>
        </div>
        </motion.div>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:0.8, duration: 1 }}
          >
        <div className="service-card">
          <h3>Web Development</h3>
          <p>
         I build fast, modern, and responsive websites tailored to your needs—whether it's a portfolio, business site, or custom web app.</p>
        </div>
        </motion.div>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:1, duration: 1 }}
          >
        <div className="service-card">
          <h3>Mobile Application</h3>
          <p>
           I create smooth, user-friendly mobile apps for Android, built to match your goals and brand. From design to deployment, I deliver apps that are fast, functional, and easy to use.</p>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Service;
