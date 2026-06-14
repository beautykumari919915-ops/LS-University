import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { useEffect } from 'react';

export default function Footer() {
  const { data: settingsList, fetchAll } = useFirestore<any>('settings');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const settings = settingsList.find(s => s.id === 'general') || {
    antiRaggingHelpline: '1800-180-5522',
    grievanceEmail: 'grievance@lsuniversity.ac.in',
    ugcApproval: 'UGC/12B/2005/001'
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold tracking-tighter text-amber-500 mb-4 block">
              <span className="text-white">LS</span> University
            </span>
            <p className="text-sm mt-4 text-slate-400 leading-relaxed">
              Empowering the leaders of tomorrow through excellence in education, research, and innovation. India's premier educational institution.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-amber-400"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-slate-400 hover:text-amber-400"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-slate-400 hover:text-amber-400"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="text-slate-400 hover:text-amber-400"><Linkedin className="w-5 h-5"/></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-amber-400">Courses</Link></li>
              <li><Link to="/admissions" className="hover:text-amber-400">Admissions</Link></li>
              <li><Link to="/placements" className="hover:text-amber-400">Placements</Link></li>
              <li><Link to="/campus-life" className="hover:text-amber-400">Campus Life</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Academics</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/examination" className="hover:text-amber-400">Examination</Link></li>
              <li><Link to="/academic-calendar" className="hover:text-amber-400">Academic Calendar</Link></li>
              <li><Link to="/student-corner" className="hover:text-amber-400">Student Corner</Link></li>
              <li><Link to="/iqac" className="hover:text-amber-400">IQAC / NAAC</Link></li>
              <li><Link to="/research" className="hover:text-amber-400">Research & Innovation</Link></li>
              <li><Link to="/alumni" className="hover:text-amber-400">Alumni</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal & Mandatory</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/anti-ragging" className="hover:text-amber-400">Anti-Ragging Helpline ({settings.antiRaggingHelpline})</Link></li>
              <li><Link to="/grievance" className="hover:text-amber-400">Grievance Redressal</Link></li>
              <li><Link to="/rti" className="hover:text-amber-400">RTI Information</Link></li>
              <li><Link to="/icc" className="hover:text-amber-400">ICC Details</Link></li>
              <li><Link to="/approvals" className="hover:text-amber-400">UGC / AICTE Approvals ({settings.ugcApproval})</Link></li>
              <li><Link to="/scholarships" className="hover:text-amber-400">Scholarships</Link></li>
              <li className="pt-2">
                <Link to="/verify-certificate" className="text-amber-500 font-bold hover:text-amber-400 flex items-center">
                  Certificate Verification &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0" />
                <span>Knowledge Park, Main Edu Road<br/>New Delhi, India 110001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0" />
                <span>{settings.grievanceEmail || 'info@lsuniversity.edu.in'}</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm flex flex-col md:flex-row justify-between items-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} LS University. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <a href="#" className="hover:text-slate-300">Refund Policy</a>
            <Link to="/admin" className="hover:text-amber-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
