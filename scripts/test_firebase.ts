import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    const docRef = doc(db, 'test', 'connection');
    await setDoc(docRef, { timestamp: new Date().toISOString() });
    console.log("Write success!");
    const snap = await getDoc(docRef);
    console.log("Read success:", snap.data());
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection().then(() => process.exit(0));




