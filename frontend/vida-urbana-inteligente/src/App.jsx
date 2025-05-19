import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Favoritos from './pages/Favoritos';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header>
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>

      <footer>
        <p>© 2025 Sua Feira Livre Digital</p>
      </footer>
    </div>
  );
};

export default App;
