import { usePageContent } from '../hooks/usePageContent';

export default function GenericPage({ pageId }: { pageId: string }) {
  const { content, loading } = usePageContent(pageId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">{content.heading || 'Content Not Found'}</h1>
      <div className="prose prose-slate lg:prose-lg whitespace-pre-wrap text-slate-700">
        {content.body || 'This page has not been populated yet.'}
      </div>
    </div>
  );
}
