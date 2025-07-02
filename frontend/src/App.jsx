import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
import AddTaskPage from './taskManager/addTask';
import GetTaskPage from './taskManager/getTask';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import TaskDashboard from './components/TaskDashboard';

function App() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Route Definitions */}
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          } 
        />
        <Route 
          path="/addTask" 
          element={
            <ProtectedRoute>
              <AddTaskPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/getTask" 
          element={
            <ProtectedRoute>
              <GetTaskPage />
            </ProtectedRoute>
          } 
        />
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <TaskDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to home if authenticated, login if not */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </>
  )
}

export default App
