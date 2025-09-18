import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionMarker = ({ mission, onClick, isCompleted = false }) => {
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-orange-500';
      case 'expert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMarkerStyle = () => {
    if (isCompleted) {
      return 'bg-gradient-to-br from-achievement to-orange-600 shadow-eco-lg achievement-glow';
    }
    return `${getDifficultyColor(mission?.difficulty)} shadow-eco-md hover:shadow-eco-lg`;
  };

  return (
    <div
      onClick={() => onClick(mission)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer organic-transition hover:scale-110 z-10`}
      style={{ left: `${mission?.coordinates?.lng}%`, top: `${mission?.coordinates?.lat}%` }}
    >
      {/* Main Marker */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getMarkerStyle()} border-2 border-white`}>
        <Icon 
          name={getMissionIcon(mission?.type)} 
          size={20} 
          color="white" 
          strokeWidth={2.5} 
        />
      </div>
      {/* Participant Count Badge */}
      {mission?.participantCount > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-forest rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-xs font-bold text-white">{mission?.participantCount}</span>
        </div>
      )}
      {/* Completion Glow Effect */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-full bg-achievement opacity-30 animate-ping"></div>
      )}
      {/* Mission Type Label */}
      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="bg-white px-2 py-1 rounded-eco-sm shadow-eco-sm border border-border">
          <span className="text-xs font-body font-medium text-text-primary capitalize">
            {mission?.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MissionMarker;