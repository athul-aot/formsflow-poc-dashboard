import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Target } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src={logo} alt="FormsFlow" style={{ height: '28px' }} />
                </Link>

                <div className="nav-links">
                </div>

                <div className="nav-actions">
                    {/* Public library - no auth buttons needed */}
                    <button className="contact-btn" onClick={() => window.open("https://formsflow.ai", "_blank")}>Contact Us</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
