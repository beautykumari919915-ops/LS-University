/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages placeholders
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import GenericPage from './components/GenericPage';
import CertificateVerification from './pages/CertificateVerification';
import FeePayment from './pages/FeePayment';
import Placements from './pages/Placements';
import Scholarships from './pages/Scholarships';
import NotFound from './pages/NotFound';

// Admin placeholders
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:category" element={<Courses />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="fee-payment" element={<FeePayment />} />
            <Route path="admissions" element={<GenericPage pageId="admissions" />} />
            <Route path="placements" element={<Placements />} />
            <Route path="campus-life" element={<GenericPage pageId="campus-life" />} />
            <Route path="contact" element={<GenericPage pageId="contact" />} />
            <Route path="examination" element={<GenericPage pageId="examination" />} />
            <Route path="academic-calendar" element={<GenericPage pageId="academicCalendar" />} />
            <Route path="student-corner" element={<GenericPage pageId="studentCorner" />} />
            <Route path="iqac" element={<GenericPage pageId="iqac" />} />
            <Route path="research" element={<GenericPage pageId="research" />} />
            <Route path="collaborations" element={<GenericPage pageId="collaborations" />} />
            <Route path="alumni" element={<GenericPage pageId="alumni" />} />
            <Route path="anti-ragging" element={<GenericPage pageId="anti-ragging" />} />
            <Route path="grievance" element={<GenericPage pageId="grievance" />} />
            <Route path="rti" element={<GenericPage pageId="rti" />} />
            <Route path="icc" element={<GenericPage pageId="icc" />} />
            <Route path="approvals" element={<GenericPage pageId="approvals" />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="verify-certificate" element={<CertificateVerification />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

