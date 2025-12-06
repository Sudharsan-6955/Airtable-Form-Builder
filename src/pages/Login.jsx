import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const Login = () => {
  const { initiateLogin, isLoading, error } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    
    if (errorParam) {
      console.error('Login error:', errorParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in with your Airtable account to continue
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={initiateLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span>Redirecting...</span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm1 8a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                <span>Login with Airtable</span>
              </>
            )}
          </button>

          <p className="mt-6 text-sm text-gray-500">
            By signing in, you agree to connect your Airtable account to our form builder.
          </p>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">What you'll get:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Access to your Airtable bases and tables
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Create unlimited forms with conditional logic
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Automatic data synchronization with webhooks
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              View and manage all form responses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
