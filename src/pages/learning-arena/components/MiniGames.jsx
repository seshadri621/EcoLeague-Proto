import React from 'react';

const MiniGames = () => {
  const games = [
    {
      title: 'Recycle Rush',
      description: 'Sort trash into the correct bins before time runs out!',
      icon: 'Recycle',
      color: 'text-green-500'
    },
    {
      title: 'Ocean Cleanup',
      description: 'Navigate a boat to collect plastic waste from the ocean.',
      icon: 'Ship',
      color: 'text-blue-500'
    },
    {
      title: 'Tree Planter',
      description: 'Plant as many trees as you can in different regions.',
      icon: 'Sprout',
      color: 'text-lime-500'
    },
     {
      title: 'Energy Saver',
      description: 'Identify and turn off devices that are wasting energy.',
      icon: 'ZapOff',
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="p-4">
        <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl text-text-primary mb-2">Eco Mini-Games</h2>
            <p className="text-text-secondary font-body max-w-2xl mx-auto">Engage in fun challenges that test your environmental knowledge and reflexes. More games coming soon!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {games.map((game, index) => (
                <div key={index} className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6 flex items-center space-x-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-muted`}>
                        <Icon name={game.icon} size={32} className={game.color} />
                    </div>
                    <div>
                        <h3 className="font-headline font-bold text-xl text-text-primary mb-1">{game.title}</h3>
                        <p className="text-text-secondary font-body">{game.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MiniGames;
