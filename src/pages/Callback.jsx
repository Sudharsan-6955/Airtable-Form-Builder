import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth, fetchUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=auth_failed');
        return;
      }

      if (token) {
        localStorage.setItem('token', token);
        const success = await fetchUser();
        
        if (success) {
          navigate('/dashboard');
        } else {
          navigate('/login?error=auth_failed');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuth, fetchUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-xl text-gray-700">Completing authentication...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we sign you in.</p>
      </div>
    </div>
  );
};

export default Callback;
