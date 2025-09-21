import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shuffle, Trophy, Clock, Play } from 'lucide-react';

interface CardData {
  id: string;
  type: 'question' | 'answer';
  content: string;
  matchId: string;
  category: string;
}

const CARD_PAIRS: Array<{ question: string; answer: string; category: string }> = [
  { question: "What does biodiversity refer to?", answer: "The variety of life on Earth", category: "definition" },
  { question: "Primary threat to biodiversity?", answer: "Habitat loss", category: "threats" },
  { question: "What protects biodiversity?", answer: "Conservation areas", category: "protection" },
  { question: "Highest biodiversity ecosystem?", answer: "Tropical rainforest", category: "ecosystems" },
  { question: "What causes extinction?", answer: "Habitat destruction", category: "threats" },
  { question: "Species variety measure?", answer: "Biodiversity index", category: "definition" }
];

export function EcoCardMatch() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const gameCards: CardData[] = [];
    CARD_PAIRS.forEach((pair, index) => {
      gameCards.push({
        id: `q-${index}`,
        type: 'question',
        content: pair.question,
        matchId: `pair-${index}`,
        category: pair.category
      });
      gameCards.push({
        id: `a-${index}`,
        type: 'answer',
        content: pair.answer,
        matchId: `pair-${index}`,
        category: pair.category
      });
    });
    
    // Shuffle cards
    const shuffledCards = [...gameCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setTimeLeft(120);
    setGameState('playing');
  };

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard && secondCard && firstCard.matchId === secondCard.matchId) {
        // Match found!
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setScore(prev => prev + 100);
        setFlippedCards([]);
        
        // Check if game is complete
        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => setGameState('gameOver'), 500);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  if (gameState === 'menu') {
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Shuffle className="w-16 h-16 mx-auto text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">Eco Card Match</h2>
            <p className="text-green-600">Match questions with their correct answers!</p>
          </div>
          
          <div className="space-y-4 text-sm text-green-700">
            <div>🎯 Find matching question-answer pairs</div>
            <div>⏱️ Complete before time runs out</div>
            <div>🧠 Test your environmental knowledge</div>
          </div>

          <Button onClick={initializeGame} className="w-full bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </motion.div>
      </Card>
    );
  }

  if (gameState === 'gameOver') {
    const isWinner = matchedCards.length === cards.length;
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Trophy className={`w-16 h-16 mx-auto ${isWinner ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h2 className="text-2xl font-bold text-green-800">
              {isWinner ? 'Congratulations!' : 'Time\'s Up!'}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-green-700">Score</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600">{moves}</div>
                <div className="text-sm text-blue-700">Moves</div>
              </div>
            </div>

            {isWinner && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                🌟 Eco Memory Master!
              </Badge>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={initializeGame} className="flex-1 bg-green-600 hover:bg-green-700">
              Play Again
            </Button>
            <Button onClick={() => setGameState('menu')} variant="outline" className="flex-1">
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
              <div className="text-xl font-bold text-blue-800">{moves}</div>
              <div className="text-xs text-blue-600">Moves</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-800">{matchedCards.length / 2}</div>
              <div className="text-xs text-purple-600">Pairs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="font-bold text-red-600">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </Card>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
          const isMatched = matchedCards.includes(card.id);
          
          return (
            <motion.div
              key={card.id}
              className="aspect-square"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-full h-full cursor-pointer transition-all duration-300 ${
                  isFlipped ? 'rotate-0' : 'rotate-y-180'
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className={`w-full h-full rounded-lg border-2 flex items-center justify-center p-2 text-center text-sm ${
                  isMatched 
                    ? 'bg-green-200 border-green-400 text-green-800' 
                    : isFlipped
                      ? card.type === 'question' 
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-orange-100 border-orange-300 text-orange-800'
                      : 'bg-gradient-to-br from-green-400 to-blue-500 border-green-300 text-white'
                }`}>
                  {isFlipped ? (
                    <div className="leading-tight">
                      {card.type === 'question' && '❓ '}
                      {card.type === 'answer' && '💡 '}
                      {card.content}
                    </div>
                  ) : (
                    <div className="text-2xl">🌱</div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}