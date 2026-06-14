import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  try {
    const snap = await getDoc(doc(db, 'teamMembers', 'test'));
    console.log("Success! exists?", snap.exists());
    process.exit(0);
  } catch (err: any) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
}
run();
