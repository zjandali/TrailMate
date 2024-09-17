// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import TrailDetails from './pages/TrailDetails';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/trail/:id" element={<TrailDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
