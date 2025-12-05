import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Set authentication data
      setAuth: (token, user) => {
        localStorage.setItem('token', token);
        set({
          token,
          user,
          isAuthenticated: true,
          error: null
        });
      },

      // Clear authentication
      clearAuth: () => {
        localStorage.removeItem('token');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      // Fetch current user
      fetchUser: async () => {
        const token = get().token || localStorage.getItem('token');
        
        if (!token) {
          get().clearAuth();
          return false;
        }

        // Check if token is expired
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            get().clearAuth();
            return false;
          }
        } catch (error) {
          get().clearAuth();
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await api.get('/auth/me');
          
          set({
            user: response.data.user,
            token,
            isAuthenticated: true,
            isLoading: false
          });
          
          return true;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          get().clearAuth();
          set({ isLoading: false, error: error.message });
          return false;
        }
      },

      // Initiate OAuth login
      initiateLogin: async () => {
        try {
          const response = await api.get('/auth/airtable');
          window.location.href = response.data.authUrl;
        } catch (error) {
          console.error('Failed to initiate login:', error);
          set({ error: error.message });
        }
      },

      // Logout
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          get().clearAuth();
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;
