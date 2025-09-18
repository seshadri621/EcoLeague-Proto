import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LessonCard = ({ lesson, onStart, isCompleted, progress = 0 }) => {
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
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover group">
      {/* Lesson Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={lesson?.image}
          alt={lesson?.title}
          className="w-full h-full object-cover group-hover:scale-105 organic-transition"
        />
        
        {/* Difficulty Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson?.difficulty)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getDifficultyIcon(lesson?.difficulty)} size={12} />
            <span className="capitalize">{lesson?.difficulty}</span>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{lesson?.duration} min</span>
          </div>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-success rounded-full flex items-center justify-center achievement-glow">
            <Icon name="Check" size={16} color="white" />
          </div>
        )}

        {/* Progress Overlay */}
        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-achievement organic-transition"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      {/* Lesson Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-headline font-semibold text-lg text-text-primary mb-2 line-clamp-2">
              {lesson?.title}
            </h3>
            <p className="text-text-secondary font-body text-sm line-clamp-3 mb-4">
              {lesson?.description}
            </p>
          </div>
        </div>

        {/* Lesson Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{lesson?.enrolledCount?.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{lesson?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={14} />
              <span>{lesson?.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lesson?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-forest-gradient/20 text-forest text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {lesson?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full font-medium">
              +{lesson?.tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant={isCompleted ? "outline" : "default"}
          fullWidth
          onClick={() => onStart(lesson)}
          iconName={isCompleted ? "RotateCcw" : progress > 0 ? "Play" : "BookOpen"}
          iconPosition="left"
          className="quest-button"
        >
          {isCompleted ? "Review Lesson" : progress > 0 ? "Continue" : "Start Learning"}
        </Button>
      </div>
    </div>
  );
};

export default LessonCard;