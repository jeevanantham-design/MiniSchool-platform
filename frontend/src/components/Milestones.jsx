import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "#01", title: "Ranked STEM School", desc: "Awarded top ranking by National Education Board for 3 consecutive years." },
  { value: "50+", title: "Modern Facilities", desc: "Digital labs, aquatic centers, smart arenas right here on campus." },
  { value: "98%", title: "Ivy Placement", desc: "Exceptional placement rates in top-tier global universities." },
  { value: "2022", title: "Green School Award", desc: "Recognized for our 100% sustainable energy campus initiative." },
];

const Milestones = () => {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-3">Milestones</p>
          <h2 className="text-3xl font-extrabold text-white">Milestones of Excellence</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-left border-t border-gray-800 pt-8"
            >
              <h3 className="text-5xl font-extrabold text-[#10B981] mb-2">{stat.value}</h3>
              <h4 className="text-white font-bold text-lg mb-2">{stat.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
