import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const featuredStories = [
    {
      id: 1,
      title: "From Polluted Creek to Thriving Ecosystem",
      hero: {
        name: "Maria Gonzalez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        age: 22,
        location: "Austin, Texas",
        level: "Environmental Champion"
      },
      story: {
        challenge: "Discovered a heavily polluted creek in her neighborhood that was affecting local wildlife and water quality.",
        action: `Maria organized weekly cleanup sessions, partnered with local environmental groups, and launched a community education campaign about water pollution. Over 8 months, she mobilized 150+ volunteers and removed over 2,000 pounds of debris.`,
        impact: "The creek now supports returning wildlife, water quality has improved by 60%, and the city has implemented new pollution prevention measures.",
        timeline: "8 months",
        volunteers: 150,
        wasteRemoved: "2,000 lbs"
      },
      images: [
        "https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?w=400",
        "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?w=400",
        "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=400"
      ],
      videoUrl: "https://example.com/maria-story",
      achievements: ["Water Guardian", "Community Leader", "Ecosystem Restorer"],
      featured: true,
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      title: "Urban Forest: 500 Trees and Counting",
      hero: {
        name: "James Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        age: 19,
        location: "Portland, Oregon",
        level: "Forest Guardian"
      },
      story: {
        challenge: "Noticed declining air quality and lack of green spaces in his urban neighborhood.",
        action: `Started with planting 10 trees in his local park, then expanded to organize monthly tree-planting events. Partnered with the city forestry department and local nurseries to source native species.`,
        impact: "Planted 500+ native trees across 12 locations, improved air quality metrics, and created habitat for 15+ bird species.",
        timeline: "18 months",
        volunteers: 89,
        treesPlanted: "500+"
      },
      images: [
        "https://images.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg?w=400",
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?w=400"
      ],
      videoUrl: "https://example.com/james-story",
      achievements: ["Tree Planter", "Air Quality Advocate", "Urban Forester"],
      featured: false,
      publishedAt: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      title: "Zero Waste Campus Initiative",
      hero: {
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        age: 20,
        location: "Berkeley, California",
        level: "Waste Warrior"
      },
      story: {
        challenge: "Her university was generating massive amounts of waste with poor recycling practices.",
        action: `Launched a comprehensive zero-waste campaign including composting programs, reusable container initiatives, and waste audit workshops. Created educational content and peer ambassador program.`,
        impact: "Reduced campus waste by 70%, diverted 15 tons from landfills, and influenced university policy changes.",
        timeline: "12 months",
        volunteers: 200,
        wasteReduced: "15 tons"
      },
      images: [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
      ],
      videoUrl: "https://example.com/sarah-story",
      achievements: ["Zero Waste Champion", "Policy Influencer", "Education Leader"],
      featured: false,
      publishedAt: new Date(Date.now() - 259200000)
    }
  ];

  const monthlySpotlight = {
    month: "September 2024",
    hero: featuredStories?.[0],
    nominations: 47,
    communityVotes: 1234
  };

  const impactMetrics = {
    totalStories: 156,
    totalVolunteers: 2847,
    totalImpact: "47,000 lbs waste removed, 1,200+ trees planted",
    communitiesImpacted: 89
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const openStoryModal = (story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  return (
    <div className="space-y-6">
      {/* Monthly Spotlight */}
      <div className="bg-gradient-to-br from-achievement/10 to-orange-100 rounded-eco-lg border border-achievement/20 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Star" size={20} className="text-achievement" />
                <span className="text-sm font-body font-medium text-achievement">Monthly Spotlight</span>
              </div>
              <h2 className="text-2xl font-headline font-bold text-text-primary">{monthlySpotlight?.month}</h2>
              <p className="text-text-secondary font-body">Community-voted environmental hero</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary font-body">{monthlySpotlight?.nominations} nominations</p>
              <p className="text-sm text-text-secondary font-body">{monthlySpotlight?.communityVotes} community votes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src={monthlySpotlight?.hero?.hero?.avatar}
                    alt={monthlySpotlight?.hero?.hero?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center achievement-glow">
                    <Icon name="Crown" size={16} color="white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-text-primary">{monthlySpotlight?.hero?.hero?.name}</h3>
                  <p className="text-text-secondary font-body">{monthlySpotlight?.hero?.hero?.level}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="MapPin" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary font-body">{monthlySpotlight?.hero?.hero?.location}</span>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-headline font-semibold text-text-primary mb-2">
                {monthlySpotlight?.hero?.title}
              </h4>
              <p className="text-text-secondary font-body mb-4 leading-relaxed">
                {monthlySpotlight?.hero?.story?.action?.substring(0, 200)}...
              </p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-headline font-bold text-achievement">{monthlySpotlight?.hero?.story?.volunteers}</p>
                  <p className="text-xs text-text-secondary font-body">Volunteers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-headline font-bold text-success">{monthlySpotlight?.hero?.story?.wasteRemoved}</p>
                  <p className="text-xs text-text-secondary font-body">Waste Removed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-headline font-bold text-forest">{monthlySpotlight?.hero?.story?.timeline}</p>
                  <p className="text-xs text-text-secondary font-body">Timeline</p>
                </div>
              </div>

              <Button 
                variant="default" 
                iconName="Play" 
                iconPosition="left"
                onClick={() => openStoryModal(monthlySpotlight?.hero)}
              >
                Watch Full Story
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {monthlySpotlight?.hero?.images?.slice(0, 4)?.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-eco-md h-32">
                  <Image
                    src={image}
                    alt={`Story image ${index + 1}`}
                    className="w-full h-full object-cover organic-transition hover:scale-105"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-eco-sm text-xs font-body">
                      Before
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-2 left-2 bg-success/90 text-white px-2 py-1 rounded-eco-sm text-xs font-body">
                      After
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Impact Overview */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">Community Impact Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-forest-gradient/10 rounded-eco-md">
            <p className="text-2xl font-headline font-bold text-forest">{impactMetrics?.totalStories}</p>
            <p className="text-sm text-text-secondary font-body">Success Stories</p>
          </div>
          <div className="text-center p-4 bg-ocean-gradient/10 rounded-eco-md">
            <p className="text-2xl font-headline font-bold text-ocean">{impactMetrics?.totalVolunteers}</p>
            <p className="text-sm text-text-secondary font-body">Volunteers Mobilized</p>
          </div>
          <div className="text-center p-4 bg-achievement-gradient/10 rounded-eco-md">
            <p className="text-2xl font-headline font-bold text-achievement">{impactMetrics?.communitiesImpacted}</p>
            <p className="text-sm text-text-secondary font-body">Communities Impacted</p>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-eco-md">
            <p className="text-xs font-headline font-bold text-success leading-tight">{impactMetrics?.totalImpact}</p>
            <p className="text-sm text-text-secondary font-body">Environmental Impact</p>
          </div>
        </div>
      </div>
      {/* All Success Stories */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-headline font-semibold text-text-primary">All Success Stories</h3>
              <p className="text-text-secondary font-body">Inspiring environmental achievements from our community</p>
            </div>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Share Your Story
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredStories?.map((story) => (
              <div key={story?.id} className="border border-border rounded-eco-md overflow-hidden env-card-hover">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={story?.images?.[0]}
                    alt={story?.title}
                    className="w-full h-full object-cover organic-transition hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => openStoryModal(story)}
                      className="w-10 h-10 bg-black/70 text-white rounded-full flex items-center justify-center organic-transition hover:bg-black/90"
                    >
                      <Icon name="Play" size={16} />
                    </button>
                  </div>
                  {story?.featured && (
                    <div className="absolute top-4 left-4 bg-achievement text-white px-2 py-1 rounded-eco-sm text-xs font-body">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={story?.hero?.avatar}
                      alt={story?.hero?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">{story?.hero?.name}</h4>
                      <p className="text-sm text-text-secondary font-body">{story?.hero?.location}</p>
                    </div>
                  </div>

                  <h3 className="font-headline font-semibold text-text-primary mb-2">{story?.title}</h3>
                  <p className="text-sm text-text-secondary font-body mb-3 leading-relaxed">
                    {story?.story?.challenge?.substring(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between text-xs text-text-secondary font-body mb-3">
                    <span>{story?.story?.volunteers} volunteers</span>
                    <span>{story?.story?.timeline}</span>
                    <span>{formatTimeAgo(story?.publishedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {story?.achievements?.slice(0, 2)?.map((achievement, index) => (
                      <span key={index} className="px-2 py-1 bg-forest-gradient/20 text-forest text-xs rounded-eco-sm font-body">
                        {achievement}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth
                    onClick={() => openStoryModal(story)}
                  >
                    Read Full Story
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-eco-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-headline font-bold text-text-primary">{selectedStory?.title}</h2>
                <button
                  onClick={closeStoryModal}
                  className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-surface"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Hero Info */}
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedStory?.hero?.avatar}
                  alt={selectedStory?.hero?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-headline font-bold text-text-primary">{selectedStory?.hero?.name}</h3>
                  <p className="text-text-secondary font-body">{selectedStory?.hero?.level} • Age {selectedStory?.hero?.age}</p>
                  <p className="text-sm text-text-secondary font-body">{selectedStory?.hero?.location}</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">The Challenge</h4>
                  <p className="text-text-secondary font-body leading-relaxed">{selectedStory?.story?.challenge}</p>
                </div>

                <div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">Taking Action</h4>
                  <p className="text-text-secondary font-body leading-relaxed">{selectedStory?.story?.action}</p>
                </div>

                <div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">The Impact</h4>
                  <p className="text-text-secondary font-body leading-relaxed">{selectedStory?.story?.impact}</p>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedStory?.images?.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-eco-md h-48">
                    <Image
                      src={image}
                      alt={`Story image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-headline font-semibold text-text-primary mb-3">Achievements Earned</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStory?.achievements?.map((achievement, index) => (
                    <span key={index} className="flex items-center space-x-2 px-3 py-2 bg-achievement-gradient/20 text-achievement rounded-eco-md font-body">
                      <Icon name="Award" size={16} />
                      <span>{achievement}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;