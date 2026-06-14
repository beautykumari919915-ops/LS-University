import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Certificate } from '../types';
import { Search, Award, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function CertificateVerification() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setSearched(true);
    setResult(null);

    try {
      const q = query(
        collection(db, 'certificates'),
        where('certificateId', '==', identifier.trim())
      );
      
      const q2 = query(
        collection(db, 'certificates'),
        where('rollNumber', '==', identifier.trim())
      );

      const [snap1, snap2] = await Promise.all([getDocs(q), getDocs(q2)]);
      
      let found: Certificate | null = null;
      if (!snap1.empty) {
        found = { id: snap1.docs[0].id, ...snap1.docs[0].data() } as Certificate;
      } else if (!snap2.empty) {
        found = { id: snap2.docs[0].id, ...snap2.docs[0].data() } as Certificate;
      }

      setResult(found);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <div className="text-center mb-10 w-full">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Certificate Verification</h1>
          <p className="text-lg text-slate-600">Verify the authenticity of degrees and certificates issued by LS University.</p>
        </div>

        <form onSubmit={handleVerify} className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter Certificate ID or Roll Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-12 pr-4 py-4 md:text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <Search className="absolute left-4 top-4.5 h-6 w-6 text-slate-400" />
            </div>
            <button
              type="submit"
              disabled={loading || !identifier}
              className="px-8 py-4 bg-slate-900 text-white md:text-lg font-bold rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify"}
            </button>
          </div>
        </form>

        {searched && !loading && (
          <div className="w-full max-w-2xl">
            {result ? (
              result.isActive ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 pt-8 opacity-10">
                    <Award className="w-48 h-48 text-amber-500" />
                  </div>
                  
                  <div className="flex items-center text-green-600 font-bold text-xl mb-8 border-b border-slate-100 pb-4">
                    <CheckCircle className="w-8 h-8 mr-3" />
                    Verified Certificate
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Student Name</div>
                      <div className="text-xl font-bold text-slate-900">{result.studentName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Roll Number</div>
                      <div className="text-lg font-medium text-slate-900">{result.rollNumber}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Program/Course</div>
                      <div className="text-lg font-medium text-slate-900">{result.course}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Passing Year</div>
                      <div className="text-lg font-medium text-slate-900">{result.passingYear}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Grade / Percentage</div>
                      <div className="text-lg font-medium text-slate-900">{result.percentage}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Certificate ID</div>
                      <div className="text-lg font-mono font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded inline-block mt-1">{result.certificateId}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Issue Date</div>
                      <div className="text-lg font-medium text-slate-900">{result.issueDate}</div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
                    <div className="text-amber-500 font-bold text-lg mb-1">LS University</div>
                    <div className="text-xs text-slate-400">Official Academic Record</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 p-8 rounded-2xl border border-red-200 flex flex-col items-center text-center"
                >
                  <XCircle className="w-16 h-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-red-700 mb-2">Certificate Revoked</h3>
                  <p className="text-red-600">This certificate has been marked as inactive or revoked. Please contact the university for more details.</p>
                </motion.div>
              )
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-100 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center"
              >
                <Search className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No Record Found</h3>
                <p className="text-slate-500">No certificate found. Please contact the Registrar.</p>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
