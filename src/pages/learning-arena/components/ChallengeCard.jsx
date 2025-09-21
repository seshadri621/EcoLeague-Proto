import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onStart }) => {
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

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Seedling';
      case 'intermediate':
        return 'TreePine';
      case 'advanced':
        return 'Mountain';
      case 'expert':
        return 'Crown';
      default:
        return 'Seedling';
    }
  };

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover group h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge?.difficulty)} inline-flex items-center space-x-1 mb-4`}>
          <Icon name={getDifficultyIcon(challenge?.difficulty)} size={12} />
          <span className="capitalize">{challenge?.difficulty}</span>
        </div>
        <h3 className="font-headline font-semibold text-lg text-text-primary mb-2 line-clamp-2">
          {challenge?.title}
        </h3>
        <p className="text-text-secondary font-body text-sm line-clamp-3 mb-4">
          {challenge?.description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>{challenge?.xpReward} XP</span>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <Button
          fullWidth
          onClick={() => onStart(challenge)}
          iconName="Zap"
          iconPosition="left"
          className="quest-button"
        >
          Start Challenge
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;