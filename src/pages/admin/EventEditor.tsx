import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { NewsEvent } from '../../types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function EventEditor() {
  const { data: events, fetchAll, create, update, remove, loading, error } = useFirestore<NewsEvent>('newsEvents');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsEvent>>({ title: '', date: '', content: '' });

  useEffect(() => {
    try {
      fetchAll();
    } catch (e) {
      console.error('Error fetching events:', e);
    }
  }, [fetchAll]);

  const handleEdit = (event: NewsEvent) => {
    setEditingId(event.id);
    setFormData(event);
    setIsAdding(false);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({ title: '', date: '', content: '' });
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const now = new Date().toISOString();
      if (editingId) {
        await update(editingId, { ...formData, updatedAt: now } as Partial<NewsEvent>);
      } else {
        await create({ ...formData, createdAt: now } as Omit<NewsEvent, 'id'>);
      }
      setIsAdding(false);
      setEditingId(null);
      fetchAll();
    } catch (e) {
      console.error('Error saving event:', e);
      alert('Error saving event');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await remove(id);
        fetchAll();
      } catch (e) {
        console.error('Error deleting event:', e);
        alert('Error deleting event');
      }
    }
  };

  if (isAdding || editingId) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input type="text" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="e.g. October 15, 2024" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} rows={5} className="w-full px-3 py-2 border rounded" required />
          </div>
          <button onClick={handleSave} className="mt-4 px-6 py-2 bg-amber-500 text-slate-900 rounded font-medium">Save Event</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Manage News & Events</h2>
        <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading events...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-3 text-sm font-semibold text-slate-600">Title</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Date</th>
                <th className="p-3 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm font-medium text-slate-900">{event.title}</td>
                  <td className="p-3 text-sm text-slate-500">{event.date}</td>
                  <td className="p-3 text-sm">
                    <div className="flex space-x-3">
                      <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4"/></button>
                      <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr><td colSpan={3} className="p-6 text-center text-slate-500">No events found. Add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
