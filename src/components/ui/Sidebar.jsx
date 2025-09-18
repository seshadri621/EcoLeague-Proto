import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Mission Control', 
      path: '/mission-control-dashboard', 
      icon: 'Compass',
      description: 'Your environmental command center'
    },
    { 
      name: 'Quest Map', 
      path: '/quest-map', 
      icon: 'Map',
      description: 'Discover local environmental missions'
    },
    { 
      name: 'Learning Arena', 
      path: '/learning-arena', 
      icon: 'BookOpen',
      description: 'Master environmental skills'
    },
    { 
      name: 'Community Hub', 
      path: '/community-impact-hub', 
      icon: 'Users',
      description: 'Connect with fellow eco-heroes'
    },
    { 
      name: 'Upload Mission', 
      path: '/mission-upload-portal', 
      icon: 'Upload',
      description: 'Share your environmental impact'
    },
    { 
      name: 'Achievements', 
      path: '/achievement-gallery', 
      icon: 'Award',
      description: 'Celebrate your environmental victories'
    }
  ];

  const quickActions = [
    { name: 'Start New Mission', icon: 'Plus', action: 'newMission' },
    { name: 'Join Community Challenge', icon: 'Target', action: 'challenge' },
    { name: 'Track Progress', icon: 'TrendingUp', action: 'progress' }
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldExpand = !isCollapsed || isHovered;

  const handleQuickAction = (action) => {
    switch (action) {
      case 'newMission':
        // Handle new mission creation
        break;
      case 'challenge':
        // Handle community challenge join
        break;
      case 'progress':
        // Handle progress tracking
        break;
      default:
        break;
    }
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-border organic-transition ${
        shouldExpand ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {shouldExpand && (
              <div className="animate-fade-in">
                <h2 className="font-headline font-semibold text-forest">Navigation</h2>
                <p className="text-sm text-text-secondary font-body">Your environmental journey</p>
              </div>
            )}
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1.5 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-eco-md organic-transition relative ${
                isActivePath(item?.path)
                  ? 'bg-forest-gradient text-forest border border-forest/20 shadow-eco-sm'
                  : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/50'
              }`}
            >
              <div className={`flex-shrink-0 ${isActivePath(item?.path) ? 'mission-pulse' : ''}`}>
                <Icon name={item?.icon} size={20} />
              </div>
              
              {shouldExpand && (
                <div className="flex-1 min-w-0 animate-fade-in">
                  <p className="font-body font-medium truncate">{item?.name}</p>
                  <p className="text-xs text-text-secondary/80 truncate">{item?.description}</p>
                </div>
              )}

              {/* Active Indicator */}
              {isActivePath(item?.path) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-forest rounded-r-full"></div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && !isHovered && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-eco-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible organic-transition whitespace-nowrap z-50">
                  {item?.name}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        {shouldExpand && (
          <div className="p-4 border-t border-border animate-fade-in">
            <h3 className="font-headline font-medium text-forest mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30 quest-button"
                >
                  <Icon name={action?.icon} size={16} />
                  <span className="font-body text-sm">{action?.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Impact Summary */}
        {shouldExpand && (
          <div className="p-4 border-t border-border bg-forest-gradient/20 animate-fade-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 achievement-glow">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <p className="font-accent text-sm text-forest mb-1">Your Impact</p>
              <p className="text-xs text-text-secondary font-body">
                <span className="font-semibold text-achievement">127</span> missions completed
              </p>
              <p className="text-xs text-text-secondary font-body">
                <span className="font-semibold text-success">2.4k lbs</span> waste collected
              </p>
            </div>
          </div>
        )}

        {/* Collapsed State Impact Indicator */}
        {!shouldExpand && (
          <div className="p-4 border-t border-border">
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center achievement-glow">
                <Icon name="Zap" size={14} color="white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;