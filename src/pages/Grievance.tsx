import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const Grievance = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  // Track state
  const [searchId, setSearchId] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackError, setTrackError] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '', phone: '', category: '', ward: '', description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ward: parseInt(formData.ward)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTrackingId(data.trackingId);
        setSubmitted(true);
        setFormData({ name: '', phone: '', category: '', ward: '', description: '' });
      } else {
        alert('Failed to submit grievance: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting grievance:', error);
      alert('An error occurred while submitting your grievance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    setTrackLoading(true);
    setTrackError('');
    setTrackResult(null);
    
    try {
      const response = await fetch(`/api/grievances/track/${searchId}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackResult(data.data);
      } else {
        setTrackError(data.message || 'Grievance not found');
      }
    } catch (error) {
      console.error('Error tracking grievance:', error);
      setTrackError('An error occurred. Please try again later.');
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-dark mb-4">Grievance Portal</h1>
          <p className="text-slate-600">Submit a new complaint or track the status of an existing one.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="flex border-b border-slate-200">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'submit' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
              onClick={() => { setActiveTab('submit'); setSubmitted(false); }}
            >
              Submit Grievance
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'track' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('track')}
            >
              Track Status
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'submit' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Grievance Submitted!</h3>
                    <p className="text-slate-600 mb-6">Your complaint has been successfully registered in the system.</p>
                    <div className="bg-slate-100 border border-slate-200 inline-block px-6 py-3 rounded-lg text-xl font-mono font-bold tracking-widest text-dark select-all">
                      {trackingId}
                    </div>
                    <p className="text-sm text-slate-500 mt-4">Please save this tracking ID. You can use it in the 'Track Status' tab.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-600 hover:underline font-medium">Submit another grievance</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" placeholder="10-digit number" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-shadow">
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
                        <select required name="ward" value={formData.ward} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-shadow">
                          <option value="">Select ward</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(w => <option key={w} value={w}>Ward {w}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition-shadow" placeholder="Please describe your issue in detail..."></textarea>
                    </div>

                    <button disabled={loading} type="submit" className="w-full btn-primary py-3 flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />} 
                      {loading ? 'Submitting...' : 'Submit Grievance'}
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="py-6 min-h-[300px]">
                <form onSubmit={handleTrack} className="max-w-md mx-auto">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg font-mono uppercase transition-shadow" 
                      placeholder="e.g., GRV-8492-MK" 
                      required
                    />
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  </div>
                  <button disabled={trackLoading} type="submit" className="w-full mt-4 btn-secondary py-3 flex justify-center items-center gap-2 disabled:opacity-70">
                    {trackLoading ? <Loader2 className="animate-spin" size={20} /> : null}
                    Check Status
                  </button>
                </form>

                {trackError && (
                  <div className="mt-8 max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
                    <AlertCircle className="mt-0.5 shrink-0" size={20} />
                    <p>{trackError}</p>
                  </div>
                )}

                {trackResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 p-6 border border-slate-200 rounded-xl bg-slate-50 shadow-sm max-w-2xl mx-auto">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Tracking ID</p>
                        <h3 className="text-xl font-mono font-bold text-dark">{trackResult.trackingId}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 font-medium mb-1">Current Status</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider
                          ${trackResult.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                            trackResult.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                            trackResult.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                            'bg-red-100 text-red-700'}`}
                        >
                          {trackResult.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-sm md:text-base">
                      <div className="grid grid-cols-3 gap-4">
                        <span className="text-slate-500">Submitted By:</span>
                        <span className="col-span-2 font-medium">{trackResult.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <span className="text-slate-500">Category:</span>
                        <span className="col-span-2 font-medium capitalize">{trackResult.category}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <span className="text-slate-500">Ward:</span>
                        <span className="col-span-2 font-medium">{trackResult.ward}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <span className="text-slate-500">Description:</span>
                        <span className="col-span-2">{trackResult.description}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <span className="text-slate-500">Date Filed:</span>
                        <span className="col-span-2">{new Date(trackResult.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {trackResult.resolutionNotes && (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          <p className="text-sm text-slate-500 mb-2">Resolution Notes:</p>
                          <p className="p-3 bg-white border border-slate-200 rounded-lg italic text-slate-700">"{trackResult.resolutionNotes}"</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
