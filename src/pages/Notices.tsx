import React, { useEffect, useState } from 'react';
import { Bell, Calendar, Download, FileText, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  hasAttachment: boolean;
  createdAt: string;
}

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notices');
        const data = await response.json();
        if (data.success) {
          setNotices(data.data);
        } else {
          setError('Failed to fetch notices');
        }
      } catch (err) {
        console.error(err);
        setError('Network error occurred while fetching notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary-500" />
            <p>Loading official notices...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-1">Error Loading Notices</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : notices.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-500 text-lg">No notices available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={notice._id} 
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
