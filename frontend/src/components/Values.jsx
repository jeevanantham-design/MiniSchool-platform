import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Heart, Star } from 'lucide-react';

const values = [
  { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "Integrity", text: "Upholding honesty in all actions." },
  { icon: <Globe className="w-6 h-6 text-green-600" />, title: "Diversity", text: "Embracing all cultures & ideas." },
  { icon: <Heart className="w-6 h-6 text-orange-600" />, title: "Kindness", text: "Fostering an empathetic community." },
  { icon: <Star className="w-6 h-6 text-purple-600" />, title: "Excellence", text: "Striving for the highest quality." },
];

const Values = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Our Core</p>
          <h2 className="text-3xl font-extrabold text-[#1a1a1a]">Values That Define Us</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {values.map((v, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                {v.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[150px]">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
