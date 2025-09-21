import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import './LessonCard.css'; // Import the new CSS file

const LessonCard = ({ lesson, onStart, isCompleted, progress = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const audioRef = useRef(null);

  const handleFlip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsFlipped(!isFlipped);
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

  // Shorten description to 20 words
  const shortDescription = lesson?.description.split(' ').slice(0, 15).join(' ') + '...';

  return (
    <div className={`lesson-card-flipper ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
       <audio ref={audioRef} src="/audio/flip.mp3" preload="auto"></audio>
      <div className="flipper-inner">
        {/* Card Front */}
        <div className="card-front">
          <div className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover group h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={lesson?.image}
                alt={lesson?.title}
                className="w-full h-full object-cover group-hover:scale-105 organic-transition"
              />
              <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson?.difficulty)}`}>
                <div className="flex items-center space-x-1">
                  <Icon name={getDifficultyIcon(lesson?.difficulty)} size={12} />
                  <span className="capitalize">{lesson?.difficulty}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{lesson?.duration} min</span>
                </div>
              </div>
              {isCompleted && (
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-success rounded-full flex items-center justify-center achievement-glow">
                  <Icon name="Check" size={16} color="white" />
                </div>
              )}
              {progress > 0 && progress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <div className="h-full bg-achievement organic-transition" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
            <div className="card-front-content flex-grow">
              <h3 className="font-headline font-semibold text-lg text-text-primary mb-2 line-clamp-2">
                {lesson?.title}
              </h3>
              <p className="text-text-secondary font-body text-sm line-clamp-3 mb-4">
                {shortDescription}
              </p>
              <div className="flex items-center justify-between mt-auto">
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
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div className="card-back">
           <div className="p-6 flex flex-col h-full">
              <h3 className="font-headline font-semibold text-lg text-text-primary mb-3">{lesson?.title}</h3>
              <div className="text-text-secondary font-body text-sm mb-4 flex-grow">
                 <p className="mb-3">{lesson.description}</p>
                 <p className="font-semibold text-text-primary mb-2">Key takeaways:</p>
                 <ul className="list-disc list-inside space-y-1">
                    {lesson?.tags?.map((tag, index) => (
                       <li key={index}>{tag}</li>
                    ))}
                 </ul>
              </div>
              <Button
                 variant={isCompleted ? "outline" : "default"}
                 fullWidth
                 onClick={(e) => { e.stopPropagation(); onStart(lesson); }}
                 iconName={isCompleted ? "RotateCcw" : progress > 0 ? "Play" : "BookOpen"}
                 iconPosition="left"
                 className="quest-button mt-auto"
               >
                 {isCompleted ? "Review Lesson" : progress > 0 ? "Continue" : "Start Learning"}
               </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;