import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TeamMember, PageContent } from '../types';
import { motion } from 'motion/react';
import { Award, Target, BookOpen } from 'lucide-react';

export default function AboutUs() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamSnap = await getDocs(collection(db, 'teamMembers'));
        setTeam(teamSnap.docs.map(d => ({ id: d.id, ...d.data() })) as TeamMember[]);

        const pageDoc = await getDoc(doc(db, 'pageContents', 'about'));
        if (pageDoc.exists()) {
          setPageData(pageDoc.data() as PageContent);
        }
      } catch (e) {
        console.error("Error fetching about data:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const defaultText = "LS University has a rich heritage of academic excellence... Add your dynamic content in the admin panel.";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            About LS University
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300"
          >
            A legacy of excellence, preparing leaders to shape tomorrow's world.
          </motion.p>
        </div>
      </section>

      {/* History & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Legacy</h2>
            <div className="prose prose-lg text-slate-600">
              <p>{pageData ? JSON.parse(pageData.content).body || defaultText : defaultText}</p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl mb-1">Our Mission</h3>
                  <p className="text-slate-600 text-sm">To provide a transformative educational experience that fosters critical thinking, innovation, and ethical leadership.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg mr-4">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl mb-1">Our Vision</h3>
                  <p className="text-slate-600 text-sm">To be a globally recognized institution of excellence, driving knowledge creation and societal impact.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-200 h-64 rounded-2xl md:mt-12 overflow-hidden shadow-md">
               <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=800&fit=crop" alt="Campus Building" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-slate-200 h-64 rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop" alt="Students Graduating" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">University Leadership</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Meet the visionary minds guiding our institution towards global excellence.</p>
          </div>

          {loading ? (
             <div className="flex justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={member.id} 
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 bg-slate-200 mx-auto rounded-full mb-6 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center text-slate-400 text-3xl font-bold">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-4">{member.designation}</p>
                  {member.message && (
                    <p className="text-slate-600 text-sm italic">"{member.message}"</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <BookOpen className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-8">Accreditations & Rankings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
             <div>
               <div className="text-5xl font-black text-amber-500 mb-2">A++</div>
               <div className="text-slate-300 font-medium">NAAC Accredited Grade</div>
             </div>
             <div>
               <div className="text-5xl font-black text-amber-500 mb-2">Tier 1</div>
               <div className="text-slate-300 font-medium">AICTE Approved Institution</div>
             </div>
             <div>
               <div className="text-5xl font-black text-amber-500 mb-2">Top 50</div>
               <div className="text-slate-300 font-medium">NIRF University Rankings</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
