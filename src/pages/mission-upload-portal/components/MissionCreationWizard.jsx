import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MissionCreationWizard = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    location: '',
    coordinates: { lat: '', lng: '' },
    duration: '',
    maxParticipants: '',
    materials: '',
    safetyRequirements: '',
    impactGoals: '',
    photoRequirements: ''
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'FileText' },
    { id: 2, title: 'Location & Details', icon: 'MapPin' },
    { id: 3, title: 'Requirements', icon: 'CheckSquare' },
    { id: 4, title: 'Impact Goals', icon: 'Target' },
    { id: 5, title: 'Review & Submit', icon: 'Send' }
  ];

  const categories = [
    { value: 'cleanup', label: 'Environmental Cleanup' },
    { value: 'planting', label: 'Tree Planting' },
    { value: 'monitoring', label: 'Wildlife Monitoring' },
    { value: 'education', label: 'Community Education' },
    { value: 'conservation', label: 'Conservation Project' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Easy, suitable for all ages' },
    { value: 'intermediate', label: 'Intermediate', description: 'Moderate physical activity' },
    { value: 'advanced', label: 'Advanced', description: 'Requires experience and fitness' },
    { value: 'expert', label: 'Expert', description: 'Specialized skills needed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinateChange = (coord, value) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev?.coordinates,
        [coord]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Mission Title"
              type="text"
              placeholder="Enter a compelling mission title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mission Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={4}
                placeholder="Describe the environmental mission, its objectives, and expected outcomes..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mission Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories?.map((category) => (
                  <button
                    key={category?.value}
                    type="button"
                    onClick={() => handleInputChange('category', category?.value)}
                    className={`p-3 rounded-eco-md border organic-transition text-left ${
                      formData?.category === category?.value
                        ? 'border-forest bg-forest-gradient text-forest'
                        : 'border-border hover:border-forest/50 hover:bg-forest-gradient/20'
                    }`}
                  >
                    <span className="font-medium">{category?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label="Mission Location"
              type="text"
              placeholder="Enter the mission location (e.g., Central Park, New York)"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Latitude"
                type="number"
                placeholder="40.7829"
                value={formData?.coordinates?.lat}
                onChange={(e) => handleCoordinateChange('lat', e?.target?.value)}
                step="any"
              />
              <Input
                label="Longitude"
                type="number"
                placeholder="-73.9654"
                value={formData?.coordinates?.lng}
                onChange={(e) => handleCoordinateChange('lng', e?.target?.value)}
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Difficulty Level
              </label>
              <div className="space-y-3">
                {difficultyLevels?.map((level) => (
                  <button
                    key={level?.value}
                    type="button"
                    onClick={() => handleInputChange('difficulty', level?.value)}
                    className={`w-full p-4 rounded-eco-md border organic-transition text-left ${
                      formData?.difficulty === level?.value
                        ? 'border-forest bg-forest-gradient'
                        : 'border-border hover:border-forest/50 hover:bg-forest-gradient/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`font-medium difficulty-${level?.value} px-2 py-1 rounded-full text-xs`}>
                          {level?.label}
                        </span>
                        <p className="text-sm text-text-secondary mt-1">{level?.description}</p>
                      </div>
                      {formData?.difficulty === level?.value && (
                        <Icon name="Check" size={20} className="text-forest" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Duration (hours)"
                type="number"
                placeholder="2"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', e?.target?.value)}
                min="1"
              />
              <Input
                label="Max Participants"
                type="number"
                placeholder="20"
                value={formData?.maxParticipants}
                onChange={(e) => handleInputChange('maxParticipants', e?.target?.value)}
                min="1"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Required Materials
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={3}
                placeholder="List materials participants need to bring (e.g., gloves, water bottles, comfortable shoes)..."
                value={formData?.materials}
                onChange={(e) => handleInputChange('materials', e?.target?.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Safety Requirements
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe safety protocols, age restrictions, and health considerations..."
                value={formData?.safetyRequirements}
                onChange={(e) => handleInputChange('safetyRequirements', e?.target?.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Photo Submission Requirements
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={3}
                placeholder="Specify what photos participants should submit for verification (before/after shots, team photos, etc.)..."
                value={formData?.photoRequirements}
                onChange={(e) => handleInputChange('photoRequirements', e?.target?.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Impact Goals & Measurements
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                rows={4}
                placeholder="Define measurable impact goals (e.g., collect 100 lbs of trash, plant 50 trees, monitor 20 bird species)..."
                value={formData?.impactGoals}
                onChange={(e) => handleInputChange('impactGoals', e?.target?.value)}
              />
            </div>
            <div className="bg-forest-gradient/20 p-4 rounded-eco-md">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-achievement mt-1" />
                <div>
                  <h4 className="font-medium text-forest mb-2">Impact Measurement Tips</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Set specific, quantifiable goals</li>
                    <li>• Include both immediate and long-term impact</li>
                    <li>• Consider environmental and educational outcomes</li>
                    <li>• Plan for participant skill development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-eco-lg p-6">
              <h3 className="font-headline font-semibold text-forest mb-4">Mission Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-text-primary">Title:</span>
                  <p className="text-text-secondary">{formData?.title || 'Not specified'}</p>
                </div>
                
                <div>
                  <span className="font-medium text-text-primary">Category:</span>
                  <p className="text-text-secondary">
                    {categories?.find(c => c?.value === formData?.category)?.label || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-text-primary">Location:</span>
                  <p className="text-text-secondary">{formData?.location || 'Not specified'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-text-primary">Duration:</span>
                    <p className="text-text-secondary">{formData?.duration || 'Not specified'} hours</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Max Participants:</span>
                    <p className="text-text-secondary">{formData?.maxParticipants || 'Not specified'}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-text-primary">Difficulty:</span>
                  <p className="text-text-secondary">
                    {difficultyLevels?.find(d => d?.value === formData?.difficulty)?.label || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-achievement-gradient/20 p-4 rounded-eco-md">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-achievement mt-1" />
                <div>
                  <h4 className="font-medium text-achievement mb-2">Before Submitting</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Ensure all required fields are completed</li>
                    <li>• Verify location coordinates are accurate</li>
                    <li>• Review safety requirements thoroughly</li>
                    <li>• Confirm impact goals are measurable</li>
                  </ul>
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
      {/* Progress Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-headline font-semibold text-forest">Create New Mission</h2>
          <Button variant="ghost" onClick={onCancel} iconName="X" size="sm">
            Cancel
          </Button>
        </div>
        
        {/* Step Progress */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center flex-shrink-0">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition ${
                currentStep === step?.id
                  ? 'bg-forest text-white'
                  : currentStep > step?.id
                  ? 'bg-success text-white' :'bg-muted text-text-secondary'
              }`}>
                <Icon name={step?.icon} size={16} />
                <span className="text-sm font-medium hidden sm:block">{step?.title}</span>
                <span className="text-sm font-medium sm:hidden">{step?.id}</span>
              </div>
              {index < steps?.length - 1 && (
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
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <span className="text-sm text-text-secondary">
            Step {currentStep} of {steps?.length}
          </span>
          
          {currentStep === steps?.length ? (
            <Button
              variant="default"
              onClick={handleSubmit}
              iconName="Send"
              iconPosition="right"
            >
              Submit Mission
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

export default MissionCreationWizard;