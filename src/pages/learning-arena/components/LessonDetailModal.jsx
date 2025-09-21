import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Flashcard from './Flashcard';

const LessonDetailModal = ({ isOpen, onClose, onStartQuiz, lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
    };
    const handleAudioEnd = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleAudioEnd);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [audioRef.current, isOpen]);

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

        {/* Audio Player */}
        <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-forest rounded-full flex items-center justify-center text-white organic-transition hover:bg-green-700 flex-shrink-0"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary">Listen to the lesson</p>
                <div className="flex items-center space-x-2">
                    <Icon name={volume > 0 ? "Volume2" : "VolumeX"} size={16} className="text-text-secondary" />
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={volume}
                        onChange={handleVolumeChange} 
                        className="w-24 h-1 bg-border rounded-full appearance-none cursor-pointer accent-forest"/>
                </div>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 mt-2">
              <div
                className="bg-forest h-1.5 rounded-full organic-transition"
                style={{ width: `${progress || 0}%` }}
              ></div>
            </div>
          </div>
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

            <div>
              {lesson.sections.map((section, index) => (
                <Flashcard key={index} section={section} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 flex justify-end items-center gap-4">
          <audio ref={audioRef} src={lesson.audioUrl} className="hidden" />
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
