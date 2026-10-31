// src/components/Highlights.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Building2, Trophy } from 'lucide-react';

const highlights = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-50",
    title: "Academic Excellence",
    description: "Ranked top 10 nationwide for our innovative STEM and Arts integration curriculum taught by world-class educators."
  },
  {
    icon: <Building2 className="w-6 h-6 text-green-600" />,
    iconBg: "bg-green-50",
    title: "Modern Facilities",
    description: "State-of-the-art laboratories, a digital-first library, and professional-grade sports arenas for comprehensive growth."
  },
  {
    icon: <Trophy className="w-6 h-6 text-orange-600" />,
    iconBg: "bg-orange-50",
    title: "Global Achievements",
    description: "Winners of over 50 international robotics competitions and national debating championships in the last decade."
  }
];

const Highlights = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">Why Choose Ayyan Matriculation School?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
