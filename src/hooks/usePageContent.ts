import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { PageContent } from '../types';

export function usePageContent(pageId: string, defaultContent: Record<string, string> = {}) {
  const { fetchOne, create, update, loading } = useFirestore<PageContent>('pageContents');
  const [content, setContent] = useState<Record<string, string>>(defaultContent);

  useEffect(() => {
    async function loadContent() {
      const data = await fetchOne(pageId);
      if (data) {
        try {
          const parsed = JSON.parse(data.content);
          setContent(parsed);
        } catch (e) {
          console.error("Failed to parse page content", e);
        }
      }
    }
    loadContent();
  }, [fetchOne, pageId]);

  return { content, loading };
}
