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
      <section className="relative bg-slate-900 text-white min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ls-blue via-slate-900 to-slate-800 opacity-95 z-0"/>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-30 z-0 bg-cover bg-center" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto glass-dark p-8 md:p-16 rounded-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6 text-white leading-tight">
              {getFallbackText('heroHeading')}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 font-light tracking-wide">
              {getFallbackText('heroSubheading')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/courses" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-slate-900 bg-ls-gold hover:bg-ls-gold-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                {getFallbackText('heroCta')}
                <ArrowRight className="ml-2 w-5 h-5"/>
              </Link>
              <Link to="/fee-payment" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white border border-white/30 bg-white/10 hover:bg-white hover:text-slate-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto backdrop-blur-sm">
                <CreditCard className="mr-2 w-5 h-5"/>
                Online Fee Payment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200/50 p-8 shadow-2xl">
            <div className="p-4">
              <div className="text-5xl font-serif text-ls-blue mb-2">{getFallbackText('stats1Value')}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{getFallbackText('stats1Label')}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-serif text-ls-blue mb-2">{getFallbackText('stats2Value')}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{getFallbackText('stats2Label')}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-serif text-ls-blue mb-2">{getFallbackText('stats3Value')}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{getFallbackText('stats3Label')}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-serif text-ls-blue mb-2">{getFallbackText('stats4Value')}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{getFallbackText('stats4Label')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-ls-gold/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-serif text-ls-blue mb-8 leading-tight">{getFallbackText('aboutHeading')}</h2>
              <div className="text-lg text-slate-600 mb-8 leading-relaxed font-light whitespace-pre-wrap">
                {getFallbackText('aboutText')}
              </div>
              <Link to="/about" className="text-ls-blue font-semibold inline-flex items-center hover:text-ls-gold transition-colors pb-1 border-b-2 border-ls-gold">
                Learn more about our vision <ArrowRight className="ml-2 w-4 h-4"/>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Campus Building" className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-ls-blue mb-6">{getFallbackText('featuredCoursesHeading')}</h2>
            <div className="w-24 h-1 bg-ls-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {featuredCourses.length > 0 ? featuredCourses.map((course) => (
              <motion.div key={course.id} whileHover={{ y: -10 }} className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-all hover:shadow-xl flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-ls-blue/5 text-ls-blue text-xs font-bold uppercase tracking-widest self-start">
                    {course.category}
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-4">{course.name}</h3>
                  <p className="text-slate-600 mb-8 line-clamp-3 font-light leading-relaxed flex-1">{course.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{course.duration}</span>
                    <Link to={`/course/${course.id}`} className="text-ls-blue font-bold hover:text-ls-gold transition-colors flex items-center group">
                      Details <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center text-slate-500 py-12 font-light">No courses available yet.</div>
            )}
          </div>
          <div className="text-center mt-16">
            <Link to="/courses" className="inline-flex items-center px-8 py-4 border border-ls-blue text-ls-blue font-semibold rounded-full hover:bg-ls-blue hover:text-white transition-all shadow hover:shadow-lg">
              View All Academic Programs
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-10 z-0 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{getFallbackText('newsHeading')}</h2>
            <div className="w-24 h-1 bg-ls-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.length > 0 ? latestNews.map((event) => (
              <div key={event.id} className="glass-dark rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="text-ls-gold font-semibold text-sm mb-4 uppercase tracking-wider">{event.date}</div>
                <h3 className="text-xl font-serif text-white mb-4 line-clamp-2">{event.title}</h3>
                <p className="text-slate-300 mb-6 line-clamp-3 flex-grow font-light">{event.content}</p>
                <button className="text-sm font-semibold text-white hover:text-ls-gold self-start mt-auto flex items-center group transition-colors">
                  Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            )) : (
              <div className="col-span-3 text-center text-slate-400 py-12 font-light">No events published yet.</div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
