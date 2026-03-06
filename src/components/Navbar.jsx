import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src={logo} alt="FormsFlow" style={{ height: '36px' }} />
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link active">Public Forms</Link>
                    <a href="#" className="nav-link">Documentation</a>
                    <a href="#" className="nav-link">Support</a>
                </div>

                <div className="nav-actions">
                    {/* Public library - no auth buttons needed */}
                    <button className="contact-btn">Contact Us</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
