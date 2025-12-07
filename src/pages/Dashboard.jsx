import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../utils/api';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/forms');
      setForms(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    if (!window.confirm('Are you sure you want to delete this form?')) {
      return;
    }

    try {
      await api.delete(`/forms/${formId}`);
      setForms(forms.filter(f => f._id !== formId));
    } catch (err) {
      alert('Failed to delete form: ' + err.message);
    }
  };

  const handleToggleActive = async (formId, isActive) => {
    try {
      await api.put(`/forms/${formId}`, { isActive: !isActive });
      setForms(forms.map(f => f._id === formId ? { ...f, isActive: !isActive } : f));
    } catch (err) {
      alert('Failed to update form status: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Forms</h1>
            <p className="text-gray-600 mt-1">Manage your form definitions and responses</p>
          </div>
          <Link
            to="/forms/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <span>+</span>
            <span>Create New Form</span>
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {forms.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No forms yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first form to start collecting responses from Airtable
            </p>
            <Link
              to="/forms/new"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Create Your First Form
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div
                key={form._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {form.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    form.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {form.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {form.description}
                  </p>
                )}

                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Base:</span>
                    <span className="font-medium text-gray-700">
                      {form.airtableBaseName || form.airtableBaseId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Table:</span>
                    <span className="font-medium text-gray-700">
                      {form.airtableTableName || form.airtableTableId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submissions:</span>
                    <span className="font-medium text-gray-700">
                      {form.submissionCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-medium text-gray-700">
                      {format(new Date(form.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/forms/${form._id}`}
                    target="_blank"
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded text-sm font-medium text-center"
                  >
                    View Form
                  </Link>
                  <Link
                    to={`/forms/${form._id}/responses`}
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-4 py-2 rounded text-sm font-medium text-center"
                  >
                    Responses ({form.submissionCount || 0})
                  </Link>
                </div>

                <div className="flex space-x-2 mt-2">
                  <Link
                    to={`/forms/${form._id}/edit`}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleToggleActive(form._id, form.isActive)}
                    className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
                      form.isActive
                        ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
                        : 'bg-green-50 hover:bg-green-100 text-green-700'
                    }`}
                  >
                    {form.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
