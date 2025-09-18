import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FriendsActivity = ({ friends, onViewFriend, onJoinFriend }) => {
  const getActivityIcon = (activity) => {
    switch (activity) {
      case 'active_mission':
        return 'Play';
      case 'completed_mission':
        return 'CheckCircle';
      case 'planning':
        return 'Calendar';
      default:
        return 'User';
    }
  };

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'active_mission':
        return 'text-success';
      case 'completed_mission':
        return 'text-achievement';
      case 'planning':
        return 'text-ocean';
      default:
        return 'text-text-secondary';
    }
  };

  const getActivityText = (friend) => {
    switch (friend?.activity) {
      case 'active_mission':
        return `Currently on: ${friend?.currentMission}`;
      case 'completed_mission':
        return `Just completed: ${friend?.lastMission}`;
      case 'planning':
        return `Planning: ${friend?.plannedMission}`;
      default:
        return 'Available for missions';
    }
  };

  return (
    <div className="absolute bottom-4 right-4 z-20">
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border w-80 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-forest" />
            <h3 className="font-headline font-semibold text-forest">Friends Activity</h3>
          </div>
        </div>

        <div className="overflow-y-auto max-h-80">
          {friends?.length === 0 ? (
            <div className="p-6 text-center">
              <Icon name="UserPlus" size={32} className="text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary font-body">No friends online</p>
              <p className="text-sm text-text-secondary mt-1">Invite friends to join your environmental journey!</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {friends?.map((friend) => (
                <div key={friend?.id} className="p-3 rounded-eco-md hover:bg-forest-gradient/10 organic-transition">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={friend?.avatar}
                          alt={friend?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                        friend?.isOnline ? 'bg-success' : 'bg-gray-400'
                      }`}>
                        <Icon 
                          name={getActivityIcon(friend?.activity)} 
                          size={8} 
                          color="white" 
                          strokeWidth={3}
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-body font-medium text-text-primary truncate">
                          {friend?.name}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Icon name="Award" size={12} className="text-achievement" />
                          <span className="text-xs text-text-secondary">Lvl {friend?.level}</span>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${getActivityColor(friend?.activity)} truncate`}>
                        {getActivityText(friend)}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={10} />
                          <span>{friend?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={10} />
                          <span>{friend?.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => onViewFriend(friend)}
                        className="p-1.5 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30"
                        title="View Profile"
                      >
                        <Icon name="Eye" size={14} />
                      </button>
                      
                      {friend?.activity === 'active_mission' && (
                        <button
                          onClick={() => onJoinFriend(friend)}
                          className="p-1.5 rounded-eco-sm organic-transition text-text-secondary hover:text-success hover:bg-green-50"
                          title="Join Mission"
                        >
                          <Icon name="UserPlus" size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mission Progress Bar */}
                  {friend?.activity === 'active_mission' && friend?.missionProgress && (
                    <div className="mt-3 pt-2 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>Mission Progress</span>
                        <span>{friend?.missionProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-forest to-success h-1.5 rounded-full organic-transition"
                          style={{ width: `${friend?.missionProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-t border-border bg-forest-gradient/5">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition text-sm font-body text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
              <Icon name="UserPlus" size={16} />
              <span>Invite Friends</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition text-sm font-body text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
              <Icon name="MessageCircle" size={16} />
              <span>Group Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsActivity;