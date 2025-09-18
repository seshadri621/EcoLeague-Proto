import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NGOVerificationPanel = ({ onVerificationComplete }) => {
  const [verificationStep, setVerificationStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    organizationName: '',
    registrationNumber: '',
    taxId: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    missionStatement: '',
    documents: {
      registration: null,
      taxExemption: null,
      insurance: null,
      permits: null
    }
  });

  const verificationSteps = [
    { id: 1, title: 'Organization Details', icon: 'Building2' },
    { id: 2, title: 'Contact Information', icon: 'Phone' },
    { id: 3, title: 'Document Upload', icon: 'FileText' },
    { id: 4, title: 'Review & Submit', icon: 'CheckCircle' }
  ];

  const requiredDocuments = [
    {
      key: 'registration',
      title: 'Organization Registration',
      description: 'Official registration certificate or incorporation documents',
      icon: 'FileCheck',
      required: true
    },
    {
      key: 'taxExemption',
      title: 'Tax Exemption Certificate',
      description: '501(c)(3) or equivalent tax-exempt status documentation',
      icon: 'Receipt',
      required: true
    },
    {
      key: 'insurance',
      title: 'Liability Insurance',
      description: 'General liability insurance certificate for activities',
      icon: 'Shield',
      required: true
    },
    {
      key: 'permits',
      title: 'Activity Permits',
      description: 'Relevant permits for environmental activities (if applicable)',
      icon: 'Award',
      required: false
    }
  ];

  const handleInputChange = (field, value) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (documentKey, file) => {
    setVerificationData(prev => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [documentKey]: file
      }
    }));
  };

  const nextStep = () => {
    if (verificationStep < verificationSteps?.length) {
      setVerificationStep(verificationStep + 1);
    }
  };

  const prevStep = () => {
    if (verificationStep > 1) {
      setVerificationStep(verificationStep - 1);
    }
  };

  const handleSubmitVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      onVerificationComplete({
        status: 'verified',
        organizationName: verificationData?.organizationName,
        verificationId: 'NGO-' + Date.now()
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (verificationStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Organization Name"
              type="text"
              placeholder="Enter your organization's legal name"
              value={verificationData?.organizationName}
              onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Registration Number"
                type="text"
                placeholder="Official registration number"
                value={verificationData?.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e?.target?.value)}
                required
              />
              <Input
                label="Tax ID / EIN"
                type="text"
                placeholder="Tax identification number"
                value={verificationData?.taxId}
                onChange={(e) => handleInputChange('taxId', e?.target?.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mission Statement
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={4}
                placeholder="Describe your organization's environmental mission and objectives..."
                value={verificationData?.missionStatement}
                onChange={(e) => handleInputChange('missionStatement', e?.target?.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label="Primary Contact Person"
              type="text"
              placeholder="Full name of authorized representative"
              value={verificationData?.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="organization@example.com"
                value={verificationData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={verificationData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                required
              />
            </div>
            <Input
              label="Website URL"
              type="url"
              placeholder="https://www.yourorganization.org"
              value={verificationData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
            />
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Organization Address
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={3}
                placeholder="Complete mailing address including city, state, and postal code..."
                value={verificationData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-forest-gradient/20 p-4 rounded-eco-md">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-forest mt-1" />
                <div>
                  <h4 className="font-medium text-forest mb-2">Document Requirements</h4>
                  <p className="text-sm text-text-secondary">
                    Please upload clear, legible copies of the required documents. All documents must be current and valid.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {requiredDocuments?.map((doc) => (
                <div key={doc?.key} className="border border-border rounded-eco-md p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-forest-gradient/20 rounded-eco-sm flex items-center justify-center">
                        <Icon name={doc?.icon} size={20} className="text-forest" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary flex items-center space-x-2">
                          <span>{doc?.title}</span>
                          {doc?.required && (
                            <span className="text-xs bg-error text-white px-2 py-0.5 rounded-full">Required</span>
                          )}
                        </h4>
                        <p className="text-sm text-text-secondary">{doc?.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      id={`file-${doc?.key}`}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc?.key, e?.target?.files?.[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor={`file-${doc?.key}`}
                      className="flex items-center space-x-2 px-4 py-2 border border-border rounded-eco-md cursor-pointer hover:bg-forest-gradient/10 organic-transition"
                    >
                      <Icon name="Upload" size={16} />
                      <span className="text-sm">Choose File</span>
                    </label>
                    
                    {verificationData?.documents?.[doc?.key] && (
                      <div className="flex items-center space-x-2 text-success">
                        <Icon name="Check" size={16} />
                        <span className="text-sm">{verificationData?.documents?.[doc?.key]?.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-achievement-gradient/20 p-4 rounded-eco-md">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-achievement mt-1" />
                <div>
                  <h4 className="font-medium text-achievement mb-2">File Requirements</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Accepted formats: PDF, JPG, PNG</li>
                    <li>• Maximum file size: 10MB per document</li>
                    <li>• Documents must be clearly readable</li>
                    <li>• All information must be current and valid</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-eco-lg p-6">
              <h3 className="font-headline font-semibold text-forest mb-4">Verification Summary</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-text-primary">Organization:</span>
                    <p className="text-text-secondary">{verificationData?.organizationName || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Registration:</span>
                    <p className="text-text-secondary">{verificationData?.registrationNumber || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-text-primary">Contact Person:</span>
                    <p className="text-text-secondary">{verificationData?.contactPerson || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Email:</span>
                    <p className="text-text-secondary">{verificationData?.email || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-text-primary">Documents Uploaded:</span>
                  <div className="mt-2 space-y-2">
                    {requiredDocuments?.map((doc) => (
                      <div key={doc?.key} className="flex items-center space-x-2">
                        <Icon 
                          name={verificationData?.documents?.[doc?.key] ? "CheckCircle" : "Circle"} 
                          size={16} 
                          className={verificationData?.documents?.[doc?.key] ? "text-success" : "text-text-secondary"} 
                        />
                        <span className="text-sm text-text-secondary">{doc?.title}</span>
                        {doc?.required && !verificationData?.documents?.[doc?.key] && (
                          <span className="text-xs text-error">(Required)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-success/10 p-4 rounded-eco-md">
              <div className="flex items-start space-x-3">
                <Icon name="Clock" size={20} className="text-success mt-1" />
                <div>
                  <h4 className="font-medium text-success mb-2">Verification Process</h4>
                  <p className="text-sm text-text-secondary">
                    Your verification request will be reviewed within 2-3 business days. You'll receive an email notification once the review is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center">
            <Icon name="Shield" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-semibold text-forest">NGO Verification</h2>
            <p className="text-text-secondary font-body">Verify your organization to create missions</p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {verificationSteps?.map((step, index) => (
            <div key={step?.id} className="flex items-center flex-shrink-0">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition ${
                verificationStep === step?.id
                  ? 'bg-forest text-white'
                  : verificationStep > step?.id
                  ? 'bg-success text-white' :'bg-muted text-text-secondary'
              }`}>
                <Icon name={step?.icon} size={16} />
                <span className="text-sm font-medium hidden sm:block">{step?.title}</span>
                <span className="text-sm font-medium sm:hidden">{step?.id}</span>
              </div>
              {index < verificationSteps?.length - 1 && (
                <Icon name="ChevronRight" size={16} className="text-text-secondary mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>
      {/* Navigation Footer */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={verificationStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <span className="text-sm text-text-secondary">
            Step {verificationStep} of {verificationSteps?.length}
          </span>
          
          {verificationStep === verificationSteps?.length ? (
            <Button
              variant="default"
              onClick={handleSubmitVerification}
              iconName="Shield"
              iconPosition="right"
            >
              Submit for Verification
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={nextStep}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOVerificationPanel;