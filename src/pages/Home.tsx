import { usePageContent } from '../hooks/usePageContent';
import { useFirestore } from '../hooks/useFirestore';
import { useEffect } from 'react';
import { Course, NewsEvent } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Users, Award, Building2, Bell, CreditCard } from 'lucide-react';

const defaultContent = {
  heroHeading: "Welcome to LS University",
  heroSubheading: "Empowering Next-Generation Leaders Through Excellence in Education",
  heroCta: "Explore Programs",
  stats1Value: "95%",
  stats1Label: "Placement Rate",
  stats2Value: "50+",
  stats2Label: "Courses Offered",
  stats3Value: "10k+",
  stats3Label: "Alumni Network",
  stats4Value: "200+",
  stats4Label: "Expert Faculty",
  aboutHeading: "Pioneering Education for Tomorrow",
  aboutText: "LS University stands at the forefront of modern education, combining rigorous academics with practical, industry-aligned training. Our campus is a hub of innovation, research, and holistic development.",
  featuredCoursesHeading: "Discover Our Programs",
  newsHeading: "Latest News & Events"
};

export default function Home() {
  const { content } = usePageContent('home', defaultContent);
  const { data: courses, fetchAll: fetchCourses } = useFirestore<Course>('courses');
  const { data: newsEvents, fetchAll: fetchNews } = useFirestore<NewsEvent>('newsEvents');

  useEffect(() => {
    fetchCourses();
    fetchNews();
  }, [fetchCourses, fetchNews]);

  const featuredCourses = courses.slice(0, 3);
  const latestNews = newsEvents.slice(0, 3);
  const tickerEvents = newsEvents.slice(0, 5);

  const getFallbackText = (key: keyof typeof defaultContent) => content[key] || defaultContent[key];

  return (
    <div className="w-full">
      {/* Ticker Section */}
      {tickerEvents.length > 0 && (
        <div className="bg-amber-500 text-slate-900 px-4 py-2 flex items-center overflow-hidden border-b border-amber-600">
          <div className="flex items-center font-bold text-sm uppercase tracking-wider whitespace-nowrap bg-amber-500 z-10 pr-4">
            <Bell className="w-4 h-4 mr-2 animate-pulse" />
            Latest Notifications:
          </div>
          <div className="flex-1 w-full overflow-hidden relative h-5">
            <div className="absolute whitespace-nowrap animate-[ticker_20s_linear_infinite] flex space-x-12">
              {tickerEvents.map((evt, idx) => (
                <span key={idx} className="text-sm font-medium">
                  • {evt.title} ({evt.date})
                </span>
              ))}
              {tickerEvents.map((evt, idx) => (
                <span key={idx + 'clone'} className="text-sm font-medium">
                  • {evt.title} ({evt.date})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-90 z-0"/>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-20 z-0 bg-cover bg-center" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              {getFallbackText('heroHeading')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10">
              {getFallbackText('heroSubheading')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/courses" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors w-full sm:w-auto">
                {getFallbackText('heroCta')}
                <ArrowRight className="ml-2 w-5 h-5"/>
              </Link>
              <Link to="/fee-payment" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white border-2 border-white hover:bg-white hover:text-slate-900 transition-colors w-full sm:w-auto">
                <CreditCard className="mr-2 w-5 h-5"/>
                Online Fee Payment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{getFallbackText('stats1Value')}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{getFallbackText('stats1Label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{getFallbackText('stats2Value')}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{getFallbackText('stats2Label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{getFallbackText('stats3Value')}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{getFallbackText('stats3Label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{getFallbackText('stats4Value')}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{getFallbackText('stats4Label')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{getFallbackText('aboutHeading')}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {getFallbackText('aboutText')}
              </p>
              <Link to="/about" className="text-amber-600 font-semibold inline-flex items-center hover:text-amber-700">
                Learn more about our vision <ArrowRight className="ml-2 w-4 h-4"/>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Campus Building" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{getFallbackText('featuredCoursesHeading')}</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.length > 0 ? featuredCourses.map((course) => (
              <motion.div key={course.id} whileHover={{ y: -5 }} className="bg-slate-50 rounded-xl overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="p-8">
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.name}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">{course.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-slate-500">{course.duration}</span>
                    <Link to={`/course/${course.id}`} className="text-amber-600 font-medium hover:text-amber-700">Details &rarr;</Link>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center text-slate-500 py-12">No courses available yet.</div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center px-6 py-3 border-2 border-slate-900 text-slate-900 font-medium rounded hover:bg-slate-900 hover:text-white transition-colors">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{getFallbackText('newsHeading')}</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.length > 0 ? latestNews.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
                <div className="text-amber-600 font-medium text-sm mb-2">{event.date}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{event.title}</h3>
                <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">{event.content}</p>
                <button className="text-sm font-medium text-slate-900 hover:text-amber-600 self-start mt-auto">Read More</button>
              </div>
            )) : (
              <div className="col-span-3 text-center text-slate-500 py-12">No events published yet.</div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
