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
  { value: 'automotive', label: 'Automotive & Car Dealerships' },
  { value: 'dental', label: 'Dental Practices' },
  { value: 'vocational', label: 'Vocational Schools' },
  { value: 'other', label: 'Other' },
];

export const companySizeOptions = [
  { value: 'solo', label: 'Solo' },
  { value: '2-10', label: '2-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201+', label: '201+ employees' },
];

// Define subcategories for each industry
export interface OperationalAreaOption {
  value: string;
  label: string;
}

export const operationalAreasByIndustry: Record<string, OperationalAreaOption[]> = {
  technology: [
    { value: 'software_dev', label: 'Software Development' },
    { value: 'it_infrastructure', label: 'IT Infrastructure' },
    { value: 'data_analytics', label: 'Data Analytics' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'product_management', label: 'Product Management' },
    { value: 'tech_support', label: 'Technical Support' },
    { value: 'other', label: 'Other' },
  ],
  retail: [
    { value: 'inventory', label: 'Inventory Management' },
    { value: 'ecommerce', label: 'E-commerce Operations' },
    { value: 'store_operations', label: 'Store Operations' },
    { value: 'supply_chain', label: 'Supply Chain' },
    { value: 'customer_experience', label: 'Customer Experience' },
    { value: 'merchandising', label: 'Merchandising' },
    { value: 'other', label: 'Other' },
  ],
  manufacturing: [
    { value: 'production', label: 'Production & Assembly' },
    { value: 'quality_control', label: 'Quality Control' },
    { value: 'supply_chain', label: 'Supply Chain' },
    { value: 'maintenance', label: 'Equipment Maintenance' },
    { value: 'inventory', label: 'Inventory Management' },
    { value: 'safety', label: 'Safety & Compliance' },
    { value: 'other', label: 'Other' },
  ],
  healthcare: [
    { value: 'patient_care', label: 'Patient Care' },
    { value: 'medical_records', label: 'Medical Records' },
    { value: 'billing', label: 'Billing & Insurance' },
    { value: 'scheduling', label: 'Scheduling & Appointments' },
    { value: 'compliance', label: 'Compliance & Regulations' },
    { value: 'pharmacy', label: 'Pharmacy Operations' },
    { value: 'other', label: 'Other' },
  ],
  finance: [
    { value: 'accounting', label: 'Accounting' },
    { value: 'financial_planning', label: 'Financial Planning' },
    { value: 'investment', label: 'Investment Management' },
    { value: 'lending', label: 'Lending & Credit' },
    { value: 'compliance', label: 'Compliance & Risk' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'other', label: 'Other' },
  ],
  education: [
    { value: 'curriculum', label: 'Curriculum Development' },
    { value: 'student_services', label: 'Student Services' },
    { value: 'administration', label: 'Administration' },
    { value: 'enrollment', label: 'Enrollment & Admissions' },
    { value: 'technology', label: 'Educational Technology' },
    { value: 'assessment', label: 'Assessment & Grading' },
    { value: 'other', label: 'Other' },
  ],
  hospitality: [
    { value: 'reservations', label: 'Reservations & Booking' },
    { value: 'guest_services', label: 'Guest Services' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'housekeeping', label: 'Housekeeping & Maintenance' },
    { value: 'events', label: 'Events & Conferences' },
    { value: 'revenue_management', label: 'Revenue Management' },
    { value: 'other', label: 'Other' },
  ],
  construction: [
    { value: 'project_management', label: 'Project Management' },
    { value: 'estimating', label: 'Estimating & Bidding' },
    { value: 'site_operations', label: 'Site Operations' },
    { value: 'safety', label: 'Safety & Compliance' },
    { value: 'procurement', label: 'Materials & Procurement' },
    { value: 'design', label: 'Design & Architecture' },
    { value: 'other', label: 'Other' },
  ],
  professional: [
    { value: 'client_management', label: 'Client Management' },
    { value: 'project_delivery', label: 'Project Delivery' },
    { value: 'billing', label: 'Billing & Invoicing' },
    { value: 'knowledge_management', label: 'Knowledge Management' },
    { value: 'compliance', label: 'Compliance & Quality' },
    { value: 'business_development', label: 'Business Development' },
    { value: 'other', label: 'Other' },
  ],
  nonprofit: [
    { value: 'fundraising', label: 'Fundraising & Development' },
    { value: 'program_management', label: 'Program Management' },
    { value: 'volunteer', label: 'Volunteer Coordination' },
    { value: 'grant_management', label: 'Grant Management' },
    { value: 'donor_relations', label: 'Donor Relations' },
    { value: 'community_outreach', label: 'Community Outreach' },
    { value: 'other', label: 'Other' },
  ],
  automotive: [
    { value: 'sales', label: 'Vehicle Sales' },
    { value: 'service', label: 'Service & Repairs' },
    { value: 'inventory', label: 'Inventory Management' },
    { value: 'finance', label: 'Financing & Insurance' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'marketing', label: 'Marketing & Promotions' },
    { value: 'other', label: 'Other' },
  ],
  dental: [
    { value: 'patient_care', label: 'Patient Care' },
    { value: 'scheduling', label: 'Scheduling & Appointments' },
    { value: 'billing', label: 'Billing & Insurance' },
    { value: 'inventory', label: 'Inventory & Supplies' },
    { value: 'patient_records', label: 'Patient Records' },
    { value: 'compliance', label: 'Compliance & Regulations' },
    { value: 'other', label: 'Other' },
  ],
  vocational: [
    { value: 'curriculum', label: 'Curriculum & Training' },
    { value: 'student_services', label: 'Student Services' },
    { value: 'enrollment', label: 'Enrollment & Admissions' },
    { value: 'job_placement', label: 'Job Placement' },
    { value: 'compliance', label: 'Compliance & Accreditation' },
    { value: 'facilities', label: 'Facilities & Equipment' },
    { value: 'other', label: 'Other' },
  ],
  other: [
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
  ],
};

// Default operational area options for backward compatibility
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
