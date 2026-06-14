import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { PageContent } from '../../types';

const defaultSchema: Record<string, string[]> = {
  home: ['heroHeading', 'heroSubheading', 'heroCta', 'stats1Value', 'stats1Label', 'stats2Value', 'stats2Label', 'stats3Value', 'stats3Label', 'stats4Value', 'stats4Label', 'aboutHeading', 'aboutText', 'featuredCoursesHeading', 'newsHeading'],
  about: ['heading', 'body'],
  admissions: ['heading', 'body'],
  placements: ['heading', 'body'],
  'campus-life': ['heading', 'body'],
  contact: ['heading', 'body']
};

export default function PageEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const { fetchOne, update, create, loading, error } = useFirestore<PageContent>('pageContents');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await fetchOne(selectedPage);
      if (data) {
        try {
          const parsed = JSON.parse(data.content);
          setFormData(parsed);
        } catch(e) {
          setFormData({});
        }
      } else {
        setFormData({});
      }
    }
    loadData();
  }, [selectedPage, fetchOne]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const dbObj = { content: JSON.stringify(formData), updatedAt: new Date().toISOString() };
      const exists = await fetchOne(selectedPage);
      if (exists) {
        await update(selectedPage, dbObj);
      } else {
        await create(dbObj, selectedPage);
      }
      setMessage('Successfully saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e: any) {
      setMessage('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const keysToEdit = defaultSchema[selectedPage] || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Edit Page Content</h2>
        <select 
          value={selectedPage} 
          onChange={(e) => setSelectedPage(e.target.value)}
          className="border border-slate-300 rounded px-3 py-1.5 focus:ring-amber-500 focus:border-amber-500"
        >
          {Object.keys(defaultSchema).map(page => (
            <option key={page} value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading content...</div>
      ) : (
        <div className="space-y-6">
        {keysToEdit.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {key.includes('Text') || key.includes('body') || key.includes('Body') ? (
              <textarea
                rows={5}
                value={formData[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={`Enter ${key}...`}
              />
            ) : (
              <input
                type="text"
                value={formData[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={`Enter ${key}...`}
              />
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-slate-200 flex items-center">
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-6 py-2 bg-amber-500 text-slate-900 font-medium rounded hover:bg-amber-400 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {message && <span className="ml-4 text-sm text-green-600 font-medium">{message}</span>}
        </div>
      </div>
      )}
    </div>
  );
}
