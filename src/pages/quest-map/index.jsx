import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import MapControls from './components/MapControls';
import MissionMarker from './components/MissionMarker';
import MissionDetailModal from './components/MissionDetailModal';
import WeatherWidget from './components/WeatherWidget';
import FriendsActivity from './components/FriendsActivity';
import MissionCreatorModal from './components/MissionCreatorModal';

const QuestMap = () => {
  const [mapView, setMapView] = useState('illustrated');
  const [radiusFilter, setRadiusFilter] = useState(5);
  const [showWeather, setShowWeather] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [missions, setMissions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);

  // Mock data for missions
  const mockMissions = [
    {
      id: 1,
      title: "Central Park Cleanup Initiative",
      type: "cleanup",
      difficulty: "beginner",
      location: "Central Park, NYC",
      coordinates: { lat: 25, lng: 30 },
      date: "2025-01-20",
      duration: "3 hours",
      participantCount: 12,
      maxParticipants: 25,
      points: 150,
      ngoPartner: 'NYC Parks Foundation',
      description: `Become a guardian of Central Park! Join our community cleanup to remove litter, sort recyclables, and restore the beauty of our city's green heart. This mission is perfect for all ages and makes an immediate, visible impact.`,
      requirements: ["Gloves", "Water bottle", "Comfortable shoes", "Sun protection"],
      impactMetrics: [
        { label: "Waste Collected", value: "200 lbs" },
        { label: "Area Covered", value: "5 acres" },
        { label: "Recyclables", value: "50 lbs" },
        { label: "Volunteers", value: "25" }
      ],
      beforeAfterPhotos: [
        {
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
          caption: "Before cleanup - littered pathway",
          type: "Before"
        },
        {
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
          caption: "After cleanup - pristine park area",
          type: "After"
        },
        {
          url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400",
          caption: "Volunteers in action",
          type: "During"
        },
        {
          url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
          caption: "Collected waste ready for sorting",
          type: "Results"
        }
      ],
      participants: [
        { name: "Sarah Johnson", level: 8, completedMissions: 23, isTeamLeader: true },
        { name: "Mike Chen", level: 5, completedMissions: 12, isTeamLeader: false },
        { name: "Emma Rodriguez", level: 12, completedMissions: 45, isTeamLeader: false },
        { name: "David Kim", level: 3, completedMissions: 7, isTeamLeader: false }
      ]
    },
    {
      id: 2,
      title: "Urban Biodiversity Survey",
      type: "biodiversity",
      difficulty: "intermediate",
      location: "Brooklyn Bridge Park",
      coordinates: { lat: 45, lng: 60 },
      date: "2025-01-22",
      duration: "4 hours",
      participantCount: 8,
      maxParticipants: 15,
      points: 250,
      ngoPartner: "Brooklyn Bridge Park Conservancy",
      description: `Grab your field notebook and join a vital biodiversity survey. You'll help document the unique plant and animal species in Brooklyn Bridge Park, contributing critical data to local conservation science. A great way to connect with nature in the city.`,
      requirements: ["Field notebook", "Camera/smartphone", "Magnifying glass", "Comfortable walking shoes"],
      impactMetrics: [
        { label: "Species Documented", value: "75+" },
        { label: "Data Points", value: "200+" },
        { label: "Area Surveyed", value: "3 acres" },
        { label: "Photos Taken", value: "150+" }
      ],
      beforeAfterPhotos: [
        {
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
          caption: "Survey area overview",
          type: "Location"
        },
        {
          url: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400",
          caption: "Native plant species found",
          type: "Discovery"
        }
      ],
      participants: [
        { name: "Dr. Lisa Park", level: 15, completedMissions: 67, isTeamLeader: true },
        { name: "Alex Thompson", level: 9, completedMissions: 28, isTeamLeader: false },
        { name: "Maria Santos", level: 6, completedMissions: 15, isTeamLeader: false }
      ]
    },
    {
      id: 3,
      title: "Community Tree Planting",
      type: "conservation",
      difficulty: "beginner",
      location: "Prospect Park",
      coordinates: { lat: 70, lng: 20 },
      date: "2025-01-25",
      duration: "5 hours",
      participantCount: 18,
      maxParticipants: 30,
      points: 300,
      ngoPartner: "Trees New York",
      description: `Roll up your sleeves and help grow our urban forest. We're planting 50 native trees in Prospect Park to improve air quality, create habitats, and beautify our community. No experience needed—just a passion for a greener city.`,
      requirements: ["Work gloves", "Sturdy shoes", "Water bottle", "Lunch", "Weather-appropriate clothing"],
      impactMetrics: [
        { label: "Trees Planted", value: "50" },
        { label: "CO2 Offset", value: "2 tons/year" },
        { label: "Area Restored", value: "2 acres" },
        { label: "Volunteers", value: "30" }
      ],
      beforeAfterPhotos: [
        {
          url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
          caption: "Planting site preparation",
          type: "Before"
        },
        {
          url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
          caption: "Newly planted saplings",
          type: "After"
        }
      ],
      participants: [
        { name: "Carlos Martinez", level: 11, completedMissions: 38, isTeamLeader: true },
        { name: "Jennifer Wu", level: 7, completedMissions: 19, isTeamLeader: false },
        { name: "Robert Taylor", level: 4, completedMissions: 9, isTeamLeader: false }
      ]
    },
    {
      id: 4,
      title: "Water Quality Testing",
      type: "monitoring",
      difficulty: "intermediate",
      location: "East River",
      coordinates: { lat: 35, lng: 80 },
      date: "2025-01-28",
      duration: "2.5 hours",
      participantCount: 5,
      maxParticipants: 10,
      points: 220,
      ngoPartner: "Riverkeeper",
      description: `Become a citizen scientist and help monitor the health of the East River. You'll learn how to test water samples for key indicators like pH, turbidity, and dissolved oxygen, providing valuable data to protect our waterways.`,
      requirements: ["Willingness to learn", "Closed-toe shoes", "Provided safety gear"],
      impactMetrics: [
        { label: "Samples Collected", value: "30" },
        { label: "River Stretch Covered", value: "1 mile" },
        { label: "Data Points Logged", value: "90" }
      ],
      beforeAfterPhotos: [
        {
          url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400",
          caption: "Team collecting water samples.",
          type: "During"
        }
      ],
      participants: [
        { name: "Dr. Alan Grant", level: 14, completedMissions: 55, isTeamLeader: true },
        { name: "Ellie Sattler", level: 13, completedMissions: 52, isTeamLeader: false }
      ]
    }
  ];

  // Mock completed missions
  const mockCompletedMissions = [
    {
      id: 101,
      title: "Hudson River Cleanup",
      type: "cleanup",
      coordinates: { lat: 15, lng: 75 },
      completedDate: "2025-01-10",
      impactAchieved: "150 lbs waste collected"
    },
    {
      id: 102,
      title: "Pollinator Garden Creation",
      type: "conservation",
      coordinates: { lat: 85, lng: 45 },
      completedDate: "2025-01-05",
      impactAchieved: "25 native plants installed"
    }
  ];

  // Mock weather data
  const weatherData = {
    temperature: 72,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 8,
    uvIndex: 6,
    airQuality: 'Good'
  };

  // Mock friends activity
  const friendsActivity = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      level: 8,
      activity: "active_mission",
      currentMission: "Beach Cleanup",
      location: "2.1 miles away",
      lastActive: "Now",
      isOnline: true,
      missionProgress: 65
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      level: 12,
      activity: "completed_mission",
      lastMission: "Tree Planting",
      location: "1.5 miles away",
      lastActive: "5 min ago",
      isOnline: true,
      missionProgress: null
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      level: 6,
      activity: "planning",
      plannedMission: "River Monitoring",
      location: "3.2 miles away",
      lastActive: "15 min ago",
      isOnline: false,
      missionProgress: null
    }
  ];

  useEffect(() => {
    setMissions(mockMissions);
    setCompletedMissions(mockCompletedMissions);
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setIsDetailModalOpen(true);
  };

  const handleJoinMission = (mission) => {
    console.log('Joining mission:', mission?.title);
    setIsDetailModalOpen(false);
    // Add mission joining logic here
  };

  const handleLocationCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        }
      );
    }
  };

  const handleCreateMission = (missionData) => {
    const newMission = {
      ...missionData,
      id: Date.now(),
      participantCount: 0,
      participants: [],
      beforeAfterPhotos: [],
      impactMetrics: missionData?.impactGoals?.map(goal => ({
        label: goal?.label,
        value: goal?.value
      }))
    };
    setMissions(prev => [...prev, newMission]);
    setIsCreatorModalOpen(false);
  };

  const handleViewFriend = (friend) => {
    console.log('Viewing friend profile:', friend?.name);
  };

  const handleJoinFriend = (friend) => {
    console.log('Joining friend mission:', friend?.currentMission);
  };

  const filteredMissions = missions?.filter(mission => {
    // Simple distance filter simulation
    return true; // In real app, calculate actual distance
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/mission-control-dashboard" className="flex items-center space-x-2 text-text-secondary hover:text-forest organic-transition">
                <Icon name="ArrowLeft" size={20} />
                <span className="font-body">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <h1 className="text-xl font-headline font-bold text-forest">Quest Map</h1>
                <p className="text-sm text-text-secondary">Discover environmental missions near you</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-text-secondary">
                <span className="font-medium text-forest">{filteredMissions?.length}</span> missions found
              </div>
              <div className="text-sm text-text-secondary">
                <span className="font-medium text-achievement">{completedMissions?.length}</span> completed
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-[calc(100vh-64px)] overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0">
          {mapView === 'satellite' ? (
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Environmental Mission Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${userLocation?.lat},${userLocation?.lng}&z=12&output=embed`}
              className="border-0"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-green-50 relative overflow-hidden">
              {/* Illustrated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 1000" className="w-full h-full">
                  {/* Rivers */}
                  <path
                    d="M100 200 Q300 250 500 200 T900 250"
                    stroke="#1B4B73"
                    strokeWidth="8"
                    fill="none"
                    className="opacity-60"
                  />
                  {/* Parks */}
                  <circle cx="250" cy="300" r="80" fill="#2D5A27" className="opacity-40" />
                  <circle cx="750" cy="400" r="60" fill="#2D5A27" className="opacity-40" />
                  <circle cx="400" cy="600" r="100" fill="#2D5A27" className="opacity-40" />
                  {/* Urban areas */}
                  <rect x="500" y="100" width="200" height="150" fill="#E5E7EB" className="opacity-30" />
                  <rect x="200" y="500" width="150" height="200" fill="#E5E7EB" className="opacity-30" />
                </svg>
              </div>

              {/* Nature-inspired decorative elements */}
              <div className="absolute top-10 left-10 text-forest/20">
                <Icon name="TreePine" size={48} />
              </div>
              <div className="absolute top-20 right-20 text-ocean/20">
                <Icon name="Waves" size={40} />
              </div>
              <div className="absolute bottom-20 left-20 text-achievement/20">
                <Icon name="Sun" size={44} />
              </div>
              <div className="absolute bottom-10 right-10 text-forest/20">
                <Icon name="Leaf" size={36} />
              </div>
            </div>
          )}
        </div>

        {/* Mission Markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {/* Active Missions */}
            {filteredMissions?.map((mission) => (
              <MissionMarker
                key={mission?.id}
                mission={mission}
                onClick={handleMissionClick}
                isCompleted={false}
              />
            ))}

            {/* Completed Missions */}
            {completedMissions?.map((mission) => (
              <MissionMarker
                key={`completed-${mission?.id}`}
                mission={mission}
                onClick={handleMissionClick}
                isCompleted={true}
              />
            ))}

            {/* User Location Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: '50%', top: '50%' }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-eco-md">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <MapControls
          mapView={mapView}
          onMapViewChange={setMapView}
          radiusFilter={radiusFilter}
          onRadiusFilterChange={setRadiusFilter}
          showWeather={showWeather}
          onWeatherToggle={() => setShowWeather(!showWeather)}
          onLocationCenter={handleLocationCenter}
          isCreatorMode={isCreatorMode}
          onCreatorModeToggle={() => {
            setIsCreatorMode(!isCreatorMode);
            if (!isCreatorMode) {
              setIsCreatorModalOpen(true);
            }
          }}
        />

        {/* Weather Widget */}
        <WeatherWidget
          weatherData={weatherData}
          isVisible={showWeather}
        />

        {/* Friends Activity */}
        <FriendsActivity
          friends={friendsActivity}
          onViewFriend={handleViewFriend}
          onJoinFriend={handleJoinFriend}
        />

        {/* Mission Stats Overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-accent text-forest mb-1">
                  {filteredMissions?.length}
                </div>
                <div className="text-xs text-text-secondary font-body">
                  Active Missions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-accent text-achievement mb-1">
                  {completedMissions?.length}
                </div>
                <div className="text-xs text-text-secondary font-body">
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-accent text-ocean mb-1">
                  {friendsActivity?.filter(f => f?.isOnline)?.length}
                </div>
                <div className="text-xs text-text-secondary font-body">
                  Friends Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mission Detail Modal */}
      <MissionDetailModal
        mission={selectedMission}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onJoinMission={handleJoinMission}
      />
      {/* Mission Creator Modal */}
      <MissionCreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => {
          setIsCreatorModalOpen(false);
          setIsCreatorMode(false);
        }}
        onCreateMission={handleCreateMission}
        userLocation={userLocation}
      />
    </div>
  );
};

export default QuestMap;