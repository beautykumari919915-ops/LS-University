import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Course } from '../../types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function CourseEditor() {
  const { data: courses, fetchAll, create, update, remove, loading, error } = useFirestore<Course>('courses');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    name: '', category: 'technical', duration: '', fee: '', eligibility: '', description: '', careerProspects: ''
  });

  useEffect(() => {
    try {
      fetchAll();
    } catch (e) {
      console.error('Error fetching courses:', e);
    }
  }, [fetchAll]);

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData(course);
    setIsAdding(false);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'technical', duration: '', fee: '', eligibility: '', description: '', careerProspects: '' });
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const now = new Date().toISOString();
      if (editingId) {
        await update(editingId, { ...formData, updatedAt: now } as Partial<Course>);
      } else {
        await create({ ...formData, createdAt: now, updatedAt: now } as Omit<Course, 'id'>);
      }
      setIsAdding(false);
      setEditingId(null);
      fetchAll();
    } catch (e) {
      console.error('Error saving course:', e);
      alert('Error saving course');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await remove(id);
        fetchAll();
      } catch (e) {
        console.error('Error deleting course:', e);
        alert('Error deleting course');
      }
    }
  };

  if (isAdding || editingId) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Edit Course' : 'Create Course'}</h2>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Name</label>
            <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select value={formData.category || 'technical'} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full px-3 py-2 border rounded">
                <option value="technical">Technical</option>
                <option value="general">General</option>
                <option value="management">Management</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
              <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="e.g. 4 Years" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fee</label>
              <input type="text" value={formData.fee || ''} onChange={e => setFormData({...formData, fee: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="e.g. $10,000 / year" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Eligibility</label>
              <input type="text" value={formData.eligibility || ''} onChange={e => setFormData({...formData, eligibility: e.target.value})} className="w-full px-3 py-2 border rounded" required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Career Prospects</label>
            <textarea value={formData.careerProspects || ''} onChange={e => setFormData({...formData, careerProspects: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded" />
          </div>

          <button onClick={handleSave} className="mt-4 px-6 py-2 bg-amber-500 text-slate-900 rounded font-medium">Save Course</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Manage Courses</h2>
        <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" /> Add Course
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading courses...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Category</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Duration</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm font-medium text-slate-900">{course.name}</td>
                  <td className="p-3 text-sm text-slate-500 capitalize">{course.category}</td>
                  <td className="p-3 text-sm text-slate-500">{course.duration}</td>
                  <td className="p-3 text-sm">
                    <div className="flex space-x-3">
                      <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4"/></button>
                      <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-slate-500">No courses found. Add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
