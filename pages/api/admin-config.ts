import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  adminPassword: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // Return the admin password from environment variables
  // In a production app, you would use a more secure authentication method
  res.status(200).json({
    adminPassword: process.env.ADMIN_PASSWORD || '123',
  });
}
