import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ImpactCounters = () => {
  const [counters, setCounters] = useState({
    missionsCompleted: 0,
    wasteCollected: 0,
    treesPlanted: 0,
    volunteersActive: 0,
    co2Reduced: 0,
    communitiesReached: 0
  });

  const targetValues = {
    missionsCompleted: 2847,
    wasteCollected: 47250, // in pounds
    treesPlanted: 1289,
    volunteersActive: 5634,
    co2Reduced: 12400, // in pounds
    communitiesReached: 89
  };

  const impactData = [
    {
      key: 'missionsCompleted',
      label: 'Missions Completed',
      icon: 'Target',
      color: 'text-forest',
      bgColor: 'bg-forest-gradient/20',
      suffix: '',
      description: 'Environmental missions successfully completed by our community'
    },
    {
      key: 'wasteCollected',
      label: 'Waste Collected',
      icon: 'Trash2',
      color: 'text-ocean',
      bgColor: 'bg-ocean-gradient/20',
      suffix: ' lbs',
      description: 'Total pounds of waste removed from our environment'
    },
    {
      key: 'treesPlanted',
      label: 'Trees Planted',
      icon: 'TreePine',
      color: 'text-success',
      bgColor: 'bg-green-50',
      suffix: '',
      description: 'Native trees planted to restore ecosystems and combat climate change'
    },
    {
      key: 'volunteersActive',
      label: 'Active Volunteers',
      icon: 'Users',
      color: 'text-achievement',
      bgColor: 'bg-achievement-gradient/20',
      suffix: '',
      description: 'Environmental heroes actively participating in missions'
    },
    {
      key: 'co2Reduced',
      label: 'CO₂ Reduced',
      icon: 'Wind',
      color: 'text-sky',
      bgColor: 'bg-blue-50',
      suffix: ' lbs',
      description: 'Carbon dioxide emissions prevented through our collective actions'
    },
    {
      key: 'communitiesReached',
      label: 'Communities Reached',
      icon: 'Globe',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      suffix: '',
      description: 'Local communities impacted by our environmental initiatives'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "10,000th Tree Planted!",
      description: "Community milestone reached in urban reforestation",
      timestamp: new Date(Date.now() - 3600000),
      icon: 'TreePine',
      color: 'text-success'
    },
    {
      id: 2,
      title: "50 Tons of Waste Diverted",
      description: "Major waste reduction milestone achieved",
      timestamp: new Date(Date.now() - 7200000),
      icon: 'Recycle',
      color: 'text-ocean'
    },
    {
      id: 3,
      title: "New Community Partnership",
      description: "Oakland Environmental Alliance joined the platform",
      timestamp: new Date(Date.now() - 10800000),
      icon: 'Handshake',
      color: 'text-achievement'
    }
  ];

  const globalImpactComparison = {
    equivalent: {
      cars: Math.floor(targetValues?.co2Reduced / 4.6), // Average car emits 4.6 tons CO2/year
      homes: Math.floor(targetValues?.co2Reduced / 16000), // Average home emits 16,000 lbs CO2/year
      flights: Math.floor(targetValues?.co2Reduced / 1100) // Average flight emits 1,100 lbs CO2
    }
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounters({
          missionsCompleted: Math.floor(targetValues?.missionsCompleted * easeOutQuart),
          wasteCollected: Math.floor(targetValues?.wasteCollected * easeOutQuart),
          treesPlanted: Math.floor(targetValues?.treesPlanted * easeOutQuart),
          volunteersActive: Math.floor(targetValues?.volunteersActive * easeOutQuart),
          co2Reduced: Math.floor(targetValues?.co2Reduced * easeOutQuart),
          communitiesReached: Math.floor(targetValues?.communitiesReached * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(targetValues);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toLocaleString();
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className="space-y-6">
      {/* Main Impact Counters */}
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
            Global Environmental Impact
          </h2>
          <p className="text-text-secondary font-body">
            Real-time metrics showing our collective environmental achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactData?.map((item) => (
            <div key={item?.key} className={`p-6 rounded-eco-lg border-2 border-transparent hover:border-forest/20 organic-transition ${item?.bgColor}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-eco-md flex items-center justify-center ${item?.bgColor?.replace('/20', '/40')}`}>
                  <Icon name={item?.icon} size={24} className={item?.color} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-headline font-bold ${item?.color} mission-pulse`}>
                    {formatNumber(counters?.[item?.key])}{item?.suffix}
                  </div>
                  <div className="text-xs text-text-secondary font-body mt-1">
                    +{Math.floor(Math.random() * 10) + 1} today
                  </div>
                </div>
              </div>
              
              <h3 className="font-headline font-semibold text-text-primary mb-2">
                {item?.label}
              </h3>
              <p className="text-sm text-text-secondary font-body leading-relaxed">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Impact Equivalents */}
      <div className="bg-gradient-to-br from-achievement/10 to-orange-100 rounded-eco-lg border border-achievement/20 p-6">
        <div className="text-center mb-6">
          <Icon name="Zap" size={32} className="text-achievement mx-auto mb-3" />
          <h3 className="text-lg font-headline font-bold text-text-primary mb-2">
            Our CO₂ Reduction Impact
          </h3>
          <p className="text-text-secondary font-body">
            Understanding the real-world equivalent of our carbon footprint reduction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white/70 rounded-eco-md">
            <Icon name="Car" size={24} className="text-achievement mx-auto mb-2" />
            <div className="text-xl font-headline font-bold text-text-primary">
              {globalImpactComparison?.equivalent?.cars}
            </div>
            <p className="text-sm text-text-secondary font-body">
              Cars off the road for a year
            </p>
          </div>
          
          <div className="text-center p-4 bg-white/70 rounded-eco-md">
            <Icon name="Home" size={24} className="text-achievement mx-auto mb-2" />
            <div className="text-xl font-headline font-bold text-text-primary">
              {globalImpactComparison?.equivalent?.homes}
            </div>
            <p className="text-sm text-text-secondary font-body">
              Homes' annual emissions
            </p>
          </div>
          
          <div className="text-center p-4 bg-white/70 rounded-eco-md">
            <Icon name="Plane" size={24} className="text-achievement mx-auto mb-2" />
            <div className="text-xl font-headline font-bold text-text-primary">
              {globalImpactComparison?.equivalent?.flights}
            </div>
            <p className="text-sm text-text-secondary font-body">
              Round-trip flights avoided
            </p>
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-headline font-semibold text-text-primary">Recent Milestones</h3>
            <p className="text-text-secondary font-body">Latest community achievements and breakthroughs</p>
          </div>
          <Icon name="TrendingUp" size={24} className="text-success" />
        </div>

        <div className="space-y-4">
          {recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-start space-x-4 p-4 bg-surface/30 rounded-eco-md env-card-hover">
              <div className={`w-10 h-10 rounded-eco-sm flex items-center justify-center bg-white shadow-eco-sm`}>
                <Icon name={achievement?.icon} size={18} className={achievement?.color} />
              </div>
              <div className="flex-1">
                <h4 className="font-headline font-semibold text-text-primary mb-1">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-text-secondary font-body mb-2">
                  {achievement?.description}
                </p>
                <span className="text-xs text-text-secondary font-body">
                  {formatTimeAgo(achievement?.timestamp)}
                </span>
              </div>
              <div className="achievement-glow">
                <Icon name="Star" size={16} className="text-achievement" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Live Activity Feed */}
      <div className="bg-white rounded-eco-lg shadow-eco-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-headline font-semibold text-text-primary">Live Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-body">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm font-body">
            <Icon name="Plus" size={14} className="text-forest" />
            <span className="text-text-secondary">
              <span className="font-medium text-text-primary">Sarah M.</span> completed a beach cleanup mission
            </span>
            <span className="text-xs text-text-secondary">2 min ago</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm font-body">
            <Icon name="TreePine" size={14} className="text-success" />
            <span className="text-text-secondary">
              <span className="font-medium text-text-primary">Portland Eco Group</span> planted 15 trees
            </span>
            <span className="text-xs text-text-secondary">5 min ago</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm font-body">
            <Icon name="Users" size={14} className="text-achievement" />
            <span className="text-text-secondary">
              <span className="font-medium text-text-primary">3 new volunteers</span> joined the community
            </span>
            <span className="text-xs text-text-secondary">8 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCounters;