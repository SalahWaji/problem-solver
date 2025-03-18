import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Submission {
  id: string;
  industry: string;
  company_size: string;
  years_in_business: number;
  operational_area: string;
  problem_frequency: string;
  impact_severity: string;
  current_approaches: string[];
  solution_satisfaction: string;
  budget_range: string;
  problem_description: string;
  document_url?: string;
  email: string;
  opt_in_future: boolean;
  allow_follow_up: boolean;
  interested_in_discount: boolean;
  status: string;
  created_at: string;
}

interface Report {
  industry_comparison: {
    prevalence: string;
    context: string;
  };
  solution_landscape: {
    common_approaches: string[];
    satisfaction_levels: string;
    budget_insights: string;
  };
  business_impact: {
    estimated_impact: string;
    competitive_advantage: string;
    priority_recommendation: string;
  };
  recommendations: string[];
}

const SubmissionDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<{ id: string; note_content: string; admin_user: string; created_at: string }[]>([]);

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
    
    if (isAuth && id) {
      fetchSubmission();
      fetchNotes();
    } else if (!isAuth) {
      router.push('/admin');
    }
  }, [id, router]);

  // Fetch submission data
  const fetchSubmission = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/get-submission?id=${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch submission');
      }
      
      setSubmission(result.data);
      
      // If submission is analyzed, fetch the report
      if (result.data.status === 'analyzed' || result.data.status === 'delivered') {
        await fetchReport(result.data.id);
      }
    } catch (error) {
      console.error('Error fetching submission:', error);
      setError('Failed to fetch submission details');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch admin notes
  const fetchNotes = async () => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/admin/get-notes?submissionId=${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch notes');
      }
      
      setNotes(result.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes');
    }
  };

  // Add a note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note.trim() || !id) return;
    
    try {
      const response = await fetch('/api/admin/add-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: id.toString(),
          noteContent: note,
          adminUser: 'Admin', // In a real app, this would be the logged-in admin's name
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to add note');
      }
      
      // Clear the note input and refresh notes
      setNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Failed to add note');
    }
  };

  // Generate report
  const handleGenerateReport = async () => {
    if (!id) return;
    
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId: id }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate report');
      }
      
      // Refresh the submission data
      fetchSubmission();
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report');
    }
  };

  // Fetch report data
  const fetchReport = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/admin/get-report?submissionId=${submissionId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch report');
      }
      
      setReport(result.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      setError('Failed to fetch report');
    }
  };

  // Update submission status
  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    
    try {
      // Use the API endpoint instead of direct Supabase query
      const response = await fetch('/api/admin/update-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: id.toString(), 
          status: newStatus 
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update status');
      }
      
      // Update local state
      if (submission) {
        setSubmission({ ...submission, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status');
    }
  };

  // Send email
  const handleSendEmail = async () => {
    if (!id) return;
    
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId: id }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to send report email');
      }
      
      // Refresh the submission data
      fetchSubmission();
      
      // Show success message
      alert('Report email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send email');
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to admin login
  }

  if (isLoading) {
    return (
      <Layout
        title="Loading... | Admin Dashboard"
        description="Loading submission details"
      >
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">Loading submission details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!submission) {
    return (
      <Layout
        title="Not Found | Admin Dashboard"
        description="Submission not found"
      >
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-heading font-bold text-gray-800 mb-6">Submission Not Found</h1>
              <p className="text-gray-600 mb-4">The submission you're looking for doesn't exist or you don't have permission to view it.</p>
              <button
                onClick={() => router.push('/admin')}
                className="bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-accent transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Submission Details | Admin Dashboard"
      description="View submission details and report"
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
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
          
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/admin')}
              className="text-primary hover:text-accent flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="flex space-x-2">
              <select
                value={submission.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="new">New</option>
                <option value="analyzed">Analyzed</option>
                <option value="delivered">Delivered</option>
                <option value="archived">Archived</option>
              </select>
              
              {submission.status === 'new' && (
                <button
                  onClick={handleGenerateReport}
                  className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Generate Report
                </button>
              )}
              
              {submission.status === 'analyzed' && (
                <button
                  onClick={handleSendEmail}
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Report Email
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Submission Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Submission Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      submission.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                      submission.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {submission.status}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                    <p>{new Date(submission.created_at).toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{submission.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                    <p>{submission.industry}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company Size</h3>
                    <p>{submission.company_size}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Years in Business</h3>
                    <p>{submission.years_in_business}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Operational Area</h3>
                    <p>{submission.operational_area}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Problem Frequency</h3>
                    <p>{submission.problem_frequency}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Impact Severity</h3>
                    <p>{submission.impact_severity}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Approaches</h3>
                    <ul className="list-disc pl-5 mt-1">
                      {submission.current_approaches.map((approach, index) => (
                        <li key={index}>{approach}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Solution Satisfaction</h3>
                    <p>{submission.solution_satisfaction}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Budget Range</h3>
                    <p>{submission.budget_range}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Preferences</h3>
                    <ul className="list-disc pl-5 mt-1">
                      {submission.opt_in_future && <li>Opted in for future updates</li>}
                      {submission.allow_follow_up && <li>Allows follow-up contact</li>}
                      {submission.interested_in_discount && <li>Interested in solution discounts</li>}
                    </ul>
                  </div>
                  
                  {submission.document_url && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Document URL</h3>
                      <a 
                        href={submission.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent"
                      >
                        View Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Admin Notes */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Admin Notes</h2>
                
                <form onSubmit={handleAddNote} className="mb-4">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about this submission..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-2 bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    Add Note
                  </button>
                </form>
                
                {notes.length === 0 ? (
                  <p className="text-gray-500 italic">No notes yet</p>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="border-l-4 border-primary pl-4 py-2">
                        <p className="text-gray-700">{note.note_content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {note.admin_user} - {new Date(note.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Problem Description and Report */}
            <div className="lg:col-span-2">
              {/* Problem Description */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Problem Description</h2>
                <div className="prose max-w-none">
                  <p>{submission.problem_description}</p>
                </div>
              </div>
              
              {/* Report */}
              {report ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">AI Analysis Report</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Industry Comparison</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-1">Prevalence</h4>
                        <p className="mb-3">{report.industry_comparison.prevalence}</p>
                        
                        <h4 className="font-medium mb-1">Context</h4>
                        <p>{report.industry_comparison.context}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Solution Landscape</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-1">Common Approaches</h4>
                        <ul className="list-disc pl-5 mb-3">
                          {report.solution_landscape.common_approaches.map((approach, index) => (
                            <li key={index}>{approach}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-medium mb-1">Satisfaction Levels</h4>
                        <p className="mb-3">{report.solution_landscape.satisfaction_levels}</p>
                        
                        <h4 className="font-medium mb-1">Budget Insights</h4>
                        <p>{report.solution_landscape.budget_insights}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Business Impact</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-1">Estimated Impact</h4>
                        <p className="mb-3">{report.business_impact.estimated_impact}</p>
                        
                        <h4 className="font-medium mb-1">Competitive Advantage</h4>
                        <p className="mb-3">{report.business_impact.competitive_advantage}</p>
                        
                        <h4 className="font-medium mb-1">Priority Recommendation</h4>
                        <p>{report.business_impact.priority_recommendation}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Recommendations</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ol className="list-decimal pl-5">
                          {report.recommendations.map((recommendation, index) => (
                            <li key={index} className="mb-2">{recommendation}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                submission.status === 'new' ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-600 mb-4">No report has been generated yet.</p>
                    <button
                      onClick={handleGenerateReport}
                      className="bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-accent transition-colors"
                    >
                      Generate Report Now
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-600">Loading report data...</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmissionDetailPage;
