import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Certificate } from '../../types';
import { Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';

export default function CertificateEditor() {
  const { data: certificates, fetchAll, create, update, remove, loading } = useFirestore<Certificate>('certificates');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState<Partial<Certificate>>({
    certificateId: '',
    rollNumber: '',
    studentName: '',
    course: '',
    passingYear: '',
    percentage: '',
    issueDate: '',
    isActive: true
  });

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleEdit = (certificate: Certificate) => {
    setEditingId(certificate.id);
    setFormData(certificate);
    setIsAdding(false);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      certificateId: 'CERT-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      rollNumber: '',
      studentName: '',
      course: '',
      passingYear: new Date().getFullYear().toString(),
      percentage: '',
      issueDate: new Date().toISOString().split('T')[0],
      isActive: true
    });
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const now = new Date().toISOString();
      if (editingId) {
        await update(editingId, { ...formData } as Partial<Certificate>);
      } else {
        await create({ ...formData, createdAt: now } as Omit<Certificate, 'id'>);
      }
      setIsAdding(false);
      setEditingId(null);
      fetchAll();
    } catch (e) {
      alert('Error saving certificate');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to completely delete this certificate record?')) {
      await remove(id);
      fetchAll();
    }
  };

  const toggleStatus = async (certificate: Certificate) => {
    await update(certificate.id, { isActive: !certificate.isActive });
    fetchAll();
  };

  const filteredCerts = certificates.filter(c => 
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.certificateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isAdding || editingId) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Edit Certificate' : 'Issue Certificate'}</h2>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="space-y-4 max-w-2xl bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
              <input type="text" value={formData.studentName || ''} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label>
              <input type="text" value={formData.rollNumber || ''} onChange={e => setFormData({...formData, rollNumber: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Program/Course Name</label>
            <input type="text" value={formData.course || ''} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Passing Year</label>
              <input type="text" value={formData.passingYear || ''} onChange={e => setFormData({...formData, passingYear: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Grade / Percentage</label>
              <input type="text" value={formData.percentage || ''} onChange={e => setFormData({...formData, percentage: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Certificate ID</label>
              <input type="text" value={formData.certificateId || ''} onChange={e => setFormData({...formData, certificateId: e.target.value})} className="w-full px-3 py-2 border rounded font-mono bg-slate-50" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date</label>
              <input type="date" value={formData.issueDate || ''} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
          </div>
          
          <div className="pt-4 flex items-center">
            <input 
              type="checkbox" 
              id="isActive" 
              checked={formData.isActive || false} 
              onChange={e => setFormData({...formData, isActive: e.target.checked})} 
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Active (Valid Certificate)</label>
          </div>

          <button onClick={handleSave} className="mt-4 px-6 py-2 bg-amber-500 text-slate-900 rounded font-medium">Save Certificate</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Manage Certificates</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="Search by name, roll, ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <button onClick={handleCreateNew} className="flex-shrink-0 flex items-center px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" /> Issue New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-3 text-sm font-semibold text-slate-600">Student Name</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Roll No</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Certificate ID</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Status</th>
              <th className="p-3 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.map(cert => (
              <tr key={cert.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-3 text-sm font-medium text-slate-900">{cert.studentName}</td>
                <td className="p-3 text-sm text-slate-500">{cert.rollNumber}</td>
                <td className="p-3 text-sm font-mono text-slate-500">{cert.certificateId}</td>
                <td className="p-3 text-sm">
                  {cert.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Revoked
                    </span>
                  )}
                </td>
                <td className="p-3 text-sm">
                  <div className="flex space-x-3 items-center">
                    <button onClick={() => toggleStatus(cert)} className="text-slate-500 hover:text-slate-700" title="Toggle Status">
                      <Check className="w-4 h-4"/>
                    </button>
                    <button onClick={() => handleEdit(cert)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4"/></button>
                    <button onClick={() => handleDelete(cert.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCerts.length === 0 && !loading && (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
