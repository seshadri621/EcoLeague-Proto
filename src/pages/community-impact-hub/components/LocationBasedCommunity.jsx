import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LocationBasedCommunity = () => {
  const [selectedLocation, setSelectedLocation] = useState('nearby');
  const [viewMode, setViewMode] = useState('list');

  const nearbyGroups = [
    {
      id: 1,
      name: "San Francisco Bay Area Eco Warriors",
      location: "San Francisco, CA",
      distance: "2.3 miles",
      members: 247,
      activeMissions: 8,
      description: "Dedicated to protecting the SF Bay ecosystem through cleanup initiatives and wildlife conservation.",
      image: "https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?w=400",
      recentActivity: "Beach cleanup at Ocean Beach - 45 participants",
      nextEvent: {
        title: "Golden Gate Park Tree Planting",
        date: "2024-09-20",
        time: "10:00 AM"
      },
      tags: ["Beach Cleanup", "Wildlife Protection", "Urban Forestry"],
      coordinator: {
        name: "Sarah Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      }
    },
    {
      id: 2,
      name: "Peninsula Climate Action Network",
      location: "Palo Alto, CA",
      distance: "8.7 miles",
      members: 156,
      activeMissions: 5,
      description: "Focused on climate education and renewable energy advocacy in the Peninsula region.",
      image: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=400",
      recentActivity: "Solar panel workshop - 32 attendees",
      nextEvent: {
        title: "Climate Policy Town Hall",
        date: "2024-09-22",
        time: "7:00 PM"
      },
      tags: ["Climate Action", "Renewable Energy", "Policy Advocacy"],
      coordinator: {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      }
    },
    {
      id: 3,
      name: "East Bay Biodiversity Guardians",
      location: "Oakland, CA",
      distance: "12.1 miles",
      members: 89,
      activeMissions: 3,
      description: "Protecting native species and restoring natural habitats in the East Bay hills and wetlands.",
      image: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?w=400",
      recentActivity: "Native plant restoration - 28 volunteers",
      nextEvent: {
        title: "Bird Migration Monitoring",
        date: "2024-09-25",
        time: "6:00 AM"
      },
      tags: ["Biodiversity", "Habitat Restoration", "Wildlife Monitoring"],
      coordinator: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      }
    }
  ];

  const environmentalAdvocates = [
    {
      id: 1,
      name: "Marcus Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      level: "Climate Champion",
      location: "San Francisco, CA",
      distance: "1.8 miles",
      specialties: ["Carbon Footprint", "Renewable Energy", "Policy Advocacy"],
      completedMissions: 67,
      impact: "2,400 lbs CO2 reduced",
      bio: "Environmental engineer passionate about clean energy solutions and climate policy.",
      availability: "Weekends",
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Jennifer Walsh",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      level: "Waste Warrior",
      location: "Berkeley, CA",
      distance: "9.2 miles",
      specialties: ["Zero Waste", "Recycling", "Community Education"],
      completedMissions: 43,
      impact: "1,800 lbs waste diverted",
      bio: "Zero waste lifestyle advocate helping communities reduce their environmental footprint.",
      availability: "Evenings",
      languages: ["English"]
    },
    {
      id: 3,
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      level: "Urban Forester",
      location: "Palo Alto, CA",
      distance: "7.5 miles",
      specialties: ["Tree Planting", "Urban Ecology", "Air Quality"],
      completedMissions: 89,
      impact: "340 trees planted",
      bio: "Urban planning student focused on green infrastructure and sustainable city development.",
      availability: "Flexible",
      languages: ["English", "Korean"]
    }
  ];

  const locationOptions = [
    { key: 'nearby', label: 'Nearby (15 miles)', icon: 'MapPin' },
    { key: 'city', label: 'San Francisco', icon: 'Building' },
    { key: 'region', label: 'Bay Area', icon: 'Globe' },
    { key: 'state', label: 'California', icon: 'Map' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Location Filter */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-headline font-bold text-text-primary">Local Environmental Community</h2>
            <p className="text-text-secondary font-body">Connect with nearby eco-advocates and action groups</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Location Filter */}
            <div className="flex items-center space-x-2">
              {locationOptions?.map((option) => (
                <button
                  key={option?.key}
                  onClick={() => setSelectedLocation(option?.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition font-body font-medium ${
                    selectedLocation === option?.key
                      ? 'bg-forest-gradient text-forest border border-forest/20'
                      : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
                  }`}
                >
                  <Icon name={option?.icon} size={14} />
                  <span className="hidden sm:inline">{option?.label}</span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-surface rounded-eco-sm p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-eco-sm organic-transition ${
                  viewMode === 'list' ? 'bg-white shadow-eco-sm' : 'text-text-secondary hover:text-forest'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-eco-sm organic-transition ${
                  viewMode === 'map' ? 'bg-white shadow-eco-sm' : 'text-text-secondary hover:text-forest'
                }`}
              >
                <Icon name="Map" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {viewMode === 'map' ? (
        /* Map View */
        (<div className="bg-white rounded-eco-lg shadow-eco-sm border border-border overflow-hidden">
          <div className="h-96 bg-surface flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Environmental Groups Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=37.7749,-122.4194&z=11&output=embed"
              className="border-0"
            />
          </div>
          <div className="p-4 border-t border-border">
            <p className="text-sm text-text-secondary font-body text-center">
              Interactive map showing nearby environmental groups and advocates
            </p>
          </div>
        </div>)
      ) : (
        /* List View */
        (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Environmental Groups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-headline font-semibold text-text-primary">Local Action Groups</h3>
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                Create Group
              </Button>
            </div>

            {nearbyGroups?.map((group) => (
              <div key={group?.id} className="bg-white rounded-eco-lg shadow-eco-sm border border-border overflow-hidden env-card-hover">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={group?.image}
                    alt={group?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-eco-sm text-xs font-body text-text-primary">
                    {group?.distance}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-headline font-semibold text-text-primary mb-1">{group?.name}</h4>
                      <div className="flex items-center space-x-1 text-sm text-text-secondary font-body mb-2">
                        <Icon name="MapPin" size={14} />
                        <span>{group?.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary font-body mb-3 leading-relaxed">
                    {group?.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary font-body">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{group?.members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={14} />
                        <span>{group?.activeMissions} active missions</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {group?.tags?.slice(0, 2)?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-forest-gradient/20 text-forest text-xs rounded-eco-sm font-body">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Next Event */}
                  <div className="p-3 bg-achievement-gradient/10 rounded-eco-md mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Calendar" size={14} className="text-achievement" />
                      <span className="text-sm font-body font-medium text-achievement">Next Event</span>
                    </div>
                    <p className="text-sm font-body text-text-primary">{group?.nextEvent?.title}</p>
                    <p className="text-xs text-text-secondary font-body">
                      {formatDate(group?.nextEvent?.date)} at {group?.nextEvent?.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={group?.coordinator?.avatar}
                        alt={group?.coordinator?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-text-secondary font-body">{group?.coordinator?.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Join Group
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Individual Advocates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-headline font-semibold text-text-primary">Environmental Advocates</h3>
              <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
                Connect
              </Button>
            </div>

            {environmentalAdvocates?.map((advocate) => (
              <div key={advocate?.id} className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-4 env-card-hover">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={advocate?.avatar}
                      alt={advocate?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={12} color="white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-headline font-semibold text-text-primary">{advocate?.name}</h4>
                        <p className="text-sm text-text-secondary font-body">{advocate?.level}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Icon name="MapPin" size={12} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary font-body">{advocate?.location}</span>
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary font-body">{advocate?.distance}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <p className="text-sm text-text-secondary font-body mb-3 leading-relaxed">
                      {advocate?.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {advocate?.specialties?.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-ocean-gradient/20 text-ocean text-xs rounded-eco-sm font-body">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                      <div>
                        <p className="text-sm font-headline font-bold text-forest">{advocate?.completedMissions}</p>
                        <p className="text-xs text-text-secondary font-body">Missions</p>
                      </div>
                      <div>
                        <p className="text-sm font-headline font-bold text-achievement">{advocate?.impact}</p>
                        <p className="text-xs text-text-secondary font-body">Impact</p>
                      </div>
                      <div>
                        <p className="text-sm font-headline font-bold text-ocean">{advocate?.availability}</p>
                        <p className="text-xs text-text-secondary font-body">Available</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center space-x-2">
                      <Icon name="Globe" size={14} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary font-body">
                        {advocate?.languages?.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>)
      )}
      {/* Call to Action */}
      <div className="bg-gradient-to-br from-forest/10 to-forest/5 rounded-eco-lg border border-forest/20 p-6 text-center">
        <Icon name="Users" size={48} className="text-forest mx-auto mb-4" />
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-2">
          Ready to Make a Local Impact?
        </h3>
        <p className="text-text-secondary font-body mb-4 max-w-2xl mx-auto">
          Join forces with environmental advocates in your area. Together, we can create meaningful change in our communities and protect the environment for future generations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="default" iconName="UserPlus" iconPosition="left">
            Join Local Group
          </Button>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Start New Initiative
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationBasedCommunity;