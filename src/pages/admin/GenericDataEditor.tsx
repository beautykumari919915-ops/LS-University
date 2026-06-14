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
      <div className="p-8">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-3xl font-serif text-ls-blue bg-white">{editingId ? `Edit ${title}` : `Add New ${title}`}</h2>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="space-y-6 max-w-3xl bg-white">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{field.label}</label>
              {field.type === 'textarea' ? (
                 <textarea
                  value={formData[field.key] || ''}
                  onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-y min-h-[150px] focus:ring-2 focus:ring-ls-blue focus:border-ls-blue transition-shadow outline-none"
                  required={field.required}
                  placeholder={`Enter ${field.label}...`}
                 />
              ) : (
                <input 
                  type={field.type || 'text'} 
                  value={formData[field.key] || ''} 
                  onChange={e => setFormData({...formData, [field.key]: e.target.value})} 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ls-blue focus:border-ls-blue transition-shadow outline-none" 
                  required={field.required}
                  placeholder={`Enter ${field.label}...`}
                />
              )}
            </div>
          ))}
          
          <button onClick={handleSave} className="mt-8 px-8 py-3 bg-ls-gold text-ls-blue rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Save Record</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-ls-blue">{title} Records</h2>
        <button onClick={handleCreateNew} className="flex items-center px-6 py-2.5 bg-ls-blue text-white rounded-full text-sm font-bold shadow-md hover:bg-ls-blue-light hover:shadow-lg transition-all hover:-translate-y-0.5">
          <Plus className="w-4 h-4 mr-2" /> Add New Record
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-slate-500 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ls-gold mb-4"></div>
          Loading records...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(item => (
            <div key={item.id} className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all relative group flex flex-col">
              <h3 className="font-bold text-xl text-ls-blue mb-1 truncate font-serif">{displayKey ? item[displayKey] : 'Record'}</h3>
              {subtitleKey && <p className="text-sm text-slate-500 mb-6 truncate font-medium">{item[subtitleKey]}</p>}
              
              <div className="flex flex-col text-sm text-slate-600 gap-2 flex-grow">
                {fields.slice(0, 3).map(f => (
                  <div key={f.key} className="truncate">
                    <strong className="text-slate-800 font-semibold">{f.label}:</strong> {item[f.key] ? String(item[f.key]).substring(0, 50) : ''}
                  </div>
                ))}
              </div>

              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                <button onClick={() => handleEdit(item)} className="p-2 bg-white text-ls-blue border border-slate-200 rounded-full hover:bg-slate-50 shadow-md transition-colors"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white text-red-600 border border-slate-200 rounded-full hover:bg-red-50 shadow-md transition-colors"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              No records found. Click "Add New Record" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
