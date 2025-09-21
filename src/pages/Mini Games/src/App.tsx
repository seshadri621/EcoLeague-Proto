import React, { useState } from 'react';
import { GameSelection } from "./components/GameSelection";
import { BiodiversityQuiz } from "./components/BiodiversityQuiz";
import { RecycleGame } from "./components/RecycleGame";
import { EcoCardMatch } from "./components/EcoCardMatch";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
  };

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'quiz-challenge':
        return <BiodiversityQuiz />;
      case 'recycle-sort':
        return <RecycleGame />;
      case 'card-match':
        return <EcoCardMatch />;
      default:
        return <GameSelection onGameSelect={handleGameSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between">
            {currentGame && (
              <Button 
                onClick={handleBackToMenu}
                variant="outline"
                className="flex items-center gap-2 bg-white border-green-300 text-green-700 hover:bg-green-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Games
              </Button>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-green-800 mb-2">EcoLearn Platform</h1>
              <p className="text-green-600">
                {currentGame 
                  ? "Interactive Environmental Education Games" 
                  : "Choose Your Learning Adventure"}
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
        {renderCurrentGame()}
      </div>
    </div>
  );
}