import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const allEvents = [
  { date: "2026-06-15", title: "Academic Year Begins", type: "academic" },
  { date: "2026-07-04", title: "Science Exhibition", type: "event" },
  { date: "2026-08-15", title: "Independence Day", type: "holiday" },
  { date: "2026-09-10", title: "Term 1 Start", type: "exam" },
  { date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
  { date: "2026-11-14", title: "Children's Day", type: "event" },
  { date: "2026-12-24", title: "Winter Vacation starts", type: "holiday" },
  { date: "2027-01-26", title: "Republic Day", type: "holiday" },
  { date: "2027-02-28", title: "National Science Day", type: "event" },
  { date: "2027-03-15", title: "Final Exams", type: "exam" },
  { date: "2026-06-05", title: "Staff Orientation", type: "academic" },
  { date: "2026-06-25", title: "Parent-Teacher Meet", type: "event" }
];

const colorMap = {
  academic: 'bg-blue-100 text-blue-700 border-blue-200',
  event: 'bg-purple-100 text-purple-700 border-purple-200',
  exam: 'bg-red-100 text-red-700 border-red-200',
  holiday: 'bg-green-100 text-green-700 border-green-200'
};

const Calendar = () => {
  const currentDateInitial = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(currentDateInitial.getFullYear(), currentDateInitial.getMonth(), 1));

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getEventsForDate = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(e => e.date === dateString);
  };

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const trailingBlanks = Array.from({ length: (7 - ((blanks.length + days.length) % 7)) % 7 }, (_, i) => i);

  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] leading-tight">Academic Calendar</h1>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">2026 - 2027 Schedule</p>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-200 p-1.5">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="px-6 font-bold text-gray-800 text-lg min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 px-1">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide"><span className="w-3 h-3 rounded bg-blue-500"></span> Academic</div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide"><span className="w-3 h-3 rounded bg-purple-500"></span> Event</div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide"><span className="w-3 h-3 rounded bg-red-400"></span> Exam</div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide"><span className="w-3 h-3 rounded bg-green-500"></span> Holiday</div>
        </div>

        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-slate-50/50">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest border-r border-gray-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Dates Grid */}
          <div className="grid grid-cols-7 auto-rows-fr bg-gray-100 gap-px">
            {blanks.map(blank => (
              <div key={`blank-${blank}`} className="bg-slate-50 min-h-[140px] p-2 opacity-50"></div>
            ))}
            
            {days.map(day => {
              const dayEvents = getEventsForDate(day);
              
              const today = new Date();
              const isToday = day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

              return (
                <div key={day} className={`bg-white min-h-[140px] p-2 flex flex-col group transition-colors hover:bg-slate-50 relative ${isToday ? 'ring-2 ring-inset ring-yellow-400 z-10' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full mt-1 ml-1 ${isToday ? 'bg-yellow-400 text-gray-900 shadow-md' : 'text-gray-700 group-hover:bg-gray-100 transition-colors'}`}>
                      {day}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 flex-1 overflow-y-auto w-full px-1 pb-1">
                    {dayEvents.map((evt, idx) => (
                      <div key={idx} title={evt.title} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border shadow-sm truncate cursor-pointer hover:shadow-md transition-shadow ${colorMap[evt.type]}`}>
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {trailingBlanks.map(blank => (
              <div key={`end-blank-${blank}`} className="bg-slate-50 min-h-[140px] p-2 opacity-50"></div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex justify-end">
          <button onClick={() => alert("Downloading 2026-2027 Academic Calendar PDF...")} className="bg-white border-2 border-gray-200 text-gray-700 font-bold px-8 py-3.5 rounded-xl text-sm hover:border-gray-300 transition shadow-sm flex items-center gap-2">
            <Download size={16} /> Download Calendar PDF
          </button>
        </div>

      </div>
    </main>
  );
};

export default Calendar;
