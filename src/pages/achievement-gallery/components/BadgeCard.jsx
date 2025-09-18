import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const BadgeCard = ({ badge, isUnlocked = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300';
      case 'rare':
        return 'border-blue-300';
      case 'epic':
        return 'border-purple-300';
      case 'legendary':
        return 'border-yellow-300';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div
      className={`relative group cursor-pointer organic-transition ${
        isUnlocked ? 'env-card-hover' : 'opacity-60'
      }`}
      onClick={() => onClick && onClick(badge)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-white rounded-eco-lg p-4 border-2 ${getRarityBorder(badge?.rarity)} shadow-eco-sm`}>
        {/* Badge Icon */}
        <div className="relative mb-3">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${getRarityColor(badge?.rarity)} flex items-center justify-center ${
            isUnlocked && isHovered ? 'achievement-glow' : ''
          }`}>
            <Icon 
              name={badge?.icon} 
              size={28} 
              color="white" 
              strokeWidth={2}
            />
          </div>
          
          {/* Rarity Indicator */}
          <div className="absolute -top-1 -right-1">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getRarityColor(badge?.rarity)} flex items-center justify-center border-2 border-white`}>
              <span className="text-xs font-bold text-white">
                {badge?.rarity === 'common' && '●'}
                {badge?.rarity === 'rare' && '◆'}
                {badge?.rarity === 'epic' && '★'}
                {badge?.rarity === 'legendary' && '♦'}
              </span>
            </div>
          </div>

          {/* Lock Overlay for Locked Badges */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-gray-900/50 rounded-full flex items-center justify-center">
              <Icon name="Lock" size={20} color="white" />
            </div>
          )}
        </div>

        {/* Badge Info */}
        <div className="text-center">
          <h3 className={`font-headline font-semibold text-sm mb-1 ${
            isUnlocked ? 'text-text-primary' : 'text-text-secondary'
          }`}>
            {badge?.name}
          </h3>
          <p className="text-xs text-text-secondary font-body mb-2 line-clamp-2">
            {badge?.description}
          </p>
          
          {/* Progress Bar for Partially Completed */}
          {badge?.progress !== undefined && badge?.progress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div 
                className="bg-gradient-to-r from-forest to-primary h-1.5 rounded-full organic-transition"
                style={{ width: `${badge?.progress}%` }}
              ></div>
            </div>
          )}

          {/* Unlock Date */}
          {isUnlocked && badge?.unlockedDate && (
            <p className="text-xs text-text-secondary font-body">
              Unlocked {badge?.unlockedDate}
            </p>
          )}

          {/* Requirements for Locked Badges */}
          {!isUnlocked && badge?.requirement && (
            <p className="text-xs text-achievement font-body font-medium">
              {badge?.requirement}
            </p>
          )}
        </div>
      </div>
      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-eco-sm whitespace-nowrap z-10 opacity-0 animate-fade-in">
          {isUnlocked ? `${badge?.points} points earned` : `Earn ${badge?.points} points`}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;