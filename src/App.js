import React from 'react';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Skills from './components/Skills';
import About from './components/About';
import Service from './components/Service';
import  './App.css'
import logo from './logoimg.png'
import Exprience from './components/Exprience';

function App() {
  //  const scrollToSection = (sectionId) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start'
  //     });
  //   }
  // };
  return (
    <Router>
      <div className="portfolio-container">
        <header className="header">
        <div className="branding" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src={logo} alt='logo' height="100px" width="100px"/>
          <h1 className="name" style={{color:"#4a4946"}}>Fekremariam Engida </h1>
        </div>
        
     
      
        <nav className="main-nav">
            <ul className="nav-list">
              {['home', 'about', 'services', 'skills', 'exprience', 'contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item}`} className="nav-link">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
 </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />

            {/* Optional placeholder routes to avoid blank pages */}
            <Route path="/services" element={<Service />} />
            {/* <Route path="/education" element={<div>Education Page Coming Soon</div>} /> */}
            <Route path="/exprience" element={<Exprience />} />
            {/* <Route path="/blog" element={<div>Blog Page Coming Soon</div>} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => (
   <footer className="footer">
        <p>© 2025 Fekir. All rights reserved.</p>
      </footer>
);

export default App;