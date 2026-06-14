import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold tracking-tighter text-amber-500">
              <span className="text-white mr-1">LS</span> University
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
            
            <div className="relative group">
              <button 
                className="flex items-center hover:text-amber-400 transition-colors"
                onClick={() => setCoursesOpen(!coursesOpen)}
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                Courses <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {/* Dropdown */}
              <div 
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${coursesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <div className="py-1" role="menu">
                  <Link to="/courses/technical" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">Technical</Link>
                  <Link to="/courses/general" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">General</Link>
                  <Link to="/courses/management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">Management</Link>
                </div>
              </div>
            </div>

            <Link to="/admissions" className="hover:text-amber-400 transition-colors">Admissions</Link>
            <Link to="/placements" className="hover:text-amber-400 transition-colors">Placements</Link>
            <Link to="/campus-life" className="hover:text-amber-400 transition-colors">Campus Life</Link>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
            
            {user && (
              <Link to="/admin" className="px-3 py-1 bg-amber-500 text-slate-900 rounded font-medium hover:bg-amber-400">
                Admin
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">About</Link>
            <div className="px-3 py-2">
              <div className="font-medium mb-1">Courses</div>
              <div className="pl-4 space-y-1">
                <Link to="/courses/technical" className="block py-1 text-sm text-gray-300 hover:text-white">Technical</Link>
                <Link to="/courses/general" className="block py-1 text-sm text-gray-300 hover:text-white">General</Link>
                <Link to="/courses/management" className="block py-1 text-sm text-gray-300 hover:text-white">Management</Link>
              </div>
            </div>
            <Link to="/admissions" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">Admissions</Link>
            <Link to="/placements" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">Placements</Link>
            <Link to="/campus-life" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">Campus</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-700">Contact</Link>
            {user && <Link to="/admin" className="block px-3 py-2 text-amber-400 font-medium font-medium">Admin Panel</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}
