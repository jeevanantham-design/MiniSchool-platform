import React from 'react';
import { motion } from 'framer-motion';

const eligibility = [
  { icon: "👶", title: "Early Years (LKG - UKG)", desc: "Age: 3+ to 5+ Years" },
  { icon: "🎒", title: "Primary (Grade 1 - 5)", desc: "Age: 5+ to 9+ Years" },
  { icon: "🎓", title: "Secondary (Grade 6 - 12)", desc: "Age: 10+ to 16+ Years" }
];

const fees = [
  { grade: "Early Years (Foundation)", amount: "$4,200" },
  { grade: "Primary (Grade 1-5)", amount: "$5,800" },
  { grade: "Middle (Grade 6-8)", amount: "$7,500" },
  { grade: "High (Grade 9-10)", amount: "$9,200" },
  { grade: "Senior (Grade 11-12)", amount: "$12,500" },
];

const EligibilityAndFees = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Eligibility Column */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-3">Grade Levels</p>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">Eligibility & Criteria</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-sm">
              We follow an age-appropriate admission policy to ensure students are placed in an environment where they can thrive academically and socially.
            </p>
            
            <div className="space-y-4">
              {eligibility.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                  <div className="text-gray-300">›</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fees Column */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 max-w-lg ml-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Fee Structure (Annual)</h3>
            <div className="space-y-6">
              {fees.map((fee, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <span className="text-sm text-gray-600">{fee.grade}</span>
                  <span className="font-bold text-blue-600 text-sm">{fee.amount}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-blue-50/50 p-4 rounded-xl flex items-start gap-3">
              <span className="text-blue-400 mt-0.5 text-sm">ⓘ</span>
              <p className="text-[10px] text-blue-800/80 leading-relaxed">
                Note: Fees are exclusive of uniform, transportation, and special facilities. Transportation costs vary based on distance.
              </p>
            </div>
            <button onClick={() => alert("Redirecting to secured payment gateway...")} className="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
              Pay Admission Fee Online
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EligibilityAndFees;
