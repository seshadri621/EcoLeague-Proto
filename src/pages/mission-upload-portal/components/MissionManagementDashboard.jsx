import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionManagementDashboard = ({ missions = [], onEditMission, onViewAnalytics }) => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock missions data
  const mockMissions = [
    {
      id: 'mission-001',
      title: 'Central Park Cleanup Initiative',
      status: 'active',
      category: 'cleanup',
      participants: { current: 15, max: 25 },
      startDate: '2024-09-20',
      endDate: '2024-09-22',
      location: 'Central Park, New York',
      difficulty: 'beginner',
      submissions: 12,
      completionRate: 80,
      impactMetrics: {
        wasteCollected: '45 lbs',
        areasCleaned: '3 zones',
        volunteersEngaged: 15
      }
    },
    {
      id: 'mission-002',
      title: 'Urban Tree Planting Project',
      status: 'pending',
      category: 'planting',
      participants: { current: 8, max: 20 },
      startDate: '2024-09-25',
      endDate: '2024-09-25',
      location: 'Brooklyn Community Garden',
      difficulty: 'intermediate',
      submissions: 0,
      completionRate: 0,
      impactMetrics: {
        treesPlanted: '0 (Target: 30)',
        soilPrepared: '0 sq ft',
        volunteersEngaged: 8
      }
    },
    {
      id: 'mission-003',
      title: 'Wildlife Habitat Restoration',
      status: 'completed',
      category: 'monitoring',
      participants: { current: 12, max: 15 },
      startDate: '2024-09-10',
      endDate: '2024-09-12',
      location: 'Hudson River Park',
      difficulty: 'advanced',
      submissions: 12,
      completionRate: 100,
      impactMetrics: {
        habitatsRestored: '2 areas',
        speciesDocumented: '15 species',
        volunteersEngaged: 12
      }
    }
  ];

  const allMissions = missions?.length > 0 ? missions : mockMissions;

  const tabs = [
    { id: 'active', label: 'Active Missions', icon: 'Play', count: allMissions?.filter(m => m?.status === 'active')?.length },
    { id: 'pending', label: 'Pending Approval', icon: 'Clock', count: allMissions?.filter(m => m?.status === 'pending')?.length },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle', count: allMissions?.filter(m => m?.status === 'completed')?.length },
    { id: 'draft', label: 'Drafts', icon: 'Edit', count: allMissions?.filter(m => m?.status === 'draft')?.length }
  ];

  const filteredMissions = allMissions?.filter(mission => {
    const matchesTab = selectedTab === 'all' || mission?.status === selectedTab;
    const matchesSearch = mission?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         mission?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'completed': return 'bg-forest text-white';
      case 'draft': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleanup': return 'Trash2';
      case 'planting': return 'TreePine';
      case 'monitoring': return 'Binoculars';
      case 'education': return 'BookOpen';
      default: return 'Target';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-headline font-semibold text-forest">Mission Management</h2>
            <p className="text-text-secondary font-body">Track and manage your environmental missions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="BarChart3" onClick={() => onViewAnalytics?.()}>
              View Analytics
            </Button>
            <Button variant="default" iconName="Plus">
              New Mission
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-eco-md organic-transition whitespace-nowrap ${
                selectedTab === tab?.id
                  ? 'bg-forest text-white'
                  : 'text-text-secondary hover:bg-forest-gradient/30 hover:text-forest'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-medium">{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedTab === tab?.id ? 'bg-white/20' : 'bg-muted'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Missions List */}
      <div className="p-6">
        {filteredMissions?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Target" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="font-headline font-medium text-text-primary mb-2">No missions found</h3>
            <p className="text-text-secondary mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first mission to get started'}
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              {searchTerm ? 'Clear Search' : 'Create Mission'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMissions?.map((mission) => (
              <div
                key={mission?.id}
                className="border border-border rounded-eco-lg p-6 hover:shadow-eco-md organic-transition"
              >
                {/* Mission Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center">
                      <Icon name={getCategoryIcon(mission?.category)} size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold text-text-primary mb-1">{mission?.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{mission?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(mission?.startDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mission?.status)}`}>
                      {mission?.status?.charAt(0)?.toUpperCase() + mission?.status?.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission?.difficulty)}`}>
                      {mission?.difficulty}
                    </span>
                  </div>
                </div>

                {/* Mission Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-eco-md">
                    <div className="text-lg font-bold text-forest">{mission?.participants?.current}/{mission?.participants?.max}</div>
                    <div className="text-xs text-text-secondary">Participants</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-eco-md">
                    <div className="text-lg font-bold text-ocean">{mission?.submissions}</div>
                    <div className="text-xs text-text-secondary">Submissions</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-eco-md">
                    <div className="text-lg font-bold text-achievement">{mission?.completionRate}%</div>
                    <div className="text-xs text-text-secondary">Completion</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-eco-md">
                    <div className="text-lg font-bold text-success">
                      {mission?.status === 'completed' ? '✓' : formatDate(mission?.endDate)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {mission?.status === 'completed' ? 'Completed' : 'End Date'}
                    </div>
                  </div>
                </div>

                {/* Impact Metrics */}
                {mission?.status === 'completed' && (
                  <div className="mb-4 p-4 bg-success/10 rounded-eco-md">
                    <h4 className="font-medium text-success mb-2">Impact Achieved</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      {Object.entries(mission?.impactMetrics)?.map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-success" />
                          <span className="text-text-secondary">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEditMission?.(mission)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Users"
                    >
                      Participants
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                    >
                      Messages
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                  >
                    More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Summary Stats */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-forest">{allMissions?.length}</div>
            <div className="text-sm text-text-secondary">Total Missions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {allMissions?.reduce((sum, m) => sum + m?.participants?.current, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ocean">
              {allMissions?.reduce((sum, m) => sum + m?.submissions, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-achievement">
              {Math.round(allMissions?.reduce((sum, m) => sum + m?.completionRate, 0) / allMissions?.length)}%
            </div>
            <div className="text-sm text-text-secondary">Avg Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionManagementDashboard;