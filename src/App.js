import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Skills from './components/Skills';
import About from './components/About';
import Service from './components/Service';
import logo from './logoimg.png';
import Exprience from './components/Exprience';
import ChatAssistant from './components/ChatAssistant';
import LoginPage from './Login';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Router>
      <div className="portfolio-container">
        <header className="header">
          <div className="branding" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={logo} alt='logo' height="100px" width="100px" />
            <h1 className="name" style={{ color: "#4a4946" }}>Fekremariam Engida</h1>
          </div>

          {/* Mobile Hamburger */}
          <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className="main-nav">
            <ul className={`nav-list ${isNavOpen ? 'open' : ''}`}>
              {['home', 'about', 'services', 'skills', 'exprience', 'contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item}`}
                    className="nav-link"
                    onClick={() => setIsNavOpen(false)} // Close menu on link click
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ChatAssistant" element={<ChatAssistant />} />
            <Route path="/services" element={<Service />} />
            <Route path="/exprience" element={<Exprience />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => (
  <footer className="footer">
    <p>© 2025 . All rights reserved.</p>
  </footer>
);

export default App;
