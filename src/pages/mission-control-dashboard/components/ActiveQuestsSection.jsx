import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveQuestsSection = ({ quests, onQuestAction }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      case 'expert': return 'difficulty-expert';
      default: return 'difficulty-beginner';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'Seedling';
      case 'intermediate': return 'TreePine';
      case 'advanced': return 'Mountain';
      case 'expert': return 'Crown';
      default: return 'Seedling';
    }
  };

  const getQuestTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'cleanup': return 'Trash2';
      case 'planting': return 'TreePine';
      case 'monitoring': return 'Eye';
      case 'education': return 'BookOpen';
      case 'conservation': return 'Shield';
      default: return 'Target';
    }
  };

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <section className="px-4 lg:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-headline font-bold text-forest">
              Your Active Quests
            </h2>
            <p className="text-text-secondary font-body mt-1">
              Continue your environmental missions and track your progress
            </p>
          </div>
          <Button variant="outline" iconName="Plus" iconPosition="left" asChild>
            <Link to="/quest-map">Find New Quests</Link>
          </Button>
        </div>

        {/* Quests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests?.map((quest) => (
            <div
              key={quest?.id}
              className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover group"
            >
              {/* Quest Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={quest?.image}
                  alt={quest?.title}
                  className="w-full h-full object-cover group-hover:scale-105 organic-transition"
                />
                
                {/* Quest Type Badge */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-eco-sm px-2 py-1">
                    <Icon name={getQuestTypeIcon(quest?.type)} size={12} className="text-forest" />
                    <span className="text-xs font-body font-medium text-forest capitalize">
                      {quest?.type}
                    </span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`flex items-center space-x-1 rounded-eco-sm px-2 py-1 ${getDifficultyColor(quest?.difficulty)}`}>
                    <Icon name={getDifficultyIcon(quest?.difficulty)} size={12} />
                    <span className="text-xs font-body font-medium capitalize">
                      {quest?.difficulty}
                    </span>
                  </div>
                </div>

                {/* Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="font-body">{quest?.progress}% Complete</span>
                    <span className="font-body">{formatTimeRemaining(quest?.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Quest Content */}
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-headline font-semibold text-forest mb-2 line-clamp-2">
                    {quest?.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-body line-clamp-2">
                    {quest?.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-text-secondary">Progress</span>
                    <span className="font-body font-medium text-forest">{quest?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-forest to-success h-2 rounded-full organic-transition progress-vine"
                      style={{ width: `${quest?.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quest Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Icon name="Award" size={16} className="text-achievement" />
                    </div>
                    <p className="text-xs font-body text-text-secondary">
                      {quest?.xpReward} XP
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Icon name="MapPin" size={16} className="text-ocean" />
                    </div>
                    <p className="text-xs font-body text-text-secondary">
                      {quest?.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Icon name="Users" size={16} className="text-forest" />
                    </div>
                    <p className="text-xs font-body text-text-secondary">
                      {quest?.participants} joined
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    iconName="Play"
                    iconPosition="left"
                    onClick={() => onQuestAction(quest?.id, 'continue')}
                    className="quest-button"
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MoreHorizontal"
                    onClick={() => setSelectedQuest(quest?.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {quests?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-forest/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Target" size={32} className="text-forest" />
            </div>
            <h3 className="text-xl font-headline font-semibold text-forest mb-2">
              No Active Quests
            </h3>
            <p className="text-text-secondary font-body mb-6 max-w-md mx-auto">
              Start your environmental journey by discovering and joining missions that make a real impact in your community.
            </p>
            <Button variant="default" iconName="Search" iconPosition="left" asChild>
              <Link to="/quest-map">Discover Quests</Link>
            </Button>
          </div>
        )}

        {/* View All Link */}
        {quests?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="ghost" iconName="ArrowRight" iconPosition="right" asChild>
              <Link to="/quest-map">View All Available Quests</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveQuestsSection;