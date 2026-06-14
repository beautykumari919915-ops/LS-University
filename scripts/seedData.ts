import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedData = async () => {
  try {
    const batch = writeBatch(db);

    // PAGE CONTENTS
    const pageContents: any = {
      home: {
        content: JSON.stringify({
          heroHeading: "Empowering the Leaders of Tomorrow",
          heroSubheading: "A premier institution of excellence in education, research, and innovation. Ranked among the top 50 global universities for impact.",
          heroCta: "Explore Programs",
          stats1Value: "50+",
          stats1Label: "Acres of Campus",
          stats2Value: "20,000+",
          stats2Label: "Global Alumni",
          stats3Value: "95%",
          stats3Label: "Placement Rate",
          stats4Value: "200+",
          stats4Label: "Expert Faculty",
          aboutHeading: "A Legacy of Academic Excellence",
          aboutText: "Founded with a vision to redefine education, LS University has been at the forefront of academic innovation for over three decades. Our state-of-the-art campus, world-class faculty, and industry-aligned curriculum create an ecosystem where minds are nurtured to solve global challenges. We foster an environment of inclusive learning and ground-breaking research.",
          featuredCoursesHeading: "Discover Your Path",
          newsHeading: "Latest from Campus"
        })
      },
      homepageSliders: {
        content: JSON.stringify({
          slide1Image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          slide1Title: "Welcome to Excellence",
          slide2Image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          slide2Title: "World-Class Infrastructure",
          slide3Image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          slide3Title: "A Vibrant Community"
        })
      },
      about: {
        content: JSON.stringify({
          heading: "About LS University",
          body: "LS University stands as a beacon of academic excellence, recognized globally for its commitment to holistic education, research, and innovation.\n\nEstablished in 1995, our journey began with a simple but profound mission: to provide world-class education that shapes character and empowers minds. Today, our sprawling 50-acre green campus houses diverse faculties spanning Engineering, Management, Arts, Science, and Commerce.\n\nOur curriculum is designed in collaboration with industry leaders to ensure our graduates are not just job-ready but future-ready. With advanced laboratories, a vast library network, and dedicated innovation incubation centers, we provide the perfect ecosystem for learning and growth."
        })
      },
      admissions: {
        content: JSON.stringify({
          heading: "Admissions Process",
          body: "Join a community of innovators, leaders, and thinkers. At LS University, we seek students who demonstrate academic excellence, passion, and a drive to make a difference.\n\n### Application Procedure\n1. Register online through our admission portal.\n2. Fill the detailed application form and upload necessary documents.\n3. Pay the application fee.\n4. Appear for the University Entrance Examination (if applicable).\n5. Attend the personal interview round.\n\n### Eligibility\nWe look for a strong academic record, extracurricular achievements, and leadership potential. Specific eligibility criteria vary by program."
        })
      },
      feeStructure: {
        content: JSON.stringify({
          heading: "Fee Structure",
          body: "We believe quality education should be accessible. Our fee structure is competitive and transparent.\n\n### Undergraduate Programs (Per Semester)\n- **B.Tech:** ₹1,25,000\n- **BBA / BCA:** ₹85,000\n- **B.Sc / B.Com:** ₹65,000\n- **BA:** ₹55,000\n\n### Postgraduate Programs (Per Semester)\n- **MBA:** ₹1,75,000\n- **MCA:** ₹95,000\n- **M.Tech:** ₹1,10,000\n\n*Note: Hostel, transport, and examination fees are extra. Education loans are available through our tie-up banks.*"
        })
      },
      placements: {
        content: JSON.stringify({
          heading: "Placements & Career Development",
          body: "Our dedicated Career Services Cell ensures that every student gets the best possible start to their professional journey.\n\n### Placement Statistics (2025)\n- **Highest Package:** ₹42 LPA\n- **Average Package:** ₹8.5 LPA\n- **Number of Recruiters:** 250+\n- **Total Offers:** 1200+\n\nOur top recruiters include global giants like Microsoft, Google, Amazon, Deloitte, TCS, Infosys, Wipro, and Cognizant. We provide comprehensive pre-placement training including resume building, mock interviews, and technical workshops."
        })
      },
      contact: {
        content: JSON.stringify({
          heading: "Contact Us",
          body: "We would love to hear from you. Reach out to our various departments for any queries.",
          address: "LS University Campus, Education Hub, Knowledge City, State - 500001",
          phone: "+91 1800 123 4567, +91 98765 43210",
          email: "admissions@lsuniversity.edu, info@lsuniversity.edu",
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.4170946284!2d78.96288!3d21.1610859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        })
      }
    };

    for (const [id, data] of Object.entries(pageContents)) {
      batch.set(doc(db, 'pageContents', id), data);
    }

    // COURSES
    const courses = [
      { id: "btech-cse", name: "B.Tech in Computer Science", category: "B.Tech", duration: "4 Years", description: "Comprehensive program covering AI, Cloud Computing, Data Science and modern software engineering principles. Equips students with industry-relevant skills to tackle complex technological problems.", eligibility: "10+2 with Physics, Chemistry, and Mathematics with minimum 60% aggregate.", fee: "1,25,000 per semester", intake: "240" },
      { id: "btech-ece", name: "B.Tech in Electronics", category: "B.Tech", duration: "4 Years", description: "Focuses on VLSI design, IoT, communication systems and embedded technologies.", eligibility: "10+2 with PCM with 60%", fee: "1,15,000 per semester", intake: "120" },
      { id: "btech-me", name: "B.Tech in Mechanical", category: "B.Tech", duration: "4 Years", description: "Advanced mechanical engineering with focus on robotics, automation, and sustainable manufacturing.", eligibility: "10+2 with PCM with 60%", fee: "1,15,000 per semester", intake: "120" },
      { id: "bca", name: "Bachelor of Computer Applications", category: "BCA", duration: "3 Years", description: "Foundational and advanced principles of software development, databases, and web technologies.", eligibility: "10+2 passing", fee: "85,000 per semester", intake: "180" },
      { id: "mca", name: "Master of Computer Applications", category: "MCA", duration: "2 Years", description: "Advanced program for aspiring software architects and tech leaders.", eligibility: "Graduation with Math at 10+2 or Graduation level", fee: "95,000 per semester", intake: "120" },
      { id: "mba", name: "Master of Business Administration", category: "MBA", duration: "2 Years", description: "Specializations in Marketing, Finance, HR, and Business Analytics.", eligibility: "Graduation with minimum 50%", fee: "1,75,000 per semester", intake: "180" }
    ];

    courses.forEach(c => batch.set(doc(db, 'courses', c.id), c));

    // FACULTY
    const faculty = [
      { id: "f1", name: "Dr. Robert Smith", department: "Computer Science", designation: "Professor & Head", specialization: "Artificial Intelligence, Machine Learning", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200" },
      { id: "f2", name: "Dr. Sarah Chen", department: "Business Administration", designation: "Associate Professor", specialization: "Organizational Behavior", photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
      { id: "f3", name: "Dr. Rajesh Kumar", department: "Electronics", designation: "Professor", specialization: "VLSI Design, Microelectronics", photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
      { id: "f4", name: "Dr. Emily Davis", department: "Mechanical Engineering", designation: "Assistant Professor", specialization: "Robotics and Automation", photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200" },
    ];

    faculty.forEach(f => batch.set(doc(db, 'faculty', f.id), f));

    // NEWS
    const notices = [
      { id: "n1", title: "Semester Exam Schedule Released", date: "2026-06-15", fileUrl: "#" },
      { id: "n2", title: "Campus Recruitment Drive - Microsoft", date: "2026-06-20", fileUrl: "#" },
      { id: "n3", title: "Annual Tech Fest 'Innovate 2026'", date: "2026-07-05", fileUrl: "#" },
      { id: "n4", title: "Research Grant Applications Open", date: "2026-06-10", fileUrl: "#" },
      { id: "n5", title: "Global Alumni Meet Registration", date: "2026-08-15", fileUrl: "#" },
      { id: "n6", title: "Guideline for Library Access", date: "2026-06-01", fileUrl: "#" },
    ];

    notices.forEach(n => batch.set(doc(db, 'notices', n.id), n));

    // RECRUITERS
    const recruiters = [
      { id: "r1", companyName: "Microsoft", industry: "Technology" },
      { id: "r2", companyName: "Google", industry: "Technology" },
      { id: "r3", companyName: "Amazon", industry: "Technology & Retail" },
      { id: "r4", companyName: "TCS", industry: "IT Services" },
      { id: "r5", companyName: "Deloitte", industry: "Consulting" },
      { id: "r6", companyName: "Infosys", industry: "IT Services" }
    ];

    recruiters.forEach(r => batch.set(doc(db, 'recruiters', r.id), r));

    // EVENTS
    const events = [
      { id: "e1", title: "International Conference on AI", date: "Aug 15-17, 2026", time: "10:00 AM", content: "Join top researchers around the globe as we discuss the future of General Artificial Intelligence and its applications in industry.", location: "Main Auditorium", type: "Conference" },
      { id: "e2", title: "Campus Career Fair", date: "Sep 5, 2026", time: "09:00 AM", content: "Over 100 companies will be visiting the campus to hire final year students.", location: "University Ground", type: "Placement" },
      { id: "e3", title: "Cultural Festival VIBE'26", date: "Oct 12-14, 2026", time: "06:00 PM", content: "Three days of music, dance, arts, and unlimited fun.", location: "Campus Main Ground", type: "Culture" }
    ];

    events.forEach(e => batch.set(doc(db, 'events', e.id), e));

    // PLACEMENTS
    const placements = [
      { id: "p1", studentName: "Aarav Sharma", company: "Microsoft", package: "42 LPA", year: "2025" },
      { id: "p2", studentName: "Priya Patel", company: "Amazon", package: "38 LPA", year: "2025" },
      { id: "p3", studentName: "Rohan Gupta", company: "Google", package: "40 LPA", year: "2025" },
      { id: "p4", studentName: "Sneha Reddy", company: "Atlassian", package: "45 LPA", year: "2025" }
    ];

    placements.forEach(p => batch.set(doc(db, 'placements', p.id), p));

    // BOARD 
    const board = [
      { id: "b1", name: "Dr. Vikram Singh", role: "Chancellor", profile: "Eminent educationist with over 40 years of experience." },
      { id: "b2", name: "Mr. Rajeev Mehta", role: "Vice Chancellor", profile: "Former director of premier national institute." }
    ];

    board.forEach(b => batch.set(doc(db, 'boardOfGovernors', b.id), b));

    await batch.commit();
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Failed:", err);
    process.exit(1);
  }
}

seedData();
