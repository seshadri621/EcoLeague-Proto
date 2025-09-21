import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import './Flashcard.css'; // Import the new CSS file

const Flashcard = ({ section }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const audioRef = useRef(null);

  const handleFlip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container mb-6" onClick={handleFlip}>
      <audio ref={audioRef} src="/audio/flip.mp3" preload="auto"></audio>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front of the card */}
        <div className="card-face card-front">
          <Icon name="BookOpen" size={32} className="text-forest mb-4" />
          <h3 className="font-headline font-bold text-xl text-forest">
            {section.title}
          </h3>
          <p className="text-text-secondary mt-2">Click to reveal content</p>
        </div>

        {/* Back of the card */}
        <div className="card-face card-back">
          <div className="w-full h-full flex flex-col justify-between text-left">
            <div>
              <h4 className="font-headline font-semibold text-lg text-text-primary mb-3">{section.title}</h4>
              <p className="font-body text-text-secondary text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
            <p className="text-xs text-text-tertiary mt-4 text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
