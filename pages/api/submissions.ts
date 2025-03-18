import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type SubmissionData = {
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
};

type ResponseData = {
  success: boolean;
  id?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const data = req.body as SubmissionData;
    
    // Basic validation
    if (!data.email || !data.problem_description || !data.industry) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Insert into Supabase
    const { data: submission, error } = await supabase
      .from('submissions')
      .insert([
        {
          industry: data.industry,
          company_size: data.company_size,
          years_in_business: data.years_in_business,
          operational_area: data.operational_area,
          problem_frequency: data.problem_frequency,
          impact_severity: data.impact_severity,
          current_approaches: data.current_approaches,
          solution_satisfaction: data.solution_satisfaction,
          budget_range: data.budget_range,
          problem_description: data.problem_description,
          document_url: data.document_url,
          email: data.email,
          opt_in_future: data.opt_in_future,
          allow_follow_up: data.allow_follow_up,
          interested_in_discount: data.interested_in_discount,
          status: 'new',
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to save submission' 
      });
    }

    // Trigger report generation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId: submission[0].id }),
      });
    } catch (reportError) {
      console.error('Error triggering report generation:', reportError);
      // Continue anyway, as the submission was successful
    }

    return res.status(200).json({ 
      success: true, 
      id: submission[0].id 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    });
  }
}
