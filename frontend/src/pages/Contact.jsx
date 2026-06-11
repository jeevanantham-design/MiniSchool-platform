import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: "When do admissions open for the 2026-2027 academic year?", a: "Admissions are currently open! You can submit an initial application through our 'Apply Online' portal. Seats are filled on a rolling basis." },
  { q: "What documents are required for the admission process?", a: "You will need a Birth Certificate, Transfer Certificate (if applicable), Passport Photos, Aadhaar Card, previous Marksheets, and a Medical Certificate." },
  { q: "Do you offer transportation services?", a: "Yes, we operate a fleet of safe, well-maintained buses across various routes. Routes and fees are determined based on your exact location." },
  { q: "What extracurricular activities are available?", a: "We offer a wide range of activities including indoor/outdoor sports, arts and crafts, music, debate clubs, and dedicated skill programs to ensure holistic development." },
  { q: "Is there an entrance exam?", a: "Yes, applicants for Grade 1 and above undergo a brief academic assessment in English and Mathematics to help us understand their learning level and ensure proper placement." }
];

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
      >
        <span className="font-bold text-gray-900 text-sm">{q}</span>
        <span className={`text-blue-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </button>
      <motion.div 
        initial={false} 
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} 
        className="overflow-hidden bg-slate-50/50"
      >
        <div className="px-6 pb-6">
          <div className="w-full border-t border-gray-100 mb-4"></div>
          <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
        </div>
      </motion.div>
    </div>
  );
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message.');
      }

      alert("Thank you! Your message has been sent to the appropriate department. We will get back to you shortly.");
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Header */}
      <section className="pt-24 pb-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <MessageSquare size={12} /> Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
              Connect with <span className="text-blue-600">Our Community.</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
              Have questions about admissions, academic programs, or campus life? We're here to help you navigate your journey at Monisha Matriculation School Rendadi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column (Info) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-5/12 space-y-12"
            >
              
              {/* General Contact Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-6">General Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs mb-1">School Address</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">3947+G47, Rendadi Main Rd, Pendadi, Tamil Nadu 631102</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs mb-1">Phone Numbers</h4>
                      <p className="text-[11px] text-gray-500">Main Office: +1 (555) 123-4567</p>
                      <p className="text-[11px] text-gray-500">Reception: +1 (555) 123-4568</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs mb-1">Email Address</h4>
                      <p className="text-[11px] text-gray-500">admissions@monishaschool.edu</p>
                      <p className="text-[11px] text-gray-500">info@monishaschool.edu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <h3 className="font-bold text-gray-900 mb-6">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Monday — Friday</span>
                    <span className="font-bold text-gray-900">8:00 AM – 4:00 PM</span>
                  </div>
                  <div className="w-full border-t border-gray-100"></div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Saturday</span>
                    <span className="font-bold text-gray-900">9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="w-full border-t border-gray-100"></div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-bold text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div>
                <h3 className="font-bold text-gray-900 mb-6">Department Contacts</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 text-xs mb-1">Admissions Office</h4>
                    <p className="text-[10px] text-gray-500">admissions@monishaschool.edu • Ext. 102</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 text-xs mb-1">Academic Affairs</h4>
                    <p className="text-[10px] text-gray-500">academics@monishaschool.edu • Ext. 200</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 text-xs mb-1">Facilities & Transport</h4>
                    <p className="text-[10px] text-gray-500">facilities@monishaschool.edu • Ext. 301</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Column (Message Form) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-7/12"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Send Us a Message</h2>
                <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                  Complete the form below and a representative from the relevant department will contact you within 24 hours.
                </p>

                <form className="space-y-6" onSubmit={handleSendMessage}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="j.doe@example.com" className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Campus Tour">Campus Tour</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Your Message *</label>
                    <textarea required name="message" value={formData.message} onChange={handleInputChange} rows="5" placeholder="How can we help you?" className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white font-semibold flex items-center justify-center px-8 py-3.5 rounded-xl text-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 h-[400px] w-full bg-gray-200"
          >
            <iframe 
              src="https://www.google.com/maps?q=monisha%20school%20rendadi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Monisha Matriculation School Rendadi Map Location"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 pb-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
               FAQs
            </span>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Find quick answers to some of the most common questions about Monisha Matriculation School Rendadi's admissions, academics, and campus policies.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Join Our Family?</h2>
            <p className="text-blue-100 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
              Start your child's journey today with our simple online application process. We are currently accepting applications for the 2026-2027 academic year.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/apply" className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-slate-50 transition w-full sm:w-auto shadow-md">
                Apply Online Now
              </Link>
              <button onClick={() => alert("Prospectus PDF is currently being updated for the 2026-2027 year. Please check back later!")} className="bg-blue-700/50 border border-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-blue-700/80 transition w-full sm:w-auto">
                Download Prospectus
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
