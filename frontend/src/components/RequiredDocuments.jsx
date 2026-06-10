import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, LogOut, Camera, FileCheck2, UserCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const docs = [
  { icon: <ScrollText className="text-blue-600 w-5 h-5"/>, color: "bg-blue-50", title: "Birth Certificate", desc: "Issued by the municipal corporation or competent authority." },
  { icon: <LogOut className="text-green-600 w-5 h-5"/>, color: "bg-green-50", title: "Transfer Certificate", desc: "Original copy from previous school (not required for LKG)." },
  { icon: <Camera className="text-teal-600 w-5 h-5"/>, color: "bg-teal-50", title: "Passport Photos", desc: "Recent white background photograph (Student & Parents)." },
  { icon: <UserCheck className="text-teal-600 w-5 h-5"/>, color: "bg-teal-50", title: "Aadhaar Card", desc: "Copy of Aadhaar card for both student and parents." },
  { icon: <FileCheck2 className="text-green-600 w-5 h-5"/>, color: "bg-green-50", title: "Marksheet", desc: "Academic records from the last 2 years of previous school." },
  { icon: <Activity className="text-green-600 w-5 h-5"/>, color: "bg-green-50", title: "Medical Certificate", desc: "Basic health and vaccination report by a certified doctor." }
];

const RequiredDocuments = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-3">Checklist</p>
        <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-4">Required Documents</h2>
        <p className="text-gray-500 text-sm mb-16">Keep digital copies ready for upload in PDF or JPEG format. (Max 2MB per file)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {docs.map((doc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 text-left hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${doc.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {doc.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs mb-1.5">{doc.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-[200px]">{doc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
          <Link to="/apply" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md mb-3 inline-block">
            Ready to Start? Apply Now
          </Link>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-2">Estimated Time To Complete: 10 Minutes</p>
        </motion.div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
