// Footer.jsx
import React from 'react';
import logo from '../assets/logo.png'
const Footer = () => {
    return (
        <footer className="mt-16 py-4  text-center text-sm text-gray-400">
            <div className="flex justify-center items-center space-x-2">
                <img
                    src={logo} // Replace with your logo URL or path
                    alt="Logo"
                    className="h-6"
                />
                <span>Created by <a href="https://aman-raj.xyz" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all">Aman Raj</a></span>
            </div>
        </footer>
    );
};

export default Footer;
