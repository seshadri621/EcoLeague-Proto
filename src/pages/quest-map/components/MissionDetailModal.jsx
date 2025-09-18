import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MissionDetailModal = ({ mission, isOpen, onClose, onJoinMission }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !mission) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      case 'expert':
        return 'difficulty-expert';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getMissionIcon = (type) => {
    switch (type) {
      case 'cleanup':
        return 'Trash2';
      case 'biodiversity':
        return 'Leaf';
      case 'conservation':
        return 'TreePine';
      case 'education':
        return 'BookOpen';
      case 'monitoring':
        return 'Eye';
      default:
        return 'MapPin';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'participants', label: 'Team', icon: 'Users' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-eco-md flex items-center justify-center ${getDifficultyColor(mission?.difficulty)}`}>
                <Icon name={getMissionIcon(mission?.type)} size={24} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-headline font-bold text-text-primary mb-2">
                  {mission?.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{mission?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{formatDate(mission?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{mission?.duration}</span>
                  </div>
                </div>
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

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 organic-transition font-body font-medium ${
                activeTab === tab?.id
                  ? 'text-forest border-b-2 border-forest bg-forest-gradient/10'
                  : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Mission Description */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-3">Mission Briefing</h3>
                <p className="text-text-secondary font-body leading-relaxed">
                  {mission?.description}
                </p>
              </div>

              {/* NGO Partner */}
              <div className="flex items-center space-x-3 p-4 bg-forest-gradient/10 rounded-eco-md">
                <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <div>
                  <p className="font-body font-medium text-text-primary">Partner Organization</p>
                  <p className="text-sm text-text-secondary">{mission?.ngoPartner}</p>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-3">Expected Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {mission?.impactMetrics?.map((metric, index) => (
                    <div key={index} className="text-center p-3 bg-achievement-gradient/10 rounded-eco-md">
                      <div className="text-2xl font-accent text-achievement mb-1">
                        {metric?.value}
                      </div>
                      <div className="text-sm text-text-secondary font-body">
                        {metric?.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-headline font-semibold text-forest mb-3">What to Bring</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mission?.requirements?.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <h3 className="font-headline font-semibold text-forest">Mission Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {mission?.beforeAfterPhotos?.map((photo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative overflow-hidden rounded-eco-md">
                      <Image
                        src={photo?.url}
                        alt={photo?.caption}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-eco-sm">
                        {photo?.type}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary font-body">{photo?.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-semibold text-forest">Team Members</h3>
                <div className="text-sm text-text-secondary">
                  {mission?.participants?.length} / {mission?.maxParticipants} joined
                </div>
              </div>
              <div className="space-y-3">
                {mission?.participants?.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-eco-md">
                    <div className="w-10 h-10 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-medium text-text-primary">{participant?.name}</p>
                      <p className="text-sm text-text-secondary">Level {participant?.level} • {participant?.completedMissions} missions</p>
                    </div>
                    {participant?.isTeamLeader && (
                      <div className="px-2 py-1 bg-achievement text-white text-xs rounded-eco-sm">
                        Leader
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span>Difficulty: <span className="font-medium capitalize">{mission?.difficulty}</span></span>
                <span>Points: <span className="font-medium text-achievement">{mission?.points}</span></span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Maybe Later
              </Button>
              <Button 
                variant="default" 
                onClick={() => onJoinMission(mission)}
                iconName="Users"
                iconPosition="left"
              >
                Join Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailModal;