import React from 'react';
import { Bell, Calendar, Download, FileText } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Pradhan Mantri Awas Yojana Registration',
    date: 'Oct 12, 2024',
    category: 'Scheme',
    content: 'The registration camp for PMAY will be held at the Panchayat Bhawan next week from Monday to Wednesday. All eligible citizens must bring their Aadhaar card, Ration card, and recent passport size photographs.',
    hasAttachment: true,
  },
  {
    id: 2,
    title: 'Water Supply Interruption in Ward 3 & 4',
    date: 'Oct 10, 2024',
    category: 'Alert',
    content: 'Due to major pipeline repair work near the main water tank, water supply in Ward 3 and 4 will be interrupted tomorrow from 10 AM to 4 PM. Please store adequate water.',
    hasAttachment: false,
  },
  {
    id: 3,
    title: 'Gram Sabha Meeting - November',
    date: 'Oct 05, 2024',
    category: 'Meeting',
    content: 'The upcoming Gram Sabha meeting is scheduled for November 1st at 11:00 AM at the Panchayat courtyard. Key agendas include budget allocation for the new road construction and sanitation review.',
    hasAttachment: true,
  },
  {
    id: 4,
    title: 'Kisan Credit Card (KCC) Renewal',
    date: 'Oct 01, 2024',
    category: 'Agriculture',
    content: 'Farmers who need to renew their Kisan Credit Cards can meet the bank representatives at the Panchayat office on Friday. Please bring your land records and previous KCC passbook.',
    hasAttachment: false,
  }
];

const Notices = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
            <Bell size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark">Notice Board</h1>
            <p className="text-slate-600 mt-1">Official announcements and updates from the Panchayat</p>
          </div>
        </div>

        <div className="space-y-6">
          {notices.map(notice => (
            <div key={notice.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${notice.category === 'Alert' ? 'bg-red-100 text-red-700' : 
                      notice.category === 'Scheme' ? 'bg-green-100 text-green-700' : 
                      notice.category === 'Meeting' ? 'bg-blue-100 text-blue-700' : 
                      'bg-purple-100 text-purple-700'}`}
                  >
                    {notice.category}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm gap-1">
                    <Calendar size={14} /> {notice.date}
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-dark mb-3">{notice.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-4">{notice.content}</p>
              
              {notice.hasAttachment && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg transition-colors">
                    <FileText size={16} /> Official Document <Download size={16} className="ml-2" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
