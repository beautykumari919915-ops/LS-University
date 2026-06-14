import { useEffect } from 'react';
import { Placement } from '../types';
import { Briefcase, Building, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';

export default function Placements() {
  const { data: placements, fetchAll, loading } = useFirestore<Placement>('placements');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200"
          >
            Training & Placement Cell
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Connecting our brilliant minds with industry leaders. We ensure our students are industry-ready and placed in top-tier organizations globally.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-1">45.5 LPA</h3>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">Highest Package</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-1">95%</h3>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">Placement Rate</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-1">200+</h3>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">Top Recruiters</p>
          </div>
        </div>
      </section>

      {/* Records Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Top Placements</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placements.map((placement, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={placement.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{placement.studentName}</h3>
                <p className="text-sm text-slate-500 mb-4 font-medium">{placement.year} Batch</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Placed At</div>
                  <div className="font-bold text-lg text-slate-900 mb-2 truncate" title={placement.company}>{placement.company}</div>
                  <div className="text-sm text-slate-500 mb-1">Package</div>
                  <div className="font-bold text-amber-600">{placement.package}</div>
                </div>
              </motion.div>
            ))}
            {placements.length === 0 && (
              <div className="col-span-full text-center text-slate-500 py-12">No placement records found.</div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}
