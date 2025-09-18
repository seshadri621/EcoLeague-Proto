import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuizModal = ({ isOpen, onClose, quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (isOpen && !showResults) {
      setIsTimerActive(true);
      setTimeLeft(30);
    }
  }, [isOpen, currentQuestion, showResults]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  if (!isOpen || !quiz) return null;

  const currentQ = quiz?.questions?.[currentQuestion];
  const totalQuestions = quiz?.questions?.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerId
    });
  };

  const handleNextQuestion = () => {
    setIsTimerActive(false);
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz?.questions?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(Math.round((correctAnswers / totalQuestions) * 100));
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowReview(false);
    setScore(0);
    setTimeLeft(30);
  };

  const handleComplete = () => {
    onComplete(score);
    onClose();
    handleRestart();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Outstanding! You're an environmental expert! 🌟";
    if (score >= 80) return "Excellent work! You've mastered this topic! 🎉";
    if (score >= 70) return "Great job! You're on the right track! 👍";
    if (score >= 60) return "Good effort! Keep learning and improving! 📚";
    return "Don't give up! Review the lesson and try again! 💪";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {!showResults ? (
          <>
            {/* Quiz Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-headline font-semibold text-xl text-text-primary">
                    {quiz?.title}
                  </h2>
                  <p className="text-text-secondary font-body text-sm">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-muted"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className="bg-forest h-2 rounded-full organic-transition progress-vine"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  timeLeft <= 10 ? 'bg-error/20 text-error' : 'bg-forest-gradient/20 text-forest'
                }`}>
                  <Icon name="Timer" size={16} />
                  <span className="font-medium">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              {currentQ?.image && (
                <div className="mb-6 rounded-eco-md overflow-hidden">
                  <Image
                    src={currentQ?.image}
                    alt="Question illustration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <h3 className="font-headline font-semibold text-lg text-text-primary mb-6">
                {currentQ?.question}
              </h3>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQ?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-eco-md border-2 text-left organic-transition ${
                      selectedAnswers?.[currentQuestion] === index
                        ? 'border-forest bg-forest-gradient/20 text-forest'
                        : 'border-border hover:border-forest/50 hover:bg-forest-gradient/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers?.[currentQuestion] === index
                          ? 'border-forest bg-forest'
                          : 'border-border'
                      }`}>
                        {selectedAnswers?.[currentQuestion] === index && (
                          <Icon name="Check" size={14} color="white" />
                        )}
                      </div>
                      <span className="font-body">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Footer */}
            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={onClose}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Exit Quiz
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers?.[currentQuestion] === undefined}
                  iconName={currentQuestion === totalQuestions - 1 ? "CheckCircle" : "ArrowRight"}
                  iconPosition="right"
                >
                  {currentQuestion === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </div>
          </>
        ) : !showReview ? (
          <div className="p-8 text-center flex-1 overflow-y-auto custom-scrollbar">
            <div className="mb-6">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                score >= 80 ? 'bg-success/20' : score >= 60 ? 'bg-warning/20' : 'bg-error/20'
              } achievement-glow`}>
                <Icon 
                  name={score >= 80 ? "Trophy" : score >= 60 ? "Award" : "Target"} 
                  size={32} 
                  color={score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}
                />
              </div>
              
              <h2 className="font-headline font-bold text-2xl text-text-primary mb-2">
                Quiz Complete!
              </h2>
              
              <p className={`font-accent text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}%
              </p>
              
              <p className="text-text-secondary font-body mb-4">
                {getScoreMessage(score)}
              </p>
            </div>
            {/* Score Breakdown */}
            <div className="bg-muted/50 rounded-eco-md p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-success">{quiz?.questions?.filter((_, index) => selectedAnswers?.[index] === quiz?.questions?.[index]?.correctAnswer)?.length}</p>
                  <p className="text-sm text-text-secondary">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-error">{quiz?.questions?.length - quiz?.questions?.filter((_, index) => selectedAnswers?.[index] === quiz?.questions?.[index]?.correctAnswer)?.length}</p>
                  <p className="text-sm text-text-secondary">Incorrect</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-achievement">{quiz?.xpReward}</p>
                  <p className="text-sm text-text-secondary">XP Earned</p>
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
                Retake Quiz
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReview(true)}
                iconName="Eye"
                iconPosition="left"
              >
                Review Answers
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
          </div>
        ) : (
          // Review View
          <>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-headline font-semibold text-xl text-text-primary">Review Answers</h2>
                <button
                  onClick={() => setShowReview(false)}
                  className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-muted"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
              {quiz?.questions?.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const correctAnswer = question.correctAnswer;
                const isCorrect = userAnswer === correctAnswer;

                return (
                  <div key={index} className="border-b border-border pb-6 last:border-b-0">
                    <h3 className="font-headline font-semibold text-md text-text-primary mb-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = correctAnswer === optionIndex;

                        let optionClass = 'border-border';
                        if (isCorrectAnswer) {
                          optionClass = 'border-success bg-success/10 text-success';
                        } else if (isUserAnswer) {
                          optionClass = 'border-error bg-error/10 text-error';
                        }

                        return (
                          <div
                            key={optionIndex}
                            className={`w-full p-3 rounded-eco-md border-2 text-left organic-transition ${optionClass}`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon name={isCorrectAnswer ? "CheckCircle" : isUserAnswer ? "XCircle" : "Circle"} size={18} />
                              <span className="font-body">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 border-t border-border bg-muted/30">
              <Button onClick={handleComplete} fullWidth>
                Finish Review
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;