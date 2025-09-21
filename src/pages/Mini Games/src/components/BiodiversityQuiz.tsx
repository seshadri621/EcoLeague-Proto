import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, Trophy, Clock, Star, RotateCcw, Play, TreePine } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'biodiversity' | 'threats' | 'conservation' | 'ecosystems';
}

interface FallingItem {
  id: string;
  type: 'question' | 'answer';
  content: string;
  questionId?: string;
  isCorrect?: boolean;
  answerIndex?: number;
  x: number;
  y: number;
  speed: number;
  color: string;
}

interface AnswerZone {
  type: 'correct' | 'incorrect';
  color: string;
  label: string;
  emoji: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does biodiversity refer to?',
    options: [
      'The number of rocks in an ecosystem',
      'The variety of life on Earth',
      'The total amount of water on Earth',
      'The height of mountains'
    ],
    correctAnswer: 1,
    category: 'biodiversity'
  },
  {
    id: 'q2',
    question: 'Which is a primary threat to biodiversity?',
    options: [
      'Habitat loss',
      'Building birdhouses',
      'Planting native flowers',
      'Recycling'
    ],
    correctAnswer: 0,
    category: 'threats'
  },
  {
    id: 'q3',
    question: 'What helps protect biodiversity?',
    options: [
      'Deforestation',
      'Pollution',
      'Conservation areas',
      'Urban sprawl'
    ],
    correctAnswer: 2,
    category: 'conservation'
  },
  {
    id: 'q4',
    question: 'Which ecosystem has the highest biodiversity?',
    options: [
      'Desert',
      'Tropical rainforest',
      'Arctic tundra',
      'City parks'
    ],
    correctAnswer: 1,
    category: 'ecosystems'
  },
  {
    id: 'q5',
    question: 'What causes species extinction?',
    options: [
      'Wildlife protection',
      'Habitat destruction',
      'National parks',
      'Bird watching'
    ],
    correctAnswer: 1,
    category: 'threats'
  }
];

const ANSWER_ZONES: AnswerZone[] = [
  { type: 'correct', color: 'bg-green-500', label: 'Correct!', emoji: '✅' },
  { type: 'incorrect', color: 'bg-red-500', label: 'Try Again', emoji: '❌' }
];

const CATEGORY_COLORS = {
  biodiversity: 'bg-emerald-400',
  threats: 'bg-red-400',
  conservation: 'bg-blue-400',
  ecosystems: 'bg-purple-400'
};

export function BiodiversityQuiz() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'showingQuestion'>('menu');
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  });
  const [questionDisplayed, setQuestionDisplayed] = useState(false);

  const generateRandomQuestion = useCallback((): QuizQuestion => {
    const availableQuestions = QUIZ_QUESTIONS.filter(q => q.id !== currentQuestion?.id);
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }, [currentQuestion]);

  const startNewQuestion = useCallback(() => {
    const newQuestion = generateRandomQuestion();
    setCurrentQuestion(newQuestion);
    setQuestionDisplayed(false);
    setGameState('showingQuestion');
    
    // First, show the question for 3 seconds
    setTimeout(() => {
      setQuestionDisplayed(true);
      setGameState('playing');
      
      // Spawn answer options after question is displayed
      const answerItems: FallingItem[] = newQuestion.options.map((option, index) => ({
        id: `a-${newQuestion.id}-${index}`,
        type: 'answer',
        content: option,
        questionId: newQuestion.id,
        isCorrect: index === newQuestion.correctAnswer,
        answerIndex: index,
        x: (index % 2) * 50 + 10 + Math.random() * 20, // Spread answers across screen
        y: -15,
        speed: 0.8 + (level * 0.2), // Slower speed
        color: index === newQuestion.correctAnswer ? 'bg-green-400' : 'bg-blue-400'
      }));

      setFallingItems(answerItems);
    }, 3000);
  }, [generateRandomQuestion, level]);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setQuestionsAnswered(0);
    setStreak(0);
    setFallingItems([]);
    setCurrentQuestion(null);
    setShowFeedback({ show: false, correct: false, message: '' });
    startNewQuestion();
  };

  const resetGame = () => {
    setGameState('menu');
    setFallingItems([]);
    setCurrentQuestion(null);
    setShowFeedback({ show: false, correct: false, message: '' });
  };

  const handleAnswerSubmit = (itemId: string, zoneType: string) => {
    const item = fallingItems.find(i => i.id === itemId);
    if (!item || item.type !== 'answer' || !currentQuestion) return;

    const isCorrect = item.isCorrect && zoneType === 'correct';
    
    if (isCorrect) {
      const points = 20 + (streak * 5);
      setScore(prev => prev + points);
      setQuestionsAnswered(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowFeedback({ show: true, correct: true, message: `Correct! +${points} points` });
      
      // Level up every 3 correct answers
      if ((questionsAnswered + 1) % 3 === 0) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 15); // Bonus time
      }
    } else {
      setStreak(0);
      setScore(prev => Math.max(0, prev - 5));
      setShowFeedback({ show: true, correct: false, message: 'Incorrect! Try again.' });
    }

    // Clear current question items and prepare for next question
    setFallingItems([]);
    
    // Hide feedback and start next question after 2 seconds
    setTimeout(() => {
      setShowFeedback({ show: false, correct: false, message: '' });
      startNewQuestion();
    }, 2000);
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Move items down and remove those that fall off screen
      setFallingItems(prev => prev
        .map(item => ({ ...item, y: item.y + item.speed }))
        .filter(item => {
          if (item.y > 100) {
            // Item fell off screen
            if (item.type === 'answer' && item.isCorrect) {
              setStreak(0); // Penalty for missing correct answer
              // Start new question when all items fall off
              setTimeout(() => startNewQuestion(), 1000);
            }
            return false;
          }
          return true;
        })
      );
    }, 150); // Slower animation loop

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(timerInterval);
    };
  }, [gameState, startNewQuestion]);

  const getAchievements = () => {
    const achievements = [];
    if (score >= 100) achievements.push({ name: 'Eco Scholar', icon: '🌱' });
    if (score >= 300) achievements.push({ name: 'Biodiversity Expert', icon: '🦋' });
    if (score >= 500) achievements.push({ name: 'Conservation Champion', icon: '🌍' });
    if (streak >= 5) achievements.push({ name: 'Knowledge Streak', icon: '⭐' });
    if (level >= 3) achievements.push({ name: 'Quiz Master', icon: '🏆' });
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
            <TreePine className="w-16 h-16 mx-auto text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">Biodiversity Quiz Challenge</h2>
            <p className="text-green-600">Test your environmental knowledge!</p>
          </div>
          
          <div className="space-y-4 text-sm text-green-700">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              <span>Answer questions correctly for points</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Race against time to level up</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Build knowledge streaks for bonuses</span>
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Start Quiz
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
            <h2 className="text-2xl font-bold text-green-800">Quiz Complete!</h2>
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
                <div className="text-2xl font-bold text-purple-600">{questionsAnswered}</div>
                <div className="text-sm text-purple-700">Questions</div>
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

      {/* Current Question Display */}
      {currentQuestion && (gameState === 'showingQuestion' || gameState === 'playing') && (
        <Card className="p-6 bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Current Question</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 leading-relaxed">
              {currentQuestion.question}
            </h3>
            {gameState === 'showingQuestion' && (
              <div className="text-emerald-600 animate-pulse">
                Get ready... answers incoming!
              </div>
            )}
          </motion.div>
        </Card>
      )}

      {/* Feedback Display */}
      <AnimatePresence>
        {showFeedback.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center p-4 rounded-lg ${
              showFeedback.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {showFeedback.correct ? '✅' : '❌'}
              <span className="font-semibold">{showFeedback.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Area */}
      <Card className="relative h-96 overflow-hidden bg-gradient-to-b from-sky-100 to-green-100 border-green-200">
        {/* Falling Items */}
        <AnimatePresence>
          {fallingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: -20, scale: 0.8 }}
              animate={{ 
                y: `${item.y}%`, 
                x: `${item.x}%`,
                scale: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute max-w-48 min-h-16 flex items-center justify-center text-sm cursor-pointer ${item.color} text-white rounded-lg shadow-lg border-2 border-white/20 hover:scale-105 transition-transform p-2 text-center`}
              draggable
              onDragStart={() => setDraggedItem(item.id)}
              onDragEnd={() => setDraggedItem(null)}
              onClick={() => {
                // For mobile - auto-submit to correct zone for correct answers
                if (window.innerWidth < 768 && item.type === 'answer') {
                  handleAnswerSubmit(item.id, item.isCorrect ? 'correct' : 'incorrect');
                }
              }}
            >
              <div className="font-medium leading-tight">
                {item.type === 'question' && <Brain className="w-4 h-4 mb-1 mx-auto" />}
                {item.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game Instructions */}
        <div className="absolute top-4 left-4 text-sm text-green-700 bg-white/80 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span>Drag correct answers to ✅ zone</span>
          </div>
        </div>
      </Card>

      {/* Answer Zones */}
      <div className="grid grid-cols-2 gap-4">
        {ANSWER_ZONES.map((zone) => (
          <motion.div
            key={zone.type}
            className={`${zone.color} rounded-xl p-6 text-center text-white shadow-lg border-2 border-white/20 min-h-24 flex flex-col justify-center transition-all duration-200 hover:scale-105`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedItem) {
                handleAnswerSubmit(draggedItem, zone.type);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl mb-2">{zone.emoji}</div>
            <div className="font-semibold">{zone.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
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