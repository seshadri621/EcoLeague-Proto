import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityPulseSection = ({ activities, onActivityLike, onActivityShare }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredActivities, setFilteredActivities] = useState(activities);

  const filters = [
    { id: 'all', label: 'All Activity', icon: 'Activity' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'missions', label: 'Missions', icon: 'Target' },
    { id: 'discussions', label: 'Discussions', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities?.filter(activity => activity?.type === selectedFilter));
    }
  }, [selectedFilter, activities]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'achievement': return 'Award';
      case 'mission': return 'Target';
      case 'discussion': return 'MessageCircle';
      case 'lesson': return 'BookOpen';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'achievement': return 'text-achievement';
      case 'mission': return 'text-forest';
      case 'discussion': return 'text-ocean';
      case 'lesson': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <section className="px-4 lg:px-6 py-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-headline font-bold text-forest">
              Community Pulse
            </h2>
            <p className="text-text-secondary font-body mt-1">
              Recent achievements and activities from your eco-hero community
            </p>
          </div>
          <Button variant="outline" iconName="Users" iconPosition="left" asChild>
            <Link to="/community-impact-hub">Join Community</Link>
          </Button>
        </div>

        {/* Activity Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setSelectedFilter(filter?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-eco-md organic-transition font-body font-medium ${
                selectedFilter === filter?.id
                  ? 'bg-forest text-white shadow-eco-sm'
                  : 'bg-white text-text-secondary hover:bg-forest-gradient/30 hover:text-forest border border-border'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-4 env-card-hover"
            >
              {/* Activity Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="relative">
                  <Image
                    src={activity?.user?.avatar}
                    alt={activity?.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                    activity?.type === 'achievement' ? 'bg-achievement' :
                    activity?.type === 'mission' ? 'bg-forest' :
                    activity?.type === 'discussion' ? 'bg-ocean' : 'bg-success'
                  }`}>
                    <Icon 
                      name={getActivityIcon(activity?.type)} 
                      size={8} 
                      color="white" 
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-body font-medium text-forest truncate">
                      {activity?.user?.name}
                    </p>
                    <span className="text-xs text-text-secondary font-body">
                      {activity?.user?.level}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary font-body">
                    {formatTimeAgo(activity?.timestamp)}
                  </p>
                </div>
              </div>

              {/* Activity Content */}
              <div className="space-y-3">
                <p className="font-body text-text-primary leading-relaxed">
                  {activity?.content}
                </p>

                {/* Activity Media */}
                {activity?.image && (
                  <div className="rounded-eco-md overflow-hidden">
                    <Image
                      src={activity?.image}
                      alt="Activity image"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}

                {/* Activity Stats */}
                {activity?.stats && (
                  <div className="bg-muted/50 rounded-eco-sm p-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {activity?.stats?.map((stat, index) => (
                        <div key={index}>
                          <p className="text-lg font-headline font-bold text-forest">
                            {stat?.value}
                          </p>
                          <p className="text-xs text-text-secondary font-body">
                            {stat?.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievement Badge */}
                {activity?.type === 'achievement' && activity?.badge && (
                  <div className="flex items-center space-x-2 bg-achievement-gradient rounded-eco-sm p-2">
                    <div className="w-8 h-8 bg-achievement rounded-full flex items-center justify-center achievement-glow">
                      <Icon name="Award" size={16} color="white" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-achievement">
                        {activity?.badge?.name}
                      </p>
                      <p className="text-xs text-orange-700">
                        {activity?.badge?.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onActivityLike(activity?.id)}
                    className={`flex items-center space-x-1 organic-transition ${
                      activity?.isLiked ? 'text-achievement' : 'text-text-secondary hover:text-achievement'
                    }`}
                  >
                    <Icon name="Heart" size={16} fill={activity?.isLiked ? 'currentColor' : 'none'} />
                    <span className="text-sm font-body">{activity?.likes}</span>
                  </button>
                  <button
                    onClick={() => onActivityShare(activity?.id)}
                    className="flex items-center space-x-1 text-text-secondary hover:text-forest organic-transition"
                  >
                    <Icon name="Share2" size={16} />
                    <span className="text-sm font-body">{activity?.shares}</span>
                  </button>
                </div>
                <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
                  Comment
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-forest/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={32} className="text-forest" />
            </div>
            <h3 className="text-xl font-headline font-semibold text-forest mb-2">
              No Activity Found
            </h3>
            <p className="text-text-secondary font-body mb-6 max-w-md mx-auto">
              Be the first to share your environmental achievements with the community!
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left" asChild>
              <Link to="/community-impact-hub">Share Your Impact</Link>
            </Button>
          </div>
        )}

        {/* View All Link */}
        {filteredActivities?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="ghost" iconName="ArrowRight" iconPosition="right" asChild>
              <Link to="/community-impact-hub">View All Community Activity</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityPulseSection;