import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/Layout/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import TrainingPrograms from './pages/TrainingPrograms';
import PlacementResources from './pages/PlacementResources';
import ResumeUpload from './pages/ResumeUpload';
import AICareerAssistant from './pages/AICareerAssistant';
import MockInterviews from './pages/MockInterviews';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: 'student' | 'recruiter' }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} replace />;
  }
  
  return <>{children}</>;
};

// App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AppLayout><LandingPage /></AppLayout>} />
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} replace /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to={user.role === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} replace /> : <SignUpPage />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute requiredRole="student">
              <AppLayout><StudentDashboard /></AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter-dashboard" 
          element={
            <ProtectedRoute requiredRole="recruiter">
              <AppLayout><RecruiterDashboard /></AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* Feature Routes (Available to all authenticated users) */}
        <Route 
          path="/training" 
          element={
            <ProtectedRoute>
              <AppLayout><TrainingPrograms /></AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/placements" 
          element={
            <ProtectedRoute>
              <AppLayout><PlacementResources /></AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume-upload" 
          element={
            <ProtectedRoute requiredRole="student">
              <AppLayout><ResumeUpload /></AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai-assistant" 
          element={
            <ProtectedRoute>
              <AppLayout><AICareerAssistant /></AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mock-interviews" 
          element={
            <ProtectedRoute requiredRole="student">
              <AppLayout><MockInterviews /></AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Root App Component with Providers
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;