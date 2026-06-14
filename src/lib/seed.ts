import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export default async function seedDatabase() {
  const defaultCourses = [
    {
      id: 'btech-cse',
      name: 'B.Tech in Computer Science & Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,20,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
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
      fee: '₹1,30,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 65%) + JEE Main',
      description: 'Focused specialization in Artificial Intelligence, Deep Learning, and Big Data Analytics to prepare students for the AI revolution.',
      careerProspects: 'AI Engineer, ML Ops, Data Scientist, BI Developer',
      syllabusHighlights: ['Deep Learning', 'Big Data Engineering', 'NLP', 'Computer Vision'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-it',
      name: 'B.Tech in Information Technology',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,20,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
      description: 'Covers software development, web technologies, database administration, and IT infrastructure.',
      careerProspects: 'IT Consultant, Web Developer, Database Administrator',
      syllabusHighlights: ['Web Engineering', 'Database Management', 'Network Security', 'Software Testing'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-ece',
      name: 'B.Tech in Electronics & Communication',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,10,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
      description: 'Covers fundamental concepts of electronics, telecommunications, networking, and embedded systems.',
      careerProspects: 'Network Engineer, Embedded Systems Engineer, Telecom Specialist',
      syllabusHighlights: ['Digital Electronics', 'Signals & Systems', 'VLSI Design', 'Microprocessors'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-civil',
      name: 'B.Tech in Civil Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,00,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
      description: 'Learn to design, construct, and maintain the physical and naturally built environment, including public works.',
      careerProspects: 'Structural Engineer, Civil Designer, Construction Manager',
      syllabusHighlights: ['Structural Analysis', 'Geotech Engineering', 'Transportation', 'Surveying'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'btech-mech',
      name: 'B.Tech in Mechanical Engineering',
      category: 'technical',
      duration: '4 Years',
      fee: '₹1,00,000 / Year',
      eligibility: '10+2 with Physics, Chemistry, Math (Min 60%) + JEE Main',
      description: 'Core engineering branch focusing on design, analysis, manufacturing, and maintenance of mechanical systems.',
      careerProspects: 'Mechanical Engineer, Automobile Designer, Production Manager',
      syllabusHighlights: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'CAD/CAM'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bsc-pcm',
      name: 'B.Sc (Physics, Chemistry, Maths)',
      category: 'general',
      duration: '3 Years',
      fee: '₹40,000 / Year',
      eligibility: '10+2 with PCM (Min 55%)',
      description: 'A strong foundational degree in pure sciences, offering research and higher education opportunities.',
      careerProspects: 'Research Scientist, Educator, Lab Assistant',
      syllabusHighlights: ['Classical Mechanics', 'Organic Chemistry', 'Calculus', 'Electromagnetism'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bcom-gen',
      name: 'B.Com',
      category: 'general',
      duration: '3 Years',
      fee: '₹35,000 / Year',
      eligibility: '10+2 in any stream (Min 50%)',
      description: 'Fundamental commerce degree focusing on accounting, finance, and business law.',
      careerProspects: 'Accountant, Tax Assessor, Financial Analyst',
      syllabusHighlights: ['Financial Accounting', 'Business Law', 'Microeconomics', 'Auditing'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'msc-cs',
      name: 'M.Sc (CS)',
      category: 'general',
      duration: '2 Years',
      fee: '₹60,000 / Year',
      eligibility: 'B.Sc CS / BCA (Min 55%)',
      description: 'Advanced postgraduate degree focusing on computer systems, software development, and theoretical foundations.',
      careerProspects: 'Software Developer, Systems Analyst, IT Manager',
      syllabusHighlights: ['Advanced Algorithms', 'Compiler Design', 'Distributed Systems', 'Cryptography'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bba',
      name: 'BBA',
      category: 'management',
      duration: '3 Years',
      fee: '₹80,000 / Year',
      eligibility: '10+2 in any stream (Min 50%)',
      description: 'A foundational course in business principles and management, preparing leaders of tomorrow.',
      careerProspects: 'Business Analyst, HR Executive, Operations Manager',
      syllabusHighlights: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Business Law'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'mba',
      name: 'MBA',
      category: 'management',
      duration: '2 Years',
      fee: '₹2,00,000 / Year',
      eligibility: 'Bachelor\'s Degree in any discipline (Min 55%) + CAT',
      description: 'Master the principles of corporate finance, marketing strategies, and operations. Learn from industry veterans.',
      careerProspects: 'General Manager, Strategy Consultant, Investment Banker',
      syllabusHighlights: ['Strategic Management', 'Marketing Research', 'Corporate Finance', 'Operations Management'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'pgdm',
      name: 'PGDM',
      category: 'management',
      duration: '2 Years',
      fee: '₹1,80,000 / Year',
      eligibility: 'Bachelor\'s Degree in any discipline (Min 50%) + MAT/XAT',
      description: 'Post Graduate Diploma in Management focusing on practical skills, industry exposure, and entrepreneurship.',
      careerProspects: 'Business Manager, Entrepreneur, Project Head',
      syllabusHighlights: ['Entrepreneurship', 'Business Ethics', 'International Business', 'Supply Chain Management'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const defaultEvents = [
    {
      id: 'techfest-2025',
      title: 'LS University Tech Fest 2025',
      date: 'March 15-18, 2025',
      content: 'Join us for our annual technology festival featuring a 24-hour hackathon, robotics showcases, and expert talks from industry leaders.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'placement-infosys',
      title: 'Placement Drive by Infosys',
      date: 'April 01, 2025',
      content: 'Infosys will be conducting on-campus recruitment for final year B.Tech and MCA students.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'naac-grade',
      title: 'NAAC A++ Grade Awarded',
      date: 'May 10, 2025',
      content: 'We are proud to announce that LS University has been awarded the prestigious A++ grade by NAAC.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'intl-conf',
      title: 'International Conference on AI',
      date: 'June 05, 2025',
      content: 'A seminar discussing the impact and future of AI integrations in modern education systems, led by renowned researchers.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'holi-carnival',
      title: 'Holi Carnival 2025',
      date: 'March 24, 2025',
      content: 'Celebrate the festival of colors at the main campus ground with food, music, and games.',
      createdAt: new Date().toISOString()
    }
  ];

  const defaultTeamMembers = [
    { id: 'tm-1', name: 'Dr. Suresh Mehta', designation: 'Chancellor', message: 'Empowering minds to build the nation through excellence in education and research.', createdAt: new Date().toISOString() },
    { id: 'tm-2', name: 'Prof. Alka Singh', designation: 'Vice-Chancellor', message: 'Our vision is to foster innovation and leadership in every student who walks through our gates.', createdAt: new Date().toISOString() },
    { id: 'tm-3', name: 'Dr. Meera Reddy', designation: 'Registrar', message: 'Ensuring seamless academic administration and upholding the university’s glorious legacy.', createdAt: new Date().toISOString() },
    { id: 'tm-4', name: 'Dr. S. K. Verma', designation: 'Dean, Academics', message: 'Curating industry-aligned curricula to keep our students ahead of the curve.', createdAt: new Date().toISOString() },
    { id: 'tm-5', name: 'Prof. Anjali Gupta', designation: 'Dean, Student Welfare', message: 'Creating a vibrant, safe, and inclusive campus life for all our students.', createdAt: new Date().toISOString() },
    { id: 'tm-6', name: 'Mr. Vikram Singh', designation: 'Head of Placements', message: 'Bridging the gap between academia and industry with top-tier corporate partnerships.', createdAt: new Date().toISOString() }
  ];

  const defaultPlacements = [
    { id: 'pl-1', company: 'Microsoft', package: '45.0 LPA', studentName: 'Rohan Mehra', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-2', company: 'Google', package: '42.0 LPA', studentName: 'Sneha Rao', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-3', company: 'Amazon', package: '38.5 LPA', studentName: 'Aman Gupta', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-4', company: 'TCS', package: '12.0 LPA', studentName: 'Priya Sharma', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-5', company: 'Infosys', package: '12.5 LPA', studentName: 'Karan Patel', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-6', company: 'Wipro', package: '14.0 LPA', studentName: 'Ananya Singh', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-7', company: 'HCL', package: '14.5 LPA', studentName: 'Rahul Verma', year: '2024', createdAt: new Date().toISOString() },
    { id: 'pl-8', company: 'Deloitte', package: '24.0 LPA', studentName: 'Neha Das', year: '2024', createdAt: new Date().toISOString() }
  ];

  const defaultExams = [
    { id: 'ex-1', examName: 'Mid Sem Examinations', date: '2025-03-10', time: '10:00 AM - 01:00 PM', courseSemester: 'All Courses', createdAt: new Date().toISOString() },
    { id: 'ex-2', examName: 'Practical Exams', date: '2025-05-05', time: '09:00 AM - 05:00 PM', courseSemester: 'B.Tech/B.Sc', createdAt: new Date().toISOString() },
    { id: 'ex-3', examName: 'End Sem Examinations', date: '2025-05-15', time: '10:00 AM - 01:00 PM', courseSemester: 'All Courses', createdAt: new Date().toISOString() }
  ];

  const defaultCalendar = [
    { id: 'cal-1', event: 'Spring Semester Begins', startDate: '2025-01-15', endDate: '2025-01-15', description: 'Commencement of regular classes for all even semesters.', createdAt: new Date().toISOString() },
    { id: 'cal-2', event: 'Holi Break', startDate: '2025-03-24', endDate: '2025-03-26', description: 'Campus closed for Holi celebrations.', createdAt: new Date().toISOString() },
    { id: 'cal-3', event: 'Preparation Leave', startDate: '2025-05-08', endDate: '2025-05-14', description: 'Study leave before End Term Examinations.', createdAt: new Date().toISOString() },
    { id: 'cal-4', event: 'Summer Vacation Starts', startDate: '2025-06-01', endDate: '2025-07-20', description: 'Annual summer break for students.', createdAt: new Date().toISOString() }
  ];

  const defaultScholarships = [
    { id: 'sch-1', name: 'Merit-cum-Means Scholarship', amount: 'Up to 50% Tuition Fee', eligibility: 'Top 10% of the class & Family income < 8 LPA', description: 'Financial assistance for meritorious students from economically weaker sections.', createdAt: new Date().toISOString() },
    { id: 'sch-2', name: 'Sports Quota Scholarship', amount: '₹25,000 / Year', eligibility: 'National/State level players', description: 'Scholarship awarded to students to encourage sports participation.', createdAt: new Date().toISOString() }
  ];

  const defaultSettings = { 
    id: 'general',
    universityName: 'LS University',
    statsStudents: '5000+',
    statsFaculty: '250+',
    statsCourses: '50+',
    statsRecruiters: '150+',
    antiRaggingHelpline: '1800-180-5522',
    grievanceEmail: 'grievance@lsuniversity.ac.in',
    ugcApproval: 'UGC/12B/2005/001',
    naacGrade: 'A++ (CGPA 3.51/4)',
    nirfRank: '78',
    createdAt: new Date().toISOString()
  };

  const defaultCertificates = [
    { id: 'cert-1', certificateId: 'LSU/CSE/2024/001', rollNumber: '2021CS101', studentName: 'Aarav Sharma', course: 'B.Tech CSE', passingYear: '2024', percentage: '85%', issueDate: '2024-05-15', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-2', certificateId: 'LSU/MBA/2023/045', rollNumber: '2021MB045', studentName: 'Priya Verma', course: 'MBA', passingYear: '2023', percentage: '78%', issueDate: '2023-06-20', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-3', certificateId: 'LSU/BSC/2024/088', rollNumber: '2021BSC088', studentName: 'Karan Patel', course: 'B.Sc (Physics, Chemistry, Maths)', passingYear: '2024', percentage: '91%', issueDate: '2024-06-18', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-4', certificateId: 'LSU/ECE/2022/099', rollNumber: '2018ECE099', studentName: 'Neha Das', course: 'B.Tech ECE', passingYear: '2022', percentage: '72%', issueDate: '2022-07-10', isActive: true, createdAt: new Date().toISOString() },
    { id: 'cert-5', certificateId: 'LSU/BBA/2024/112', rollNumber: '2021BBA112', studentName: 'Aman Gupta', course: 'BBA', passingYear: '2024', percentage: '82%', issueDate: '2024-06-12', isActive: true, createdAt: new Date().toISOString() }
  ];

  try {
    for (const course of defaultCourses) {
      await setDoc(doc(db, 'courses', course.id), course);
    }
    for (const event of defaultEvents) {
      await setDoc(doc(db, 'newsEvents', event.id), event);
    }
    for (const tm of defaultTeamMembers) {
      await setDoc(doc(db, 'teamMembers', tm.id), tm);
    }
    for (const pl of defaultPlacements) {
      await setDoc(doc(db, 'placements', pl.id), pl);
    }
    for (const ex of defaultExams) {
      await setDoc(doc(db, 'examSchedules', ex.id), ex);
    }
    for (const cal of defaultCalendar) {
      await setDoc(doc(db, 'academicCalendar', cal.id), cal);
    }
    for (const cert of defaultCertificates) {
      await setDoc(doc(db, 'certificates', cert.id), cert);
    }
    for (const scholarship of defaultScholarships) {
      await setDoc(doc(db, 'scholarships', scholarship.id), scholarship);
    }
    await setDoc(doc(db, 'settings', defaultSettings.id), defaultSettings);
    
    // Seed page contents
    const pages = [
      { id: 'home', content: JSON.stringify({
        heroHeading: "Welcome to LS University",
        heroSubheading: "Empowering Next-Generation Leaders Through Excellence in Education",
        heroCta: "Explore Programs",
        stats1Value: "5000+",
        stats1Label: "Students",
        stats2Value: "250+",
        stats2Label: "Faculty",
        stats3Value: "50+",
        stats3Label: "Courses",
        stats4Value: "150+",
        stats4Label: "Recruiters",
        aboutHeading: "Pioneering Education for Tomorrow",
        aboutText: "LS University stands at the forefront of modern education, combining rigorous academics with practical, industry-aligned training.",
        featuredCoursesHeading: "Discover Our Programs",
        newsHeading: "Latest News & Events"
      }) },
      { id: 'admissions', content: JSON.stringify({ heading: 'Admissions', body: 'Admissions process, eligibility, fees, important dates, and online application form will be displayed here.' }) },
      { id: 'campus-life', content: JSON.stringify({ heading: 'Campus Life', body: 'Facilities, clubs, events, hostels, library, and sports information will be displayed here.' }) },
      { id: 'contact', content: JSON.stringify({ heading: 'Contact Us', body: 'Map, address, phone, email, and enquiry form will be displayed here.' }) },
      { id: 'examination', content: JSON.stringify({ heading: 'Examination', body: 'Exam schedule, results, hall ticket download, and revaluation process.' }) },
      { id: 'academicCalendar', content: JSON.stringify({ heading: 'Academic Calendar', body: 'Term dates, holidays, and event schedule.' }) },
      { id: 'studentCorner', content: JSON.stringify({ heading: 'Student Corner & Scholarships', body: 'Scholarships, portal link, anti-ragging, grievance redressal.' }) },
      { id: 'iqac', content: JSON.stringify({ heading: 'IQAC / NAAC', body: 'NAAC accreditation details, SSR, AQAR, best practices.' }) },
      { id: 'research', content: JSON.stringify({ heading: 'Research & Innovation', body: 'Research centers, publications, patents, conferences.' }) },
      { id: 'collaborations', content: JSON.stringify({ heading: 'International Collaboration', body: 'MoUs, foreign universities, student exchange programs.' }) },
      { id: 'alumni', content: JSON.stringify({ heading: 'Alumni', body: 'Alumni association, registration, success stories.' }) },
      { id: 'anti-ragging', content: JSON.stringify({ heading: 'Anti-Ragging', body: 'Helpline numbers (1800-180-5522). The University has a zero-tolerance policy towards ragging.' }) },
      { id: 'grievance', content: JSON.stringify({ heading: 'Grievance Redressal', body: 'Submit your grievances through our online portal. We ensure timely resolution.' }) },
      { id: 'rti', content: JSON.stringify({ heading: 'Right to Information (RTI)', body: 'Information regarding RTI, PIOs, and process of requesting information.' }) },
      { id: 'icc', content: JSON.stringify({ heading: 'Internal Complaints Committee (ICC)', body: 'Details of ICC members and policy for prevention of sexual harassment.' }) },
      { id: 'approvals', content: JSON.stringify({ heading: 'UGC & AICTE Approvals', body: 'Documentation of all government and statutory body approvals.' }) },
      { id: 'scholarships', content: JSON.stringify({ heading: 'Scholarships', body: '1. Merit Scholarship: ₹50,000 for top 10% students. 2. Sports Scholarship: Complete fee waiver for national players.' }) }
    ];
    for (const page of pages) {
      await setDoc(doc(db, 'pageContents', page.id), page);
    }

    console.log('Seeding complete');
    return true;
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err;
  }
}
