// src/components/Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1">
            <div className="flex flex-col gap-3 mb-6 bg-white/5 p-3 rounded-2xl w-fit">
              <img src="/logo.png" alt="Monisha Matriculation School Logo" className="h-[80px] w-auto drop-shadow-sm rounded-xl" />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed pr-4">
              Providing transformative education since 1985. We prepare students for life, not just for examinations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={14} className="text-white" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram size={14} className="text-white" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><Linkedin size={14} className="text-white" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About the School</Link></li>
              <li><Link to="/calendar" className="hover:text-blue-400 transition-colors">Academic Calendar</Link></li>
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Campus Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Admissions</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/apply" className="hover:text-blue-400 transition-colors">Apply Online</Link></li>
              <li><Link to="/admissions" className="hover:text-blue-400 transition-colors">Fee Structure</Link></li>
              <li><Link to="/status" className="hover:text-blue-400 transition-colors">Track Application</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>3947+G47, Rendadi Main Rd, Pendadi, Tamil Nadu 631102</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span>admissions@monishaschool.edu</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 MONISHA MATRICULATION SCHOOL RENDADI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS & CONDITIONS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
