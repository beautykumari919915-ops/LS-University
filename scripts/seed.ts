import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Seed the Firestore database with initial demo data using Firebase Admin SDK.
 * 
 * IMPORTANT: Because this runs on your backend (or local terminal) and writes directly to Firestore,
 * you MUST have the `GOOGLE_APPLICATION_CREDENTIALS` environment variable set to the path of your 
 * Firebase service account key JSON file before running this script.
 * 
 * Alternatively, you can seed the database directly from the browser (which leverages your Auth state)
 * by clicking the "Seed Database" button in the Admin Dashboard at `/admin`.
 */
export async function seedDatabase() {
  console.log('Starting to seed the database...');

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error(`
      [ERROR] Missing GOOGLE_APPLICATION_CREDENTIALS!
      Please download a Service Account Key from Firebase Console (Project Settings -> Service Accounts),
      save it as a JSON file, and set the environment variable:
      
      export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
      npm run seed
      
      Alternatively, log into the web app at /admin and click 'Seed Database' to seed from the authenticated frontend.
    `);
    process.exit(1);
  }

  try {
    if (!getApps().length) {
      initializeApp({
        credential: applicationDefault()
      });
    }

    const db = getFirestore();

    const courses = [
      {
        id: 'btech-cse',
        name: 'B.Tech in Computer Science & Engineering',
        category: 'technical',
        duration: '4 Years',
        fee: '₹1,20,000 / Year',
        eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
        description: 'A comprehensive program covering software engineering, AI, machine learning, and computer networks.',
        careerProspects: 'Software Engineer, Data Scientist, Systems Architect, AI Researcher',
        syllabusHighlights: ['Data Structures & Algorithms', 'Operating Systems', 'Machine Learning', 'Cloud Computing'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'btech-aiml',
        name: 'B.Tech in AI & Data Science',
        category: 'technical',
        duration: '4 Years',
        fee: '₹1,30,000 / Year',
        eligibility: '10+2 with Physics, Chemistry, Math (Min 65%) + JEE Main',
        description: 'Focused specialization in Artificial Intelligence, Deep Learning, and Big Data Analytics to prepare students for the AI revolution.',
        careerProspects: 'AI Engineer, ML Ops, Data Scientist, BI Developer',
        syllabusHighlights: ['Deep Learning', 'Big Data Engineering', 'NLP', 'Computer Vision'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Shortened list for backend seed to avoid duplication. The frontend logic is the authoritative one.
    ];

    for (const course of courses) {
      await db.collection('courses').doc(course.id).set(course);
      console.log(`Added course: ${course.name}`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Unhandled execution error:', error);
      process.exit(1);
    });
}
