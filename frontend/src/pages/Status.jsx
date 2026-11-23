import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Hash, BadgeCheck, Download, CreditCard, Clock, FileText, CheckCircle2, AlertCircle, Users, Award, ShieldCheck } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const fallbackMock = {
  id: 'MMS-2026-9842',
  name: 'Marcus Sterling',
  grade: 'Grade 9',
  date: 'Jan 12, 2024',
  status: 'Approved'
};

const findLocalApplication = (applicationId) => {
  const normalizedId = applicationId.trim();
  if (!normalizedId) {
    return { appData: null, error: '', searched: false };
  }

  const storedStr = localStorage.getItem(`monisha_app_${normalizedId}`);
  if (storedStr) {
    return { appData: JSON.parse(storedStr), error: '', searched: true };
  }

  if (normalizedId.toUpperCase() === fallbackMock.id) {
    return { appData: fallbackMock, error: '', searched: true };
  }

  return {
    appData: null,
    error: "We couldn't find an application matching this ID. Please check and try again.",
    searched: true
  };
};

const fetchApplication = async (applicationId) => {
  const normalizedId = applicationId.trim();
  if (!normalizedId) {
    return { appData: null, error: '', searched: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/applications/${encodeURIComponent(normalizedId)}`);
    const result = await response.json();

    if (response.status === 404) {
      return { appData: null, error: result.message, searched: true };
    }

    if (!response.ok) {
      throw new Error(result.message || 'Unable to check application status.');
    }

    return { appData: result, error: '', searched: true };
  } catch (error) {
    const localResult = findLocalApplication(normalizedId);
    if (localResult.appData) {
      return localResult;
    }

    return {
      appData: null,
      error: error.message || 'Unable to check application status. Please try again later.',
      searched: true
    };
  }
};

const Status = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [searchInput, setSearchInput] = useState(initialId);
  const [appData, setAppData] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(Boolean(initialId));

  const runSearch = async (applicationId) => {
    setIsSearching(true);
    const result = await fetchApplication(applicationId);
    setError(result.error);
    setAppData(result.appData);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchInput.trim()) return;

    runSearch(searchInput);
  };

  useEffect(() => {
    let isActive = true;

    if (!initialId) {
      return () => {
        isActive = false;
      };
    }

    fetchApplication(initialId).then((result) => {
      if (!isActive) {
        return;
      }

      setError(result.error);
      setAppData(result.appData);
      setIsSearching(false);
    });

    return () => {
      isActive = false;
    };
  }, [initialId]);

  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4">
            Track Your Admission
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your unique application ID to see real-time updates on your enrollment progress.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex items-center">
            <div className="pl-4 pr-3 text-gray-400">
              <Hash size={18} />
            </div>
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="MMS-2026-XXXX"
              className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 font-medium tracking-wide uppercase"
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <Search size={16} /> <span className="hidden sm:inline">{isSearching ? 'Checking...' : 'Check Status'}</span>
            </button>
          </div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center mt-4">
              {error}
            </motion.p>
          )}
        </form>

        {/* Results Area */}
        {appData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Applicant Summary */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Application #{appData.id}</p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Student: {appData.name}</h2>
                  <p className="text-xs text-gray-500">{appData.grade} • Applied on {appData.date}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-xs shadow-sm self-start">
                  <BadgeCheck size={14} /> Approved
                </div>
              </div>

              {/* Congratulations Box */}
              <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-2">Congratulations! You're In.</h3>
                    <p className="text-xs text-green-800/80 leading-relaxed mb-6 max-w-lg">
                      Ayyan Matriculation School is pleased to offer {appData.name.split(' ')[0]} a seat for the 2026-2027 academic year. We were impressed by your academic record and interview performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => alert("Downloading Admission Letter PDF...")} className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm">
                        <Download size={14} /> Admission Letter
                      </button>
                      <button onClick={() => alert("Redirecting to secured payment gateway...")} className="bg-white hover:bg-green-50 text-green-700 font-medium border border-green-200 px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors">
                        <CreditCard size={14} /> Pay Admission Fees
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">Document Checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={16}/></div>
                      <span className="text-xs font-semibold text-gray-700">Birth Certificate</span>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 tracking-wider">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={16}/></div>
                      <span className="text-xs font-semibold text-gray-700">School Transcripts</span>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 tracking-wider">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={16}/></div>
                      <span className="text-xs font-semibold text-gray-700">Passport Photo</span>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 tracking-wider">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-orange-100 rounded-xl bg-orange-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><Clock size={16}/></div>
                      <span className="text-xs font-semibold text-gray-700">Transfer Certificate</span>
                    </div>
                    <span className="text-[9px] font-bold text-orange-600 tracking-wider">REQUIRED</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Timeline Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 text-sm">Admission Timeline</h3>
                
                <div className="relative pl-3 space-y-6">
                  {/* Vertical line connecting icons */}
                  <div className="absolute left-[27px] top-6 bottom-8 w-[2px] bg-gray-100 -z-0"></div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white"><FileText size={16}/></div>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-900">Application Submitted</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Completed on {appData.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white"><ShieldCheck size={16}/></div>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-900">Academic Assessment</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Passed with Honors</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white"><Users size={16}/></div>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-900">Personal Interview</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Conducted successfully</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white"><BadgeCheck size={16}/></div>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-green-700">Admission Decision</h4>
                      <p className="text-[10px] text-green-600 mt-0.5 font-medium">Approved recently</p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-300 flex items-center justify-center flex-shrink-0"><CreditCard size={14}/></div>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-400">Fee Payment</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Pending Enrollment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Assistance Blue Box */}
              <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-200 text-white relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-20"><AlertCircle size={100} /></div>
                <div className="relative z-10">
                  <h3 className="font-bold mb-2">Need Assistance?</h3>
                  <p className="text-xs text-blue-100 leading-relaxed mb-6">
                    If you're having trouble tracking your ID, our team is here to help.
                  </p>
                  <Link to="/contact" className="bg-white text-blue-600 font-bold flex items-center justify-center px-5 py-2.5 rounded-xl text-xs shadow-sm hover:!bg-slate-50 transition w-full">
                    Contact Support
                  </Link>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {isSearching && (
          <div className="text-center text-gray-500 my-10">
            Scanning records...
          </div>
        )}

      </div>
    </main>
  );
};

export default Status;
