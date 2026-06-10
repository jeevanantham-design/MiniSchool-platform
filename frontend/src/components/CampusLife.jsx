import React from 'react';
import { motion } from 'framer-motion';

const CampusLife = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Campus Life</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a]">Life at Monisha Matriculation School Rendadi</h2>
          </div>
          <a href="#" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm">
            View All Photos <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Main Large Image */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="col-span-2 row-span-2 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/life1.png" alt="Library" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="col-span-1 row-span-1 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/news1.png" alt="Classroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="col-span-1 row-span-2 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/life2.png" alt="Science Lab" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="col-span-1 row-span-1 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/news2.png" alt="Studying" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="col-span-2 row-span-1 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/life3.png" alt="Outdoors" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="col-span-1 row-span-1 rounded-2xl overflow-hidden bg-gray-100">
            <img src="/news3.png" alt="Recreation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>

        </div>
        
        <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm">
                View All Photos <span className="ml-1">→</span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default CampusLife;
