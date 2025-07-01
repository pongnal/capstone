import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Token management functions
  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  const checkIsAuthenticated = () => {
    return !!getToken();
  };

  const getAuthHeader = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const clearAuthAndRedirect = () => {
    removeToken();
    window.location.href = '/login';
  };

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const token = getToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (if user logs out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    // Simply clear token from localStorage
    // No need to call backend since it doesn't invalidate tokens anyway
    removeToken();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    logout,
    getToken,
    getAuthHeader,
    setToken,
    removeToken,
    checkIsAuthenticated,
    clearAuthAndRedirect
  };
} 