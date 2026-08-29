import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/public/HomePage';
import ServicesPage from '../pages/public/ServicesPage';
import ServiceDetailPage from '../pages/public/ServiceDetailPage';
import WorkPage from '../pages/public/WorkPage';
import ProjectDetailPage from '../pages/public/ProjectDetailPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import TermsPage from '../pages/public/TermsPage';
import NotFoundPage from '../pages/public/NotFoundPage';
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import AdminProjectsPage from '../pages/admin/AdminProjectsPage';
import ProjectFormPage from '../pages/admin/ProjectFormPage';
import AdminServicesPage from '../pages/admin/AdminServicesPage';
import AdminTestimonialsPage from '../pages/admin/AdminTestimonialsPage';
import AdminTeamPage from '../pages/admin/AdminTeamPage';
import AdminInquiriesPage from '../pages/admin/AdminInquiriesPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="projects/new" element={<ProjectFormPage />} />
        <Route path="projects/:id/edit" element={<ProjectFormPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
