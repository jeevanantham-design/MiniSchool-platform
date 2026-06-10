// src/components/Welcome.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Welcome to Monisha Matriculation School Rendadi</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-8">
            A Legacy of Knowledge and Innovation.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed px-4">
            Founded on the principles of academic rigor and holistic development, Monisha Matriculation School Rendadi provides a nurturing environment where students are encouraged to think critically, act compassionately, and lead with integrity. Our 20-acre modern campus is home to a diverse community of learners from over 30 countries.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;
