import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className=" border-b">
      <div className="container mx-auto px-4">
        <div className="flex row justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-blue-500 transition-colors ${isActive('/') ? 'text-blue-500 font-medium' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-blue-500 transition-colors ${isActive('/about') ? 'text-blue-500 font-medium' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-blue-500 transition-colors ${isActive('/contact') ? 'text-blue-500 font-medium' : ''}`}
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
