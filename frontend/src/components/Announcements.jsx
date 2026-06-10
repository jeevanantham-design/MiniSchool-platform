// src/components/Announcements.jsx
import React from 'react';
import { motion } from 'framer-motion';

const announcements = [
  {
    image: "/news1.png",
    date: "EVENTS • MARCH 12, 2024",
    title: "Virtual Open Day for Parents 2026",
    desc: "Join our live session with the Principal to understand our pedagogical approach."
  },
  {
    image: "/news2.png",
    date: "ADMISSIONS • FEB 28, 2024",
    title: "Scholarship Applications are Now Open",
    desc: "Merit-based scholarships available for outstanding students in Grade 9 and 11."
  },
  {
    image: "/news3.png",
    date: "CAMPUS LIFE • JAN 15, 2024",
    title: "New Olympic-sized Swimming Pool Inaugurated",
    desc: "Our new aquatic center is now open for students and extracurricular training."
  }
];

const Announcements = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">Important Announcements</h2>
          <a href="#" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All News <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {announcements.map((news, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/3] bg-gray-100">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">{news.date}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{news.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{news.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                View All News <span className="ml-1">→</span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
