import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Digital Gram Panchayat <br /> <span className="text-primary-200">At Your Service</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              A transparent, efficient, and accessible platform for rural governance. File grievances, track status, and stay updated with village notices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/grievance" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 flex items-center justify-center gap-2">
                <ShieldAlert size={20} /> File a Grievance
              </Link>
              <Link to="/notices" className="btn-secondary border-primary-400 bg-transparent text-white hover:bg-primary-600 flex items-center justify-center gap-2">
                <Bell size={20} /> View Notices
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="py-16 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 border border-slate-100"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Submission</h3>
              <p className="text-slate-600">Register complaints regarding water, electricity, roads, or sanitation in under 2 minutes.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
              <p className="text-slate-600">Get a unique tracking ID and monitor the progress of your grievance resolution in real-time.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 border border-slate-100"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Updates</h3>
              <p className="text-slate-600">Stay informed with the latest panchayat announcements, schemes, and community events.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Updates Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-2">Recent Notices</h2>
              <p className="text-slate-600">Latest announcements from the Sarpanch office.</p>
            </div>
            <Link to="/notices" className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">Scheme</span>
              <h3 className="text-lg font-bold mt-3 mb-2">Pradhan Mantri Awas Yojana Registration</h3>
              <p className="text-slate-600 text-sm mb-4">The registration camp for PMAY will be held at the Panchayat Bhawan next week. All eligible citizens must bring their Aadhaar and Ration cards.</p>
              <div className="text-xs text-slate-400">Posted on: Oct 12, 2024</div>
            </div>
            <div className="p-5 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Alert</span>
              <h3 className="text-lg font-bold mt-3 mb-2">Water Supply Interruption</h3>
              <p className="text-slate-600 text-sm mb-4">Due to pipeline repair work, water supply in Ward 3 and 4 will be interrupted tomorrow from 10 AM to 4 PM.</p>
              <div className="text-xs text-slate-400">Posted on: Oct 10, 2024</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
