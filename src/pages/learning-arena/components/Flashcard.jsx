import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const Flashcard = ({ section }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 mb-6">
      <div
        className={`relative w-full h-64 transform-style-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={handleFlip}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-forest-gradient/20 border-2 border-forest/30 rounded-eco-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer">
          <Icon name="BookOpen" size={32} className="text-forest mb-4" />
          <h3 className="font-headline font-bold text-xl text-forest">
            {section.title}
          </h3>
          <p className="text-text-secondary mt-2">Click to reveal content</p>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-border rounded-eco-lg p-6 flex flex-col justify-between rotate-y-180">
          <div>
            <h4 className="font-headline font-semibold text-lg text-text-primary mb-3">{section.title}</h4>
            <p className="font-body text-text-secondary text-sm leading-relaxed">
              {section.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;