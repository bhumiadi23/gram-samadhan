import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MapPin, FileText, Bell, Users, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Grievance from './pages/Grievance';
import Notices from './pages/Notices';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
                <MapPin className="text-primary-100" />
                <span>Gram Samadhan</span>
              </Link>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-8">
                <Link to="/" className="hover:text-primary-100 font-medium transition-colors">Home</Link>
                <Link to="/grievance" className="hover:text-primary-100 font-medium transition-colors">Grievances</Link>
                <Link to="/notices" className="hover:text-primary-100 font-medium transition-colors">Notice Board</Link>
              </nav>

              <div className="hidden md:flex gap-3">
                <button className="px-4 py-2 bg-white text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-colors">Login</button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-primary-700 pb-4 px-4 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium hover:text-primary-200">Home</Link>
              <Link to="/grievance" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium hover:text-primary-200">Grievances</Link>
              <Link to="/notices" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium hover:text-primary-200">Notice Board</Link>
              <button className="w-full mt-2 py-2 bg-white text-primary-700 font-medium rounded-lg">Login</button>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/notices" element={<Notices />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-4">
                <MapPin className="text-primary-500" /> Gram Samadhan
              </h3>
              <p className="text-sm text-slate-400">
                Empowering rural governance with digital transparency and swift grievance redressal.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/grievance" className="hover:text-white transition-colors">File a Complaint</Link></li>
                <li><Link to="/notices" className="hover:text-white transition-colors">Latest Notices</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Panchayat Members</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>1800-123-GRAM (Toll Free)</li>
                <li>support@gramsamadhan.gov.in</li>
                <li>Panchayat Bhawan, Main Road</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Gram Samadhan. All rights reserved. Built by Aditya.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
