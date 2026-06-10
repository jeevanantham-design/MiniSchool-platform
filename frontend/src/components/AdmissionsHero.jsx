import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BadgeCheck, FileText, Wallet } from 'lucide-react';

const cards = [
  { icon: <Calendar className="w-6 h-6 text-blue-600" />, title: "Timeline", desc: "Key dates and assessment details" },
  { icon: <BadgeCheck className="w-6 h-6 text-green-600" />, title: "Eligibility", desc: "Age and academic requirements" },
  { icon: <FileText className="w-6 h-6 text-orange-600" />, title: "Documents", desc: "Essential list before submission" },
  { icon: <Wallet className="w-6 h-6 text-purple-600" />, title: "Fees", desc: "Structure for different grades" }
];

const AdmissionsHero = () => {
  return (
    <section className="pt-24 pb-16 bg-slate-50 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-4 font-semibold">Home / <span className="text-blue-600">Admissions</span></p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4">
          Admission <span className="text-blue-600">Guide 2026-27</span>
        </h1>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed text-sm">
          Your journey to a transformative education starts here. Review our eligibility, dates, and process to begin your application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-[150px]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionsHero;
