import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TodayLessonSection = ({ lesson, onLessonComplete, onQuizStart }) => {
  const [lessonProgress, setLessonProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setLessonProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const handlePlayLesson = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
    setLessonProgress((index / lesson?.sections?.length) * 100);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!lesson) {
    return (
      <section className="px-4 lg:px-6 py-8 bg-forest-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-headline font-semibold text-white mb-2">
            No Lesson Available
          </h3>
          <p className="text-white/80 font-body mb-6">
            Check back later for new micro-lessons or explore our learning arena.
          </p>
          <Button variant="secondary" iconName="BookOpen" iconPosition="left" asChild>
            <Link to="/learning-arena">Explore Learning Arena</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-6 py-8 bg-forest-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Lesson Content */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-white/80" />
                <span className="text-sm font-body text-white/80">Today's Micro-Lesson</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-headline font-bold text-white mb-3">
                {lesson?.title}
              </h2>
              <p className="text-white/90 font-body leading-relaxed">
                {lesson?.description}
              </p>
            </div>

            {/* Lesson Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-eco-md p-3 text-center">
                <Icon name="Clock" size={20} className="text-white mx-auto mb-1" />
                <p className="text-sm font-body text-white/80">Duration</p>
                <p className="font-headline font-semibold text-white">
                  {formatDuration(lesson?.duration)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-eco-md p-3 text-center">
                <Icon name="Target" size={20} className="text-white mx-auto mb-1" />
                <p className="text-sm font-body text-white/80">Difficulty</p>
                <p className="font-headline font-semibold text-white capitalize">
                  {lesson?.difficulty}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-eco-md p-3 text-center">
                <Icon name="Award" size={20} className="text-white mx-auto mb-1" />
                <p className="text-sm font-body text-white/80">XP Reward</p>
                <p className="font-headline font-semibold text-white">
                  {lesson?.xpReward}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span className="font-body">Lesson Progress</span>
                <span className="font-body">{Math.round(lessonProgress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full organic-transition"
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="lg"
                iconName={isPlaying ? "Pause" : "Play"}
                iconPosition="left"
                onClick={handlePlayLesson}
                className="quest-button"
              >
                {isPlaying ? "Pause Lesson" : "Start Lesson"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="HelpCircle"
                iconPosition="left"
                onClick={onQuizStart}
                disabled={lessonProgress < 100}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Take Quiz
              </Button>
            </div>
          </div>

          {/* Lesson Player */}
          <div className="bg-white rounded-eco-lg shadow-eco-lg p-6">
            {/* Lesson Thumbnail */}
            <div className="relative mb-4">
              <div className="aspect-video rounded-eco-md overflow-hidden">
                <Image
                  src={lesson?.thumbnail}
                  alt={lesson?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={handlePlayLesson}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white organic-transition quest-button"
                  >
                    <Icon 
                      name={isPlaying ? "Pause" : "Play"} 
                      size={24} 
                      className="text-forest ml-1" 
                    />
                  </button>
                </div>

                {/* Progress Indicator */}
                {lessonProgress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                    <div
                      className="h-full bg-white organic-transition"
                      style={{ width: `${lessonProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Sections */}
            <div className="space-y-3">
              <h4 className="font-headline font-semibold text-forest">Lesson Outline</h4>
              <div className="space-y-2">
                {lesson?.sections?.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionClick(index)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-eco-sm organic-transition text-left ${
                      currentSection === index
                        ? 'bg-forest-gradient text-forest border border-forest/20'
                        : 'hover:bg-forest-gradient/30 text-text-secondary'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-body font-medium ${
                      currentSection === index ? 'bg-forest text-white' : 'bg-muted text-text-secondary'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-medium">{section?.title}</p>
                      <p className="text-xs opacity-80">{formatDuration(section?.duration)}</p>
                    </div>
                    {currentSection === index && (
                      <Icon name="Play" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson Tags */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {lesson?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-forest-gradient/20 text-forest text-xs font-body rounded-eco-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access to Learning Arena */}
        <div className="text-center mt-8">
          <Button variant="ghost" iconName="ArrowRight" iconPosition="right" asChild className="text-white hover:bg-white/10">
            <Link to="/learning-arena">Explore More Lessons</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TodayLessonSection;