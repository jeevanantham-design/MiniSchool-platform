import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "1", title: "Online Inquiry", desc: "Submit the basic inquiry form online" },
  { num: "2", title: "Registration", desc: "Pay registration fee & fill detailed form" },
  { num: "3", title: "Assessment", desc: "Entrance test & interactive session" },
  { num: "4", title: "Verification", desc: "Document evaluation and eligibility check" },
  { num: "5", title: "Admission", desc: "Final offer letter & enrollment payment" }
];

const AdmissionProcedure = () => {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-green-600 font-bold uppercase tracking-widest text-[10px] mb-3">Step-by-Step</p>
        <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-20">Our Admission Procedure</h2>
        
        <div className="flex flex-col md:flex-row items-start justify-between relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-gray-100 -z-10"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center w-full md:w-1/5 mb-8 md:mb-0"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-4 border-2 ${idx === 0 || idx === 1 ? 'border-blue-600 text-blue-600 bg-white' : 'border-gray-200 text-gray-400 bg-white'} shadow-sm`}>
                {step.num}
              </div>
              <h3 className="font-bold text-gray-900 text-xs mb-2">{step.title}</h3>
              <p className="text-[10px] text-gray-500 max-w-[150px] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcedure;
