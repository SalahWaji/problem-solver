import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Submission {
  id: string;
  industry: string;
  company_size: string;
  operational_area: string;
  problem_description: string;
  email: string;
  status: string;
  created_at: string;
}

const AdminPage: NextPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Fetch admin password from API
      const response = await fetch('/api/admin-config');
      const data = await response.json();
      
      if (password === data.adminPassword) {
        setIsAuthenticated(true);
        localStorage.setItem('isAdminAuthenticated', 'true');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      console.error('Error fetching admin config:', error);
      setError('Authentication failed');
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
      if (isAuth) {
        fetchSubmissions();
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Fetch submissions
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      // Use the API endpoint instead of direct Supabase query
      const url = selectedStatus === 'all' 
        ? '/api/admin/get-submissions' 
        : `/api/admin/get-submissions?status=${selectedStatus}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch submissions');
      }
      
      setSubmissions(result.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh submissions when status filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [selectedStatus, isAuthenticated]);

  // Handle status change
  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      // Use the API endpoint instead of direct Supabase query
      const response = await fetch('/api/admin/update-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: submissionId, 
          status: newStatus 
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update status');
      }
      
      // Update local state
      setSubmissions(submissions.map(sub => 
        sub.id === submissionId ? { ...sub, status: newStatus } : sub
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status');
    }
  };

  // Handle manual report generation
  const handleGenerateReport = async (submissionId: string) => {
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate report');
      }
      
      // Update status in UI
      setSubmissions(submissions.map(sub => 
        sub.id === submissionId ? { ...sub, status: 'analyzed' } : sub
      ));
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report');
    }
  };

  // Handle view submission details
  const handleViewDetails = (submissionId: string) => {
    router.push(`/admin/submissions/${submissionId}`);
  };

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout
        title="Admin Login | Problem Solver Platform"
        description="Admin login for the Problem Solver Platform"
      >
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-heading font-bold text-gray-800 mb-6">Admin Login</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-accent transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Admin Dashboard | Problem Solver Platform"
      description="Admin dashboard for the Problem Solver Platform"
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-heading font-bold text-gray-800">Problem Submission Overview</h1>
              <button
                onClick={() => {
                  localStorage.removeItem('isAdminAuthenticated');
                  setIsAuthenticated(false);
                }}
                className="text-sm text-gray-600 hover:text-primary"
              >
                Logout
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
                <button
                  className="float-right font-bold"
                  onClick={() => setError(null)}
                >
                  &times;
                </button>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="statusFilter" className="block text-gray-700 font-medium mb-2">
                Filter by Status
              </label>
              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Submissions</option>
                <option value="new">New</option>
                <option value="analyzed">Analyzed</option>
                <option value="delivered">Delivered</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-2 text-gray-600">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No submissions found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Industry</th>
                      <th className="py-3 px-4 text-left">Company Size</th>
                      <th className="py-3 px-4 text-left">Area</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{submission.industry}</td>
                        <td className="py-3 px-4">{submission.company_size}</td>
                        <td className="py-3 px-4">{submission.operational_area}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            submission.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                            submission.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(submission.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </button>
                            {submission.status === 'new' && (
                              <button
                                onClick={() => handleGenerateReport(submission.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                Generate Report
                              </button>
                            )}
                            <select
                              value={submission.status}
                              onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded"
                            >
                              <option value="new">New</option>
                              <option value="analyzed">Analyzed</option>
                              <option value="delivered">Delivered</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
