import React from 'react';
import { motion } from 'framer-motion';

const dates = [
  { date: "NOV 01, 2023", title: "Registrations Begin", desc: "Online portal opens for all grades for the 2024-25 session." },
  { date: "JAN 15, 2024", title: "Assessment Phase 1", desc: "First round of entrance tests and candidate interactions." },
  { date: "FEB 10, 2024", title: "Results Released", desc: "First list of selected candidates published on portal." },
  { date: "MAR 01, 2024", title: "Final Enrollment", desc: "Deadline for fee payment and document verification." }
];

const ImportantDates = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-3">Mark Your Calendar</p>
            <h2 className="text-3xl font-extrabold text-white">Important Admission Dates</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dates.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
              >
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">{item.date}</p>
                <h3 className="text-white font-bold text-sm mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
