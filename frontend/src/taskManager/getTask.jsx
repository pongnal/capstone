import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await fetch('http://localhost:3000/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`http://localhost:3000/task/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task status');
      }

      // Update the task in local state immediately
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId 
            ? { ...task, status: newStatus }
            : task
        )
      );

      // Show success message
      setSuccess(`Task ${newStatus ? 'completed' : 'marked as pending'} successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 5000);

    } catch (error) {
      setError(error.message || 'Failed to update task status. Please try again.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task');
      }

      // Remove the task from local state immediately
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

      // Show success message
      setSuccess('Task deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error) {
      setError(error.message || 'Failed to delete task. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    return status 
      ? 'bg-green-100 border-green-300 text-green-800' 
      : 'bg-blue-100 border-blue-300 text-blue-800';
  };

  const getStatusText = (status) => {
    return status ? 'Completed' : 'Pending';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Loading tasks...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <div className="flex gap-3">
              <a 
                href="/addTask" 
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add New Task
              </a>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className={`mb-4 p-3 border rounded
              ${success.toLowerCase().includes('delete') ? 'bg-red-100 border-red-400 text-red-700'
                : success.toLowerCase().includes('pending') ? 'bg-blue-100 border-blue-400 text-blue-700'
                : 'bg-green-100 border-green-400 text-green-700'}
            `}>
              {success}
            </div>
          )}

          {/* Tasks List */}
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first task.</p>
              <a 
                href="/addTask" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Task
              </a>
            </div>
          ) : (
                         <div className="space-y-4">
               {tasks.map((task, index) => (
                 <div 
                   key={task._id || index} 
                   className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md relative ${
                     task.status ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                   }`}
                 >
                   {/* Delete Button - Top Right */}
                   <button
                     onClick={() => deleteTask(task._id)}
                     className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                     title="Delete task"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                   <div className="flex items-start justify-between">
                     <div className="flex-1">
                       <div className="flex items-center gap-3 mb-2">
                         <div className="flex items-center gap-2">
                           <input
                             type="checkbox"
                             checked={task.status}
                             onChange={(e) => updateTaskStatus(task._id, e.target.checked)}
                             className={`h-5 w-5 rounded border-gray-300`}
                           />
                           <h3 className={`text-lg font-semibold ${
                             task.status ? 'text-green-900' : 'text-gray-900'
                           }`}>
                             {task.nameTask}
                           </h3>
                         </div>
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                           {getStatusText(task.status)}
                         </span>
                       </div>
                       
                       <p className={`mb-3 ${
                         task.status ? 'text-green-700' : 'text-gray-600'
                       }`}>
                         {task.taskDescription}
                       </p>
                       
                       <div className="flex items-center text-sm text-gray-500">
                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                         </svg>
                         Due: {formatDate(task.date)}
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          )}

          {/* Task Summary */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Total Tasks: {tasks.length}</span>
                <span>Completed: {tasks.filter(task => task.status).length}</span>
                <span>Pending: {tasks.filter(task => !task.status).length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetTask;