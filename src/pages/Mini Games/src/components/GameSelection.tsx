import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  TreePine, 
  Recycle, 
  Shuffle, 
  Target, 
  Zap, 
  Building,
  Gamepad2,
  Star
} from 'lucide-react';

interface GameOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

const GAME_OPTIONS: GameOption[] = [
  {
    id: 'quiz-challenge',
    title: 'Biodiversity Quiz Challenge',
    description: 'Answer falling questions in this fast-paced knowledge test',
    icon: <TreePine className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    features: ['Falling Questions', 'Drag & Drop', 'Time Pressure', 'Streak Bonuses'],
    difficulty: 'Medium',
    estimatedTime: '3-5 min'
  },
  {
    id: 'recycle-sort',
    title: 'EcoSort Challenge',
    description: 'Sort waste items into correct recycling bins',
    icon: <Recycle className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    features: ['Item Sorting', 'Progressive Levels', 'Action Packed', 'Environmental Focus'],
    difficulty: 'Easy',
    estimatedTime: '2-4 min'
  },
  {
    id: 'card-match',
    title: 'Eco Card Match',
    description: 'Memory game matching environmental questions with answers',
    icon: <Shuffle className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    features: ['Memory Challenge', 'Card Matching', 'Strategic Thinking', 'Pattern Recognition'],
    difficulty: 'Medium',
    estimatedTime: '4-6 min'
  },
  {
    id: 'ecosystem-builder',
    title: 'Ecosystem Builder',
    description: 'Build balanced ecosystems by answering questions correctly',
    icon: <Building className="w-8 h-8" />,
    color: 'from-emerald-400 to-teal-500',
    features: ['World Building', 'Question Chain', 'Visual Progress', 'Creativity Focused'],
    difficulty: 'Hard',
    estimatedTime: '8-12 min'
  },
  {
    id: 'species-snap',
    title: 'Species Snap',
    description: 'Quick-fire species identification and fact matching',
    icon: <Target className="w-8 h-8" />,
    color: 'from-orange-400 to-red-500',
    features: ['Quick Reflexes', 'Visual Learning', 'Speed Challenge', 'Image Recognition'],
    difficulty: 'Easy',
    estimatedTime: '2-3 min'
  },
  {
    id: 'conservation-crisis',
    title: 'Conservation Crisis',
    description: 'Make critical decisions to save endangered species',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-red-400 to-rose-500',
    features: ['Decision Making', 'Scenario Based', 'Real Impact', 'Critical Thinking'],
    difficulty: 'Hard',
    estimatedTime: '10-15 min'
  }
];

interface GameSelectionProps {
  onGameSelect: (gameId: string) => void;
}

export function GameSelection({ onGameSelect }: GameSelectionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-2"
        >
          <Gamepad2 className="w-16 h-16 mx-auto text-green-600" />
          <h1 className="text-4xl font-bold text-green-800">EcoLearn Games</h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Choose your adventure! Each game offers a unique way to learn about environmental science and biodiversity.
          </p>
        </motion.div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAME_OPTIONS.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full p-6 cursor-pointer border-2 border-transparent hover:border-green-300 transition-all duration-200 bg-gradient-to-br from-white to-green-50">
              <div className="space-y-4 h-full flex flex-col">
                {/* Game Icon & Title */}
                <div className="space-y-3">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-white shadow-lg`}>
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{game.description}</p>
                  </div>
                </div>

                {/* Game Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {game.estimatedTime}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {game.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  onClick={() => onGameSelect(game.id)}
                  className={`w-full bg-gradient-to-r ${game.color} text-white border-none hover:opacity-90 transition-opacity`}
                  disabled={!['quiz-challenge', 'recycle-sort', 'card-match'].includes(game.id)}
                >
                  {['quiz-challenge', 'recycle-sort', 'card-match'].includes(game.id) ? 'Play Now' : 'Coming Soon'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Game Ideas Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Future Game Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold text-green-700">🎯 Gamification Features:</h3>
            <ul className="space-y-1 text-green-600">
              <li>• Achievement system with environmental badges</li>
              <li>• Daily challenges and streaks</li>
              <li>• Multiplayer competitions and leaderboards</li>
              <li>• Real-world mission integration</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-green-700">🌍 Educational Integration:</h3>
            <ul className="space-y-1 text-green-600">
              <li>• AR species identification in nature</li>
              <li>• Virtual field trips to ecosystems</li>
              <li>• Carbon footprint tracking games</li>
              <li>• Community conservation projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}