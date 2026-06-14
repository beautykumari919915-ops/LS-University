import { useState, useCallback } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEMO_CONTENT } from '../lib/demoData';

export function useFirestore<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
      
      // Fallback for demo data if collection is empty
      if (items.length === 0 && (DEMO_CONTENT.collections as any)[collectionName]) {
        setData((DEMO_CONTENT.collections as any)[collectionName]);
      } else {
        setData(items);
      }
      setError(null);
    } catch (err: any) {
      if (err.message && err.message.includes('Missing or insufficient permissions')) {
          // If firestore read blocked, gracefully substitute with demo data too
          if ((DEMO_CONTENT.collections as any)[collectionName]) {
             setData((DEMO_CONTENT.collections as any)[collectionName]);
             setError(null);
             return;
          }
      }
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const fetchOne = useCallback(async (id: string): Promise<T | null> => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      // Demo Data Fallback for missing documents
      if (collectionName === 'pageContents' && (DEMO_CONTENT.pages as any)[id]) {
        return { id, content: (DEMO_CONTENT.pages as any)[id] } as T;
      }
      return null;
    } catch (err: any) {
      if (err.message && err.message.includes('Missing or insufficient permissions')) {
        if (collectionName === 'pageContents' && (DEMO_CONTENT.pages as any)[id]) {
          return { id, content: (DEMO_CONTENT.pages as any)[id] } as T;
        }
      }
      setError(err instanceof Error ? err.message : String(err));
      return null;
    }
  }, [collectionName]);


  const create = useCallback(async (item: Omit<T, 'id'>, customId?: string) => {
    try {
      let id: string;
      if (customId) {
        await setDoc(doc(db, collectionName, customId), item);
        id = customId;
      } else {
        const docRef = await addDoc(collection(db, collectionName), item);
        id = docRef.id;
      }
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [collectionName]);

  const update = useCallback(async (id: string, item: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, item, { merge: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [collectionName]);

  const remove = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [collectionName]);

  return { data, loading, error, fetchAll, fetchOne, create, update, remove };
}
