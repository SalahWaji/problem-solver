import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Create a test submission
    const testSubmission = {
      industry: 'Technology',
      company_size: '10-50 employees',
      years_in_business: 5,
      operational_area: 'Customer Service',
      problem_frequency: 'Weekly',
      impact_severity: 'Moderate',
      current_approaches: ['Manual processes', 'Spreadsheets'],
      solution_satisfaction: 'Somewhat dissatisfied',
      budget_range: '$1,000 - $5,000',
      problem_description: 'This is a test submission. We are experiencing issues with our customer service workflow that is causing delays in response times.',
      email: 'test@example.com',
      opt_in_future: true,
      allow_follow_up: true,
      interested_in_discount: true,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Insert the test submission into Supabase
    const { data, error } = await supabase
      .from('submissions')
      .insert([testSubmission])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating test submission',
        error
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Test submission created successfully',
      data
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error
    });
  }
}
