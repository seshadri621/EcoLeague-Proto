import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreakCounterSection = ({ user, onStreakClaim, onXPBoost }) => {
  const [currentStreak, setCurrentStreak] = useState(user?.currentStreak || 0);
  const [totalXP, setTotalXP] = useState(user?.totalXP || 0);
  const [nextLevelXP, setNextLevelXP] = useState(user?.nextLevelXP || 3000);
  const [canClaimDaily, setCanClaimDaily] = useState(true);
  const [streakAnimation, setStreakAnimation] = useState(false);

  const streakMilestones = [
    { days: 7, reward: 'Tree Planter Badge', xp: 100, icon: 'TreePine' },
    { days: 14, reward: 'Eco Warrior Badge', xp: 200, icon: 'Shield' },
    { days: 30, reward: 'Environmental Hero Badge', xp: 500, icon: 'Crown' },
    { days: 60, reward: 'Planet Guardian Badge', xp: 1000, icon: 'Globe' },
    { days: 100, reward: 'Climate Champion Badge', xp: 2000, icon: 'Zap' }
  ];

  const weeklyGoals = [
    { id: 1, title: 'Complete 3 Missions', progress: 2, target: 3, xp: 150, icon: 'Target' },
    { id: 2, title: 'Finish 5 Lessons', progress: 4, target: 5, xp: 100, icon: 'BookOpen' },
    { id: 3, title: 'Share 2 Achievements', progress: 1, target: 2, xp: 75, icon: 'Share2' },
    { id: 4, title: 'Help 3 Community Members', progress: 3, target: 3, xp: 125, icon: 'Users' }
  ];

  useEffect(() => {
    // Check if user can claim daily reward
    const lastClaim = localStorage.getItem('lastDailyClaim');
    const today = new Date()?.toDateString();
    setCanClaimDaily(lastClaim !== today);
  }, []);

  const handleDailyClaim = () => {
    if (!canClaimDaily) return;
    
    setStreakAnimation(true);
    setCurrentStreak(prev => prev + 1);
    setTotalXP(prev => prev + 50);
    setCanClaimDaily(false);
    
    localStorage.setItem('lastDailyClaim', new Date()?.toDateString());
    
    setTimeout(() => setStreakAnimation(false), 1000);
    
    if (onStreakClaim) {
      onStreakClaim(currentStreak + 1);
    }
  };

  const getNextMilestone = () => {
    return streakMilestones?.find(milestone => milestone?.days > currentStreak);
  };

  const getProgressPercentage = () => {
    return Math.min((totalXP / nextLevelXP) * 100, 100);
  };

  const getCurrentLevel = () => {
    return Math.floor(totalXP / 1000) + 1;
  };

  const nextMilestone = getNextMilestone();
  const currentLevel = getCurrentLevel();
  const progressPercentage = getProgressPercentage();

  return (
    <section className="px-4 lg:px-6 py-8 bg-gradient-to-br from-achievement/5 via-white to-forest/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Streak Counter */}
          <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className={`w-20 h-20 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center mx-auto ${
                  streakAnimation ? 'achievement-glow' : ''
                }`}>
                  <Icon name="Flame" size={32} color="white" />
                </div>
                {streakAnimation && (
                  <div className="absolute inset-0 w-20 h-20 bg-achievement/30 rounded-full animate-ping mx-auto"></div>
                )}
              </div>
              
              <div>
                <h3 className="text-3xl font-headline font-bold text-achievement">
                  {currentStreak}
                </h3>
                <p className="text-text-secondary font-body">Day Streak</p>
              </div>

              <Button
                variant={canClaimDaily ? "default" : "outline"}
                size="sm"
                fullWidth
                iconName="Gift"
                iconPosition="left"
                onClick={handleDailyClaim}
                disabled={!canClaimDaily}
                className="quest-button"
              >
                {canClaimDaily ? "Claim Daily +50 XP" : "Claimed Today"}
              </Button>

              {nextMilestone && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary font-body mb-2">
                    Next Milestone: {nextMilestone?.days} days
                  </p>
                  <div className="flex items-center space-x-2">
                    <Icon name={nextMilestone?.icon} size={16} className="text-achievement" />
                    <span className="text-sm font-body text-forest">
                      {nextMilestone?.reward}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-forest to-success rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-forest">
                  Level {currentLevel}
                </h3>
                <p className="text-text-secondary font-body">Environmental Hero</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-body text-text-secondary">XP Progress</span>
                  <span className="font-body font-medium text-forest">
                    {totalXP?.toLocaleString()} / {nextLevelXP?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-forest to-success h-3 rounded-full organic-transition progress-vine"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-secondary font-body text-center">
                  {nextLevelXP - totalXP} XP to next level
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="TrendingUp"
                iconPosition="left"
                onClick={onXPBoost}
                className="quest-button"
              >
                XP Boost Available
              </Button>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ocean to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Target" size={24} color="white" />
                </div>
                <h3 className="text-lg font-headline font-semibold text-ocean">
                  Weekly Goals
                </h3>
                <p className="text-text-secondary font-body text-sm">
                  Complete to earn bonus XP
                </p>
              </div>

              <div className="space-y-3">
                {weeklyGoals?.map((goal) => (
                  <div key={goal?.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name={goal?.icon} size={14} className="text-ocean" />
                        <span className="text-sm font-body text-text-primary">
                          {goal?.title}
                        </span>
                      </div>
                      <span className="text-xs font-body text-text-secondary">
                        +{goal?.xp} XP
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full organic-transition ${
                            goal?.progress >= goal?.target ? 'bg-success' : 'bg-ocean'
                          }`}
                          style={{ width: `${(goal?.progress / goal?.target) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-body text-text-secondary">
                        {goal?.progress}/{goal?.target}
                      </span>
                      {goal?.progress >= goal?.target && (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" size="sm" fullWidth iconName="ArrowRight" iconPosition="right" asChild>
                <Link to="/achievement-gallery">View All Goals</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Seasonal Campaign Banner */}
        <div className="mt-8 bg-gradient-to-r from-forest via-success to-ocean rounded-eco-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Leaf" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold">
                  Climate Action Week
                </h3>
                <p className="text-white/90 font-body">
                  Join special missions and earn exclusive badges • Ends in 5 days
                </p>
              </div>
            </div>
            <Button variant="secondary" iconName="ArrowRight" iconPosition="right" asChild>
              <Link to="/quest-map?campaign=climate-week">Join Campaign</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreakCounterSection;