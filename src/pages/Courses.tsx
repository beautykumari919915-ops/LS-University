import { useFirestore } from '../hooks/useFirestore';
import { Course } from '../types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export default function Courses() {
  const { category: urlCategory } = useParams();
  const { data: courses, fetchAll, loading } = useFirestore<Course>('courses');
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Academic Programs</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Explore our wide range of undergraduate and postgraduate programs designed to prepare you for the future.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex bg-white p-1 rounded-lg shadow-sm border border-slate-200">
            {['all', 'technical', 'management', 'general'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeCategory === cat ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div 
                key={course.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider w-max">
                    {course.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.name}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{course.description}</p>
                  
                  <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Duration</div>
                      <div className="font-medium text-slate-900">{course.duration}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Approx Fee</div>
                      <div className="font-medium text-slate-900">{course.fee}</div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/course/${course.id}`} 
                    className="block w-full text-center px-4 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-amber-500 hover:text-slate-900 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="text-xl text-slate-500">No courses found matching your criteria.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
