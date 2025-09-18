import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const feedPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        level: "Eco Champion",
        location: "San Francisco, CA"
      },
      mission: {
        type: "Beach Cleanup",
        title: "Ocean Beach Restoration Project",
        difficulty: "intermediate"
      },
      content: `Amazing day cleaning up Ocean Beach! Our team of 12 volunteers collected over 150 pounds of trash and debris. The before and after photos really show the impact we made together.`,
      images: [
        "https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?w=400",
        "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?w=400"
      ],
      metrics: {
        trashCollected: "150 lbs",
        volunteersInvolved: 12,
        areaCleared: "2.3 acres"
      },
      engagement: {
        impactReactions: 47,
        comments: 12,
        reshares: 8
      },
      timestamp: new Date(Date.now() - 3600000),
      location: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 2,
      user: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        level: "Forest Guardian",
        location: "Portland, OR"
      },
      mission: {
        type: "Tree Planting",
        title: "Urban Forest Expansion",
        difficulty: "beginner"
      },
      content: `Planted 25 native oak saplings in Laurelhurst Park today! Each tree will absorb approximately 48 pounds of CO2 per year. Small actions, big impact! 🌳`,
      images: [
        "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=400",
        "https://images.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg?w=400"
      ],
      metrics: {
        treesPlanted: "25 trees",
        co2Absorption: "1,200 lbs/year",
        speciesRestored: "Native Oak"
      },
      engagement: {
        impactReactions: 63,
        comments: 18,
        reshares: 15
      },
      timestamp: new Date(Date.now() - 7200000),
      location: { lat: 45.5152, lng: -122.6784 }
    },
    {
      id: 3,
      user: {
        name: "Elena Vasquez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        level: "Wildlife Protector",
        location: "Austin, TX"
      },
      mission: {
        type: "Wildlife Monitoring",
        title: "Monarch Butterfly Census",
        difficulty: "advanced"
      },
      content: `Completed our monthly monarch butterfly count at Zilker Park. Documented 127 individuals across 3 species - a 15% increase from last month! The milkweed restoration is working.`,
      images: [
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?w=400"
      ],
      metrics: {
        speciesDocumented: "3 species",
        individualsCount: "127 butterflies",
        habitatRestored: "0.8 acres"
      },
      engagement: {
        impactReactions: 34,
        comments: 9,
        reshares: 6
      },
      timestamp: new Date(Date.now() - 10800000),
      location: { lat: 30.2672, lng: -97.7431 }
    }
  ];

  const filterOptions = [
    { key: 'all', label: 'All Posts', icon: 'Globe' },
    { key: 'cleanup', label: 'Cleanups', icon: 'Trash2' },
    { key: 'planting', label: 'Tree Planting', icon: 'TreePine' },
    { key: 'wildlife', label: 'Wildlife', icon: 'Bird' },
    { key: 'nearby', label: 'Nearby', icon: 'MapPin' }
  ];

  const impactReactions = [
    { type: 'impact', icon: 'Zap', label: 'Impact!', color: 'text-achievement' },
    { type: 'inspiring', icon: 'Heart', label: 'Inspiring', color: 'text-error' },
    { type: 'helpful', icon: 'ThumbsUp', label: 'Helpful', color: 'text-ocean' },
    { type: 'amazing', icon: 'Star', label: 'Amazing', color: 'text-warning' }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.key}
              onClick={() => setSelectedFilter(option?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-eco-sm organic-transition font-body font-medium ${
                selectedFilter === option?.key
                  ? 'bg-forest-gradient text-forest border border-forest/20'
                  : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts?.map((post) => (
          <div key={post?.id} className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover">
            {/* Post Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={post?.user?.avatar}
                      alt={post?.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={12} color="white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-headline font-semibold text-text-primary">{post?.user?.name}</h3>
                    <p className="text-sm text-text-secondary font-body">{post?.user?.level}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="MapPin" size={12} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary font-body">{post?.user?.location}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary font-body">{formatTimeAgo(post?.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post?.mission?.difficulty)}`}>
                    {post?.mission?.difficulty}
                  </span>
                  <button className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
              </div>

              {/* Mission Info */}
              <div className="mt-4 p-4 bg-forest-gradient/10 rounded-eco-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-forest" />
                  <span className="font-body font-medium text-forest">{post?.mission?.type}</span>
                </div>
                <h4 className="font-headline font-semibold text-text-primary">{post?.mission?.title}</h4>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6">
              <p className="font-body text-text-primary leading-relaxed mb-4">{post?.content}</p>

              {/* Images */}
              {post?.images && post?.images?.length > 0 && (
                <div className={`grid gap-2 mb-4 ${post?.images?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {post?.images?.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-eco-md h-48">
                      <Image
                        src={image}
                        alt={`Mission result ${index + 1}`}
                        className="w-full h-full object-cover organic-transition hover:scale-105"
                      />
                      {index === 0 && post?.images?.length > 1 && (
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
              )}

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-achievement-gradient/10 rounded-eco-md">
                {Object.entries(post?.metrics)?.map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-lg font-headline font-bold text-achievement">{value}</p>
                    <p className="text-xs text-text-secondary font-body capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="px-6 py-4 border-t border-border bg-surface/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Impact Reactions */}
                  <div className="flex items-center space-x-1">
                    {impactReactions?.map((reaction) => (
                      <button
                        key={reaction?.type}
                        className={`p-2 rounded-eco-sm organic-transition hover:bg-forest-gradient/30 ${reaction?.color}`}
                        title={reaction?.label}
                      >
                        <Icon name={reaction?.icon} size={16} />
                      </button>
                    ))}
                    <span className="text-sm font-body text-text-secondary ml-2">
                      {post?.engagement?.impactReactions}
                    </span>
                  </div>

                  {/* Comments */}
                  <button className="flex items-center space-x-2 text-text-secondary hover:text-forest organic-transition">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm font-body">{post?.engagement?.comments}</span>
                  </button>

                  {/* Reshare */}
                  <button className="flex items-center space-x-2 text-text-secondary hover:text-forest organic-transition">
                    <Icon name="Share2" size={16} />
                    <span className="text-sm font-body">{post?.engagement?.reshares}</span>
                  </button>
                </div>

                {/* Location */}
                <button className="flex items-center space-x-1 text-text-secondary hover:text-forest organic-transition">
                  <Icon name="MapPin" size={14} />
                  <span className="text-xs font-body">View Location</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeed;