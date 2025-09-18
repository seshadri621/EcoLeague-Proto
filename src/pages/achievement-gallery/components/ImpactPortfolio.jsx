import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImpactPortfolio = ({ portfolioData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'missions', name: 'Missions', icon: 'Target' },
    { id: 'learning', name: 'Learning', icon: 'BookOpen' },
    { id: 'community', name: 'Community', icon: 'Users' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Impact Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {portfolioData?.summary?.map((item, index) => (
          <div key={index} className="bg-white rounded-eco-lg p-4 border border-border text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={item?.icon} size={20} color="white" />
            </div>
            <p className="text-2xl font-bold text-forest font-headline mb-1">
              {item?.value}
            </p>
            <p className="text-sm text-text-secondary font-body">
              {item?.label}
            </p>
          </div>
        ))}
      </div>

      {/* Environmental Impact Chart */}
      <div className="bg-white rounded-eco-lg p-6 border border-border">
        <h3 className="font-headline font-semibold text-text-primary text-lg mb-4">
          Environmental Impact Over Time
        </h3>
        <div className="h-64 bg-forest-gradient/10 rounded-eco-md flex items-center justify-center">
          <div className="text-center">
            <Icon name="TrendingUp" size={48} color="var(--color-forest)" />
            <p className="text-forest font-body mt-2">Impact visualization would appear here</p>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="bg-white rounded-eco-lg p-6 border border-border">
        <h3 className="font-headline font-semibold text-text-primary text-lg mb-4">
          Key Environmental Achievements
        </h3>
        <div className="space-y-3">
          {portfolioData?.keyAchievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-forest-gradient/10 rounded-eco-md">
              <div className="w-10 h-10 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center">
                <Icon name={achievement?.icon} size={16} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-headline font-medium text-text-primary">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-text-secondary font-body">
                  {achievement?.description}
                </p>
              </div>
              <span className="text-sm font-medium text-achievement">
                {achievement?.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMissions = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-eco-lg p-6 border border-border">
        <h3 className="font-headline font-semibold text-text-primary text-lg mb-4">
          Mission Completion Record
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData?.missions?.map((mission, index) => (
            <div key={index} className="border border-border rounded-eco-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-headline font-medium text-text-primary">
                  {mission?.title}
                </h4>
                <span className="text-xs bg-success text-white px-2 py-1 rounded-eco-sm">
                  Completed
                </span>
              </div>
              <p className="text-sm text-text-secondary font-body mb-2">
                {mission?.description}
              </p>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{mission?.date}</span>
                <span>{mission?.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-eco-lg p-6 border border-border">
        <h3 className="font-headline font-semibold text-text-primary text-lg mb-4">
          Learning Progress & Certifications
        </h3>
        <div className="space-y-4">
          {portfolioData?.learning?.map((course, index) => (
            <div key={index} className="border border-border rounded-eco-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-headline font-medium text-text-primary">
                  {course?.title}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-success">
                    {course?.progress}%
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full"
                      style={{ width: `${course?.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary font-body mb-2">
                {course?.description}
              </p>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Started: {course?.startDate}</span>
                {course?.completedDate && (
                  <span>Completed: {course?.completedDate}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-eco-lg p-6 border border-border">
        <h3 className="font-headline font-semibold text-text-primary text-lg mb-4">
          Community Contributions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData?.community?.map((contribution, index) => (
            <div key={index} className="border border-border rounded-eco-md p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-ocean to-blue-600 rounded-full flex items-center justify-center">
                  <Icon name={contribution?.icon} size={14} color="white" />
                </div>
                <h4 className="font-headline font-medium text-text-primary">
                  {contribution?.title}
                </h4>
              </div>
              <p className="text-sm text-text-secondary font-body mb-2">
                {contribution?.description}
              </p>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{contribution?.date}</span>
                <span>{contribution?.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'missions':
        return renderMissions();
      case 'learning':
        return renderLearning();
      case 'community':
        return renderCommunity();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-white rounded-eco-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-text-primary text-xl mb-1">
              Environmental Impact Portfolio
            </h2>
            <p className="text-text-secondary font-body">
              Comprehensive record of your environmental journey and achievements
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export PDF
            </Button>
            <Button variant="default" iconName="Share2" iconPosition="left">
              Share Portfolio
            </Button>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="px-6 border-b border-border">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium organic-transition ${
                activeTab === tab?.id
                  ? 'border-forest text-forest'
                  : 'border-transparent text-text-secondary hover:text-forest'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ImpactPortfolio;