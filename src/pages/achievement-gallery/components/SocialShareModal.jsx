import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SocialShareModal = ({ isOpen, onClose, achievement }) => {
  const [shareText, setShareText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'from-pink-500 to-purple-600',
      description: 'Share as story or post'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      color: 'from-black to-gray-800',
      description: 'Create achievement video'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'from-blue-600 to-blue-700',
      description: 'Professional showcase'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'from-blue-400 to-blue-500',
      description: 'Tweet your success'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      description: 'Share with friends'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'from-green-500 to-green-600',
      description: 'Send to contacts'
    }
  ];

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev?.includes(platformId)
        ? prev?.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleShare = () => {
    // Handle sharing logic here
    console.log('Sharing to platforms:', selectedPlatforms);
    console.log('Share text:', shareText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-eco-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-text-primary text-xl">
              Share Achievement
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-text-primary hover:bg-gray-100"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Achievement Preview */}
        {achievement && (
          <div className="p-6 border-b border-border">
            <div className="bg-forest-gradient/10 rounded-eco-lg p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 achievement-glow">
                <Icon name={achievement?.icon} size={24} color="white" />
              </div>
              <h3 className="font-headline font-semibold text-forest text-lg mb-1">
                {achievement?.name}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {achievement?.description}
              </p>
            </div>
          </div>
        )}

        {/* Share Text */}
        <div className="p-6 border-b border-border">
          <Input
            label="Share Message"
            type="text"
            placeholder="Add a personal message..."
            value={shareText}
            onChange={(e) => setShareText(e?.target?.value)}
            description="Customize your message for social media"
          />
        </div>

        {/* Platform Selection */}
        <div className="p-6">
          <h3 className="font-headline font-semibold text-text-primary mb-4">
            Choose Platforms
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {socialPlatforms?.map((platform) => (
              <button
                key={platform?.id}
                onClick={() => handlePlatformToggle(platform?.id)}
                className={`p-4 rounded-eco-lg border-2 organic-transition ${
                  selectedPlatforms?.includes(platform?.id)
                    ? 'border-forest bg-forest-gradient/20'
                    : 'border-border hover:border-forest/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${platform?.color} rounded-full flex items-center justify-center`}>
                    <Icon name={platform?.icon} size={16} color="white" />
                  </div>
                  <div className="text-left">
                    <p className="font-headline font-medium text-text-primary text-sm">
                      {platform?.name}
                    </p>
                    <p className="text-xs text-text-secondary font-body">
                      {platform?.description}
                    </p>
                  </div>
                </div>
                {selectedPlatforms?.includes(platform?.id) && (
                  <div className="mt-2 flex justify-end">
                    <div className="w-5 h-5 bg-forest rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleShare}
              disabled={selectedPlatforms?.length === 0}
              iconName="Share2"
              iconPosition="left"
              className="flex-1"
            >
              Share Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;