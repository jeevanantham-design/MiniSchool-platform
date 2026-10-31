import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-slate-50 overflow-hidden pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] md:text-xs font-semibold mb-6 uppercase tracking-wider">
              <span className="mr-2">🌱</span> Admissions Open 2026-2027
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1a1a1a] leading-tight mb-6 break-words">
              Inspiring<br/> 
              Excellence,<br/>
              <span className="text-blue-600">Nurturing Future <br className="hidden md:block"/> Leaders.</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              Experience a world-class education where curiosity meets capability. Join Ayyan Matriculation School for the academic year 2026-2027 and embark on a journey of discovery.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
              <Link to="/apply" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg shadow-blue-200 text-sm md:text-base w-full sm:w-auto">
                Apply Now <span>→</span>
              </Link>
              <Link to="/admissions" className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-3.5 rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-all text-center flex items-center justify-center text-sm md:text-base w-full sm:w-auto">
                Admission Guide
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background decorative blob */}
            <div className="absolute inset-0 bg-blue-100/50 rounded-3xl transform rotate-3 scale-105 -z-10 blur-xl"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/4] bg-gray-200 border-4 border-white">
              <img src="/hero.png" alt="Students on campus" className="w-full h-full object-cover" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none transition-all">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Student Success Rate</p>
                <p className="font-bold text-gray-900">98% Ivy League</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
