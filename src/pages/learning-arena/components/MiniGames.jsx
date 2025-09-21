import React from 'react';
import RecycleRushGame from './RecycleRushGame';

const MiniGames = () => {
  return (
    <div className="p-4">
      <div className="text-center mb-12">
        <h2 className="font-headline font-bold text-3xl text-text-primary mb-2">Eco Mini-Games</h2>
        <p className="text-text-secondary font-body max-w-2xl mx-auto">
          Engage in fun challenges that test your environmental knowledge and reflexes. More games coming soon!
        </p>
      </div>
      <RecycleRushGame />
    </div>
  );
};

export default MiniGames;
