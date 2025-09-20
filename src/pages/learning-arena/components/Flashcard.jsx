import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ section }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          <h3 className="font-headline font-semibold text-lg text-forest">
            {section.title}
          </h3>
        </div>
        <div className="flashcard-face flashcard-back">
          <p className="font-body text-text-primary leading-relaxed">
            {section.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
