import { createClient } from '@supabase/supabase-js';
import { getReport } from './ai';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email using SendGrid
 * This is a placeholder implementation
 */
async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // In a real implementation, this would use SendGrid or another email service
    console.log('Sending email:', emailData);
    
    // For now, we'll just log the email data and return success
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send a report email to a submission
 */
export async function sendReportEmail(submissionId: string): Promise<boolean> {
  try {
    // Fetch the submission
    const { data: submission, error: fetchError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError) {
      console.error('Error fetching submission:', fetchError);
      return false;
    }

    // Fetch the report
    const report = await getReport(submissionId);
    
    if (!report) {
      console.error('Report not found for submission:', submissionId);
      return false;
    }

    // Create the email content
    const emailData: EmailData = {
      to: submission.email,
      subject: 'Your Problem Solver Insights Report Is Ready',
      html: `
        <h1>Hello,</h1>
        <p>Thank you for sharing your business challenge with Problem Solver. We've analyzed your submission and prepared a personalized insights report.</p>
        
        <h2>Your Challenge:</h2>
        <p>${submission.problem_description.substring(0, 100)}...</p>
        
        <h2>Key Insights:</h2>
        <ul>
          <li>${report.industry_comparison.prevalence}</li>
          <li>${report.business_impact.estimated_impact}</li>
          <li>${report.business_impact.priority_recommendation}</li>
        </ul>
        
        <h2>Recommendations:</h2>
        <ol>
          ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ol>
        
        <p>Thank you for contributing to our growing database of real business challenges. Your submission helps entrepreneurs identify problems worth solving.</p>
        
        <p>Best regards,<br>The Problem Solver Team</p>
      `,
    };

    // Send the email
    const success = await sendEmail(emailData);

    if (success) {
      // Update the submission status
      const { error: updateError } = await supabase
        .from('submissions')
        .update({ status: 'delivered' })
        .eq('id', submissionId);

      if (updateError) {
        console.error('Error updating submission status:', updateError);
        return false;
      }
    }

    return success;
  } catch (error) {
    console.error('Error in sendReportEmail:', error);
    return false;
  }
}
