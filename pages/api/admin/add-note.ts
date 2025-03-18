import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type RequestData = {
  submissionId: string;
  noteContent: string;
  adminUser: string;
};

type ResponseData = {
  success: boolean;
  data?: any;
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
    const { submissionId, noteContent, adminUser } = req.body as RequestData;
    
    if (!submissionId || !noteContent) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    // Add the note to Supabase
    const { data, error } = await supabase
      .from('admin_notes')
      .insert([
        {
          submission_id: submissionId,
          note_content: noteContent,
          admin_user: adminUser || 'Admin',
          created_at: new Date().toISOString(),
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to add note' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: data[0] 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    });
  }
}
