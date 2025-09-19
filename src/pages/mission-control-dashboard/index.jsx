import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import HeroSection from './components/HeroSection';
import ActiveQuestsSection from './components/ActiveQuestsSection';
import TodayLessonSection from './components/TodayLessonSection';
import CommunityPulseSection from './components/CommunityPulseSection';
import StreakCounterSection from './components/StreakCounterSection';

const MissionControlDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeQuests, setActiveQuests] = useState([]);
  const [todayLesson, setTodayLesson] = useState(null);
  const [communityActivities, setCommunityActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock user data
    const mockUser = {
      id: 1,
      name: "Environmental Hero",
      level: 5,
      currentStreak: 12,
      totalXP: 2847,
      nextLevelXP: 3000,
      completedMissions: 127,
      rank: 5,
      avatar: "/assets/images/no_image.png"
    };

    // Mock active quests data
    const mockQuests = [
      {
        id: 1,
        title: "Urban Tree Planting Initiative",
        description: "Help plant native trees in downtown parks to improve air quality and create green spaces for the community.",
        type: "planting",
        difficulty: "intermediate",
        progress: 75,
        xpReward: 250,
        location: "Central Park",
        participants: 23,
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        image: "/assets/images/no_image.png"
      },
      {
        id: 2,
        title: "Beach Cleanup Challenge",
        description: "Join fellow eco-heroes in removing plastic waste and debris from our local beaches to protect marine life.",
        type: "cleanup",
        difficulty: "beginner",
        progress: 40,
        xpReward: 150,
        location: "Sunset Beach",
        participants: 45,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        image: "/assets/images/no_image.png"
      },
      {
        id: 3,
        title: "Wildlife Monitoring Project",
        description: "Document local bird species and their habitats to support conservation efforts in our region.",
        type: "monitoring",
        difficulty: "advanced",
        progress: 20,
        xpReward: 400,
        location: "Nature Reserve",
        participants: 12,
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        image: "/assets/images/no_image.png"
      }
    ];

    // Mock today's lesson data
    const mockLesson = {
      id: 1,
      title: "Understanding Carbon Footprints",
      description: "Learn how everyday activities contribute to carbon emissions and discover practical ways to reduce your environmental impact.",
      duration: 180,
      difficulty: "intermediate",
      xpReward: 100,
      thumbnail: "/assets/images/no_image.png",
      sections: [
        { title: "What is a Carbon Footprint?", duration: 45 },
        { title: "Measuring Your Impact", duration: 60 },
        { title: "Reduction Strategies", duration: 75 }
      ],
      tags: ["Climate Change", "Sustainability", "Personal Impact"]
    };

    // Mock community activities data
    const mockActivities = [
      {
        id: 1,
        type: "achievement",
        user: {
          name: "Sarah Chen",
          level: "Level 7 Explorer",
          avatar: "/assets/images/no_image.png"
        },
        content: "Just completed the Ocean Guardian challenge! Removed 50 lbs of plastic waste from local beaches.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        likes: 24,
        shares: 8,
        isLiked: false,
        image: "/assets/images/no_image.png",
        badge: {
          name: "Ocean Guardian",
          description: "Protected marine ecosystems"
        },
        stats: [
          { label: "Waste Removed", value: "50 lbs" },
          { label: "Beach Area", value: "2 miles" }
        ]
      },
      {
        id: 2,
        type: "mission",
        user: {
          name: "Marcus Rodriguez",
          level: "Level 4 Activist",
          avatar: "/assets/images/no_image.png"
        },
        content: "Leading a community tree planting event this weekend! We\'ve already planted 25 native oak trees in Riverside Park.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 18,
        shares: 12,
        isLiked: true,
        image: "/assets/images/no_image.png",
        stats: [
          { label: "Trees Planted", value: "25" },
          { label: "Volunteers", value: "15" }
        ]
      },
      {
        id: 3,
        type: "discussion",
        user: {
          name: "Emma Thompson",
          level: "Level 6 Champion",
          avatar: "/assets/images/no_image.png"
        },
        content: "Started a discussion about sustainable transportation options in our city. What are your favorite eco-friendly ways to commute?",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 15,
        shares: 6,
        isLiked: false
      },
      {
        id: 4,
        type: "lesson",
        user: {
          name: "David Park",
          level: "Level 3 Learner",
          avatar: "/assets/images/no_image.png"
        },
        content: "Just finished the \'Renewable Energy Basics\' lesson series! Amazing to learn how solar and wind power can transform our energy future.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 12,
        shares: 4,
        isLiked: false
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setUser(mockUser);
      setActiveQuests(mockQuests);
      setTodayLesson(mockLesson);
      setCommunityActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStartQuest = () => {
    // Navigate to quest map or show quest selection modal
    console.log('Starting new quest...');
  };

  const handleQuestAction = (questId, action) => {
    console.log(`Quest ${questId} action: ${action}`);
    // Handle quest actions like continue, pause, complete
  };

  const handleLessonComplete = (lessonId) => {
    console.log(`Lesson ${lessonId} completed`);
    // Update user XP and progress
  };

  const handleQuizStart = () => {
    console.log('Starting quiz...');
    // Navigate to quiz interface
  };

  const handleActivityLike = (activityId) => {
    setCommunityActivities(prev =>
      prev?.map(activity =>
        activity?.id === activityId
          ? {
              ...activity,
              isLiked: !activity?.isLiked,
              likes: activity?.isLiked ? activity?.likes - 1 : activity?.likes + 1
            }
          : activity
      )
    );
  };

  const handleActivityShare = (activityId) => {
    console.log(`Sharing activity ${activityId}`);
    // Handle social sharing
  };

  const handleStreakClaim = (newStreak) => {
    setUser(prev => ({
      ...prev,
      currentStreak: newStreak,
      totalXP: prev?.totalXP + 50
    }));
  };

  const handleXPBoost = () => {
    console.log('Activating XP boost...');
    // Handle XP boost activation
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center mx-auto mission-pulse">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-text-secondary font-body">Loading your mission control...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mission Control Dashboard - EcoQuest</title>
        <meta name="description" content="Your personalized environmental mission control center. Track progress, discover quests, and connect with eco-heroes worldwide." />
        <meta name="keywords" content="environmental missions, eco quests, sustainability dashboard, climate action" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <HeroSection 
          user={user} 
          onStartQuest={handleStartQuest}
        />
        
        <ActiveQuestsSection 
          quests={activeQuests}
          onQuestAction={handleQuestAction}
        />
        
        <TodayLessonSection 
          lesson={todayLesson}
          onLessonComplete={handleLessonComplete}
          onQuizStart={handleQuizStart}
        />
        
        <CommunityPulseSection 
          activities={communityActivities}
          onActivityLike={handleActivityLike}
          onActivityShare={handleActivityShare}
        />
        
        <StreakCounterSection 
          user={user}
          onStreakClaim={handleStreakClaim}
          onXPBoost={handleXPBoost}
        />
      </main>
      {/* Footer */}
      <footer className="bg-forest text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="font-body">
            &copy; {new Date()?.getFullYear()} EcoQuest. Empowering environmental heroes worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MissionControlDashboard;
