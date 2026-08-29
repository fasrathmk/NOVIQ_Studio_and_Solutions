import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import LoadingState from '../components/common/LoadingState';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingState label="Checking session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
