import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const AboutPage: NextPage = () => {
  return (
    <Layout
      title="About Us | Problem Solver Platform"
      description="Learn about the Problem Solver Platform and our mission to connect business problems with innovative solutions."
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h1 className="text-3xl font-heading font-bold text-gray-800 mb-6">About Problem Solver</h1>
              
              <div className="prose max-w-none">
                <p className="text-lg mb-6">
                  Problem Solver is a platform that sits at the intersection of business intelligence, problem marketplace, and AI analysis.
                </p>
                
                <h2 className="text-xl font-heading font-semibold mt-8 mb-4">Our Mission</h2>
                <p>
                  Our mission is to help businesses overcome challenges by connecting them with innovative solutions. 
                  We believe that by collecting and analyzing real business problems, we can create a valuable resource 
                  for both business owners and entrepreneurs.
                </p>
                
                <h2 className="text-xl font-heading font-semibold mt-8 mb-4">How It Works</h2>
                <p>
                  Business owners submit their challenges through our platform. Our AI analyzes these submissions and 
                  generates personalized insights reports comparing their situation to industry peers. In the future, 
                  we'll connect these problems with tech entrepreneurs looking for real-world challenges to solve.
                </p>
                
                <h2 className="text-xl font-heading font-semibold mt-8 mb-4">Our Values</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Immediate Value:</strong> We believe in providing immediate value to users through personalized insights.</li>
                  <li><strong>Low Friction:</strong> Our platform is designed to be easy to use, with no account creation required.</li>
                  <li><strong>Privacy-Respecting:</strong> We take privacy seriously and protect user information.</li>
                  <li><strong>Innovation-Focused:</strong> We aim to foster innovation by connecting problems with potential solutions.</li>
                </ul>
                
                <h2 className="text-xl font-heading font-semibold mt-8 mb-4">Our Team</h2>
                <p>
                  Problem Solver was founded by a team of business consultants, data scientists, and software engineers 
                  who saw the need for a better way to connect business challenges with innovative solutions. Our diverse 
                  team brings together expertise in business analysis, artificial intelligence, and software development.
                </p>
                
                <h2 className="text-xl font-heading font-semibold mt-8 mb-4">Future Vision</h2>
                <p>
                  While our initial focus is on collecting business problems and providing valuable insights, our long-term 
                  vision includes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Creating a marketplace where entrepreneurs can discover real business problems to solve</li>
                  <li>Building a community of business owners and problem solvers</li>
                  <li>Developing advanced matching algorithms to connect problems with the right solution providers</li>
                  <li>Expanding our AI capabilities to provide even more valuable insights</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-accent text-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-2xl font-heading font-semibold mb-4">Ready to share your business challenge?</h2>
              <p className="text-lg mb-6">
                Submit your problem and receive personalized insights comparing your situation to industry peers.
              </p>
              <Link href="/submit" className="bg-white text-accent font-medium px-8 py-3 rounded shadow-sm hover:bg-gray-100 transition-colors">
                Submit Your Challenge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
