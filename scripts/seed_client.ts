import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log("Seeding started...");
  
  const defaultCourses = [
    {
      id: 'btech-cse',
      name: 'B.Tech in Computer Science & Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,50,000 / Semester',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%)',
      description: 'A comprehensive program covering software engineering, AI, machine learning, and computer networks. Designed to produce industry-ready tech professionals for top tier IT giants.',
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
      fee: '₹1,60,000 / Semester',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 65%)',
      description: 'Focused specialization in Artificial Intelligence, Deep Learning, and Big Data Analytics to prepare students for the AI revolution.',
      careerProspects: 'AI Engineer, ML Ops, Data Scientist, BI Developer',
      syllabusHighlights: ['Deep Learning', 'Big Data Engineering', 'NLP', 'Computer Vision'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-mech',
      name: 'B.Tech in Mechanical Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,20,000 / Semester',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%)',
      description: 'Core engineering branch focusing on design, analysis, manufacturing, and maintenance of mechanical systems.',
      careerProspects: 'Mechanical Engineer, Automobile Designer, Production Manager',
      syllabusHighlights: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'CAD/CAM'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-civil',
      name: 'B.Tech in Civil Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,20,000 / Semester',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%)',
      description: 'Learn to design, construct, and maintain the physical and naturally built environment, including public works.',
      careerProspects: 'Structural Engineer, Civil Designer, Construction Manager',
      syllabusHighlights: ['Structural Analysis', 'Geotech Engineering', 'Transportation', 'Surveying'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-ece',
      name: 'B.Tech in Electronics & Communication',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,30,000 / Semester',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%)',
      description: 'Covers fundamental concepts of electronics, telecommunications, networking, and embedded systems.',
      careerProspects: 'Network Engineer, Embedded Systems Engineer, Telecom Specialist',
      syllabusHighlights: ['Digital Electronics', 'Signals & Systems', 'VLSI Design', 'Microprocessors'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'mba-finance',
      name: 'MBA in Finance & Marketing',
      category: 'management',
      duration: '2 Years',
      fee: '₹2,50,000 / Semester',
      eligibility: 'Bachelor\'s Degree in any discipline (Min 55%) + CAT/MAT',
      description: 'Master the principles of corporate finance, marketing strategies, and portfolio management. Learn from industry veterans.',
      careerProspects: 'Investment Banker, Financial Analyst, Marketing Manager, Strategy Consultant',
      syllabusHighlights: ['Corporate Finance', 'Derivatives & Risk Management', 'Consumer Behavior', 'Mergers & Acquisitions'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bba-gen',
      name: 'Bachelor of Business Administration (BBA)',
      category: 'management',
      duration: '3 Years',
      fee: '₹80,000 / Semester',
      eligibility: '10+2 in any stream (Min 50%)',
      description: 'A foundational course in business principles and management, preparing leaders of tomorrow.',
      careerProspects: 'Business Analyst, HR Executive, Operations Manager',
      syllabusHighlights: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Business Law'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bsc-physics',
      name: 'B.Sc. (Hons.) in Applied Physics',
      category: 'general',
      duration: '3 Years',
      fee: '₹50,000 / Semester',
      eligibility: '10+2 with Physics (Min 55%)',
      description: 'Dive deep into the fundamental laws of nature. Includes extensive laboratory work and opportunities for undergraduate research.',
      careerProspects: 'Research Scientist, Lab Technician, Data Analyst, Academic',
      syllabusHighlights: ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Solid State Physics'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bcom-hons',
      name: 'B.Com. (Honours)',
      category: 'general',
      duration: '3 Years',
      fee: '₹60,000 / Semester',
      eligibility: '10+2 with Commerce/Math (Min 55%)',
      description: 'In-depth study of accounting, taxation, auditing, and corporate laws.',
      careerProspects: 'Accountant, Tax Consultant, Auditor, Financial Advisor',
      syllabusHighlights: ['Financial Accounting', 'Cost Accounting', 'Income Tax Law', 'Auditing'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'msc-data',
      name: 'M.Sc. in Data Science',
      category: 'general',
      duration: '2 Years',
      fee: '₹1,00,000 / Semester',
      eligibility: 'B.Sc./B.Tech with Mathematics (Min 55%)',
      description: 'Advanced postgraduate program focusing on statistical modeling, machine learning, and big data technologies.',
      careerProspects: 'Data Scientist, Machine Learning Engineer, Quantitative Analyst',
      syllabusHighlights: ['Advanced Statistics', 'Python for Data Science', 'Deep Learning', 'Data Visualization'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const defaultEvents = [
    {
      id: 'techfest-2025',
      title: 'Aavishkar: National Tech Fest 2025',
      date: 'March 15-18, 2025',
      content: 'Join us for our annual technology festival featuring a 24-hour hackathon, robotics showcases, and expert talks from industry leaders.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'admission-open',
      title: 'Admissions Open for Academic Year 2025-26',
      date: 'April 01, 2025',
      content: 'Applications are now open for all UG and PG programs. Apply online before the deadline and secure your future at LS University.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'placement-drive',
      title: 'Mega Campus Placement Drive',
      date: 'May 10-12, 2025',
      content: 'Top recruiters including TCS, Infosys, and Wipro are visiting the campus for the final year placement drive.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'national-seminar',
      title: 'National Seminar on AI in Education',
      date: 'June 05, 2025',
      content: 'A seminar discussing the impact and future of AI integrations in modern education systems, led by renowned researchers.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sports-meet',
      title: 'Annual Inter-University Sports Meet',
      date: 'February 20-25, 2025',
      content: 'Cheer for your college teams in cricket, football, basketball, and athletics events hosted at our main sports complex.',
      createdAt: new Date().toISOString()
    }
  ];

  const defaultTeamMembers = [
    { id: 'tm-1', name: 'Dr. A. K. Sharma', designation: 'Chancellor', message: 'Empowering minds to build the nation through excellence in education and research.', createdAt: new Date().toISOString() },
    { id: 'tm-2', name: 'Prof. R. N. Desai', designation: 'Vice-Chancellor', message: 'Our vision is to foster innovation and leadership in every student who walks through our gates.', createdAt: new Date().toISOString() },
    { id: 'tm-3', name: 'Dr. Meera Reddy', designation: 'Registrar', message: 'Ensuring seamless academic administration and upholding the university’s glorious legacy.', createdAt: new Date().toISOString() },
    { id: 'tm-4', name: 'Dr. S. K. Verma', designation: 'Dean, Academics', message: 'Curating industry-aligned curricula to keep our students ahead of the curve.', createdAt: new Date().toISOString() },
    { id: 'tm-5', name: 'Prof. Anjali Gupta', designation: 'Dean, Student Welfare', message: 'Creating a vibrant, safe, and inclusive campus life for all our students.', createdAt: new Date().toISOString() },
    { id: 'tm-6', name: 'Mr. Vikram Singh', designation: 'Head of Placements', message: 'Bridging the gap between academia and industry with top-tier corporate partnerships.', createdAt: new Date().toISOString() }
  ];

  const defaultPlacements = [
    { id: 'pl-1', company: 'Google', package: '45.5 LPA', studentName: 'Rohan Mehra', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-2', company: 'Microsoft', package: '42.0 LPA', studentName: 'Sneha Rao', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-3', company: 'Amazon', package: '38.5 LPA', studentName: 'Aman Gupta', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-4', company: 'TCS Digital', package: '12.0 LPA', studentName: 'Priya Sharma', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-5', company: 'Infosys', package: '8.5 LPA', studentName: 'Karan Patel', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-6', company: 'Wipro', package: '8.0 LPA', studentName: 'Ananya Singh', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-7', company: 'Deloitte', package: '14.5 LPA', studentName: 'Rahul Verma', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-8', company: 'Morgan Stanley', package: '24.0 LPA', studentName: 'Neha Das', year: '2024', createdAt: new Date().toISOString() }
  ];

  const defaultExams = [
    { id: 'ex-1', examName: 'Even Semester End Term Exam', date: '2025-05-15', time: '10:00 AM - 01:00 PM', courseSemester: 'B.Tech 6th Sem', createdAt: new Date().toISOString() },
    { id: 'ex-2', examName: 'Mid-Semester Examinations', date: '2025-03-10', time: '02:00 PM - 04:00 PM', courseSemester: 'MBA 2nd Sem', createdAt: new Date().toISOString() },
    { id: 'ex-3', examName: 'Practical Lab Finals', date: '2025-05-05', time: '09:00 AM - 05:00 PM', courseSemester: 'B.Sc 4th Sem', createdAt: new Date().toISOString() },
    { id: 'ex-4', examName: 'Ph.D. Coursework Exam', date: '2025-06-20', time: '10:00 AM - 01:00 PM', courseSemester: 'Research Scholars', createdAt: new Date().toISOString() }
  ];

  const defaultCalendar = [
    { id: 'cal-1', event: 'Spring Semester Begins', startDate: '2025-01-15', endDate: '2025-01-15', description: 'Commencement of regular classes for all even semesters.', createdAt: new Date().toISOString() },
    { id: 'cal-2', event: 'Holi Break', startDate: '2025-03-24', endDate: '2025-03-26', description: 'Campus closed for Holi celebrations.', createdAt: new Date().toISOString() },
    { id: 'cal-3', event: 'Preparation Leave', startDate: '2025-05-08', endDate: '2025-05-14', description: 'Study leave before End Term Examinations.', createdAt: new Date().toISOString() },
    { id: 'cal-4', event: 'Summer Vacation Starts', startDate: '2025-06-01', endDate: '2025-07-20', description: 'Annual summer break for students.', createdAt: new Date().toISOString() }
  ];

  const defaultCertificates = [
    { id: 'cert-1', certificateId: 'LSU-2024-C001', rollNumber: 'CS2020001', studentName: 'Rohan Mehra', course: 'B.Tech in Computer Science', passingYear: '2024', percentage: '9.2 CGPA', issueDate: '2024-06-15', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-2', certificateId: 'LSU-2024-M045', rollNumber: 'MB2022045', studentName: 'Priya Sharma', course: 'MBA in Finance', passingYear: '2024', percentage: '8.8 CGPA', issueDate: '2024-06-20', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-3', certificateId: 'LSU-REVOKED-123', rollNumber: 'BSC2021088', studentName: 'Karan Patel', course: 'B.Sc in Applied Physics', passingYear: '2024', percentage: '7.5 CGPA', issueDate: '2024-06-18', isActive: false, createdAt: new Date().toISOString() },
    { id: 'cert-4', certificateId: 'LSU-2023-E099', rollNumber: 'EC2019099', studentName: 'Neha Das', course: 'B.Tech in ECE', passingYear: '2023', percentage: '8.5 CGPA', issueDate: '2023-06-10', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-5', certificateId: 'LSU-2024-B112', rollNumber: 'BB2021112', studentName: 'Aman Gupta', course: 'BBA', passingYear: '2024', percentage: '7.9 CGPA', issueDate: '2024-06-12', isActive: true, createdAt: new Date().toISOString() }
  ];

  try {
    for (const course of defaultCourses) {
      await setDoc(doc(db, 'courses', course.id), course);
      console.log(`seeded course ${course.id}`);
    }
    for (const event of defaultEvents) {
      await setDoc(doc(db, 'newsEvents', event.id), event);
      console.log(`seeded event ${event.id}`);
    }
    for (const tm of defaultTeamMembers) {
      await setDoc(doc(db, 'teamMembers', tm.id), tm);
      console.log(`seeded tm ${tm.id}`);
    }
    for (const pl of defaultPlacements) {
      await setDoc(doc(db, 'placements', pl.id), pl);
      console.log(`seeded pl ${pl.id}`);
    }
    for (const ex of defaultExams) {
      await setDoc(doc(db, 'examSchedules', ex.id), ex);
      console.log(`seeded ex ${ex.id}`);
    }
    for (const cal of defaultCalendar) {
      await setDoc(doc(db, 'academicCalendar', cal.id), cal);
      console.log(`seeded cal ${cal.id}`);
    }
    for (const cert of defaultCertificates) {
      await setDoc(doc(db, 'certificates', cert.id), cert);
      console.log(`seeded cert ${cert.id}`);
    }
    console.log('Seeding complete');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

seed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
