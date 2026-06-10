import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition-colors";
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 md:gap-3 max-w-[70vw]">
            <img src="/logo.png" alt="Monisha Matriculation School Logo" className="h-10 sm:h-[72px] w-auto drop-shadow-sm hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[11px] sm:text-lg md:text-xl text-[#1a1a1a] tracking-tight leading-none mb-1 truncate whitespace-nowrap overflow-hidden">MONISHA MATRICULATION</span>
              <span className="font-medium text-[8px] sm:text-xs md:text-sm text-gray-600 tracking-wide uppercase truncate whitespace-nowrap overflow-hidden">School Rendadi</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/admissions" className={isActive('/admissions')}>Admissions</Link>
            <Link to="/apply" className={isActive('/apply')}>Apply Online</Link>
            <Link to="/status" className={isActive('/status')}>Status</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          </div>

          <div className="hidden md:flex">
            <Link to="/apply" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors p-2 -mr-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 absolute w-full left-0 z-40">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            <Link to="/" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/')}`}>Home</Link>
            <Link to="/about" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/about')}`}>About</Link>
            <Link to="/admissions" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/admissions')}`}>Admissions</Link>
            <Link to="/apply" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/apply')}`}>Apply Online</Link>
            <Link to="/status" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/status')}`}>Status</Link>
            <Link to="/contact" onClick={toggleMenu} className={`block px-3 py-2 rounded-md text-base ${isActive('/contact')}`}>Contact</Link>
            <div className="pt-4">
              <Link to="/apply" onClick={toggleMenu} className="bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-blue-700 transition-all shadow-md inline-block">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
