import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiscussionForums = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const forumCategories = [
    {
      id: 'climate',
      name: 'Climate Change',
      icon: 'Thermometer',
      description: 'Discuss climate science, solutions, and adaptation strategies',
      topics: 156,
      posts: 2847,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity & Wildlife',
      icon: 'Bird',
      description: 'Conservation efforts, species protection, and habitat restoration',
      topics: 89,
      posts: 1523,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'sustainable',
      name: 'Sustainable Living',
      icon: 'Leaf',
      description: 'Eco-friendly lifestyle tips, zero waste, and green alternatives',
      topics: 234,
      posts: 4156,
      color: 'text-forest',
      bgColor: 'bg-forest-gradient/20'
    },
    {
      id: 'renewable',
      name: 'Renewable Energy',
      icon: 'Zap',
      description: 'Solar, wind, and clean energy discussions',
      topics: 67,
      posts: 892,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'pollution',
      name: 'Pollution Control',
      icon: 'Shield',
      description: 'Air, water, and soil pollution prevention and cleanup',
      topics: 112,
      posts: 1876,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const recentTopics = [
    {
      id: 1,
      title: "Best practices for organizing community beach cleanups?",
      category: 'sustainable',
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        level: "Eco Advocate"
      },
      replies: 23,
      views: 456,
      lastActivity: new Date(Date.now() - 1800000),
      isPinned: true,
      hasExpertReply: true
    },
    {
      id: 2,
      title: "How to identify invasive plant species in urban areas",
      category: 'biodiversity',
      author: {
        name: "Dr. Maria Santos",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
        level: "Expert Contributor",
        isExpert: true
      },
      replies: 18,
      views: 789,
      lastActivity: new Date(Date.now() - 3600000),
      isPinned: false,
      hasExpertReply: false
    },
    {
      id: 3,
      title: "DIY solar panel installation - safety considerations",
      category: 'renewable',
      author: {
        name: "Jordan Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        level: "Green Innovator"
      },
      replies: 31,
      views: 1234,
      lastActivity: new Date(Date.now() - 7200000),
      isPinned: false,
      hasExpertReply: true
    },
    {
      id: 4,
      title: "Microplastics in drinking water - latest research findings",
      category: 'pollution',
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        level: "Research Contributor"
      },
      replies: 45,
      views: 2156,
      lastActivity: new Date(Date.now() - 10800000),
      isPinned: false,
      hasExpertReply: true
    },
    {
      id: 5,
      title: "Carbon footprint tracking apps - which ones actually work?",
      category: 'climate',
      author: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        level: "Climate Tracker"
      },
      replies: 12,
      views: 567,
      lastActivity: new Date(Date.now() - 14400000),
      isPinned: false,
      hasExpertReply: false
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const getCategoryInfo = (categoryId) => {
    return forumCategories?.find(cat => cat?.id === categoryId) || forumCategories?.[0];
  };

  const filteredTopics = selectedCategory === 'all' 
    ? recentTopics 
    : recentTopics?.filter(topic => topic?.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Forum Categories */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-headline font-bold text-text-primary">Discussion Categories</h2>
            <p className="text-text-secondary font-body">Join conversations with fellow environmental advocates</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            New Topic
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forumCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`p-4 rounded-eco-md border-2 organic-transition text-left env-card-hover ${
                selectedCategory === category?.id
                  ? 'border-forest bg-forest-gradient/10'
                  : 'border-border hover:border-forest/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-eco-sm flex items-center justify-center ${category?.bgColor}`}>
                  <Icon name={category?.icon} size={20} className={category?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-semibold text-text-primary mb-1">{category?.name}</h3>
                  <p className="text-sm text-text-secondary font-body mb-2 line-clamp-2">{category?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary font-body">
                    <span>{category?.topics} topics</span>
                    <span>{category?.posts} posts</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Active Discussions */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-headline font-bold text-text-primary">
                {selectedCategory === 'all' ? 'Recent Discussions' : `${getCategoryInfo(selectedCategory)?.name} Discussions`}
              </h2>
              <p className="text-text-secondary font-body">Latest conversations and expert insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-eco-sm text-sm font-body organic-transition ${
                  selectedCategory === 'all' ?'bg-forest text-white' :'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
                }`}
              >
                All Categories
              </button>
              <Button variant="outline" size="sm" iconName="Filter">
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredTopics?.map((topic) => {
            const categoryInfo = getCategoryInfo(topic?.category);
            return (
              <div key={topic?.id} className="p-6 hover:bg-surface/30 organic-transition">
                <div className="flex items-start space-x-4">
                  {/* Category Icon */}
                  <div className={`w-10 h-10 rounded-eco-sm flex items-center justify-center flex-shrink-0 ${categoryInfo?.bgColor}`}>
                    <Icon name={categoryInfo?.icon} size={18} className={categoryInfo?.color} />
                  </div>

                  {/* Topic Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {topic?.isPinned && (
                            <Icon name="Pin" size={14} className="text-achievement" />
                          )}
                          <h3 className="font-headline font-semibold text-text-primary hover:text-forest organic-transition cursor-pointer">
                            {topic?.title}
                          </h3>
                          {topic?.hasExpertReply && (
                            <span className="px-2 py-0.5 bg-ocean text-white text-xs rounded-eco-sm font-body">
                              Expert Reply
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-text-secondary font-body">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={topic?.author?.avatar}
                              alt={topic?.author?.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{topic?.author?.name}</span>
                            {topic?.author?.isExpert && (
                              <Icon name="CheckCircle" size={14} className="text-ocean" />
                            )}
                          </div>
                          <span>•</span>
                          <span>{topic?.author?.level}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(topic?.lastActivity)}</span>
                        </div>
                      </div>

                      {/* Topic Stats */}
                      <div className="flex items-center space-x-6 text-sm text-text-secondary font-body ml-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={16} />
                          <span>{topic?.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={16} />
                          <span>{topic?.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="p-6 border-t border-border text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Discussions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForums;