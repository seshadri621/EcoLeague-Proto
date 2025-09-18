import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPath = ({ path, onSelectPath, isActive, progress = 0 }) => {
  const getPathIcon = (category) => {
    switch (category) {
      case 'climate':
        return 'Thermometer';
      case 'biodiversity':
        return 'TreePine';
      case 'sustainability':
        return 'Recycle';
      case 'conservation':
        return 'Shield';
      case 'renewable':
        return 'Zap';
      default:
        return 'BookOpen';
    }
  };

  const getPathColor = (category) => {
    switch (category) {
      case 'climate':
        return 'from-red-500 to-orange-500';
      case 'biodiversity':
        return 'from-green-500 to-emerald-500';
      case 'sustainability':
        return 'from-blue-500 to-cyan-500';
      case 'conservation':
        return 'from-purple-500 to-violet-500';
      case 'renewable':
        return 'from-yellow-500 to-amber-500';
      default:
        return 'from-forest to-green-600';
    }
  };

  return (
    <div className={`bg-white rounded-eco-lg shadow-eco-md border-2 overflow-hidden env-card-hover organic-transition ${
      isActive ? 'border-forest shadow-eco-lg' : 'border-border'
    }`}>
      {/* Path Header */}
      <div className={`h-32 bg-gradient-to-br ${getPathColor(path?.category)} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-6 h-full flex items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-eco-md flex items-center justify-center">
              <Icon name={getPathIcon(path?.category)} size={24} color="white" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-white mb-1">
                {path?.title}
              </h3>
              <p className="text-white/90 font-body text-sm">
                {path?.lessonCount} lessons • {path?.estimatedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div 
              className="h-full bg-white organic-transition"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      {/* Path Content */}
      <div className="p-6">
        <p className="text-text-secondary font-body text-sm mb-4 line-clamp-3">
          {path?.description}
        </p>

        {/* Path Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-forest-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
              <Icon name="Target" size={16} color="var(--color-forest)" />
            </div>
            <p className="text-xs text-text-secondary">Difficulty</p>
            <p className="font-medium text-text-primary capitalize">{path?.difficulty}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-achievement-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
              <Icon name="Award" size={16} color="var(--color-achievement)" />
            </div>
            <p className="text-xs text-text-secondary">Total XP</p>
            <p className="font-medium text-text-primary">{path?.totalXP}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-ocean-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
              <Icon name="Users" size={16} color="var(--color-ocean)" />
            </div>
            <p className="text-xs text-text-secondary">Learners</p>
            <p className="font-medium text-text-primary">{path?.enrolledCount?.toLocaleString()}</p>
          </div>
        </div>

        {/* Skills You'll Learn */}
        <div className="mb-6">
          <h4 className="font-headline font-medium text-text-primary mb-3">Skills You'll Learn</h4>
          <div className="flex flex-wrap gap-2">
            {path?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-forest-gradient/10 text-forest text-xs rounded-full font-medium border border-forest/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        {path?.prerequisites && path?.prerequisites?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-headline font-medium text-text-primary mb-2">Prerequisites</h4>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Info" size={14} />
              <span>{path?.prerequisites?.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={isActive ? "outline" : "default"}
          fullWidth
          onClick={() => onSelectPath(path)}
          iconName={progress > 0 ? "Play" : "BookOpen"}
          iconPosition="left"
          className="quest-button"
        >
          {progress > 0 ? `Continue (${Math.round(progress)}%)` : "Start Learning Path"}
        </Button>
      </div>
    </div>
  );
};

export default LearningPath;