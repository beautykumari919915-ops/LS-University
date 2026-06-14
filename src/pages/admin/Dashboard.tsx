import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Copy, BookOpen, Calendar, Settings, Award, Users, FileText, CalendarDays, Briefcase, Database } from 'lucide-react';
import PageEditor from './PageEditor';
import CourseEditor from './CourseEditor';
import EventEditor from './EventEditor';
import CertificateEditor from './CertificateEditor';
import GenericDataEditor from './GenericDataEditor';
import { db } from '../../lib/firebase';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { DEMO_CONTENT } from '../../lib/demoData';

import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function AdminDashboardBoundary() {
  return (
    <ErrorBoundary>
      <AdminDashboard />
    </ErrorBoundary>
  );
}

function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('pages');
  const [isSeeding, setIsSeeding] = useState(false);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSeedData = async () => {
    if (!window.confirm("This will overwrite existing content with original demo data. Are you sure?")) return;
    setIsSeeding(true);
    try {
      const batch = writeBatch(db);
      
      // Seed Pages
      Object.entries(DEMO_CONTENT.pages).forEach(([id, content]) => {
        batch.set(doc(db, 'pageContents', id), { 
          content, 
          updatedAt: new Date().toISOString() 
        }, { merge: true });
      });

      // Seed Collections
      Object.entries(DEMO_CONTENT.collections).forEach(([colName, items]) => {
        items.forEach((item: any) => {
          batch.set(doc(db, colName, item.id), item, { merge: true });
        });
      });

      await batch.commit();
      alert("Database seeded successfully with all demo content! Refreshing...");
      window.location.reload();
    } catch (e: any) {
      console.error(e);
      alert("Error seeding data: " + e.message);
    } finally {
      setIsSeeding(false);
    }
  };

  const renderTab = () => {
    switch(activeTab) {
      case 'pages': return <PageEditor />;
      case 'courses': return <CourseEditor />;
      case 'departments': return <GenericDataEditor collectionName="departments" title="Departments" displayKey="name" subtitleKey="hod" fields={[{key:'name',label:'Department Name',required:true},{key:'hod',label:'Head of Department',required:true},{key:'description',label:'Description',type:'textarea'}]} />;
      case 'faculty': return <GenericDataEditor collectionName="faculty" title="Faculty Management" displayKey="name" subtitleKey="department" fields={[{key:'name',label:'Name',required:true},{key:'department',label:'Department',required:true},{key:'designation',label:'Designation',required:true},{key:'specialization',label:'Specialization'},{key:'photoUrl',label:'Photo URL'}]} />;
      case 'board': return <GenericDataEditor collectionName="boardOfGovernors" title="Board of Governors" displayKey="name" subtitleKey="role" fields={[{key:'name',label:'Name',required:true},{key:'role',label:'Role/Position',required:true},{key:'profile',label:'Profile details',type:'textarea'}]} />;
      case 'recruiters': return <GenericDataEditor collectionName="recruiters" title="Recruiters" displayKey="companyName" subtitleKey="industry" fields={[{key:'companyName',label:'Company Name',required:true},{key:'industry',label:'Industry',required:true},{key:'logoUrl',label:'Logo URL'}]} />;
      case 'alumni': return <GenericDataEditor collectionName="alumni" title="Alumni Network" displayKey="name" subtitleKey="batch" fields={[{key:'name',label:'Name',required:true},{key:'batch',label:'Batch/Year',required:true},{key:'company',label:'Current Company'},{key:'testimonial',label:'Testimonial',type:'textarea'}]} />;
      case 'notices': return <GenericDataEditor collectionName="notices" title="Notices & Circulars" displayKey="title" subtitleKey="date" fields={[{key:'title',label:'Notice Title',required:true},{key:'date',label:'Date Published',type:'date',required:true},{key:'fileUrl',label:'PDF/Document URL'}]} />;
      case 'tenders': return <GenericDataEditor collectionName="tenders" title="Tenders" displayKey="title" subtitleKey="deadline" fields={[{key:'title',label:'Tender Title',required:true},{key:'deadline',label:'Deadline',type:'date',required:true},{key:'fileUrl',label:'Tender Document URL'}]} />;
      case 'downloads': return <GenericDataEditor collectionName="downloads" title="Public Downloads" displayKey="title" subtitleKey="category" fields={[{key:'title',label:'Title',required:true},{key:'category',label:'Category (e.g. Forms, Syllabus)',required:true},{key:'fileUrl',label:'File URL',required:true}]} />;
      case 'events': return <EventEditor />;
      case 'certificates': return <CertificateEditor />;
      case 'team': return <GenericDataEditor collectionName="teamMembers" title="Leadership Team" displayKey="name" subtitleKey="designation" fields={[{key:'name',label:'Name',required:true},{key:'designation',label:'Designation',required:true},{key:'message',label:'Message (Quote)',type:'textarea'},{key:'photoUrl',label:'Photo URL'}]} />;
      case 'placements': return <GenericDataEditor collectionName="placements" title="Placements" displayKey="studentName" subtitleKey="company" fields={[{key:'studentName',label:'Student Name',required:true},{key:'company',label:'Company',required:true},{key:'package',label:'Package LPA',required:true},{key:'year',label:'Year',required:true}]} />;
      case 'exams': return <GenericDataEditor collectionName="examSchedules" title="Exam Schedules & Results" displayKey="examName" subtitleKey="date" fields={[{key:'examName',label:'Exam Name & Semester',required:true},{key:'date',label:'Date',type:'date',required:true},{key:'time',label:'Time',required:true},{key:'status',label:'Status (Upcoming/Results Out)',required:true},{key:'link',label:'Results Link / PDF URL'}]} />;
      case 'calendar': return <GenericDataEditor collectionName="academicCalendar" title="Academic Calendar" displayKey="event" subtitleKey="startDate" fields={[{key:'event',label:'Event Name',required:true},{key:'description',label:'Description',type:'textarea'},{key:'startDate',label:'Start Date',type:'date',required:true},{key:'endDate',label:'End Date',type:'date',required:true}]} />;
      case 'scholarships': return <GenericDataEditor collectionName="scholarships" title="Scholarships" displayKey="name" subtitleKey="amount" fields={[{key:'name',label:'Scholarship Name',required:true},{key:'amount',label:'Amount/Waiver',required:true},{key:'eligibility',label:'Eligibility',required:true},{key:'description',label:'Description',type:'textarea'}]} />;
      case 'settings': return <GenericDataEditor collectionName="settings" title="Global Settings & Stats" displayKey="universityName" subtitleKey="id" fields={[{key:'universityName',label:'University Name',required:true},{key:'statsStudents',label:'Stats: Students'},{key:'statsFaculty',label:'Stats: Faculty'},{key:'statsCourses',label:'Stats: Courses'},{key:'statsRecruiters',label:'Stats: Recruiters'},{key:'antiRaggingHelpline',label:'Anti-Ragging Helpline'},{key:'grievanceEmail',label:'Grievance Email'},{key:'ugcApproval',label:'UGC Approval Number'},{key:'naacGrade',label:'NAAC Grade'},{key:'nirfRank',label:'NIRF Rank'}]} />;
      default: return <PageEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-ls-blue border-r border-slate-800 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-white/10 bg-black/20">
          <h2 className="text-2xl font-serif text-ls-gold font-bold tracking-wide">LS Admin</h2>
          <p className="text-xs text-slate-400 mt-2 truncate font-mono">{user.email}</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pb-10 scrollbar-hide">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-4 px-4 bg-white/5 py-1.5 rounded-full inline-block">Web Pages</h3>
          <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'pages' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Copy className="mr-3 h-4 w-4" /> All Pages
          </button>
          
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-4 bg-white/5 py-1.5 rounded-full inline-block">Academics</h3>
          <button onClick={() => setActiveTab('courses')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'courses' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <BookOpen className="mr-3 h-4 w-4" /> Programs & Courses
          </button>
          <button onClick={() => setActiveTab('departments')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'departments' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <BookOpen className="mr-3 h-4 w-4" /> Departments
          </button>
          <button onClick={() => setActiveTab('faculty')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'faculty' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Users className="mr-3 h-4 w-4" /> Faculty Management
          </button>
          <button onClick={() => setActiveTab('exams')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'exams' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <FileText className="mr-3 h-4 w-4" /> Exams & Results
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'calendar' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <CalendarDays className="mr-3 h-4 w-4" /> Academic Calendar
          </button>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-4 bg-white/5 py-1.5 rounded-full inline-block">People & Admin</h3>
          <button onClick={() => setActiveTab('board')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'board' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Users className="mr-3 h-4 w-4" /> Board of Governors
          </button>
          <button onClick={() => setActiveTab('team')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'team' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Users className="mr-3 h-4 w-4" /> Leadership Team
          </button>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-4 bg-white/5 py-1.5 rounded-full inline-block">Careers & Alumni</h3>
          <button onClick={() => setActiveTab('placements')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'placements' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Briefcase className="mr-3 h-4 w-4" /> Placements
          </button>
          <button onClick={() => setActiveTab('recruiters')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'recruiters' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Briefcase className="mr-3 h-4 w-4" /> Recruiters
          </button>
          <button onClick={() => setActiveTab('alumni')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'alumni' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Users className="mr-3 h-4 w-4" /> Alumni Network
          </button>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-4 bg-white/5 py-1.5 rounded-full inline-block">Information</h3>
          <button onClick={() => setActiveTab('events')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'events' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Calendar className="mr-3 h-4 w-4" /> News & Events
          </button>
          <button onClick={() => setActiveTab('notices')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'notices' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <FileText className="mr-3 h-4 w-4" /> Notices & Circulars
          </button>
          <button onClick={() => setActiveTab('tenders')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'tenders' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <FileText className="mr-3 h-4 w-4" /> Tenders
          </button>
          <button onClick={() => setActiveTab('downloads')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'downloads' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <FileText className="mr-3 h-4 w-4" /> Downloads
          </button>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6 px-4 bg-white/5 py-1.5 rounded-full inline-block">Records & Settings</h3>
          <button onClick={() => setActiveTab('certificates')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'certificates' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Award className="mr-3 h-4 w-4" /> Certificates
          </button>
          <button onClick={() => setActiveTab('scholarships')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'scholarships' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Award className="mr-3 h-4 w-4" /> Scholarships
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'settings' ? 'bg-ls-gold text-ls-blue shadow-lg scale-100' : 'text-slate-300 hover:bg-white/10 hover:translate-x-1'}`}>
            <Settings className="mr-3 h-4 w-4" /> Global Settings
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          <button 
            onClick={handleSeedData}
            disabled={isSeeding}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow disabled:opacity-50"
          >
            <Database className="mr-2 h-4 w-4" /> {isSeeding ? 'Seeding...' : 'Seed Demo Data'}
          </button>
          <button 
            onClick={signOut}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors shadow"
          >
            <LogOut className="mr-2 h-4 w-4" /> Secure Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100/50">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden min-h-[800px]">
          <ErrorBoundary>
            {renderTab()}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
