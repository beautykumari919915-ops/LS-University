import { usePageContent } from '../hooks/usePageContent';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export default function GenericPage({ pageId }: { pageId: string }) {
  const { content, loading } = usePageContent(pageId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ls-gold"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-[70vh] relative pt-10 pb-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-64 bg-ls-blue -skew-y-2 origin-top-right mix-blend-multiply opacity-5" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-16"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ls-blue mb-6">{content.heading || 'Content Not Found'}</h1>
            <div className="w-16 h-1 bg-ls-gold mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-slate prose-lg max-w-none px-4 md:px-8">
            <Markdown>{content.body || 'This page has not been populated yet.'}</Markdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
