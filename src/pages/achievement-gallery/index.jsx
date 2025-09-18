import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import BadgeCard from './components/BadgeCard';
import MissionHistoryCard from './components/MissionHistoryCard';
import CommunitySpotlight from './components/CommunitySpotlight';
import ImpactPortfolio from './components/ImpactPortfolio';
import SocialShareModal from './components/SocialShareModal';

const AchievementGallery = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareAchievement, setShareAchievement] = useState(null);

  // Mock data for badges
  const badgeCategories = [
    { id: 'all', name: 'All Badges', icon: 'Grid3x3' },
    { id: 'learning', name: 'Learning', icon: 'BookOpen' },
    { id: 'missions', name: 'Missions', icon: 'Target' },
    { id: 'community', name: 'Community', icon: 'Users' },
    { id: 'leadership', name: 'Leadership', icon: 'Crown' },
    { id: 'special', name: 'Special', icon: 'Star' }
  ];

  const badges = [
    {
      id: 1,
      name: "Eco Warrior",
      description: "Complete 10 environmental missions",
      icon: "Shield",
      rarity: "epic",
      points: 500,
      category: "missions",
      isUnlocked: true,
      unlockedDate: "Dec 15, 2024",
      progress: 100
    },
    {
      id: 2,
      name: "Knowledge Seeker",
      description: "Complete 25 learning modules",
      icon: "BookOpen",
      rarity: "rare",
      points: 300,
      category: "learning",
      isUnlocked: true,
      unlockedDate: "Dec 10, 2024",
      progress: 100
    },
    {
      id: 3,
      name: "Community Champion",
      description: "Help 50 fellow eco-heroes",
      icon: "Users",
      rarity: "legendary",
      points: 1000,
      category: "community",
      isUnlocked: false,
      requirement: "Help 32 more users",
      progress: 64
    },
    {
      id: 4,
      name: "Mission Leader",
      description: "Lead 5 community missions",
      icon: "Crown",
      rarity: "epic",
      points: 750,
      category: "leadership",
      isUnlocked: true,
      unlockedDate: "Dec 8, 2024",
      progress: 100
    },
    {
      id: 5,
      name: "Green Thumb",
      description: "Plant 100 trees",
      icon: "TreePine",
      rarity: "rare",
      points: 400,
      category: "missions",
      isUnlocked: false,
      requirement: "Plant 23 more trees",
      progress: 77
    },
    {
      id: 6,
      name: "Quiz Master",
      description: "Achieve 100% on 20 quizzes",
      icon: "Brain",
      rarity: "common",
      points: 200,
      category: "learning",
      isUnlocked: true,
      unlockedDate: "Dec 5, 2024",
      progress: 100
    }
  ];

  // Mock data for mission history
  const missionHistory = [
    {
      id: 1,
      title: "Beach Cleanup Initiative",
      description: "Organized community beach cleanup removing plastic waste and debris from coastal areas.",
      location: "Santa Monica Beach",
      status: "completed",
      difficulty: "intermediate",
      participants: 24,
      impact: "150 lbs waste",
      points: 250,
      completedDate: "Dec 12, 2024",
      duration: "4 hours",
      images: ["https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400"],
      reflection: "Amazing to see how much impact we can make when working together. The beach looked completely transformed!"
    },
    {
      id: 2,
      title: "Urban Tree Planting",
      description: "Community tree planting event to increase urban canopy coverage and improve air quality.",
      location: "Central Park",
      status: "completed",
      difficulty: "beginner",
      participants: 18,
      impact: "35 trees planted",
      points: 180,
      completedDate: "Dec 8, 2024",
      duration: "3 hours",
      images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"],
      reflection: "Each tree we planted today will provide oxygen for decades to come. Such a rewarding experience!"
    },
    {
      id: 3,
      title: "Wildlife Habitat Restoration",
      description: "Restored native plant species in local wildlife habitat to support biodiversity.",
      location: "Griffith Park",
      status: "completed",
      difficulty: "advanced",
      participants: 12,
      impact: "2 acres restored",
      points: 320,
      completedDate: "Dec 3, 2024",
      duration: "6 hours",
      images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"],
      reflection: "Learning about native species and their importance to local ecosystems was incredibly educational."
    }
  ];

  // Mock data for community spotlight
  const communitySpotlight = {
    period: "December 2024",
    user: {
      name: "Sarah Chen",
      title: "Environmental Science Student",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      badges: 47,
      missions: 89
    },
    achievement: "Sarah led the largest community cleanup event in EcoQuest history, organizing 150+ volunteers to remove over 2,000 pounds of waste from local waterways. Her innovative approach to volunteer coordination and waste sorting has become a model for future events.",
    metrics: [
      { icon: "Users", value: "150+", label: "Volunteers Led" },
      { icon: "Trash2", value: "2,000", label: "Pounds Removed" },
      { icon: "MapPin", value: "5", label: "Locations Cleaned" }
    ],
    quote: "EcoQuest has shown me that environmental action isn't just about individual choices—it's about building communities of people who care. Together, we can create the change our planet needs."
  };

  // Mock data for impact portfolio
  const portfolioData = {
    summary: [
      { icon: "Target", value: "47", label: "Missions Completed" },
      { icon: "Award", value: "23", label: "Badges Earned" },
      { icon: "Users", value: "156", label: "People Helped" },
      { icon: "Leaf", value: "2.4k", label: "lbs CO₂ Saved" }
    ],
    keyAchievements: [
      {
        icon: "Crown",
        title: "Mission Leadership Excellence",
        description: "Led 8 community missions with 95% participant satisfaction",
        date: "Dec 2024"
      },
      {
        icon: "TreePine",
        title: "Reforestation Champion",
        description: "Contributed to planting 127 trees across 5 locations",
        date: "Nov 2024"
      },
      {
        icon: "Recycle",
        title: "Waste Reduction Hero",
        description: "Organized cleanup events removing 850+ lbs of waste",
        date: "Oct 2024"
      }
    ],
    missions: [
      {
        title: "Coastal Conservation Project",
        description: "Multi-week initiative to protect marine ecosystems",
        date: "Dec 2024",
        impact: "500 lbs waste removed"
      },
      {
        title: "Urban Biodiversity Survey",
        description: "Citizen science project documenting local wildlife",
        date: "Nov 2024",
        impact: "200+ species cataloged"
      }
    ],
    learning: [
      {
        title: "Climate Science Fundamentals",
        description: "Comprehensive course on climate change mechanisms",
        progress: 100,
        startDate: "Oct 2024",
        completedDate: "Nov 2024"
      },
      {
        title: "Sustainable Living Practices",
        description: "Practical guide to reducing environmental footprint",
        progress: 85,
        startDate: "Nov 2024"
      }
    ],
    community: [
      {
        icon: "MessageCircle",
        title: "Peer Mentorship",
        description: "Guided 25 new users through their first missions",
        date: "Dec 2024",
        impact: "25 users helped"
      },
      {
        icon: "Share2",
        title: "Content Creation",
        description: "Created educational content viewed 1,000+ times",
        date: "Nov 2024",
        impact: "1,200 views"
      }
    ]
  };

  const tabs = [
    { id: 'badges', name: 'Badge Collection', icon: 'Award' },
    { id: 'missions', name: 'Mission History', icon: 'Target' },
    { id: 'portfolio', name: 'Impact Portfolio', icon: 'BarChart3' },
    { id: 'community', name: 'Community Recognition', icon: 'Star' }
  ];

  // Filter badges based on category and search
  const filteredBadges = badges?.filter(badge => {
    const matchesCategory = selectedCategory === 'all' || badge?.category === selectedCategory;
    const matchesSearch = badge?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         badge?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle badge click
  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
  };

  // Handle share
  const handleShare = (achievement) => {
    setShareAchievement(achievement);
    setIsShareModalOpen(true);
  };

  // Get user stats
  const userStats = {
    totalBadges: badges?.filter(b => b?.isUnlocked)?.length,
    totalPoints: badges?.filter(b => b?.isUnlocked)?.reduce((sum, b) => sum + b?.points, 0),
    completedMissions: missionHistory?.length,
    impactMetric: "2,400 lbs CO₂ saved"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest/10 to-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-headline font-bold text-gradient-forest mb-2">
                Achievement Gallery
              </h1>
              <p className="text-text-secondary font-body text-lg">
                Celebrate your environmental journey and showcase your impact
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-forest font-headline">
                  {userStats?.totalBadges}
                </p>
                <p className="text-sm text-text-secondary font-body">Badges Earned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-achievement font-headline">
                  {userStats?.totalPoints?.toLocaleString()}
                </p>
                <p className="text-sm text-text-secondary font-body">Total Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success font-headline">
                  {userStats?.completedMissions}
                </p>
                <p className="text-sm text-text-secondary font-body">Missions</p>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden mt-6 grid grid-cols-3 gap-4">
            <div className="text-center bg-white rounded-eco-md p-3">
              <p className="text-xl font-bold text-forest font-headline">
                {userStats?.totalBadges}
              </p>
              <p className="text-xs text-text-secondary font-body">Badges</p>
            </div>
            <div className="text-center bg-white rounded-eco-md p-3">
              <p className="text-xl font-bold text-achievement font-headline">
                {userStats?.totalPoints?.toLocaleString()}
              </p>
              <p className="text-xs text-text-secondary font-body">Points</p>
            </div>
            <div className="text-center bg-white rounded-eco-md p-3">
              <p className="text-xl font-bold text-success font-headline">
                {userStats?.completedMissions}
              </p>
              <p className="text-xs text-text-secondary font-body">Missions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium whitespace-nowrap organic-transition ${
                  activeTab === tab?.id
                    ? 'border-forest text-forest'
                    : 'border-transparent text-text-secondary hover:text-forest hover:border-forest/50'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Badge Collection Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {badgeCategories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-eco-sm font-medium organic-transition ${
                      selectedCategory === category?.id
                        ? 'bg-forest text-white'
                        : 'bg-white text-text-secondary hover:text-forest hover:bg-forest-gradient/30 border border-border'
                    }`}
                  >
                    <Icon name={category?.icon} size={16} />
                    <span className="text-sm">{category?.name}</span>
                  </button>
                ))}
              </div>
              <div className="w-full sm:w-64">
                <Input
                  type="search"
                  placeholder="Search badges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredBadges?.map((badge) => (
                <BadgeCard
                  key={badge?.id}
                  badge={badge}
                  isUnlocked={badge?.isUnlocked}
                  onClick={handleBadgeClick}
                />
              ))}
            </div>

            {filteredBadges?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} color="var(--color-text-secondary)" />
                <h3 className="font-headline font-semibold text-text-primary text-lg mt-4 mb-2">
                  No badges found
                </h3>
                <p className="text-text-secondary font-body">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mission History Tab */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-text-primary text-xl">
                Mission Timeline
              </h2>
              <Button variant="outline" iconName="Filter" iconPosition="left">
                Filter Missions
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionHistory?.map((mission) => (
                <MissionHistoryCard
                  key={mission?.id}
                  mission={mission}
                  onClick={(mission) => console.log('View mission:', mission)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Impact Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <ImpactPortfolio portfolioData={portfolioData} />
          </div>
        )}

        {/* Community Recognition Tab */}
        {activeTab === 'community' && (
          <div className="space-y-8">
            <CommunitySpotlight spotlight={communitySpotlight} />
            
            {/* Additional Recognition Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Achievements */}
              <div className="bg-white rounded-eco-lg p-6 border border-border">
                <h3 className="font-headline font-bold text-text-primary text-lg mb-4">
                  Monthly Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Top Mission Leader", date: "December 2024", icon: "Crown" },
                    { title: "Community Helper", date: "November 2024", icon: "Heart" },
                    { title: "Learning Champion", date: "October 2024", icon: "BookOpen" }
                  ]?.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-forest-gradient/10 rounded-eco-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center">
                        <Icon name={achievement?.icon} size={16} color="white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-headline font-medium text-text-primary">
                          {achievement?.title}
                        </h4>
                        <p className="text-sm text-text-secondary font-body">
                          {achievement?.date}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        iconName="Share2"
                        onClick={() => handleShare(achievement)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Peer Recognition */}
              <div className="bg-white rounded-eco-lg p-6 border border-border">
                <h3 className="font-headline font-bold text-text-primary text-lg mb-4">
                  Peer Recognition
                </h3>
                <div className="space-y-3">
                  {[
                    { from: "Alex Rodriguez", message: "Amazing leadership during the beach cleanup!", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
                    { from: "Maria Santos", message: "Your environmental tips helped me reduce my carbon footprint!", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
                    { from: "David Kim", message: "Thanks for mentoring me through my first mission!", avatar: "https://randomuser.me/api/portraits/men/33.jpg" }
                  ]?.map((recognition, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-ocean-gradient/10 rounded-eco-md">
                      <img
                        src={recognition?.avatar}
                        alt={recognition?.from}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-headline font-medium text-text-primary text-sm">
                          {recognition?.from}
                        </h4>
                        <p className="text-sm text-text-secondary font-body">
                          "{recognition?.message}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-br from-forest/5 to-primary/5 rounded-eco-lg p-6 border border-border">
          <div className="text-center mb-6">
            <h2 className="font-headline font-bold text-text-primary text-xl mb-2">
              Ready for Your Next Achievement?
            </h2>
            <p className="text-text-secondary font-body">
              Continue your environmental journey and unlock new badges
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quest-map">
              <Button variant="default" iconName="Map" iconPosition="left" className="w-full sm:w-auto">
                Discover New Missions
              </Button>
            </Link>
            <Link to="/learning-arena">
              <Button variant="outline" iconName="BookOpen" iconPosition="left" className="w-full sm:w-auto">
                Continue Learning
              </Button>
            </Link>
            <Link to="/community-impact-hub">
              <Button variant="secondary" iconName="Users" iconPosition="left" className="w-full sm:w-auto">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Social Share Modal */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        achievement={shareAchievement}
      />
    </div>
  );
};

export default AchievementGallery;