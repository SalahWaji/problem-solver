export interface FormData {
  // Company Context
  industry: string;
  companySize: string;
  yearsInBusiness: number;
  
  // Problem Identification
  operationalArea: string;
  problemFrequency: string;
  impactSeverity: string;
  
  // Current Solutions
  currentApproaches: string[];
  solutionSatisfaction: string;
  budgetRange: string;
  
  // Problem Description
  problemDescription: string;
  documentUrl?: string;
  
  // Contact
  email: string;
  optInFuture: boolean;
  allowFollowUp: boolean; // Allow follow-up questions if someone is working on the problem
  interestedInDiscount: boolean; // Interested in discount when app goes live
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
}

export const formSteps: FormStep[] = [
  {
    id: 'company-context',
    title: 'Company Context',
    description: 'Tell us about your business',
  },
  {
    id: 'problem-identification',
    title: 'Problem Identification',
    description: 'Describe the challenge you\'re facing',
  },
  {
    id: 'current-solutions',
    title: 'Current Solutions',
    description: 'How are you addressing this today?',
  },
  {
    id: 'problem-description',
    title: 'Problem Description',
    description: 'Provide more details about your challenge',
  },
  {
    id: 'contact',
    title: 'Contact & Submission',
    description: 'Where should we send your insights?',
  },
];

export const industryOptions = [
  { value: 'technology', label: 'Technology & Software' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'education', label: 'Education' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'construction', label: 'Construction & Real Estate' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'nonprofit', label: 'Nonprofit & NGO' },
  { value: 'other', label: 'Other' },
];

export const companySizeOptions = [
  { value: 'solo', label: 'Solo' },
  { value: '2-10', label: '2-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201+', label: '201+ employees' },
];

export const operationalAreaOptions = [
  { value: 'finance', label: 'Finance & Accounting' },
  { value: 'marketing', label: 'Marketing & Sales' },
  { value: 'operations', label: 'Operations & Logistics' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'customer', label: 'Customer Service' },
  { value: 'product', label: 'Product Development' },
  { value: 'it', label: 'IT & Technology' },
  { value: 'legal', label: 'Legal & Compliance' },
  { value: 'strategy', label: 'Strategy & Planning' },
  { value: 'other', label: 'Other' },
];

export const problemFrequencyOptions = [
  { value: 'rarely', label: 'Rarely (Monthly or less)' },
  { value: 'occasionally', label: 'Occasionally (Weekly)' },
  { value: 'frequently', label: 'Frequently (Several times a week)' },
  { value: 'daily', label: 'Daily' },
  { value: 'constantly', label: 'Constantly (Multiple times per day)' },
];

export const impactSeverityOptions = [
  { value: 'minor', label: 'Minor (Slight inconvenience)' },
  { value: 'moderate', label: 'Moderate (Noticeable inefficiency)' },
  { value: 'significant', label: 'Significant (Affects multiple processes)' },
  { value: 'major', label: 'Major (Substantial business impact)' },
  { value: 'critical', label: 'Critical (Threatens business viability)' },
];

export const currentApproachOptions = [
  { value: 'manual', label: 'Manual workarounds' },
  { value: 'spreadsheets', label: 'Spreadsheets/documents' },
  { value: 'software', label: 'Existing software (not ideal)' },
  { value: 'outsourcing', label: 'Outsourcing' },
  { value: 'ignoring', label: 'Ignoring the problem' },
  { value: 'custom', label: 'Custom-built solution' },
  { value: 'other', label: 'Other' },
];

export const satisfactionOptions = [
  { value: 'very-dissatisfied', label: 'Very Dissatisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'very-satisfied', label: 'Very Satisfied' },
];

export const budgetRangeOptions = [
  { value: 'none', label: 'No budget allocated' },
  { value: 'low', label: '$1 - $1,000' },
  { value: 'medium', label: '$1,001 - $10,000' },
  { value: 'high', label: '$10,001 - $50,000' },
  { value: 'enterprise', label: '$50,001+' },
];
