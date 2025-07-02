import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AddTask = () => {
  const [formData, setFormData] = useState({
    nameTask: '',
    taskDescription: '',
    date: new Date().toISOString().slice(0, 16), // Set default to current date/time
    status: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { getAuthHeader } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create task');
      }

      const data = await response.json();
      setSuccess('Task created successfully!');
      setTimeout(() => window.location.reload(), 1000);
      
      // Reset form
      setFormData({
        nameTask: '',
        taskDescription: '',
        date: new Date().toISOString().slice(0, 16),
        status: false
      });
      
    } catch (error) {
      setError(error.message || 'Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Add New Task</h1>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nameTask" className="block text-sm/6 font-medium text-gray-900">
                Task Name *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="nameTask"
                  name="nameTask"
                  value={formData.nameTask}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Enter task name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="taskDescription" className="block text-sm/6 font-medium text-gray-900">
                Task Description *
              </label>
              <div className="mt-2">
                <textarea
                  id="taskDescription"
                  name="taskDescription"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Enter task description"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
                Due Date *
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="status" className="ml-2 block text-sm/6 text-gray-900">
                Mark as completed
              </label>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Task...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;