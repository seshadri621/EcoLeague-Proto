import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui';
import { Icon } from 'components/AppIcon';
import { Image } from 'components/AppImage';

const QuizModal = ({ isOpen, onClose, quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isOpen && !isFinished) {
      setTimerActive(true);
      setTimeLeft(30);
    }
  }, [isOpen, currentQuestionIndex, isFinished]);

  useEffect(() => {
    let timer = null;
    if (timerActive && timeLeft > 0 && !showAnswer) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showAnswer) {
      handleSelectAnswer(-1); // Timeout
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, showAnswer]);

  if (!isOpen || !quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (optionIndex) => {
    if (showAnswer) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
    setTimerActive(false);
    setShowAnswer(true);

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
      } else {
        calculateScore();
        setIsFinished(true);
      }
    }, 2000);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(Math.round((correctAnswers / totalQuestions) * 100));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setScore(0);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const handleComplete = () => {
    onComplete(score);
    onClose();
    resetQuiz();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return 'Trophy';
    if (score >= 70) return 'Award';
    return 'Target';
  };

  const getFeedbackMessage = (score) => {
    if (score >= 90) return "Outstanding! You're an environmental expert! 🌟";
    if (score >= 80) return "Excellent work! You've mastered this topic! 🎉";
    if (score >= 70) return "Great job! You're on the right track! 👍";
    if (score >= 60) return "Good effort! Keep learning and improving! 📚";
    return "Don't give up! Review the lesson and try again! 💪";
  };

  const renderResultScreen = () => (
    <div className="p-8 text-center">
      <div className="mb-6">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${score >= 80 ? 'bg-success/20' : score >= 60 ? 'bg-warning/20' : 'bg-error/20'} achievement-glow`}>
          <Icon name={getScoreIcon(score)} size={32} color={score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'} />
        </div>
        <h2 className="font-headline font-bold text-2xl text-text-primary mb-2">Quiz Complete!</h2>
        <p className={`font-accent text-4xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</p>
        <p className="text-text-secondary font-body mb-4">{getFeedbackMessage(score)}</p>
      </div>
      <div className="bg-muted/50 rounded-eco-md p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{quiz.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length}</p>
            <p className="text-sm text-text-secondary">Correct</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-error">{quiz.questions.length - quiz.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length}</p>
            <p className="text-sm text-text-secondary">Incorrect</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-achievement">{quiz.xpReward}</p>
            <p className="text-sm text-text-secondary">XP Earned</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={resetQuiz} iconName="RotateCcw" iconPosition="left">
          Retake Quiz
        </Button>
        <Button onClick={handleComplete} iconName="CheckCircle" iconPosition="left" className="quest-button">
          Continue Learning
        </Button>
      </div>
    </div>
  );

  const renderQuizContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline font-semibold text-xl text-text-primary">{quiz.title}</h2>
            <p className="text-text-secondary font-body text-sm">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-muted">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div className="bg-forest h-2 rounded-full organic-transition progress-vine" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-center">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${timeLeft <= 10 ? 'bg-error/20 text-error mission-pulse' : 'bg-forest-gradient/20 text-forest'}`}>
            <Icon name="Timer" size={16} />
            <span className="font-bold text-lg">{timeLeft}s</span>
          </div>
        </div>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        {currentQuestion.image && (
          <div className="mb-6 rounded-eco-md overflow-hidden">
            <Image src={currentQuestion.image} alt="Question illustration" className="w-full h-48 object-cover" />
          </div>
        )}
        <h3 className="font-headline font-semibold text-lg text-text-primary mb-6 text-center">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showAnswer}
              className={`w-full p-4 rounded-eco-md border-2 text-left organic-transition quest-button ${
                showAnswer
                  ? index === currentQuestion.correctAnswer
                    ? 'border-success bg-success/20 text-success'
                    : selectedAnswers[currentQuestionIndex] === index
                    ? 'border-error bg-error/20 text-error'
                    : 'border-border bg-muted text-text-secondary'
                  : selectedAnswers[currentQuestionIndex] === index
                  ? 'border-forest bg-forest-gradient/20 text-forest'
                  : 'border-border hover:border-forest/50 hover:bg-forest-gradient/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                  showAnswer
                    ? index === currentQuestion.correctAnswer
                      ? 'border-success bg-success text-white'
                      : selectedAnswers[currentQuestionIndex] === index
                      ? 'border-error bg-error text-white'
                      : 'border-border text-text-secondary'
                    : selectedAnswers[currentQuestionIndex] === index
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
      </div>
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex justify-end">
          <Button onClick={() => handleSelectAnswer(-1)} disabled={showAnswer}>
            Next
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-2xl max-h-[90vh] flex flex-col">
        {isFinished ? (
          <div className="overflow-y-auto">
            {renderResultScreen()}
          </div>
        ) : (
          renderQuizContent()
        )}
      </div>
    </div>
  );
};

export default QuizModal;