import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MissionHistoryCard = ({ mission, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-green-50 border-green-200';
      case 'in-progress':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'text-text-secondary bg-gray-50 border-gray-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

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
        return 'difficulty-beginner';
    }
  };

  return (
    <div 
      className="bg-white rounded-eco-lg shadow-eco-sm border border-border env-card-hover cursor-pointer"
      onClick={() => onClick && onClick(mission)}
    >
      {/* Mission Image */}
      <div className="relative h-48 overflow-hidden rounded-t-eco-lg">
        {mission?.images && mission?.images?.length > 0 && !imageError ? (
          <Image
            src={mission?.images?.[0]}
            alt={mission?.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-forest-gradient flex items-center justify-center">
            <Icon name="Camera" size={32} color="white" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-eco-sm text-xs font-medium border ${getStatusColor(mission?.status)}`}>
          {mission?.status?.charAt(0)?.toUpperCase() + mission?.status?.slice(1)}
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-eco-sm text-xs font-medium ${getDifficultyColor(mission?.difficulty)}`}>
          {mission?.difficulty?.charAt(0)?.toUpperCase() + mission?.difficulty?.slice(1)}
        </div>

        {/* Image Count Indicator */}
        {mission?.images && mission?.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-eco-sm text-xs flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>{mission?.images?.length}</span>
          </div>
        )}
      </div>
      {/* Mission Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-headline font-semibold text-text-primary text-lg line-clamp-2 flex-1">
            {mission?.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="MapPin" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">{mission?.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary font-body text-sm mb-3 line-clamp-2">
          {mission?.description}
        </p>

        {/* Mission Stats */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Users" size={14} color="var(--color-forest)" />
              <span className="text-xs font-medium text-forest">{mission?.participants}</span>
            </div>
            <p className="text-xs text-text-secondary">Participants</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Target" size={14} color="var(--color-achievement)" />
              <span className="text-xs font-medium text-achievement">{mission?.impact}</span>
            </div>
            <p className="text-xs text-text-secondary">Impact</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Award" size={14} color="var(--color-success)" />
              <span className="text-xs font-medium text-success">{mission?.points}</span>
            </div>
            <p className="text-xs text-text-secondary">Points</p>
          </div>
        </div>

        {/* Date and Duration */}
        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{mission?.completedDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{mission?.duration}</span>
          </div>
        </div>

        {/* Reflection Note Preview */}
        {mission?.reflection && (
          <div className="bg-forest-gradient/20 rounded-eco-sm p-2 mb-3">
            <p className="text-xs text-forest font-body italic line-clamp-2">
              "{mission?.reflection}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="flex-1 bg-forest-gradient text-forest px-3 py-2 rounded-eco-sm text-xs font-medium organic-transition hover:bg-forest hover:text-white">
            View Details
          </button>
          <button className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
            <Icon name="Share2" size={16} />
          </button>
          <button className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-achievement hover:bg-orange-50">
            <Icon name="Heart" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionHistoryCard;