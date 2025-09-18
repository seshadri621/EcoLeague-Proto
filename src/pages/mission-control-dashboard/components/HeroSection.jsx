import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ user, onStartQuest }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeHotspots, setActiveHotspots] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Mock active hotspots data
    setActiveHotspots([
      { id: 1, lat: 40.7128, lng: -74.0060, city: "New York", missions: 12, type: "cleanup" },
      { id: 2, lat: 34.0522, lng: -118.2437, city: "Los Angeles", missions: 8, type: "planting" },
      { id: 3, lat: 41.8781, lng: -87.6298, city: "Chicago", missions: 15, type: "monitoring" },
      { id: 4, lat: 29.7604, lng: -95.3698, city: "Houston", missions: 6, type: "cleanup" },
      { id: 5, lat: 39.9526, lng: -75.1652, city: "Philadelphia", missions: 9, type: "education" }
    ]);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getHotspotIcon = (type) => {
    switch (type) {
      case 'cleanup': return 'Trash2';
      case 'planting': return 'TreePine';
      case 'monitoring': return 'Eye';
      case 'education': return 'BookOpen';
      default: return 'MapPin';
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-forest/5 via-white to-ocean/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-forest rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-ocean rounded-full blur-3xl"></div>
      </div>
      <div className="relative px-4 lg:px-6 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Welcome Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-text-secondary font-body">
                  {getGreeting()}, Environmental Hero
                </p>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-headline font-bold text-gradient-forest">
                  Welcome to Your Mission Control
                </h1>
                <p className="text-lg text-text-secondary font-body leading-relaxed">
                  Your personalized command center for environmental impact. Track your progress, discover new quests, and connect with fellow eco-heroes making a difference worldwide.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-eco-md shadow-eco-sm border border-border">
                  <div className="w-8 h-8 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Target" size={16} color="white" />
                  </div>
                  <p className="text-2xl font-headline font-bold text-forest">
                    {user?.completedMissions || 127}
                  </p>
                  <p className="text-xs text-text-secondary font-body">Missions</p>
                </div>
                <div className="text-center p-4 bg-white rounded-eco-md shadow-eco-sm border border-border">
                  <div className="w-8 h-8 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Zap" size={16} color="white" />
                  </div>
                  <p className="text-2xl font-headline font-bold text-achievement">
                    {user?.totalXP || 2847}
                  </p>
                  <p className="text-xs text-text-secondary font-body">XP Points</p>
                </div>
                <div className="text-center p-4 bg-white rounded-eco-md shadow-eco-sm border border-border">
                  <div className="w-8 h-8 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Users" size={16} color="white" />
                  </div>
                  <p className="text-2xl font-headline font-bold text-success">
                    {user?.rank || 5}
                  </p>
                  <p className="text-xs text-text-secondary font-body">Global Rank</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Play" 
                  iconPosition="left"
                  onClick={onStartQuest}
                  className="quest-button"
                >
                  Start New Quest
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Map" 
                  iconPosition="left"
                  asChild
                >
                  <Link to="/quest-map">Explore Map</Link>
                </Button>
              </div>
            </div>

            {/* Interactive World Map */}
            <div className="relative">
              <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-semibold text-forest">Live Mission Activity</h3>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="font-body">Live</span>
                  </div>
                </div>

                {/* Map Container */}
                <div className="relative h-64 lg:h-80 bg-gradient-to-br from-sky/20 to-ocean/20 rounded-eco-md overflow-hidden">
                  {/* World Map Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=400&fit=crop&crop=center"
                      alt="World Map"
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>

                  {/* Active Hotspots */}
                  {activeHotspots?.map((hotspot, index) => (
                    <div
                      key={hotspot?.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                    >
                      {/* Pulsing Hotspot */}
                      <div className="relative">
                        <div className="w-4 h-4 bg-achievement rounded-full mission-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-achievement/30 rounded-full animate-ping"></div>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible organic-transition">
                        <div className="bg-gray-900 text-white text-xs rounded-eco-sm px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Icon name={getHotspotIcon(hotspot?.type)} size={12} />
                            <span className="font-body font-medium">{hotspot?.city}</span>
                          </div>
                          <p className="text-gray-300">{hotspot?.missions} active missions</p>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-eco-sm p-3 space-y-2">
                    <h4 className="text-xs font-headline font-semibold text-forest">Mission Types</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 bg-achievement rounded-full"></div>
                        <span className="font-body text-text-secondary">Active Missions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Icon name="Trash2" size={10} className="text-text-secondary" />
                        <span className="font-body text-text-secondary">Cleanup</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Icon name="TreePine" size={10} className="text-text-secondary" />
                        <span className="font-body text-text-secondary">Planting</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Actions */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-text-secondary font-body">
                    <span className="font-semibold text-achievement">{activeHotspots?.length}</span> active mission zones
                  </p>
                  <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right" asChild>
                    <Link to="/quest-map">View Full Map</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;