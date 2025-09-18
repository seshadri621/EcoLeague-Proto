import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ExpertSession = ({ session, onJoin, onRemind }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-error text-white';
      case 'upcoming':
        return 'bg-warning text-white';
      case 'completed':
        return 'bg-success text-white';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live':
        return 'Radio';
      case 'upcoming':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilSession = (dateString) => {
    const sessionDate = new Date(dateString);
    const now = new Date();
    const diffMs = sessionDate - now;
    
    if (diffMs < 0) return 'Session ended';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`;
    return `${diffMinutes}m`;
  };

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border overflow-hidden env-card-hover">
      {/* Session Header */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={session?.coverImage}
            alt={session?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(session?.status)} size={12} />
            <span className="capitalize">{session?.status}</span>
            {session?.status === 'live' && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1"></div>
            )}
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{session?.duration} min</span>
          </div>
        </div>

        {/* Session Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-headline font-bold text-lg mb-2 line-clamp-2">
            {session?.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(session?.scheduledAt)}</span>
            </div>
            {session?.status === 'upcoming' && (
              <div className="flex items-center space-x-1">
                <Icon name="Timer" size={14} />
                <span>{getTimeUntilSession(session?.scheduledAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Session Content */}
      <div className="p-6">
        {/* Expert Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={session?.expert?.avatar}
              alt={session?.expert?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-headline font-semibold text-text-primary">
              {session?.expert?.name}
            </h4>
            <p className="text-text-secondary font-body text-sm">
              {session?.expert?.title}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span className="text-xs text-text-secondary">{session?.expert?.organization}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-sm text-text-secondary">
              <Icon name="Users" size={14} />
              <span>{session?.attendeeCount}</span>
            </div>
          </div>
        </div>

        {/* Session Description */}
        <div className="mb-4">
          <p className={`text-text-secondary font-body text-sm ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {session?.description}
          </p>
          {session?.description?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-forest font-body text-sm mt-2 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Topics Covered */}
        <div className="mb-4">
          <h5 className="font-headline font-medium text-text-primary mb-2">Topics Covered</h5>
          <div className="flex flex-wrap gap-2">
            {session?.topics?.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-forest-gradient/20 text-forest text-xs rounded-full font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-eco-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="MessageSquare" size={16} color="var(--color-forest)" />
            </div>
            <p className="text-xs text-text-secondary">Q&A Format</p>
            <p className="font-medium text-text-primary">Interactive</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Award" size={16} color="var(--color-achievement)" />
            </div>
            <p className="text-xs text-text-secondary">XP Reward</p>
            <p className="font-medium text-text-primary">{session?.xpReward}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Star" size={16} color="var(--color-warning)" />
            </div>
            <p className="text-xs text-text-secondary">Rating</p>
            <p className="font-medium text-text-primary">{session?.rating}/5</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {session?.status === 'live' && (
            <Button
              variant="default"
              fullWidth
              onClick={() => onJoin(session)}
              iconName="Video"
              iconPosition="left"
              className="quest-button mission-pulse"
            >
              Join Live Session
            </Button>
          )}
          
          {session?.status === 'upcoming' && (
            <>
              <Button
                variant="default"
                onClick={() => onJoin(session)}
                iconName="Calendar"
                iconPosition="left"
                className="quest-button flex-1"
              >
                Register
              </Button>
              <Button
                variant="outline"
                onClick={() => onRemind(session)}
                iconName="Bell"
                iconPosition="left"
                className="flex-1"
              >
                Remind Me
              </Button>
            </>
          )}
          
          {session?.status === 'completed' && (
            <Button
              variant="outline"
              fullWidth
              onClick={() => onJoin(session)}
              iconName="Play"
              iconPosition="left"
            >
              Watch Recording
            </Button>
          )}
        </div>

        {/* Additional Info for Upcoming Sessions */}
        {session?.status === 'upcoming' && (
          <div className="mt-4 p-3 bg-forest-gradient/10 rounded-eco-sm border border-forest/20">
            <div className="flex items-center space-x-2 text-sm text-forest">
              <Icon name="Info" size={14} />
              <span className="font-medium">
                Session starts in {getTimeUntilSession(session?.scheduledAt)}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              You'll receive a notification 15 minutes before the session begins.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertSession;