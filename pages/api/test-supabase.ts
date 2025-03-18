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
    // Test connection to Supabase
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Service Key (first 10 chars):', supabaseServiceKey.substring(0, 10) + '...');

    // Try to fetch submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from('submissions')
      .select('*');

    if (submissionsError) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching submissions',
        error: submissionsError
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase connection successful',
      data: {
        submissionsCount: submissions ? submissions.length : 0,
        submissions
      }
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
