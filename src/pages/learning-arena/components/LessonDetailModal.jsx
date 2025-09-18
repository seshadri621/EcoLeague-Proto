import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LessonDetailModal = ({ isOpen, onClose, onStartQuiz, lesson }) => {
  if (!isOpen || !lesson) return null;

  const totalDuration = lesson.sections.reduce((sum, section) => sum + section.duration, 0);
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min read`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-start justify-between">
          <div>
            <h2 className="font-headline font-bold text-2xl text-text-primary mb-1">
              {lesson.title}
            </h2>
            <p className="font-body text-text-secondary">
              {lesson.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-muted ml-4"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-muted/50 rounded-eco-md p-4 flex items-center space-x-3">
                <Icon name="BookOpen" size={24} className="text-forest" />
                <div>
                  <p className="text-sm text-text-secondary">Sections</p>
                  <p className="font-bold text-text-primary">{lesson.sections.length}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-eco-md p-4 flex items-center space-x-3">
                <Icon name="Clock" size={24} className="text-ocean" />
                <div>
                  <p className="text-sm text-text-secondary">Est. Time</p>
                  <p className="font-bold text-text-primary">{formatDuration(totalDuration)}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-eco-md p-4 flex items-center space-x-3">
                <Icon name="Award" size={24} className="text-achievement" />
                <div>
                  <p className="text-sm text-text-secondary">XP Reward</p>
                  <p className="font-bold text-text-primary">{lesson.xpReward}</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none prose-eco">
              {lesson.sections.map((section, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <h3 className="font-headline font-semibold text-lg text-forest">
                    {index + 1}. {section.title}
                  </h3>
                  <p className="font-body text-text-primary leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 flex justify-end items-center gap-4">
           <Button
            variant="outline"
            onClick={onClose}
          >
            Back to Lessons
          </Button>
          <Button
            onClick={onStartQuiz}
            iconName="Play"
            iconPosition="right"
            className="quest-button"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailModal;