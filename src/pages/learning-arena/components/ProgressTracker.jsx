import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ userProgress, onViewDetails }) => {
  const getStreakIcon = (streak) => {
    if (streak >= 30) return 'Crown';
    if (streak >= 14) return 'Trophy';
    if (streak >= 7) return 'Award';
    return 'Target';
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-achievement';
    if (streak >= 7) return 'text-success';
    return 'text-forest';
  };

  const getLevelProgress = (xp, level) => {
    const xpForCurrentLevel = (level - 1) * 1000;
    const xpForNextLevel = level * 1000;
    const currentLevelXp = xp - xpForCurrentLevel;
    const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
    return (currentLevelXp / xpNeededForNext) * 100;
  };

  const skillCategories = [
    { name: 'Climate Science', progress: userProgress?.skills?.climate, color: 'bg-red-500' },
    { name: 'Biodiversity', progress: userProgress?.skills?.biodiversity, color: 'bg-green-500' },
    { name: 'Sustainability', progress: userProgress?.skills?.sustainability, color: 'bg-blue-500' },
    { name: 'Conservation', progress: userProgress?.skills?.conservation, color: 'bg-purple-500' },
    { name: 'Renewable Energy', progress: userProgress?.skills?.renewable, color: 'bg-yellow-500' }
  ];

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline font-bold text-xl text-text-primary">Your Progress</h2>
        <button
          onClick={onViewDetails}
          className="text-forest hover:text-forest/80 organic-transition"
        >
          <Icon name="ExternalLink" size={20} />
        </button>
      </div>
      {/* Level and XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center achievement-glow">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-headline font-semibold text-text-primary">
                Level {userProgress?.level}
              </h3>
              <p className="text-text-secondary font-body text-sm">
                Environmental Hero
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-achievement text-lg">
              {userProgress?.totalXP?.toLocaleString()} XP
            </p>
            <p className="text-text-secondary font-body text-xs">
              {(userProgress?.level * 1000) - userProgress?.totalXP} XP to next level
            </p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-achievement to-orange-600 h-3 rounded-full organic-transition progress-vine"
            style={{ width: `${getLevelProgress(userProgress?.totalXP, userProgress?.level)}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary text-center">
          Level {userProgress?.level} Progress
        </p>
      </div>
      {/* Learning Streak */}
      <div className="mb-6 p-4 bg-forest-gradient/10 rounded-eco-md border border-forest/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              userProgress?.streak >= 7 ? 'bg-success/20' : 'bg-forest-gradient/20'
            }`}>
              <Icon 
                name={getStreakIcon(userProgress?.streak)} 
                size={18} 
                className={getStreakColor(userProgress?.streak)}
              />
            </div>
            <div>
              <h4 className="font-headline font-semibold text-forest">
                {userProgress?.streak} Day Streak
              </h4>
              <p className="text-text-secondary font-body text-sm">
                Keep learning daily!
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-forest">🔥</p>
          </div>
        </div>
      </div>
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-eco-md">
          <div className="w-10 h-10 bg-forest-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={18} color="var(--color-forest)" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{userProgress?.lessonsCompleted}</p>
          <p className="text-xs text-text-secondary">Lessons Completed</p>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-eco-md">
          <div className="w-10 h-10 bg-achievement-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={18} color="var(--color-achievement)" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{userProgress?.quizzesPassed}</p>
          <p className="text-xs text-text-secondary">Quizzes Passed</p>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-eco-md">
          <div className="w-10 h-10 bg-ocean-gradient/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={18} color="var(--color-ocean)" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{userProgress?.challengesWon}</p>
          <p className="text-xs text-text-secondary">Challenges Won</p>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-eco-md">
          <div className="w-10 h-10 bg-purple-500/20 rounded-eco-sm flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={18} color="rgb(168 85 247)" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{userProgress?.sessionsAttended}</p>
          <p className="text-xs text-text-secondary">Expert Sessions</p>
        </div>
      </div>
      {/* Skill Progress */}
      <div className="mb-6">
        <h4 className="font-headline font-semibold text-text-primary mb-4">Skill Mastery</h4>
        <div className="space-y-3">
          {skillCategories?.map((skill, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-sm text-text-primary">{skill?.name}</span>
                <span className="font-body text-sm text-text-secondary">{skill?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`${skill?.color} h-2 rounded-full organic-transition`}
                  style={{ width: `${skill?.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div>
        <h4 className="font-headline font-semibold text-text-primary mb-3">Recent Achievements</h4>
        <div className="space-y-2">
          {userProgress?.recentAchievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-muted/20 rounded-eco-sm">
              <div className="w-8 h-8 bg-achievement-gradient/20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={14} color="var(--color-achievement)" />
              </div>
              <div className="flex-1">
                <p className="font-body font-medium text-text-primary text-sm">{achievement?.title}</p>
                <p className="text-xs text-text-secondary">{achievement?.date}</p>
              </div>
              <div className="text-achievement font-bold text-sm">
                +{achievement?.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;