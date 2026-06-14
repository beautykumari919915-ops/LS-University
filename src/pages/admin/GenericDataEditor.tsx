import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface GenericDataEditorProps {
  collectionName: string;
  title: string;
  fields: {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'textarea';
    required?: boolean;
  }[];
  displayKey: string;
  subtitleKey?: string;
}

export default function GenericDataEditor({ collectionName, title, fields, displayKey, subtitleKey }: GenericDataEditorProps) {
  const { data, fetchAll, create, update, remove, loading, error } = useFirestore<any>(collectionName);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    try {
      fetchAll();
    } catch (e) {
      console.error('Error fetching records:', e);
    }
  }, [fetchAll]);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(false);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({});
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await update(editingId, formData);
      } else {
        await create({ ...formData, createdAt: new Date().toISOString() });
      }
      setIsAdding(false);
      setEditingId(null);
      fetchAll();
    } catch (e) {
      console.error('Error saving record:', e);
      alert('Error saving record');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        await remove(id);
        fetchAll();
      } catch (e) {
        console.error('Error deleting record:', e);
        alert('Error deleting record');
      }
    }
  };

  if (isAdding || editingId) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold bg-white text-slate-900">{editingId ? `Edit ${title}` : `Add New ${title}`}</h2>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="space-y-4 max-w-2xl bg-white">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                 <textarea
                  value={formData[field.key] || ''}
                  onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                  className="w-full px-3 py-2 border rounded resize-y min-h-[100px]"
                  required={field.required}
                 />
              ) : (
                <input 
                  type={field.type || 'text'} 
                  value={formData[field.key] || ''} 
                  onChange={e => setFormData({...formData, [field.key]: e.target.value})} 
                  className="w-full px-3 py-2 border rounded" 
                  required={field.required}
                />
              )}
            </div>
          ))}
          
          <button onClick={handleSave} className="mt-4 px-6 py-2 bg-amber-500 text-slate-900 rounded font-medium shadow-sm hover:bg-amber-400">Save Record</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title} Records</h2>
        <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading records...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(item => (
            <div key={item.id} className="p-5 border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow relative group">
              <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">{displayKey ? item[displayKey] : 'Record'}</h3>
              {subtitleKey && <p className="text-sm text-slate-600 mb-4 truncate">{item[subtitleKey]}</p>}
              
              <div className="flex flex-col text-xs text-slate-500 gap-1 pb-4">
                {fields.slice(0, 3).map(f => (
                  <div key={f.key} className="truncate">
                    <span className="font-medium">{f.label}:</span> {item[f.key] ? String(item[f.key]).substring(0, 50) : ''}
                  </div>
                ))}
              </div>

              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 shadow-sm"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 shadow-sm"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              No records found. Click "Add New" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
