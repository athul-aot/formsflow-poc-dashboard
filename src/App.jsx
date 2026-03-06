import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from './pages/Library';
import FormViewer from './pages/FormViewer';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/view/:id" element={<FormViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
