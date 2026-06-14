import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Copy, BookOpen, Calendar, Settings, Award, Users, FileText, CalendarDays, Briefcase } from 'lucide-react';
import PageEditor from './PageEditor';
import CourseEditor from './CourseEditor';
import EventEditor from './EventEditor';
import CertificateEditor from './CertificateEditor';
import GenericDataEditor from './GenericDataEditor';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('pages');

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const renderTab = () => {
    switch(activeTab) {
      case 'pages': return <PageEditor />;
      case 'courses': return <CourseEditor />;
      case 'events': return <EventEditor />;
      case 'certificates': return <CertificateEditor />;
      case 'team': return <GenericDataEditor collectionName="teamMembers" title="Team Members" displayKey="name" subtitleKey="designation" fields={[{key:'name',label:'Name',required:true},{key:'designation',label:'Designation',required:true},{key:'message',label:'Message (Quote)',type:'textarea'},{key:'photoUrl',label:'Photo URL'}]} />;
      case 'placements': return <GenericDataEditor collectionName="placements" title="Placements" displayKey="studentName" subtitleKey="company" fields={[{key:'studentName',label:'Student Name',required:true},{key:'company',label:'Company',required:true},{key:'package',label:'Package LPA',required:true},{key:'year',label:'Year',required:true}]} />;
      case 'exams': return <GenericDataEditor collectionName="examSchedules" title="Exam Schedules" displayKey="examName" subtitleKey="date" fields={[{key:'examName',label:'Exam Name',required:true},{key:'date',label:'Date',type:'date',required:true},{key:'time',label:'Time',required:true},{key:'courseSemester',label:'Course/Semester',required:true}]} />;
      case 'calendar': return <GenericDataEditor collectionName="academicCalendar" title="Academic Calendar" displayKey="event" subtitleKey="startDate" fields={[{key:'event',label:'Event Name',required:true},{key:'description',label:'Description',type:'textarea'},{key:'startDate',label:'Start Date',type:'date',required:true},{key:'endDate',label:'End Date',type:'date',required:true}]} />;
      case 'scholarships': return <GenericDataEditor collectionName="scholarships" title="Scholarships" displayKey="name" subtitleKey="amount" fields={[{key:'name',label:'Scholarship Name',required:true},{key:'amount',label:'Amount/Waiver',required:true},{key:'eligibility',label:'Eligibility',required:true},{key:'description',label:'Description',type:'textarea'}]} />;
      case 'settings': return <GenericDataEditor collectionName="settings" title="Global Settings & Stats" displayKey="universityName" subtitleKey="id" fields={[{key:'universityName',label:'University Name',required:true},{key:'statsStudents',label:'Stats: Students'},{key:'statsFaculty',label:'Stats: Faculty'},{key:'statsCourses',label:'Stats: Courses'},{key:'statsRecruiters',label:'Stats: Recruiters'},{key:'antiRaggingHelpline',label:'Anti-Ragging Helpline'},{key:'grievanceEmail',label:'Grievance Email'},{key:'ugcApproval',label:'UGC Approval Number'},{key:'naacGrade',label:'NAAC Grade'},{key:'nirfRank',label:'NIRF Rank'}]} />;
      default: return <PageEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-amber-500">LS Admin Panel</h2>
          <p className="text-xs text-slate-400 mt-1 truncate">{user.email}</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2 px-4">Content</h3>
          <button
            onClick={() => setActiveTab('pages')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'pages' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Copy className="mr-3 h-5 w-5" /> Web Pages
          </button>
          
          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'courses' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <BookOpen className="mr-3 h-5 w-5" /> Courses
          </button>
          
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'events' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Calendar className="mr-3 h-5 w-5" /> News & Events
          </button>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-4">Records</h3>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'certificates' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Award className="mr-3 h-5 w-5" /> Certificates
          </button>

          <button
            onClick={() => setActiveTab('placements')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'placements' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Briefcase className="mr-3 h-5 w-5" /> Placements
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'team' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Users className="mr-3 h-5 w-5" /> Leadership Team
          </button>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-4">Academic</h3>

          <button
            onClick={() => setActiveTab('exams')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'exams' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <FileText className="mr-3 h-5 w-5" /> Exam Schedules
          </button>
          
          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'calendar' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <CalendarDays className="mr-3 h-5 w-5" /> Academic Calendar
          </button>
          
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'scholarships' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Award className="mr-3 h-5 w-5" /> Scholarships
          </button>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-4">System</h3>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Settings className="mr-3 h-5 w-5" /> Global Settings
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={async () => {
              if (confirm('This will seed the database with test data. Proceed?')) {
                try {
                  const { default: seedDatabase } = await import('../../lib/seed');
                  await seedDatabase();
                  alert('Database seeded successfully! Please refresh the page.');
                } catch (e: any) {
                  alert('Failed to seed database: ' + e.message);
                }
              }
            }}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-amber-500 border border-amber-500 hover:bg-amber-500 hover:text-slate-900 rounded-md transition-colors"
          >
             Seed Demo Data
          </button>
          <button 
            onClick={signOut}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" /> Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
