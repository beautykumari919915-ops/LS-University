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
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError } from '../lib/errorUtils';
import { OperationType } from '../types';

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
      setData(items);
      setError(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, collectionName);
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
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `${collectionName}/${id}`);
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
      handleFirestoreError(err, OperationType.CREATE, collectionName);
      throw err;
    }
  }, [collectionName]);

  const update = useCallback(async (id: string, item: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, item as any);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${id}`);
      throw err;
    }
  }, [collectionName]);

  const remove = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${collectionName}/${id}`);
      throw err;
    }
  }, [collectionName]);

  return { data, loading, error, fetchAll, fetchOne, create, update, remove };
}
