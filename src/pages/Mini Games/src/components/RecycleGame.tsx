import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Recycle, Trophy, Clock, Star, RotateCcw, Play } from 'lucide-react';

interface GameItem {
  id: string;
  type: 'plastic' | 'paper' | 'glass' | 'organic' | 'electronic';
  name: string;
  emoji: string;
  x: number;
  y: number;
  speed: number;
}

interface RecycleBin {
  type: 'plastic' | 'paper' | 'glass' | 'organic' | 'electronic';
  color: string;
  label: string;
  emoji: string;
}

const RECYCLE_BINS: RecycleBin[] = [
  { type: 'plastic', color: 'bg-blue-500', label: 'Plastic', emoji: '🔵' },
  { type: 'paper', color: 'bg-green-500', label: 'Paper', emoji: '📄' },
  { type: 'glass', color: 'bg-amber-500', label: 'Glass', emoji: '🟡' },
  { type: 'organic', color: 'bg-emerald-600', label: 'Organic', emoji: '🟢' },
  { type: 'electronic', color: 'bg-red-500', label: 'Electronic', emoji: '🔴' }
];

const GAME_ITEMS = [
  { type: 'plastic' as const, items: ['🥤', '🧴', '🛍️', '🥛', '🧸'] },
  { type: 'paper' as const, items: ['📰', '📋', '📄', '📦', '📚'] },
  { type: 'glass' as const, items: ['🍷', '🍺', '🫙', '💡', '🔍'] },
  { type: 'organic' as const, items: ['🍎', '🍌', '🥕', '🍃', '🌾'] },
  { type: 'electronic' as const, items: ['📱', '💻', '🔋', '📺', '⌚'] }
];

export function RecycleGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [items, setItems] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [itemsCaught, setItemsCaught] = useState(0);
  const [streak, setStreak] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const spawnInterval = Math.max(800 - (level * 100), 300);
  const maxItems = Math.min(3 + level, 8);

  const generateRandomItem = useCallback((): GameItem => {
    const category = GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
    const emoji = category.items[Math.floor(Math.random() * category.items.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: category.type,
      name: emoji,
      emoji,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: -10,
      speed: Math.random() * 2 + 1 + (level * 0.5)
    };
  }, [level]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setItemsCaught(0);
    setStreak(0);
    setItems([]);
  };

  const resetGame = () => {
    setGameState('menu');
    setItems([]);
  };

  const handleItemSort = (itemId: string, binType: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === binType) {
      // Correct sort
      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
      setItemsCaught(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      // Level up every 20 items
      if ((itemsCaught + 1) % 20 === 0) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 15); // Bonus time
      }
    } else {
      // Wrong sort
      setStreak(0);
      setScore(prev => Math.max(0, prev - 5));
    }

    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Spawn new items
      setItems(prev => {
        if (prev.length < maxItems && Math.random() < 0.7) {
          return [...prev, generateRandomItem()];
        }
        return prev;
      });

      // Move items down and remove those that fall off screen
      setItems(prev => prev
        .map(item => ({ ...item, y: item.y + item.speed }))
        .filter(item => {
          if (item.y > 100) {
            // Item fell off screen - penalty
            setStreak(0);
            return false;
          }
          return true;
        })
      );
    }, 100);

    // Separate timer for countdown (every 1 second)
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1000ms = 1 second

    return () => {
      clearInterval(gameLoop);
      clearInterval(timerInterval);
    };
  }, [gameState, maxItems, generateRandomItem]);

  const getAchievements = () => {
    const achievements = [];
    if (score >= 100) achievements.push({ name: 'Eco Warrior', icon: '🌱' });
    if (score >= 300) achievements.push({ name: 'Recycling Master', icon: '♻️' });
    if (score >= 500) achievements.push({ name: 'Planet Protector', icon: '🌍' });
    if (streak >= 10) achievements.push({ name: 'Perfect Streak', icon: '⭐' });
    if (level >= 5) achievements.push({ name: 'Level Expert', icon: '🏆' });
    return achievements;
  };

  if (gameState === 'menu') {
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Recycle className="w-16 h-16 mx-auto text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">EcoSort Challenge</h2>
            <p className="text-green-600">Sort waste into the correct recycling bins!</p>
          </div>
          
          <div className="space-y-4 text-sm text-green-700">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              <span>Earn points for correct sorting</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Beat the clock to level up</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Build streaks for bonus points</span>
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </motion.div>
      </Card>
    );
  }

  if (gameState === 'gameOver') {
    const achievements = getAchievements();
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold text-green-800">Game Over!</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-green-700">Score</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600">{level}</div>
                <div className="text-sm text-blue-700">Level</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-purple-600">{itemsCaught}</div>
                <div className="text-sm text-purple-700">Items Sorted</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-orange-600">{Math.max(streak, 0)}</div>
                <div className="text-sm text-orange-700">Best Streak</div>
              </div>
            </div>

            {achievements.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-green-800">Achievements Unlocked:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {achievements.map((achievement, index) => (
                    <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      {achievement.icon} {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={startGame} className="flex-1 bg-green-600 hover:bg-green-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button onClick={resetGame} variant="outline" className="flex-1">
              Menu
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Game Header */}
      <Card className="p-4 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-800">{score}</div>
              <div className="text-xs text-green-600">Score</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-800">{level}</div>
              <div className="text-xs text-blue-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-800">{streak}</div>
              <div className="text-xs text-purple-600">Streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="font-bold text-red-600">{timeLeft}s</span>
          </div>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="mt-2 h-2" />
      </Card>

      {/* Game Area */}
      <Card className="relative h-96 overflow-hidden bg-gradient-to-b from-sky-100 to-green-100 border-green-200">
        {/* Falling Items */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: -20, scale: 0.8 }}
              animate={{ 
                y: `${item.y}%`, 
                x: `${item.x}%`,
                scale: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute w-12 h-12 flex items-center justify-center text-2xl cursor-pointer bg-white rounded-full shadow-lg border-2 border-gray-200 hover:scale-110 transition-transform"
              draggable
              onDragStart={() => setDraggedItem(item.id)}
              onDragEnd={() => setDraggedItem(null)}
              onClick={() => {
                // For mobile - simple tap to sort logic
                if (window.innerWidth < 768) {
                  const randomBin = RECYCLE_BINS[Math.floor(Math.random() * RECYCLE_BINS.length)];
                  handleItemSort(item.id, randomBin.type);
                }
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game Instructions */}
        <div className="absolute top-4 left-4 text-sm text-green-700 bg-white/80 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <Recycle className="w-4 h-4" />
            <span>Drag items to correct bins</span>
          </div>
        </div>
      </Card>

      {/* Recycling Bins */}
      <div className="grid grid-cols-5 gap-2">
        {RECYCLE_BINS.map((bin) => (
          <motion.div
            key={bin.type}
            className={`${bin.color} rounded-xl p-4 text-center text-white shadow-lg border-2 border-white/20 min-h-20 flex flex-col justify-center transition-all duration-200 hover:scale-105`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedItem) {
                handleItemSort(draggedItem, bin.type);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">{bin.emoji}</div>
            <div className="text-xs font-semibold">{bin.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Pause/Settings */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setGameState('menu')} 
          variant="outline"
          className="bg-white border-green-300 text-green-700 hover:bg-green-50"
        >
          Return to Menu
        </Button>
      </div>
    </div>
  );
}