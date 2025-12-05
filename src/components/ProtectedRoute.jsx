import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, fetchUser } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await fetchUser();
      }
      setChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, fetchUser]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
