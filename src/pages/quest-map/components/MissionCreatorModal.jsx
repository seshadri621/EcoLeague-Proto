import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MissionCreatorModal = ({ isOpen, onClose, onCreateMission, userLocation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'cleanup',
    difficulty: 'beginner',
    location: '',
    date: '',
    duration: '',
    maxParticipants: 10,
    requirements: [],
    impactGoals: [],
    photoRequirements: true,
    verificationCriteria: ''
  });

  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentImpactGoal, setCurrentImpactGoal] = useState({ label: '', value: '' });

  if (!isOpen) return null;

  const missionTypes = [
    { value: 'cleanup', label: 'Cleanup Mission', icon: 'Trash2' },
    { value: 'biodiversity', label: 'Biodiversity Monitoring', icon: 'Leaf' },
    { value: 'conservation', label: 'Conservation Project', icon: 'TreePine' },
    { value: 'education', label: 'Educational Outreach', icon: 'BookOpen' },
    { value: 'monitoring', label: 'Environmental Monitoring', icon: 'Eye' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-600' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600' },
    { value: 'advanced', label: 'Advanced', color: 'text-orange-600' },
    { value: 'expert', label: 'Expert', color: 'text-red-600' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (currentRequirement?.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev?.requirements, currentRequirement?.trim()]
      }));
      setCurrentRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev?.requirements?.filter((_, i) => i !== index)
    }));
  };

  const addImpactGoal = () => {
    if (currentImpactGoal?.label?.trim() && currentImpactGoal?.value?.trim()) {
      setFormData(prev => ({
        ...prev,
        impactGoals: [...prev?.impactGoals, { ...currentImpactGoal }]
      }));
      setCurrentImpactGoal({ label: '', value: '' });
    }
  };

  const removeImpactGoal = (index) => {
    setFormData(prev => ({
      ...prev,
      impactGoals: prev?.impactGoals?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onCreateMission({
      ...formData,
      id: Date.now(),
      coordinates: userLocation,
      createdAt: new Date()?.toISOString(),
      participantCount: 0,
      participants: [],
      status: 'active'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-achievement to-orange-600 rounded-eco-md flex items-center justify-center">
                <Icon name="Plus" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-headline font-bold text-text-primary">
                  Create New Mission
                </h2>
                <p className="text-sm text-text-secondary">
                  Design an environmental mission for your community
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-gray-100"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Mission Title"
                    type="text"
                    placeholder="Enter mission title"
                    value={formData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Mission Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-border rounded-eco-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Describe the mission objectives and activities"
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Mission Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-border rounded-eco-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                        value={formData?.type}
                        onChange={(e) => handleInputChange('type', e?.target?.value)}
                      >
                        {missionTypes?.map((type) => (
                          <option key={type?.value} value={type?.value}>
                            {type?.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Difficulty Level
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-border rounded-eco-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                        value={formData?.difficulty}
                        onChange={(e) => handleInputChange('difficulty', e?.target?.value)}
                      >
                        {difficultyLevels?.map((level) => (
                          <option key={level?.value} value={level?.value}>
                            {level?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Timing */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-4">Location & Timing</h3>
                <div className="space-y-4">
                  <Input
                    label="Location"
                    type="text"
                    placeholder="Enter mission location"
                    value={formData?.location}
                    onChange={(e) => handleInputChange('location', e?.target?.value)}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Mission Date"
                      type="date"
                      value={formData?.date}
                      onChange={(e) => handleInputChange('date', e?.target?.value)}
                      required
                    />

                    <Input
                      label="Duration"
                      type="text"
                      placeholder="e.g., 2 hours"
                      value={formData?.duration}
                      onChange={(e) => handleInputChange('duration', e?.target?.value)}
                      required
                    />
                  </div>

                  <Input
                    label="Max Participants"
                    type="number"
                    min="1"
                    max="100"
                    value={formData?.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e?.target?.value))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Requirements */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-4">Requirements</h3>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add requirement (e.g., Gloves, Water bottle)"
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e?.target?.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRequirement}
                      iconName="Plus"
                      size="default"
                    >
                      Add
                    </Button>
                  </div>

                  {formData?.requirements?.length > 0 && (
                    <div className="space-y-2">
                      {formData?.requirements?.map((requirement, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-forest-gradient/10 rounded-eco-sm">
                          <span className="text-sm text-text-primary">{requirement}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="p-1 rounded-eco-sm organic-transition text-text-secondary hover:text-error hover:bg-red-50"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Goals */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-4">Impact Goals</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      placeholder="Goal (e.g., Waste Collected)"
                      value={currentImpactGoal?.label}
                      onChange={(e) => setCurrentImpactGoal(prev => ({ ...prev, label: e?.target?.value }))}
                    />
                    <Input
                      type="text"
                      placeholder="Target (e.g., 50 lbs)"
                      value={currentImpactGoal?.value}
                      onChange={(e) => setCurrentImpactGoal(prev => ({ ...prev, value: e?.target?.value }))}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addImpactGoal}
                    iconName="Target"
                    fullWidth
                  >
                    Add Impact Goal
                  </Button>

                  {formData?.impactGoals?.length > 0 && (
                    <div className="space-y-2">
                      {formData?.impactGoals?.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-achievement-gradient/10 rounded-eco-sm">
                          <span className="text-sm text-text-primary">
                            {goal?.label}: <span className="font-medium text-achievement">{goal?.value}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeImpactGoal(index)}
                            className="p-1 rounded-eco-sm organic-transition text-text-secondary hover:text-error hover:bg-red-50"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Verification */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-4">Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="photoRequirements"
                      checked={formData?.photoRequirements}
                      onChange={(e) => handleInputChange('photoRequirements', e?.target?.checked)}
                      className="w-4 h-4 text-forest border-border rounded focus:ring-forest"
                    />
                    <label htmlFor="photoRequirements" className="text-sm text-text-primary">
                      Require photo submissions for verification
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Verification Criteria
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-border rounded-eco-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Describe how mission completion will be verified"
                      value={formData?.verificationCriteria}
                      onChange={(e) => handleInputChange('verificationCriteria', e?.target?.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              <p>Mission will be reviewed before going live</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="default"
                onClick={handleSubmit}
                iconName="Upload"
                iconPosition="left"
              >
                Create Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCreatorModal;