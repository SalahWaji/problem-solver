import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <Layout
      title="Privacy Policy | Problem Solver Platform"
      description="Our privacy policy explains how we collect, use, and protect your information."
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-heading font-bold text-gray-800 mb-6">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Last Updated: March 14, 2025
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to the Problem Solver Platform. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Business Information:</strong> Industry, company size, years in business, and operational areas.</li>
                <li><strong>Problem Details:</strong> Information about the business challenges you submit, including descriptions, frequency, severity, and current solutions.</li>
                <li><strong>Contact Information:</strong> Email address and communication preferences.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>To provide personalized insights reports based on your submissions.</li>
                <li>To analyze business problems across industries and company sizes.</li>
                <li>To improve our platform and develop new features.</li>
                <li>To communicate with you about your submissions and reports.</li>
                <li>If you opt-in, to send you future insights and updates.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">4. Data Anonymization</h2>
              <p>
                We anonymize your business information when analyzing trends and patterns. Your specific business details 
                are never shared with third parties in a way that could identify you or your company.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">5. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share anonymized, aggregated data with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Entrepreneurs and developers working on solutions to business problems.</li>
                <li>Research partners analyzing business trends.</li>
                <li>Service providers who help us operate our platform.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your information.</li>
                <li>Opt-out of marketing communications.</li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">8. GDPR Compliance</h2>
              <p>
                For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). 
                We process your data based on your consent, our legitimate interests, or to fulfill our contractual obligations.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Email:</strong> privacy@problemsolver.com
              </p>
              <p>
                <strong>Address:</strong><br />
                Problem Solver Platform<br />
                123 Business Avenue<br />
                Suite 456<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
