import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

// Mock Data (similar to Mission Control Dashboard)
const mockUser = {
  id: 1,
  name: "Environmental Hero",
  level: 5,
  totalXP: 2847,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  badges: [
    { id: 1, name: "Tree Planter", icon: "🌳" },
    { id: 2, name: "Recycler", icon: "♻️" },
    { id: 3, name: "Beach Cleaner", icon: "🌊" },
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
        {/* User Profile Header */}
        <div className="flex items-center space-x-6 bg-white p-8 rounded-lg shadow-md">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-lg text-gray-600">Level {user.level}</p>
            <p className="text-lg text-primary">{user.totalXP} XP</p>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievement Badges</h2>
          <div className="flex space-x-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center">
                <span className="text-4xl">{badge.icon}</span>
                <span className="mt-2 text-sm text-gray-600">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard & Missions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
            <p className="text-lg text-gray-600">Rank: <span className="font-bold text-primary">{user.leaderboard.rank}</span> / {user.leaderboard.totalParticipants}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Missions</h2>
            <p className="text-lg text-gray-600">Completed: <span className="font-bold text-primary">{user.missions.completed}</span></d-p>
            <p className="text-lg text-gray-600">Taken: <span className="font-bold text-primary">{user.missions.taken}</span></p>
          </div>
        </div>
      </main>
      <footer className="bg-forest text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="font-body">
            &copy; {new Date().getFullYear()} EcoQuest. Empowering environmental heroes worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
