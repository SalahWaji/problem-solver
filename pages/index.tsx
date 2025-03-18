import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Problem Solver Platform</title>
        <meta name="description" content="Submit your business problems and get personalized insights" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
                Transform Your Business Challenges into Opportunities
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Share your business problems and instantly receive personalized insights comparing your challenges to industry peers.
              </p>
              <Link href="/submit" className="btn text-lg px-8 py-3">
                Submit Your Challenge (5 min)
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Share Your Challenge</h3>
                <p className="text-gray-600">
                  Quickly tell us about a business problem you're facing through our simple form. No account creation needed.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Get Instant Insights</h3>
                <p className="text-gray-600">
                  Our AI analyzes your submission and compares it to similar businesses in your industry.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Receive Your Report</h3>
                <p className="text-gray-600">
                  Get a personalized insights report delivered to your email showing how others are tackling similar challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              Why Business Owners Love Problem Solver
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Validate Your Challenges</h3>
                <p className="text-gray-600">
                  Discover if other businesses in your industry face similar problems and how widespread these issues are.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Benchmark Your Experience</h3>
                <p className="text-gray-600">
                  See how your situation compares to peers in terms of impact, frequency, and current solutions.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Discover New Approaches</h3>
                <p className="text-gray-600">
                  Learn how others are addressing similar challenges and what solutions are working for them.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Contribute to Solutions</h3>
                <p className="text-gray-600">
                  Your submission helps build a database of real business problems that entrepreneurs and developers can solve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Insights Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              Sample Insights
            </h2>
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AI
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Problem Analysis</h3>
                  <p className="text-sm text-gray-500">Marketing Strategy for Small Business</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h4 className="font-medium text-primary mb-2">Industry Comparison</h4>
                  <p>Your challenge with digital marketing ROI is shared by 68% of businesses in your industry and size category.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h4 className="font-medium text-primary mb-2">Common Approaches</h4>
                  <p>Most companies are addressing this through a combination of content marketing (72%) and targeted social media campaigns (64%).</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h4 className="font-medium text-primary mb-2">Impact Assessment</h4>
                  <p>Businesses that effectively solve this challenge report an average 23% increase in qualified leads within 3 months.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="card">
                <h3 className="text-xl font-heading font-semibold mb-2">How long does it take to submit a problem?</h3>
                <p className="text-gray-600">
                  Most business owners complete the process in under 5 minutes.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-semibold mb-2">Do I need to create an account?</h3>
                <p className="text-gray-600">
                  No. We've designed the process to be as frictionless as possible. Just provide your email to receive your insights report.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-semibold mb-2">What kind of insights will I receive?</h3>
                <p className="text-gray-600">
                  Your report will show how common your problem is in your industry, how others are solving it, and benchmarking data comparing your situation to similar businesses.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-semibold mb-2">Is my information kept confidential?</h3>
                <p className="text-gray-600">
                  Yes. We never share your identifiable information. Your submission contributes to anonymous aggregated data only.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-semibold mb-2">When will I receive my insights report?</h3>
                <p className="text-gray-600">
                  You'll receive your report within 24 hours of submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-semibold mb-6">
              Ready to transform your business challenges?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Submit your business challenge now and receive a personalized insights report within 24 hours.
            </p>
            <Link href="/submit" className="bg-white text-accent font-medium px-8 py-3 rounded shadow-sm hover:bg-gray-100 transition-colors">
              Submit Your Challenge
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 Problem Solver Platform. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
