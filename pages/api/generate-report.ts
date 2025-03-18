import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeSubmission } from '../../services/ai';

type RequestData = {
  submissionId: string;
};

type ResponseData = {
  success: boolean;
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
    const { submissionId } = req.body as RequestData;
    
    if (!submissionId) {
      return res.status(400).json({ success: false, error: 'Missing submissionId' });
    }

    // Analyze the submission and generate a report
    const success = await analyzeSubmission(submissionId);

    if (!success) {
      return res.status(500).json({ success: false, error: 'Failed to generate report' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
}
