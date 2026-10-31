import React from 'react';
import { motion } from 'framer-motion';

const PrincipalMessage = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/4] shadow-xl">
                <img src="/principal.png" alt="Principal Dr. Helena Vance" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 -right-6 lg:left-6 lg:right-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 w-56 transform translate-x-2 md:translate-x-0">
                <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Dr. Helena Vance</h4>
                  <p className="text-xs text-gray-500">Principal, Ayyan Matriculation School</p>
                </div>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Principal's Message</p>
              <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-8 leading-tight">
                "Education is not the filling of a pail, but the lighting of a fire."
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  At Ayyan Matriculation School, we believe that education extends far beyond the four walls of a classroom. It is an intricate, continuous process of sparking curiosity, fostering creativity, and cultivating character that prepares students to lead with empathy and excellence.
                </p>
                <p>
                  We invite you to join our thriving community where every student is encouraged to ask profound questions, explore diverse perspectives, and take meaningful action toward creating a better, more interconnected tomorrow.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900">Dr. Helena Vance</h4>
                <p className="text-xs text-gray-500 mt-1">Ph.D. in Educational Leadership, Harvard University</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
