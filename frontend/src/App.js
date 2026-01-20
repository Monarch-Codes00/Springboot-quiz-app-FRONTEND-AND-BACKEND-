import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Quiz Management System</h1>
          <nav className="navigation">
            <Link to="/">Take Quiz</Link>
            <Link to="/admin">Admin Panel</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;