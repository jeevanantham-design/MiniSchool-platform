import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, MapPin, FileText, Image as ImageIcon, File, ShieldCheck, Info, Calendar, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ApplyOnline = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    classApplying: '',
    fatherName: '',
    motherName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [files, setFiles] = useState({
    photo: null,
    birthCert: null,
    marksheet: null
  });

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.classApplying) {
      alert("Please fill in the Student Name and Class Applying For at minimum.");
      return;
    }

    const newId = `MMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const applicationData = {
      id: newId,
      name: formData.studentName,
      grade: formData.classApplying,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Approved'
    };

    localStorage.setItem(`monisha_app_${newId}`, JSON.stringify(applicationData));
    setGeneratedId(newId);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Application Submitted!</h2>
          <p className="text-gray-500 mb-8">Your application has been successfully saved to our system.</p>
          
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-6 mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Your Application ID</p>
            <p className="text-3xl font-bold text-blue-600 tracking-wider">{generatedId}</p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            Please save this ID. You will need it to track your admission status.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate(`/status?id=${generatedId}`)}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Track Status Now
            </button>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-white text-gray-700 font-semibold py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              Submit Another Application
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-3">
            Online Application Portal
          </h1>
          <p className="text-gray-500 text-sm">
            Academic Year 2026-2027. Please ensure all details match your official documents.
          </p>
        </div>

        {/* Steps Tracker */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
          <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto px-4">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gray-100 -z-10 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Student</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Parent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Address</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">4</div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Uploads</span>
            </div>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit}>
            
            {/* Student Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Student Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Legal Name *</label>
                  <input required name="studentName" value={formData.studentName} onChange={handleInputChange} type="text" placeholder="Enter student's full name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Date of Birth *</label>
                  <div className="relative">
                    <input required name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0" />
                    <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Gender *</label>
                  <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Class Applying For *</label>
                  <select required name="classApplying" value={formData.classApplying} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none">
                    <option value="">Select Grade Level</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Parent Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Parent / Guardian Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Father's Name *</label>
                  <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} type="text" placeholder="Enter father's name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Mother's Name *</label>
                  <input name="motherName" value={formData.motherName} onChange={handleInputChange} type="text" placeholder="Enter mother's name" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-slate-100 text-gray-500 text-sm font-medium">+1</span>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="(555) 000-0000" className="flex-1 w-full bg-slate-50 border border-gray-200 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="parent@example.com" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Address */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <MapPin size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Communication Address</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Residential Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="Street, Apartment, Locality" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">City *</label>
                    <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">State *</label>
                    <input name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pincode *</label>
                    <input name="pincode" value={formData.pincode} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Required Documents */}
            <section>
               <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                  <FileText size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Required Documents</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6 pl-12">Supported formats: PDF, JPG, PNG. Maximum size 5MB per file.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* File Upload Box 1 */}
                <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileChange(e, 'photo')} />
                  <ImageIcon size={24} className={`mb-3 transition-colors ${files.photo ? 'text-blue-500' : 'text-gray-300 group-hover:text-blue-500'}`} />
                  <p className="text-[10px] font-bold text-gray-900 mb-1 uppercase tracking-wider">Student Photo</p>
                  {files.photo ? (
                    <p className="text-[10px] text-blue-600 font-semibold truncate w-full px-2" title={files.photo.name}>{files.photo.name}</p>
                  ) : (
                     <p className="text-[10px] text-blue-600 font-semibold group-hover:underline">SELECT FILE</p>
                  )}
                </label>

                {/* File Upload Box 2 */}
                <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileChange(e, 'birthCert')} />
                  <File size={24} className={`mb-3 transition-colors ${files.birthCert ? 'text-blue-500' : 'text-gray-300 group-hover:text-blue-500'}`} />
                  <p className="text-[10px] font-bold text-gray-900 mb-1 uppercase tracking-wider">Birth Certificate</p>
                  {files.birthCert ? (
                    <p className="text-[10px] text-blue-600 font-semibold truncate w-full px-2" title={files.birthCert.name}>{files.birthCert.name}</p>
                  ) : (
                     <p className="text-[10px] text-blue-600 font-semibold group-hover:underline">SELECT FILE</p>
                  )}
                </label>

                {/* File Upload Box 3 */}
                <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFileChange(e, 'marksheet')} />
                  <File size={24} className={`mb-3 transition-colors ${files.marksheet ? 'text-blue-500' : 'text-gray-300 group-hover:text-blue-500'}`} />
                  <p className="text-[10px] font-bold text-gray-900 mb-1 uppercase tracking-wider">Past Marksheet</p>
                  {files.marksheet ? (
                    <p className="text-[10px] text-blue-600 font-semibold truncate w-full px-2" title={files.marksheet.name}>{files.marksheet.name}</p>
                  ) : (
                     <p className="text-[10px] text-blue-600 font-semibold group-hover:underline">SELECT FILE</p>
                  )}
                </label>

              </div>
            </section>

            {/* Actions */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={16} />
                Secure Data Encryption Active
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button type="button" className="flex-1 md:flex-none px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Draft Save
                </button>
                <button type="submit" className="flex-1 md:flex-none px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors">
                  Submit Application
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Support Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Info size={16} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Need assistance?</h4>
            <p className="text-xs text-gray-600">
              Call our admission helpdesk at <span className="font-medium">+1 (555) 123-4567</span> or visit the <a href="#" className="font-semibold text-blue-600 hover:underline">Contact Page</a> for technical support.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ApplyOnline;
