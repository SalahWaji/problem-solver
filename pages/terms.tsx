import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';

const TermsPage: NextPage = () => {
  return (
    <Layout
      title="Terms of Service | Problem Solver Platform"
      description="Our terms of service outline the rules and guidelines for using the Problem Solver Platform."
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-heading font-bold text-gray-800 mb-6">Terms of Service</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Last Updated: March 14, 2025
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Problem Solver Platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p>
                The Problem Solver Platform allows business owners and operators to submit business problems, 
                receive personalized insights reports, and potentially connect with entrepreneurs and developers 
                who may create solutions to these problems.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">3. User Submissions</h2>
              <p>
                By submitting business problems and related information to our platform, you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Represent that you have the right to share this information.</li>
                <li>Grant us a non-exclusive, worldwide, royalty-free license to use, process, and analyze the information for the purposes of providing our services.</li>
                <li>Understand that we may anonymize and aggregate your information for analysis and research purposes.</li>
                <li>Acknowledge that we may share anonymized information with entrepreneurs and developers who may create solutions to business problems.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">4. Privacy</h2>
              <p>
                Your use of the Problem Solver Platform is also governed by our Privacy Policy, which is incorporated 
                by reference into these Terms of Service. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Problem Solver Platform, including but not limited to 
                text, graphics, logos, icons, and software, are owned by us or our licensors and are protected by 
                copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">6. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use the platform for any unlawful purpose or in violation of these terms.</li>
                <li>Submit false, misleading, or fraudulent information.</li>
                <li>Attempt to gain unauthorized access to any part of the platform.</li>
                <li>Use the platform to transmit any harmful code or material.</li>
                <li>Interfere with or disrupt the platform or servers or networks connected to the platform.</li>
              </ul>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
              <p>
                THE PROBLEM SOLVER PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE, 
                THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM OR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
                INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE PLATFORM 
                OR THESE TERMS, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless the Problem Solver Platform, its officers, directors, 
                employees, agents, and licensors from and against all losses, expenses, damages, and costs, including 
                reasonable attorneys' fees, resulting from any violation of these terms or any activity related to your use 
                of the platform.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by 
                posting the new terms on this page and updating the "Last Updated" date. Your continued use of the platform 
                after any changes indicates your acceptance of the modified terms.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-xl font-heading font-semibold mt-8 mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Email:</strong> terms@problemsolver.com
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

export default TermsPage;
