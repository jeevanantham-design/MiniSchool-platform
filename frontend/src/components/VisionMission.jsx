import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              To be a global benchmark for transformative education, where every child is empowered to discover their unique potential, embrace innovation, and contribute meaningfully to an interconnected world.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-blue-600 p-10 rounded-3xl shadow-xl shadow-blue-200 text-white transform md:translate-y-4"
          >
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-50 leading-relaxed text-sm">
              To provide a dynamic and inclusive learning environment that blends rigorous academics with character development, equipping students with the critical thinking agility to navigate the complexities of the 21st century.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;
