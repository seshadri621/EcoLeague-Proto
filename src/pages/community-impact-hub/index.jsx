import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import CommunityFeed from './components/CommunityFeed';
import DiscussionForums from './components/DiscussionForums';
import FactCheckCommunity from './components/FactCheckCommunity';
import SuccessStories from './components/SuccessStories';
import LocationBasedCommunity from './components/LocationBasedCommunity';
import ImpactCounters from './components/ImpactCounters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityImpactHub = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const navigationTabs = [
    { 
      key: 'feed', 
      label: 'Community Feed', 
      icon: 'Home',
      description: 'Latest mission results and community updates'
    },
    { 
      key: 'discussions', 
      label: 'Discussions', 
      icon: 'MessageSquare',
      description: 'Environmental topics and expert insights'
    },
    { 
      key: 'fact-check', 
      label: 'Fact Check', 
      icon: 'CheckCircle',
      description: 'Verify environmental claims together'
    },
    { 
      key: 'success-stories', 
      label: 'Success Stories', 
      icon: 'Award',
      description: 'Inspiring environmental achievements'
    },
    { 
      key: 'local-community', 
      label: 'Local Groups', 
      icon: 'MapPin',
      description: 'Connect with nearby eco-advocates'
    },
    { 
      key: 'impact-metrics', 
      label: 'Impact Metrics', 
      icon: 'BarChart3',
      description: 'Global environmental impact statistics'
    }
  ];

  const communityStats = {
    totalMembers: 15847,
    activeMissions: 234,
    completedToday: 47,
    onlineNow: 892
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <CommunityFeed />;
      case 'discussions':
        return <DiscussionForums />;
      case 'fact-check':
        return <FactCheckCommunity />;
      case 'success-stories':
        return <SuccessStories />;
      case 'local-community':
        return <LocationBasedCommunity />;
      case 'impact-metrics':
        return <ImpactCounters />;
      default:
        return <CommunityFeed />;
    }
  };

  const getActiveTabInfo = () => {
    return navigationTabs?.find(tab => tab?.key === activeTab) || navigationTabs?.[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-forest/10 via-ocean/5 to-achievement/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-forest to-ocean rounded-eco-lg flex items-center justify-center mission-pulse">
                  <Icon name="Users" size={32} color="white" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-headline font-bold text-gradient-forest">
                    Community Impact Hub
                  </h1>
                  <p className="text-lg text-text-secondary font-body">
                    Where environmental heroes connect, share, and inspire
                  </p>
                </div>
              </div>
              
              <p className="text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
                Join a thriving ecosystem of environmental advocates sharing their mission results, 
                discussing solutions, and celebrating collective impact. Together, we're building 
                a sustainable future through community-driven action.
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-eco-md p-4 text-center border border-white/20">
                <div className="text-2xl font-headline font-bold text-forest">{communityStats?.totalMembers?.toLocaleString()}</div>
                <div className="text-sm text-text-secondary font-body">Community Members</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-eco-md p-4 text-center border border-white/20">
                <div className="text-2xl font-headline font-bold text-ocean">{communityStats?.activeMissions}</div>
                <div className="text-sm text-text-secondary font-body">Active Missions</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-eco-md p-4 text-center border border-white/20">
                <div className="text-2xl font-headline font-bold text-achievement">{communityStats?.completedToday}</div>
                <div className="text-sm text-text-secondary font-body">Completed Today</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-eco-md p-4 text-center border border-white/20">
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <div className="text-2xl font-headline font-bold text-success">{communityStats?.onlineNow}</div>
                </div>
                <div className="text-sm text-text-secondary font-body">Online Now</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="default" iconName="Plus" iconPosition="left">
                Share Mission Result
              </Button>
              <Button variant="outline" iconName="MessageCircle" iconPosition="left">
                Start Discussion
              </Button>
              <Button variant="outline" iconName="Users" iconPosition="left">
                Find Local Group
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-0 overflow-x-auto scrollbar-hide">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-body font-medium organic-transition whitespace-nowrap ${
                    activeTab === tab?.key
                      ? 'border-forest text-forest bg-forest-gradient/5'
                      : 'border-transparent text-text-secondary hover:text-forest hover:bg-forest-gradient/5'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content Header */}
        <div className="bg-surface/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-3">
              <Icon name={getActiveTabInfo()?.icon} size={20} className="text-forest" />
              <div>
                <h2 className="font-headline font-semibold text-text-primary">
                  {getActiveTabInfo()?.label}
                </h2>
                <p className="text-sm text-text-secondary font-body">
                  {getActiveTabInfo()?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-forest to-ocean rounded-eco-md flex items-center justify-center">
                  <Icon name="Leaf" size={16} color="white" />
                </div>
                <span className="font-headline font-bold text-gradient-forest">EcoQuest</span>
              </div>
              <p className="text-text-secondary font-body mb-4">
                Building a sustainable future through community action
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary font-body">
                <button className="hover:text-forest organic-transition">About</button>
                <button className="hover:text-forest organic-transition">Privacy</button>
                <button className="hover:text-forest organic-transition">Terms</button>
                <button className="hover:text-forest organic-transition">Support</button>
              </div>
              <p className="text-xs text-text-secondary font-body mt-4">
                © {new Date()?.getFullYear()} EcoQuest. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CommunityImpactHub;