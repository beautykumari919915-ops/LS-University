import { useFirestore } from '../hooks/useFirestore';
import { useEffect } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function Scholarships() {
  const { data: scholarships, loading, fetchAll } = useFirestore<any>('scholarships');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh]">
      <div className="text-center mb-12">
        <Award className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 mb-4">University Scholarships</h1>
        <p className="text-lg text-slate-600">
          We believe financial constraints should not be a barrier to quality education. 
          Explore our scholarship programs designed to support meritorious and deserving students.
        </p>
      </div>

      <div className="grid gap-6">
        {scholarships.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-white rounded-xl border border-slate-200">
            No scholarships added yet.
          </div>
        ) : (
          scholarships.map((sch) => (
            <div key={sch.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{sch.name}</h3>
                  <div className="text-amber-600 font-semibold text-lg mt-1">{sch.amount}</div>
                </div>
              </div>
              <p className="text-slate-700 mb-6">{sch.description}</p>
              
              <div className="bg-slate-50 rounded-lg p-4 flex flex-start items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Eligibility Criteria</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{sch.eligibility}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
