import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SubmissionData {
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

interface ReportData {
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

/**
 * Analyzes a submission and generates a report
 */
export async function analyzeSubmission(submissionId: string): Promise<boolean> {
  try {
    // Fetch the submission from Supabase
    const { data: submission, error: fetchError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError) {
      console.error('Error fetching submission:', fetchError);
      return false;
    }

    // Generate the report using OpenAI
    const report = await generateReport(submission);

    // Save the report to Supabase
    const { error: insertError } = await supabase
      .from('reports')
      .insert([
        {
          submission_id: submissionId,
          report_content: report,
          generated_at: new Date().toISOString(),
        }
      ]);

    if (insertError) {
      console.error('Error saving report:', insertError);
      return false;
    }

    // Update the submission status
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ status: 'analyzed' })
      .eq('id', submissionId);

    if (updateError) {
      console.error('Error updating submission status:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in analyzeSubmission:', error);
    return false;
  }
}

/**
 * Generates a report for a submission using OpenAI
 */
async function generateReport(submission: SubmissionData): Promise<ReportData> {
  try {
    // Create a prompt for OpenAI
    const prompt = `
      Analyze this business problem:
      
      Industry: ${submission.industry}
      Company Size: ${submission.company_size}
      Years in Business: ${submission.years_in_business}
      Operational Area: ${submission.operational_area}
      Problem Frequency: ${submission.problem_frequency}
      Impact Severity: ${submission.impact_severity}
      Current Approaches: ${submission.current_approaches.join(', ')}
      Solution Satisfaction: ${submission.solution_satisfaction}
      Budget Range: ${submission.budget_range}
      Problem Description: ${submission.problem_description}
      
      Based on this information, provide a comprehensive analysis in the following format:
      
      1. Industry Comparison:
         - How common is this problem in this industry and company size?
         - What context is important to understand about this problem in this industry?
      
      2. Solution Landscape:
         - What are the most common approaches to solving this problem?
         - What are typical satisfaction levels with current solutions?
         - What insights can you provide about budget considerations?
      
      3. Business Impact:
         - What is the estimated impact of this problem on the business?
         - What competitive advantage might come from solving this issue?
         - What priority recommendation would you give based on frequency and severity?
      
      4. Recommendations:
         - Provide 3-5 specific recommendations for addressing this problem.
      
      Format your response as JSON with the following structure:
      {
        "industry_comparison": {
          "prevalence": "string",
          "context": "string"
        },
        "solution_landscape": {
          "common_approaches": ["string"],
          "satisfaction_levels": "string",
          "budget_insights": "string"
        },
        "business_impact": {
          "estimated_impact": "string",
          "competitive_advantage": "string",
          "priority_recommendation": "string"
        },
        "recommendations": ["string"]
      }
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a business analyst AI that provides insights on business problems. Format your response as JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500,
      temperature: 0.7,
    });

    // Parse the response
    const responseText = response.choices[0].message.content?.trim() || '';
    
    try {
      // Try to parse the JSON response
      const parsedResponse = JSON.parse(responseText);
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      
      // If parsing fails, return a structured error report
      return {
        industry_comparison: {
          prevalence: 'Unable to determine due to analysis error',
          context: 'Analysis error occurred',
        },
        solution_landscape: {
          common_approaches: ['Analysis error occurred'],
          satisfaction_levels: 'Unable to determine',
          budget_insights: 'Unable to provide insights due to analysis error',
        },
        business_impact: {
          estimated_impact: 'Unable to estimate due to analysis error',
          competitive_advantage: 'Unable to determine',
          priority_recommendation: 'Please review the submission manually',
        },
        recommendations: [
          'Please review the submission manually as automated analysis failed',
          'Consider reaching out to the submitter for more information',
        ],
      };
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    
    // Return a structured error report
    return {
      industry_comparison: {
        prevalence: 'Unable to determine due to service error',
        context: 'Service error occurred',
      },
      solution_landscape: {
        common_approaches: ['Service error occurred'],
        satisfaction_levels: 'Unable to determine',
        budget_insights: 'Unable to provide insights due to service error',
      },
      business_impact: {
        estimated_impact: 'Unable to estimate due to service error',
        competitive_advantage: 'Unable to determine',
        priority_recommendation: 'Please review the submission manually',
      },
      recommendations: [
        'Please review the submission manually as automated analysis failed',
        'Consider reaching out to the submitter for more information',
      ],
    };
  }
}

/**
 * Fetches a report for a submission
 */
export async function getReport(submissionId: string): Promise<ReportData | null> {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('report_content')
      .eq('submission_id', submissionId)
      .single();

    if (error) {
      console.error('Error fetching report:', error);
      return null;
    }

    return data.report_content;
  } catch (error) {
    console.error('Error in getReport:', error);
    return null;
  }
}
