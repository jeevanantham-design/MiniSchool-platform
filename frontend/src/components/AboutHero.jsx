import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="pt-24 pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4"
          >
            About Ayyan Matriculation School
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a]"
          >
            Cultivating the Leaders <br/> 
            <span className="text-blue-600 italic">of Tomorrow.</span>
          </motion.h1>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-50 transform -translate-x-4 translate-y-4 rounded-[2rem] -z-10"></div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/4]">
              <img src="/about_hero.png" alt="Students walking on campus" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Our Story</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">
              Established with Purpose, grown with Passion.
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Founded in 1985, Ayyan Matriculation School has grown from a humble institution to a beacon of educational excellence. Over the past four decades, we have remained steadfast in our commitment to nurturing brilliant minds and shaping compassionate leaders. Our journey has been defined by an unwavering dedication to academic rigor, holistic development, and the holistic growth of every child.
              </p>
              <p>
                From opening our first digital laboratory to launching international exchange programs, each milestone has been a stepping stone towards redefining modern pedagogy and setting new benchmarks in education.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
