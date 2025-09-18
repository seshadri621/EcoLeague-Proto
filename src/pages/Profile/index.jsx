import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';
// Mock Data (similar to Mission Control Dashboard)
const mockUser = {
  id: 1,
  name: "Environmental Hero",
  level: 5,
  totalXP: 2847,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  badges: [
    { id: 1, name: "Tree Planter", icon: "TreePine", rarity: "rare" },
    { id: 2, name: "Recycler", icon: "Recycle", rarity: "common" },
    { id: 3, name: "Beach Cleaner", icon: "Waves", rarity: "epic" },
  ],
  leaderboard: {
    rank: 5,
    totalParticipants: 100,
  },
  missions: {
    completed: 127,
    taken: 135,
  }
};

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'epic':
      return 'bg-purple-100 text-purple-700';
    case 'rare':
      return 'bg-blue-100 text-blue-700';
    case 'common':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center mx-auto mission-pulse">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-text-secondary font-body">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile - EcoQuest</title>
        <meta name="description" content="Your EcoQuest profile page." />
      </Helmet>
      <Header />
      <main className="pt-16 max-w-4xl mx-auto p-6">
        {/* User Profile Header with updated styling */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white p-6 rounded-eco-lg shadow-eco-md border border-border">
          <Image src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-forest" />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-headline font-bold text-text-primary">{user.name}</h1>
            <p className="text-lg text-text-secondary font-body">Level {user.level} Explorer</p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
              <Icon name="Zap" size={16} className="text-achievement" />
              <p className="text-lg text-achievement font-body font-medium">{user.totalXP.toLocaleString()} XP</p>
            </div>
          </div>
        </div>

        {/* Achievement Badges with updated styling */}
        <div className="mt-6 bg-white p-6 rounded-eco-lg shadow-eco-md border border-border">
          <h2 className="text-xl font-headline font-semibold text-text-primary mb-4">Recent Badges</h2>
          <div className="flex flex-wrap gap-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center text-center p-3 rounded-eco-md w-24 env-card-hover">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getRarityColor(badge.rarity)}`}>
                  <Icon name={badge.icon} size={32} />
                </div>
                <span className="mt-2 text-sm text-text-primary font-body font-medium">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard & Missions with updated styling */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-eco-lg shadow-eco-md border border-border">
            <h2 className="text-xl font-headline font-semibold text-text-primary mb-4">Leaderboard</h2>
            <div className="flex items-center space-x-3">
              <Icon name="Trophy" size={24} className="text-achievement" />
              <div>
                <p className="text-lg text-text-secondary font-body">Global Rank</p>
                <p className="text-2xl font-bold text-forest">{user.leaderboard.rank} <span className="text-lg text-text-secondary font-normal">/ {user.leaderboard.totalParticipants.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-eco-lg shadow-eco-md border border-border">
            <h2 className="text-xl font-headline font-semibold text-text-primary mb-4">Missions</h2>
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={24} className="text-ocean" />
              <div>
                <p className="text-lg text-text-secondary font-body">Completed: <span className="font-bold text-ocean">{user.missions.completed}</span></p>
                <p className="text-lg text-text-secondary font-body">In Progress: <span className="font-bold text-ocean">{user.missions.taken - user.missions.completed}</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-forest to-ocean rounded-eco-md flex items-center justify-center">
                <Icon name="Leaf" size={16} color="white" />
              </div>
              <span className="font-headline font-bold text-gradient-forest">EcoQuest</span>
            </div>
            <p className="text-text-secondary font-body">&copy; {new Date().getFullYear()} EcoQuest. Empowering environmental heroes worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
