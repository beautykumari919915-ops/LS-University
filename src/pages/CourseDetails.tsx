import { useParams, Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Course } from '../types';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, GraduationCap, Banknote, BookOpen, Briefcase } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { fetchOne, loading } = useFirestore<Course>('courses');
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      fetchOne(id).then(setCourse);
    }
  }, [id, fetchOne]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div></div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Course not found</h2>
      <Link to="/courses" className="text-amber-600 hover:underline">Return to courses</Link>
    </div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center text-slate-400 hover:text-amber-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all courses
          </Link>
          <div className="mb-4 inline-block px-3 py-1 rounded-full bg-slate-800 text-amber-500 text-xs font-bold uppercase tracking-wider">
            {course.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{course.name}</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {course.syllabusHighlights && course.syllabusHighlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <BookOpen className="mr-3 text-amber-500" /> Syllabus Highlights
                </h2>
                <ul className="space-y-3">
                  {course.syllabusHighlights.map((topic, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">{i+1}</div>
                      <span className="text-slate-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {course.careerProspects && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Briefcase className="mr-3 text-amber-500" /> Career Prospects
                </h2>
                <div className="prose prose-slate bg-slate-50 p-8 rounded-2xl">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{course.careerProspects}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Program Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-amber-500 mr-4 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Duration</div>
                    <div className="font-medium text-slate-900">{course.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <GraduationCap className="w-6 h-6 text-amber-500 mr-4 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Eligibility</div>
                    <div className="font-medium text-slate-900">{course.eligibility}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Banknote className="w-6 h-6 text-amber-500 mr-4 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Approximate Fee</div>
                    <div className="font-medium text-slate-900">{course.fee}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <Link to="/admissions" className="block w-full text-center px-6 py-4 bg-amber-500 text-slate-900 rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-sm cursor-pointer">
                  Apply Now
                </Link>
                <div className="text-center text-sm text-slate-500 mt-4">Applications open for Fall {new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
