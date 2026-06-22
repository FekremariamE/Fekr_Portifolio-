import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import About from './components/About';
import ChatAssistant from './components/ChatAssistant';
import Contact from './components/Contact';
import Exprience from './components/Exprience';
import Home from './components/Home';
import Service from './components/Service';
import Skills from './components/Skills';
import LoginPage from './Login';
import logo from './logoimg.png';
import './App.css';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/exprience' },
  { label: 'Contact', path: '/contact' },
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="portfolio-container">
        <header className="header">
          <NavLink className="branding" to="/home" onClick={() => setIsNavOpen(false)}>
            <img src={logo} alt="Fekremariam Engida logo" />
            <span>
              <strong>Fekremariam Engida</strong>
              <small>Data Analyst / Full Stack Developer</small>
            </span>
          </NavLink>

          <button
            className={`nav-toggle ${isNavOpen ? 'open' : ''}`}
            type="button"
            onClick={() => setIsNavOpen((currentState) => !currentState)}
            aria-label="Toggle navigation"
            aria-expanded={isNavOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`main-nav ${isNavOpen ? 'open' : ''}`} aria-label="Main navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
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

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Fekremariam Engida. All rights reserved.</p>
    </footer>
  );
}

export default App;
