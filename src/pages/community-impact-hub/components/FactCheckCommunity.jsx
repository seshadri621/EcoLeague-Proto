import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FactCheckCommunity = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [newClaim, setNewClaim] = useState('');

  const factCheckItems = [
    {
      id: 1,
      claim: "Plastic bags take 1000 years to decompose in landfills",
      submittedBy: {
        name: "Jennifer Walsh",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        level: "Fact Seeker"
      },
      category: "Waste Management",
      status: "pending",
      votes: { accurate: 12, inaccurate: 3, needsMoreInfo: 5 },
      expertReviews: 2,
      sources: 4,
      submittedAt: new Date(Date.now() - 3600000),
      description: "I've heard this claim multiple times but want to verify the exact timeframe for plastic bag decomposition."
    },
    {
      id: 2,
      claim: "Electric vehicles produce more emissions than gas cars when accounting for battery production",
      submittedBy: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        level: "Climate Researcher"
      },
      category: "Transportation",
      status: "verified",
      votes: { accurate: 8, inaccurate: 23, needsMoreInfo: 4 },
      expertReviews: 3,
      sources: 7,
      submittedAt: new Date(Date.now() - 7200000),
      verificationResult: "Partially Accurate",
      expertSummary: "While EV battery production does create emissions, lifecycle analysis shows EVs produce 50-70% fewer emissions overall compared to gas vehicles.",
      description: "This claim has been circulating on social media and I want to understand the full picture."
    },
    {
      id: 3,
      claim: "Bamboo toothbrushes are always more environmentally friendly than plastic ones",
      submittedBy: {
        name: "Lisa Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        level: "Sustainable Living Advocate"
      },
      category: "Sustainable Products",
      status: "verified",
      votes: { accurate: 15, inaccurate: 8, needsMoreInfo: 2 },
      expertReviews: 2,
      sources: 5,
      submittedAt: new Date(Date.now() - 10800000),
      verificationResult: "Mostly Accurate",
      expertSummary: "Bamboo toothbrushes are generally more eco-friendly, but transportation emissions and packaging can vary the environmental impact.",
      description: "Want to verify this before recommending to my community group."
    },
    {
      id: 4,
      claim: "Recycling plastic actually uses more energy than creating new plastic",
      submittedBy: {
        name: "Michael Torres",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        level: "Environmental Student"
      },
      category: "Recycling",
      status: "disputed",
      votes: { accurate: 6, inaccurate: 18, needsMoreInfo: 9 },
      expertReviews: 4,
      sources: 8,
      submittedAt: new Date(Date.now() - 14400000),
      verificationResult: "Inaccurate",
      expertSummary: "Recycling plastic typically uses 60-70% less energy than producing virgin plastic, though energy requirements vary by plastic type.",
      description: "Heard this in a debate and want to get the facts straight."
    }
  ];

  const expertContributors = [
    {
      name: "Dr. Sarah Martinez",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      specialty: "Climate Science",
      verifications: 47,
      accuracy: 96
    },
    {
      name: "Prof. James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      specialty: "Environmental Engineering",
      verifications: 32,
      accuracy: 94
    },
    {
      name: "Dr. Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      specialty: "Sustainable Materials",
      verifications: 28,
      accuracy: 98
    }
  ];

  const tabs = [
    { key: 'pending', label: 'Pending Review', icon: 'Clock', count: 23 },
    { key: 'verified', label: 'Verified', icon: 'CheckCircle', count: 156 },
    { key: 'disputed', label: 'Disputed', icon: 'AlertTriangle', count: 12 },
    { key: 'submit', label: 'Submit Claim', icon: 'Plus', count: null }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-yellow-50 border-yellow-200';
      case 'verified': return 'text-success bg-green-50 border-green-200';
      case 'disputed': return 'text-error bg-red-50 border-red-200';
      default: return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getVerificationColor = (result) => {
    switch (result) {
      case 'Accurate': return 'text-success bg-green-100';
      case 'Mostly Accurate': return 'text-forest bg-green-50';
      case 'Partially Accurate': return 'text-warning bg-yellow-100';
      case 'Inaccurate': return 'text-error bg-red-100';
      default: return 'text-text-secondary bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const filteredItems = factCheckItems?.filter(item => 
    selectedTab === 'submit' ? false : item?.status === selectedTab
  );

  const handleSubmitClaim = () => {
    if (newClaim?.trim()) {
      // Handle claim submission
      setNewClaim('');
      setSelectedTab('pending');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-headline font-bold text-text-primary">Fact-Check Community</h2>
            <p className="text-text-secondary font-body">Crowdsourced verification of environmental claims</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-headline font-bold text-forest">1,247</p>
              <p className="text-xs text-text-secondary font-body">Claims Verified</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-headline font-bold text-achievement">94%</p>
              <p className="text-xs text-text-secondary font-body">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border">
        <div className="border-b border-border">
          <nav className="flex space-x-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setSelectedTab(tab?.key)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-body font-medium organic-transition ${
                  selectedTab === tab?.key
                    ? 'border-forest text-forest bg-forest-gradient/10'
                    : 'border-transparent text-text-secondary hover:text-forest hover:bg-forest-gradient/5'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
                {tab?.count !== null && (
                  <span className="px-2 py-0.5 bg-surface text-text-secondary text-xs rounded-full">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'submit' ? (
            /* Submit New Claim */
            (<div className="space-y-6">
              <div>
                <h3 className="text-lg font-headline font-semibold text-text-primary mb-2">Submit Environmental Claim for Verification</h3>
                <p className="text-text-secondary font-body">Help build our community knowledge base by submitting claims that need fact-checking.</p>
              </div>
              <div className="space-y-4">
                <Input
                  label="Environmental Claim"
                  type="text"
                  placeholder="Enter the environmental claim you'd like verified..."
                  value={newClaim}
                  onChange={(e) => setNewClaim(e?.target?.value)}
                  description="Be specific and include context where you heard or read this claim"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Category"
                    type="text"
                    placeholder="e.g., Climate Change, Recycling, Energy"
                  />
                  <Input
                    label="Source (Optional)"
                    type="text"
                    placeholder="Where did you encounter this claim?"
                  />
                </div>

                <Input
                  label="Additional Context"
                  type="text"
                  placeholder="Any additional information that might help with verification..."
                  description="Include why this claim is important to verify"
                />

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-text-secondary font-body">
                    Claims are reviewed by our expert community and verified through peer review.
                  </p>
                  <Button 
                    variant="default" 
                    iconName="Send" 
                    iconPosition="right"
                    onClick={handleSubmitClaim}
                    disabled={!newClaim?.trim()}
                  >
                    Submit for Review
                  </Button>
                </div>
              </div>
            </div>)
          ) : (
            /* Fact Check Items */
            (<div className="space-y-4">
              {filteredItems?.map((item) => (
                <div key={item?.id} className="border border-border rounded-eco-md p-6 env-card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item?.status)}`}>
                          {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                        </span>
                        <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-eco-sm font-body">
                          {item?.category}
                        </span>
                      </div>
                      <h3 className="font-headline font-semibold text-text-primary mb-2 leading-relaxed">
                        "{item?.claim}"
                      </h3>
                      <p className="text-sm text-text-secondary font-body mb-3">{item?.description}</p>
                    </div>
                  </div>

                  {/* Verification Result */}
                  {item?.verificationResult && (
                    <div className={`p-4 rounded-eco-md mb-4 ${getVerificationColor(item?.verificationResult)}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="CheckCircle" size={16} />
                        <span className="font-body font-semibold">Verification Result: {item?.verificationResult}</span>
                      </div>
                      <p className="text-sm font-body">{item?.expertSummary}</p>
                    </div>
                  )}

                  {/* Submitter Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={item?.submittedBy?.avatar}
                        alt={item?.submittedBy?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-body font-medium text-text-primary">{item?.submittedBy?.name}</p>
                        <p className="text-xs text-text-secondary font-body">{item?.submittedBy?.level}</p>
                      </div>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary font-body">{formatTimeAgo(item?.submittedAt)}</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-text-secondary font-body">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{Object.values(item?.votes)?.reduce((a, b) => a + b, 0)} votes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>{item?.sources} sources</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Award" size={14} />
                        <span>{item?.expertReviews} experts</span>
                      </div>
                    </div>
                  </div>

                  {/* Voting (for pending items) */}
                  {item?.status === 'pending' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-body text-text-secondary mb-3">Help verify this claim:</p>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" iconName="ThumbsUp" iconPosition="left">
                          Accurate ({item?.votes?.accurate})
                        </Button>
                        <Button variant="outline" size="sm" iconName="ThumbsDown" iconPosition="left">
                          Inaccurate ({item?.votes?.inaccurate})
                        </Button>
                        <Button variant="outline" size="sm" iconName="HelpCircle" iconPosition="left">
                          Need More Info ({item?.votes?.needsMoreInfo})
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>)
          )}
        </div>
      </div>
      {/* Expert Contributors */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">Expert Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expertContributors?.map((expert, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-surface/30 rounded-eco-md">
              <Image
                src={expert?.avatar}
                alt={expert?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-body font-semibold text-text-primary">{expert?.name}</h4>
                <p className="text-sm text-text-secondary font-body">{expert?.specialty}</p>
                <div className="flex items-center space-x-3 text-xs text-text-secondary font-body mt-1">
                  <span>{expert?.verifications} verifications</span>
                  <span>•</span>
                  <span className="text-success">{expert?.accuracy}% accuracy</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactCheckCommunity;