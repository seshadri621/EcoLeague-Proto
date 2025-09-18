import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MissionCreationWizard from './components/MissionCreationWizard';
import MissionTemplateLibrary from './components/MissionTemplateLibrary';
import NGOVerificationPanel from './components/NGOVerificationPanel';
import MissionManagementDashboard from './components/MissionManagementDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const MissionUploadPortal = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isVerified, setIsVerified] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock verification status - in real app this would come from user context
  const mockVerificationStatus = {
    isVerified: true,
    organizationName: 'Green Earth Foundation',
    verificationId: 'NGO-2024-001',
    verificationDate: '2024-09-01'
  };

  const handleVerificationComplete = (verificationData) => {
    setIsVerified(true);
    setActiveView('dashboard');
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveView('create-mission');
  };

  const handleMissionComplete = (missionData) => {
    console.log('Mission created:', missionData);
    setActiveView('dashboard');
    setSelectedTemplate(null);
  };

  const handleEditMission = (mission) => {
    console.log('Edit mission:', mission);
    setActiveView('create-mission');
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const renderVerificationBanner = () => {
    if (mockVerificationStatus?.isVerified) {
      return (
        <div className="bg-success/10 border border-success/20 rounded-eco-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-success">Verified Organization</h3>
              <p className="text-sm text-text-secondary">
                {mockVerificationStatus?.organizationName} • Verified on {new Date(mockVerificationStatus.verificationDate)?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-warning/10 border border-warning/20 rounded-eco-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-warning">Verification Required</h3>
              <p className="text-sm text-text-secondary">
                Complete organization verification to create and manage missions
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setActiveView('verification')}
            iconName="Shield"
          >
            Start Verification
          </Button>
        </div>
      </div>
    );
  };

  const renderQuickActions = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <button
        onClick={() => setActiveView('templates')}
        className="p-6 bg-white border border-border rounded-eco-lg hover:shadow-eco-md organic-transition text-left group"
        disabled={!mockVerificationStatus?.isVerified}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center mb-4 group-hover:scale-105 organic-transition">
          <Icon name="Plus" size={24} color="white" />
        </div>
        <h3 className="font-headline font-semibold text-text-primary mb-2">Create Mission</h3>
        <p className="text-sm text-text-secondary">Start a new environmental mission from templates or scratch</p>
      </button>

      <button
        onClick={() => setActiveView('dashboard')}
        className="p-6 bg-white border border-border rounded-eco-lg hover:shadow-eco-md organic-transition text-left group"
        disabled={!mockVerificationStatus?.isVerified}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-ocean to-blue-600 rounded-eco-md flex items-center justify-center mb-4 group-hover:scale-105 organic-transition">
          <Icon name="BarChart3" size={24} color="white" />
        </div>
        <h3 className="font-headline font-semibold text-text-primary mb-2">Manage Missions</h3>
        <p className="text-sm text-text-secondary">Track active missions and participant engagement</p>
      </button>

      <button
        onClick={handleViewAnalytics}
        className="p-6 bg-white border border-border rounded-eco-lg hover:shadow-eco-md organic-transition text-left group"
        disabled={!mockVerificationStatus?.isVerified}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-achievement to-orange-600 rounded-eco-md flex items-center justify-center mb-4 group-hover:scale-105 organic-transition">
          <Icon name="TrendingUp" size={24} color="white" />
        </div>
        <h3 className="font-headline font-semibold text-text-primary mb-2">View Analytics</h3>
        <p className="text-sm text-text-secondary">Analyze mission performance and community impact</p>
      </button>

      <button
        onClick={() => setActiveView('verification')}
        className="p-6 bg-white border border-border rounded-eco-lg hover:shadow-eco-md organic-transition text-left group"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-success to-green-600 rounded-eco-md flex items-center justify-center mb-4 group-hover:scale-105 organic-transition">
          <Icon name="Shield" size={24} color="white" />
        </div>
        <h3 className="font-headline font-semibold text-text-primary mb-2">Verification</h3>
        <p className="text-sm text-text-secondary">
          {mockVerificationStatus?.isVerified ? 'View verification status' : 'Complete organization verification'}
        </p>
      </button>
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case 'verification':
        return (
          <NGOVerificationPanel
            onVerificationComplete={handleVerificationComplete}
          />
        );

      case 'templates':
        return (
          <MissionTemplateLibrary
            onSelectTemplate={handleTemplateSelect}
            onCreateFromScratch={() => setActiveView('create-mission')}
          />
        );

      case 'create-mission':
        return (
          <MissionCreationWizard
            selectedTemplate={selectedTemplate}
            onComplete={handleMissionComplete}
            onCancel={() => {
              setActiveView('dashboard');
              setSelectedTemplate(null);
            }}
          />
        );

      case 'dashboard':
      default:
        return (
          <MissionManagementDashboard
            onEditMission={handleEditMission}
            onViewAnalytics={handleViewAnalytics}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center">
                <Icon name="Upload" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-gradient-forest">Mission Upload Portal</h1>
                <p className="text-text-secondary font-body">Create and manage environmental missions for the EcoQuest community</p>
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`hover:text-forest organic-transition ${activeView === 'dashboard' ? 'text-forest font-medium' : ''}`}
              >
                Dashboard
              </button>
              {activeView !== 'dashboard' && (
                <>
                  <Icon name="ChevronRight" size={16} />
                  <span className="text-forest font-medium">
                    {activeView === 'verification' && 'Verification'}
                    {activeView === 'templates' && 'Templates'}
                    {activeView === 'create-mission' && 'Create Mission'}
                  </span>
                </>
              )}
            </div>

            {renderVerificationBanner()}
          </div>

          {/* Quick Actions - Only show on dashboard */}
          {activeView === 'dashboard' && renderQuickActions()}

          {/* Main Content */}
          {renderMainContent()}

          {/* Help Section */}
          <div className="mt-12 bg-forest-gradient/20 rounded-eco-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="font-headline font-semibold text-forest mb-2">Need Help?</h3>
                <p className="text-text-secondary mb-4">
                  Our mission creation guide provides step-by-step instructions for creating engaging environmental missions that inspire community action.
                </p>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" iconName="BookOpen">
                    View Guide
                  </Button>
                  <Button variant="outline" iconName="MessageCircle">
                    Contact Support
                  </Button>
                  <Button variant="outline" iconName="Video">
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />
      )}
    </div>
  );
};

export default MissionUploadPortal;