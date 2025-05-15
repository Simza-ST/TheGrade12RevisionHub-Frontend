import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Typed from 'typed.js';

const Navbar = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    useEffect(() => {
        const typed = new Typed('.TheRevisionHub-text', {
            strings: ['The Revision Hub.', 'Where You Can Make Your Own Future.'],
            typeSpeed: 70,
            backSpeed: 70,
            backDelay: 2000,
            loop: true,
        });

        return () => typed.destroy();
    }, []);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
        document.body.style.overflow = isMenuActive ? 'auto' : 'hidden';
    };

    const closeMenu = () => {
        setIsMenuActive(false);
        document.body.style.overflow = 'auto';
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    };

    return (
        <nav className="sticky">
            <div className="navbar">
                <div className="logo">
                    <span className="TheRevisionHub-text"></span>
                </div>
                <ul className={`menu ${isMenuActive ? 'active' : ''}`}>
                    <li>
                        <button onClick={() => scrollToSection('home')} className="nav-link">
                            Home
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('about')} className="nav-link">
                            About
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('skills')} className="nav-link">
                            Tips
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('services')} className="nav-link">
                            Services
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('contact')} className="nav-link">
                            Contact
                        </button>
                    </li>
                    <li>
                        <a href="/login" onClick={closeMenu}>Login</a>
                    </li>
                    <div className="cancel-btn" onClick={closeMenu}>
                        <i className="fas fa-times"></i>
                    </div>
                </ul>
                <div className="menu-btn" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;