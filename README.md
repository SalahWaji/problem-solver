# Problem Solver Platform

A platform that collects business problems from owners and operators, analyzes them using AI, and provides immediate value through personalized insights reports.

## Project Overview

The Problem Solver Platform sits at the intersection of business intelligence, problem marketplace, and AI analysis. It provides immediate value to business owners while building toward a larger vision of connecting problems with solution builders.

### Core Value Proposition

Business owners gain immediate value by:

- Receiving personalized AI-generated reports comparing their challenges to industry peers
- Getting validation that others face similar problems
- Seeing how others are currently addressing these issues
- Contributing to a growing database of business challenges that may attract solutions

## Quick Start

1. **Installation**
   ```
   cd problem-solver
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with the necessary configuration (see below)

3. **Run the development server**
   ```
   npm run dev
   ```

4. **Access the application**
   - Main site: [http://localhost:3000](http://localhost:3000)
   - Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin) (password: 123)
   - Debug tools: [http://localhost:3000/debug](http://localhost:3000/debug)

## Environment Variables

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key

# Admin Configuration
ADMIN_PASSWORD=your-admin-password

# Base URL for API calls
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Key Features

- **Multi-step Submission Form**: Progressive form design that minimizes user effort
- **AI Analysis**: Integration with OpenAI to analyze submissions and generate comparative reports
- **Admin Dashboard**: View and manage submissions, generate reports, and send emails
- **Email Delivery**: Send personalized insights reports to submitters

## Development Guide

For detailed information about the project structure, API endpoints, database schema, and development roadmap, please see [DEVELOPMENT.md](./DEVELOPMENT.md).

## Troubleshooting

If you're experiencing issues with the application:

1. Check the browser console for errors
2. Use the debug page at [http://localhost:3000/debug](http://localhost:3000/debug)
3. Verify your environment variables are set correctly
4. Ensure your Supabase database is properly set up using the `supabase-setup.sql` script

## License

This project is licensed under the MIT License.
