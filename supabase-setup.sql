-- Create the submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  years_in_business INTEGER NOT NULL,
  operational_area TEXT NOT NULL,
  problem_frequency TEXT NOT NULL,
  impact_severity TEXT NOT NULL,
  current_approaches TEXT[] NOT NULL,
  solution_satisfaction TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  document_url TEXT,
  email TEXT NOT NULL,
  opt_in_future BOOLEAN NOT NULL DEFAULT FALSE,
  allow_follow_up BOOLEAN NOT NULL DEFAULT FALSE,
  interested_in_discount BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow anonymous inserts" ON submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that only allows the service role to select, update, delete
CREATE POLICY "Allow service role full access" ON submissions
  USING (auth.role() = 'service_role');

-- Create the reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  report_content JSONB NOT NULL,
  pdf_url TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  delivered BOOLEAN NOT NULL DEFAULT FALSE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create a policy that only allows the service role to access
CREATE POLICY "Allow service role full access" ON reports
  USING (auth.role() = 'service_role');

-- Create the admin_notes table
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  note_content TEXT NOT NULL,
  admin_user TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- Create a policy that only allows the service role to access
CREATE POLICY "Allow service role full access" ON admin_notes
  USING (auth.role() = 'service_role');
