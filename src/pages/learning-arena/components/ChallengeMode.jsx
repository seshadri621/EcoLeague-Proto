import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ChallengeMode = ({ isOpen, onClose, challenge, onComplete }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (isOpen && !gameComplete) {
      setIsActive(true);
      setTimeLeft(15);
    }
  }, [isOpen, currentRound, gameComplete]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showRoundResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showRoundResult) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showRoundResult]);

  if (!isOpen || !challenge) return null;

  const currentQuestion = challenge?.questions?.[currentRound];
  const totalRounds = challenge?.questions?.length;

  const handleAnswerSelect = (answerIndex) => {
    if (showRoundResult) return;
    
    setSelectedAnswer(answerIndex);
    setIsActive(false);
    
    // Simulate opponent answer (random for demo)
    const opponentAnswer = Math.floor(Math.random() * currentQuestion?.options?.length);
    
    // Calculate scores
    const isPlayerCorrect = answerIndex === currentQuestion?.correctAnswer;
    const isOpponentCorrect = opponentAnswer === currentQuestion?.correctAnswer;
    
    if (isPlayerCorrect) {
      setPlayerScore(prev => prev + (timeLeft * 10)); // Bonus for speed
    }
    
    if (isOpponentCorrect) {
      setOpponentScore(prev => prev + (Math.floor(Math.random() * 10) + 5) * 10);
    }
    
    setShowRoundResult(true);
    
    // Auto advance after 3 seconds
    setTimeout(() => {
      if (currentRound < totalRounds - 1) {
        nextRound();
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const handleTimeUp = () => {
    handleAnswerSelect(-1); // -1 indicates no answer selected
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    setSelectedAnswer(null);
    setShowRoundResult(false);
    setTimeLeft(15);
    setIsActive(true);
  };

  const handleRestart = () => {
    setCurrentRound(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setSelectedAnswer(null);
    setShowRoundResult(false);
    setGameComplete(false);
    setTimeLeft(15);
    setIsActive(true);
  };

  const handleComplete = () => {
    const finalScore = playerScore > opponentScore ? 100 : playerScore === opponentScore ? 75 : 50;
    onComplete(finalScore, playerScore);
    onClose();
    handleRestart();
  };

  const getResultIcon = () => {
    if (playerScore > opponentScore) return "Trophy";
    if (playerScore === opponentScore) return "Award";
    return "Target";
  };

  const getResultMessage = () => {
    if (playerScore > opponentScore) return "Victory! You're an environmental champion! 🏆";
    if (playerScore === opponentScore) return "Draw! Great environmental knowledge! 🤝";
    return "Good effort! Keep learning and try again! 💪";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {!gameComplete ? (
          <>
            {/* Challenge Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-achievement/10 to-forest/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-headline font-bold text-xl text-text-primary">
                    🔥 Challenge Mode
                  </h2>
                  <p className="text-text-secondary font-body text-sm">
                    Round {currentRound + 1} of {totalRounds}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-muted"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Score Display */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <span className="font-headline font-semibold text-forest">You</span>
                  </div>
                  <p className="text-2xl font-bold text-forest">{playerScore}</p>
                </div>
                
                <div className="text-center flex items-center justify-center">
                  <span className="text-text-secondary font-body text-sm">VS</span>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-achievement rounded-full flex items-center justify-center">
                      <Icon name="Bot" size={16} color="white" />
                    </div>
                    <span className="font-headline font-semibold text-achievement">EcoBot</span>
                  </div>
                  <p className="text-2xl font-bold text-achievement">{opponentScore}</p>
                </div>
              </div>

              {/* Timer */}
              <div className="flex justify-center">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  timeLeft <= 5 ? 'bg-error/20 text-error mission-pulse' : 'bg-forest-gradient/20 text-forest'
                }`}>
                  <Icon name="Timer" size={18} />
                  <span className="font-bold text-lg">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              {currentQuestion?.image && (
                <div className="mb-6 rounded-eco-md overflow-hidden">
                  <Image
                    src={currentQuestion?.image}
                    alt="Challenge question"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <h3 className="font-headline font-semibold text-xl text-text-primary mb-6 text-center">
                {currentQuestion?.question}
              </h3>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showRoundResult}
                    className={`p-4 rounded-eco-md border-2 text-left organic-transition quest-button ${
                      showRoundResult
                        ? index === currentQuestion?.correctAnswer
                          ? 'border-success bg-success/20 text-success'
                          : selectedAnswer === index
                          ? 'border-error bg-error/20 text-error' :'border-border bg-muted text-text-secondary'
                        : selectedAnswer === index
                        ? 'border-forest bg-forest-gradient/20 text-forest'
                        : 'border-border hover:border-forest/50 hover:bg-forest-gradient/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                        showRoundResult
                          ? index === currentQuestion?.correctAnswer
                            ? 'border-success bg-success text-white'
                            : selectedAnswer === index
                            ? 'border-error bg-error text-white' :'border-border text-text-secondary'
                          : selectedAnswer === index
                          ? 'border-forest bg-forest text-white'
                          : 'border-border text-text-secondary'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-body font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Round Result */}
              {showRoundResult && (
                <div className="mt-6 p-4 bg-muted/50 rounded-eco-md text-center animate-fade-in">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={selectedAnswer === currentQuestion?.correctAnswer ? "CheckCircle" : "XCircle"} 
                        size={20} 
                        color={selectedAnswer === currentQuestion?.correctAnswer ? "var(--color-success)" : "var(--color-error)"}
                      />
                      <span className="font-body font-medium">
                        {selectedAnswer === currentQuestion?.correctAnswer ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    <div className="text-text-secondary">•</div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={16} color="var(--color-achievement)" />
                      <span className="font-body font-medium">
                        +{selectedAnswer === currentQuestion?.correctAnswer ? timeLeft * 10 : 0} points
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {currentRound < totalRounds - 1 ? "Next round starting..." : "Calculating final results..."}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Game Complete Screen */
          (<div className="p-8 text-center">
            <div className="mb-6">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                playerScore > opponentScore ? 'bg-success/20' : playerScore === opponentScore ? 'bg-warning/20' : 'bg-error/20'
              } achievement-glow`}>
                <Icon 
                  name={getResultIcon()} 
                  size={40} 
                  color={playerScore > opponentScore ? 'var(--color-success)' : playerScore === opponentScore ? 'var(--color-warning)' : 'var(--color-error)'}
                />
              </div>
              
              <h2 className="font-headline font-bold text-3xl text-text-primary mb-2">
                Challenge Complete!
              </h2>
              
              <p className="text-text-secondary font-body mb-4 text-lg">
                {getResultMessage()}
              </p>
            </div>
            {/* Final Scores */}
            <div className="bg-muted/50 rounded-eco-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="User" size={24} color="white" />
                  </div>
                  <p className="font-headline font-semibold text-forest mb-1">You</p>
                  <p className="text-3xl font-bold text-forest">{playerScore}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-achievement rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Bot" size={24} color="white" />
                  </div>
                  <p className="font-headline font-semibold text-achievement mb-1">EcoBot</p>
                  <p className="text-3xl font-bold text-achievement">{opponentScore}</p>
                </div>
              </div>
            </div>
            {/* Rewards */}
            <div className="bg-achievement-gradient/20 rounded-eco-md p-4 mb-6">
              <h3 className="font-headline font-semibold text-achievement mb-2">Rewards Earned</h3>
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-achievement">{challenge?.xpReward}</p>
                  <p className="text-sm text-text-secondary">XP Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-achievement">+{Math.floor(playerScore / 100)}</p>
                  <p className="text-sm text-text-secondary">Bonus XP</p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleRestart}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Play Again
              </Button>
              
              <Button
                onClick={handleComplete}
                iconName="CheckCircle"
                iconPosition="left"
                className="quest-button"
              >
                Continue Learning
              </Button>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default ChallengeMode;