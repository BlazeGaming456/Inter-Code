import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo_2.png'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Conversion', path: '/convert' },
    { name: 'Generation', path: '/generate' },
    { name: 'Explain', path: '/explain' }
  ];

  return (
    <nav className="relative border-b-2 border-slate-600 h-14 flex justify-between items-center p-4 bg-white dark:bg-slate-800">
      {/* Logo */}
      <div className='flex items-center space-x-3'>
        <img className='h-10' src={logo} alt="" />
        <h3 className='palanquin text-2xl text-white'>Inter Code</h3>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 absolute left-5/12">
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `font-palanquin hover:opacity-50 transition-opacity ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-600 dark:text-gray-300'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-600 dark:text-gray-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg z-50 border-t border-slate-600">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `py-2 px-4 font-palanquin ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-700' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;