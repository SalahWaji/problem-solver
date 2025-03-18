import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';

const DebugPage: NextPage = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [createResult, setCreateResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test Supabase connection
  const testSupabase = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test-supabase');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      console.error('Error testing Supabase:', error);
      setError('Failed to test Supabase connection');
    } finally {
      setIsLoading(false);
    }
  };

  // Create test submission
  const createTestSubmission = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-test-submission');
      const data = await response.json();
      setCreateResult(data);
    } catch (error) {
      console.error('Error creating test submission:', error);
      setError('Failed to create test submission');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Debug | Problem Solver Platform"
      description="Debug page for the Problem Solver Platform"
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-heading font-bold text-gray-800 mb-6">Debug Tools</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="space-y-8">
              {/* Test Supabase Connection */}
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Test Supabase Connection</h2>
                <button
                  onClick={testSupabase}
                  disabled={isLoading}
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Testing...' : 'Test Connection'}
                </button>
                
                {testResult && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Result:</h3>
                    <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                      <pre className="text-sm">{JSON.stringify(testResult, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Create Test Submission */}
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Create Test Submission</h2>
                <button
                  onClick={createTestSubmission}
                  disabled={isLoading}
                  className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Test Submission'}
                </button>
                
                {createResult && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Result:</h3>
                    <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                      <pre className="text-sm">{JSON.stringify(createResult, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Admin Dashboard Link */}
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Admin Dashboard</h2>
                <p className="mb-4">After creating a test submission, you can view it in the admin dashboard.</p>
                <a
                  href="/admin"
                  className="inline-block bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-accent transition-colors"
                >
                  Go to Admin Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DebugPage;
