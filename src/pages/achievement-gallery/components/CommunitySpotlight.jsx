import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunitySpotlight = ({ spotlight }) => {
  return (
    <div className="bg-gradient-to-br from-achievement/10 to-orange-100 rounded-eco-lg p-6 border border-achievement/20">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center achievement-glow">
          <Icon name="Star" size={20} color="white" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-achievement text-lg">
            Community Spotlight
          </h3>
          <p className="text-sm text-text-secondary font-body">
            {spotlight?.period} Recognition
          </p>
        </div>
      </div>
      {/* Featured User */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Image
            src={spotlight?.user?.avatar}
            alt={spotlight?.user?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-achievement"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-achievement rounded-full flex items-center justify-center border-2 border-white">
            <Icon name="Crown" size={12} color="white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-headline font-semibold text-text-primary text-lg">
            {spotlight?.user?.name}
          </h4>
          <p className="text-sm text-text-secondary font-body mb-1">
            {spotlight?.user?.title}
          </p>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={14} color="var(--color-achievement)" />
              <span className="text-sm font-medium text-achievement">
                {spotlight?.user?.badges} badges
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Target" size={14} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">
                {spotlight?.user?.missions} missions
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Description */}
      <div className="bg-white/50 rounded-eco-md p-4 mb-4">
        <h5 className="font-headline font-semibold text-forest mb-2">
          Outstanding Achievement
        </h5>
        <p className="text-text-secondary font-body text-sm leading-relaxed">
          {spotlight?.achievement}
        </p>
      </div>
      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {spotlight?.metrics?.map((metric, index) => (
          <div key={index} className="text-center bg-white/50 rounded-eco-sm p-3">
            <div className="flex items-center justify-center mb-1">
              <Icon name={metric?.icon} size={20} color="var(--color-forest)" />
            </div>
            <p className="text-lg font-bold text-forest font-headline">
              {metric?.value}
            </p>
            <p className="text-xs text-text-secondary font-body">
              {metric?.label}
            </p>
          </div>
        ))}
      </div>
      {/* Quote */}
      {spotlight?.quote && (
        <div className="bg-white/50 rounded-eco-md p-4 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Quote" size={16} color="var(--color-achievement)" className="mt-1 flex-shrink-0" />
            <p className="text-text-primary font-body italic text-sm leading-relaxed">
              {spotlight?.quote}
            </p>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <button className="flex-1 bg-achievement text-white px-4 py-2 rounded-eco-sm font-medium organic-transition hover:bg-orange-600 quest-button">
          View Profile
        </button>
        <button className="px-4 py-2 border border-achievement text-achievement rounded-eco-sm font-medium organic-transition hover:bg-achievement hover:text-white">
          Follow
        </button>
        <button className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-achievement hover:bg-orange-50">
          <Icon name="Share2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default CommunitySpotlight;