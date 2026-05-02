import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, CheckCircle } from 'lucide-react';

const Grievance = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('track');
    }, 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-dark mb-4">Grievance Portal</h1>
          <p className="text-slate-600">Submit a new complaint or track the status of an existing one.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button 
              className={`flex-1 py-4 font-medium text-center ${activeTab === 'submit' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('submit')}
            >
              Submit Grievance
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center ${activeTab === 'track' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('track')}
            >
              Track Status
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'submit' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Grievance Submitted!</h3>
                    <p className="text-slate-600 mb-6">Your complaint has been successfully registered.</p>
                    <div className="bg-slate-100 inline-block px-4 py-2 rounded-lg text-lg font-mono font-bold tracking-widest text-dark">
                      GRV-8492-MK
                    </div>
                    <p className="text-sm text-slate-500 mt-4">Please save this tracking ID for future reference.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input required type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="10-digit number" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                          <option value="">Select a category</option>
                          <option value="water">Water Supply</option>
                          <option value="electricity">Electricity / Street Lights</option>
                          <option value="road">Road Maintenance</option>
                          <option value="sanitation">Sanitation & Garbage</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ward Number</label>
                        <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                          <option value="">Select ward</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(w => <option key={w} value={w}>Ward {w}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none" placeholder="Please describe your issue in detail..."></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Attach Photo (Optional)</label>
                      <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer" />
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 flex justify-center items-center gap-2 text-lg">
                      <Send size={20} /> Submit Grievance
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6">
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <input type="text" className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg font-mono uppercase" placeholder="Enter Tracking ID (e.g., GRV-8492-MK)" />
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  </div>
                  <button className="w-full mt-4 btn-secondary py-3">Check Status</button>
                </div>

                <div className="mt-12 p-6 border border-slate-200 rounded-lg bg-slate-50 hidden">
                  {/* Mock status result - currently hidden to keep UI clean, would be conditionally rendered */}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
