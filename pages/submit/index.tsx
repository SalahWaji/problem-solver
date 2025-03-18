import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { FormData, formSteps } from '../../types/form';

const SubmitPage: NextPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for "Other" text fields
  const [otherIndustry, setOtherIndustry] = useState('');
  const [otherOperationalArea, setOtherOperationalArea] = useState('');
  const [otherApproach, setOtherApproach] = useState('');
  
  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      
      // Simulate upload progress (in a real app, this would be an actual upload)
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: formData.industry,
          company_size: formData.companySize,
          years_in_business: formData.yearsInBusiness,
          operational_area: formData.operationalArea,
          problem_frequency: formData.problemFrequency,
          impact_severity: formData.impactSeverity,
          current_approaches: formData.currentApproaches,
          solution_satisfaction: formData.solutionSatisfaction,
          budget_range: formData.budgetRange,
          problem_description: formData.problemDescription,
          document_url: formData.documentUrl,
          email: formData.email,
          opt_in_future: formData.optInFuture || false,
          allow_follow_up: formData.allowFollowUp || false,
          interested_in_discount: formData.interestedInDiscount || false,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push(`/submit/success?id=${data.id}`);
      } else {
        alert('Submission failed: ' + (data.error || 'Unknown error'));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const renderFormStep = () => {
    const step = formSteps[currentStep];
    
    switch (step.id) {
      case 'company-context':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="industry" className="form-label">Industry</label>
              <select 
                id="industry"
                className="form-input"
                value={formData.industry || ''}
                onChange={(e) => handleChange('industry', e.target.value)}
                required
              >
                <option value="">Select your industry</option>
                <option value="technology">Technology & Software</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="healthcare">Healthcare & Medical</option>
                <option value="finance">Finance & Banking</option>
                <option value="education">Education</option>
                <option value="hospitality">Hospitality & Tourism</option>
                <option value="construction">Construction & Real Estate</option>
                <option value="professional">Professional Services</option>
                <option value="nonprofit">Nonprofit & NGO</option>
                <option value="other">Other</option>
              </select>
              
              {formData.industry === 'other' && (
                <div className="mt-2 animate-fadeIn">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Please specify your industry"
                    value={otherIndustry}
                    onChange={(e) => {
                      setOtherIndustry(e.target.value);
                      handleChange('industry', `other:${e.target.value}`);
                    }}
                    required
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="companySize" className="form-label">Company Size</label>
              <select 
                id="companySize"
                className="form-input"
                value={formData.companySize || ''}
                onChange={(e) => handleChange('companySize', e.target.value)}
                required
              >
                <option value="">Select company size</option>
                <option value="solo">Solo</option>
                <option value="2-10">2-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201+">201+ employees</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="yearsInBusiness" className="form-label">Years in Business</label>
              <input 
                type="range" 
                id="yearsInBusiness"
                min="0" 
                max="30" 
                step="1"
                value={formData.yearsInBusiness || 0}
                onChange={(e) => handleChange('yearsInBusiness', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Less than 1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25+</span>
              </div>
              <p className="mt-2 text-center font-medium">
                {formData.yearsInBusiness === 0 ? 'Less than 1 year' : 
                 formData.yearsInBusiness === 30 ? '25+ years' : 
                 `${formData.yearsInBusiness} ${formData.yearsInBusiness === 1 ? 'year' : 'years'}`}
              </p>
            </div>
          </div>
        );
        
      case 'problem-identification':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="operationalArea" className="form-label">Primary Operational Area</label>
              <select 
                id="operationalArea"
                className="form-input"
                value={formData.operationalArea || ''}
                onChange={(e) => handleChange('operationalArea', e.target.value)}
                required
              >
                <option value="">Select operational area</option>
                <option value="finance">Finance & Accounting</option>
                <option value="marketing">Marketing & Sales</option>
                <option value="operations">Operations & Logistics</option>
                <option value="hr">Human Resources</option>
                <option value="customer">Customer Service</option>
                <option value="product">Product Development</option>
                <option value="it">IT & Technology</option>
                <option value="legal">Legal & Compliance</option>
                <option value="strategy">Strategy & Planning</option>
                <option value="other">Other</option>
              </select>
              
              {formData.operationalArea === 'other' && (
                <div className="mt-2 animate-fadeIn">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Please specify the operational area"
                    value={otherOperationalArea}
                    onChange={(e) => {
                      setOtherOperationalArea(e.target.value);
                      handleChange('operationalArea', `other:${e.target.value}`);
                    }}
                    required
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="problemFrequency" className="form-label">How often does this problem occur?</label>
              <select 
                id="problemFrequency"
                className="form-input"
                value={formData.problemFrequency || ''}
                onChange={(e) => handleChange('problemFrequency', e.target.value)}
                required
              >
                <option value="">Select frequency</option>
                <option value="rarely">Rarely (Monthly or less)</option>
                <option value="occasionally">Occasionally (Weekly)</option>
                <option value="frequently">Frequently (Several times a week)</option>
                <option value="daily">Daily</option>
                <option value="constantly">Constantly (Multiple times per day)</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Impact Severity</label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {['minor', 'moderate', 'significant', 'major', 'critical'].map((severity, index) => (
                  <button
                    key={severity}
                    type="button"
                    className={`p-3 rounded border text-center transition-colors ${
                      formData.impactSeverity === severity 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleChange('impactSeverity', severity)}
                  >
                    <div className="text-sm font-medium mb-1">
                      {['Minor', 'Moderate', 'Significant', 'Major', 'Critical'][index]}
                    </div>
                    <div className="text-xs">
                      {[
                        'Slight inconvenience', 
                        'Noticeable inefficiency', 
                        'Affects multiple processes', 
                        'Substantial impact', 
                        'Threatens viability'
                      ][index]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'current-solutions':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Current Approaches (Select all that apply)</label>
              <div className="space-y-2 mt-2">
                {[
                  { value: 'manual', label: 'Manual workarounds' },
                  { value: 'spreadsheets', label: 'Spreadsheets/documents' },
                  { value: 'software', label: 'Existing software (not ideal)' },
                  { value: 'outsourcing', label: 'Outsourcing' },
                  { value: 'ignoring', label: 'Ignoring the problem' },
                  { value: 'custom', label: 'Custom-built solution' },
                  { value: 'other', label: 'Other' }
                ].map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`approach-${option.value}`}
                      checked={formData.currentApproaches?.includes(option.value) || 
                              (option.value === 'other' && formData.currentApproaches?.some(a => a.startsWith('other:')))}
                      onChange={(e) => {
                        const currentApproaches = formData.currentApproaches || [];
                        if (e.target.checked) {
                          if (option.value === 'other') {
                            // Add placeholder for other, will be replaced when text is entered
                            handleChange('currentApproaches', [...currentApproaches, 'other:']);
                          } else {
                            handleChange('currentApproaches', [...currentApproaches, option.value]);
                          }
                        } else {
                          if (option.value === 'other') {
                            // Remove any "other:" entries
                            handleChange('currentApproaches', currentApproaches.filter(a => !a.startsWith('other:')));
                            setOtherApproach('');
                          } else {
                            handleChange('currentApproaches', currentApproaches.filter(a => a !== option.value));
                          }
                        }
                      }}
                      className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor={`approach-${option.value}`} className="ml-2 text-gray-700">
                      {option.label}
                    </label>
                    
                    {option.value === 'other' && 
                     formData.currentApproaches?.some(a => a.startsWith('other:')) && (
                      <div className="mt-2 ml-7 animate-fadeIn">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Please specify"
                          value={otherApproach}
                          onChange={(e) => {
                            setOtherApproach(e.target.value);
                            const currentApproaches = formData.currentApproaches || [];
                            const filteredApproaches = currentApproaches.filter(a => !a.startsWith('other:'));
                            handleChange('currentApproaches', [...filteredApproaches, `other:${e.target.value}`]);
                          }}
                          required
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="form-label">Satisfaction with Current Solution</label>
              <div className="flex justify-between items-center mt-2">
                {[
                  { value: 'very-dissatisfied', emoji: '😠', label: 'Very Dissatisfied' },
                  { value: 'dissatisfied', emoji: '🙁', label: 'Dissatisfied' },
                  { value: 'neutral', emoji: '😐', label: 'Neutral' },
                  { value: 'satisfied', emoji: '🙂', label: 'Satisfied' },
                  { value: 'very-satisfied', emoji: '😄', label: 'Very Satisfied' }
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    className={`flex flex-col items-center p-2 rounded transition-colors ${
                      formData.solutionSatisfaction === option.value
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    onClick={() => handleChange('solutionSatisfaction', option.value)}
                  >
                    <span className="text-2xl mb-1">{option.emoji}</span>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="budgetRange" className="form-label">Budget for Better Solution</label>
              <select 
                id="budgetRange"
                className="form-input"
                value={formData.budgetRange || ''}
                onChange={(e) => handleChange('budgetRange', e.target.value)}
                required
              >
                <option value="">Select budget range</option>
                <option value="none">No budget allocated</option>
                <option value="low">$1 - $1,000</option>
                <option value="medium">$1,001 - $10,000</option>
                <option value="high">$10,001 - $50,000</option>
                <option value="enterprise">$50,001+</option>
              </select>
            </div>
          </div>
        );
        
      case 'problem-description':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="problemDescription" className="form-label">Describe the problem in your own words</label>
              <textarea
                id="problemDescription"
                rows={6}
                className="form-input"
                placeholder="What specific challenge is your business facing? What have you tried so far? What would an ideal solution look like?"
                value={formData.problemDescription || ''}
                onChange={(e) => handleChange('problemDescription', e.target.value)}
                required
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Be specific about the problem, its impact, and what you've tried so far.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="documentUrl" className="form-label">
                  Document URL (Optional)
                </label>
                <input
                  type="url"
                  id="documentUrl"
                  className="form-input"
                  placeholder="https://example.com/document.pdf"
                  value={formData.documentUrl || ''}
                  onChange={(e) => handleChange('documentUrl', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  If you have a document that helps explain the problem, paste a link here.
                </p>
              </div>
              
              <div className="mt-4">
                <label className="form-label">
                  Or Upload a File (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <div className="file-upload-btn">
                    <input
                      type="file"
                      className="file-upload-input"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {selectedFile ? 'Change File' : 'Choose File'}
                  </div>
                  
                  {selectedFile && (
                    <span className="ml-3 text-sm text-gray-700">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
                
                {isUploading && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
                    </p>
                  </div>
                )}
                
                <p className="text-sm text-gray-500 mt-1">
                  Accepted file types: PDF, Word, Excel, PowerPoint, Text, CSV
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="your@email.com"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                We'll send your insights report to this email address.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="optInFuture"
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary mt-0.5"
                  checked={formData.optInFuture || false}
                  onChange={(e) => handleChange('optInFuture', e.target.checked)}
                />
                <label htmlFor="optInFuture" className="ml-2 text-gray-700">
                  I'd like to receive future insights and updates about business problem-solving
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="allowFollowUp"
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary mt-0.5"
                  checked={formData.allowFollowUp || false}
                  onChange={(e) => handleChange('allowFollowUp', e.target.checked)}
                />
                <label htmlFor="allowFollowUp" className="ml-2 text-gray-700">
                  I'm willing to be contacted for follow-up questions if someone is working on solving this problem
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="interestedInDiscount"
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary mt-0.5"
                  checked={formData.interestedInDiscount || false}
                  onChange={(e) => handleChange('interestedInDiscount', e.target.checked)}
                />
                <label htmlFor="interestedInDiscount" className="ml-2 text-gray-700">
                  I'm interested in receiving a discount when solutions to my problem become available
                </label>
              </div>
            </div>
            
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm text-gray-700">
                  By submitting this form, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and 
                  <a href="/terms" className="text-primary hover:underline"> Terms of Service</a>. Your information will be used to generate insights 
                  and may be anonymized for analysis, but your personal details will never be shared with third parties.
                </p>
              </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout
      title="Submit Your Business Problem | Problem Solver Platform"
      description="Share your business challenge and receive personalized insights comparing your situation with industry peers."
    >
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                Tell Us About Your Business Challenge
              </h1>
              <p className="text-lg text-gray-600">
                In the next few minutes, you'll share a problem your business is facing. In return, you'll receive a personalized insights report showing how your challenge compares to others in your industry.
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {formSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`text-xs font-medium ${
                      index <= currentStep ? 'text-primary' : 'text-gray-400'
                    }`}
                    style={{ width: `${100 / formSteps.length}%`, textAlign: 'center' }}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-xl font-heading font-semibold text-gray-800">
                  {formSteps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                  {formSteps[currentStep].description}
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="animate-fadeIn">
                  {renderFormStep()}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`btn-secondary ${currentStep === 0 ? 'invisible' : ''}`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < formSteps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Problem'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitPage;
