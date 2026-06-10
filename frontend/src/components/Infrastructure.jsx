import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Microscope, Trophy, Palette, Shield, Bus } from 'lucide-react';

const facilities = [
  { icon: <Laptop className="w-5 h-5 text-blue-600" />, title: "Digital Library", desc: "Access to over 50,000 e-books, journals, and a global database of academic resources." },
  { icon: <Microscope className="w-5 h-5 text-green-600" />, title: "Smart Science Labs", desc: "State-of-the-art AI-integrated labs for Physics, Chemistry, and Biological sciences." },
  { icon: <Trophy className="w-5 h-5 text-orange-600" />, title: "Sports Complex", desc: "Olympic-sized pool, indoor arenas, and expansive outdoor athletics tracks." },
  { icon: <Palette className="w-5 h-5 text-purple-600" />, title: "Arts Center", desc: "Dedicated spaces for music, sculpting, theater, and multimedia content creation." },
  { icon: <Shield className="w-5 h-5 text-rose-600" />, title: "Safe Playground", desc: "Secured, eco-friendly play areas with high-grade shock-absorbent surfaces." },
  { icon: <Bus className="w-5 h-5 text-teal-600" />, title: "Smart Transport", desc: "GPS-enabled fleet equipped with live tracking to ensure secure daily transits." },
];

const Infrastructure = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Infrastructure</p>
          <h2 className="text-3xl font-extrabold text-[#1a1a1a]">World-Class Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                {facility.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{facility.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
