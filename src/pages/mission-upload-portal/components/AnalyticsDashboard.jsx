import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsDashboard = ({ onClose }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  // Mock analytics data
  const participationData = [
    { name: 'Week 1', participants: 45, missions: 3 },
    { name: 'Week 2', participants: 62, missions: 4 },
    { name: 'Week 3', participants: 38, missions: 2 },
    { name: 'Week 4', participants: 71, missions: 5 }
  ];

  const impactData = [
    { name: 'Jan', wasteCollected: 120, treesPlanted: 45, volunteersEngaged: 89 },
    { name: 'Feb', wasteCollected: 150, treesPlanted: 62, volunteersEngaged: 112 },
    { name: 'Mar', wasteCollected: 180, treesPlanted: 38, volunteersEngaged: 95 },
    { name: 'Apr', wasteCollected: 220, treesPlanted: 71, volunteersEngaged: 134 }
  ];

  const categoryData = [
    { name: 'Cleanup', value: 45, color: '#2D5A27' },
    { name: 'Planting', value: 30, color: '#1B4B73' },
    { name: 'Monitoring', value: 15, color: '#E67E22' },
    { name: 'Education', value: 10, color: '#10B981' }
  ];

  const engagementMetrics = [
    {
      title: 'Total Participants',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: 'Users',
      color: 'forest'
    },
    {
      title: 'Active Missions',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: 'Target',
      color: 'ocean'
    },
    {
      title: 'Completion Rate',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Community Impact',
      value: '2.4k lbs',
      change: '+18.7%',
      trend: 'up',
      icon: 'Zap',
      color: 'achievement'
    }
  ];

  const topMissions = [
    {
      title: 'Central Park Cleanup',
      participants: 45,
      completion: 92,
      impact: '156 lbs waste collected'
    },
    {
      title: 'Brooklyn Tree Planting',
      participants: 32,
      completion: 88,
      impact: '28 trees planted'
    },
    {
      title: 'Hudson River Monitoring',
      participants: 18,
      completion: 95,
      impact: '12 species documented'
    }
  ];

  const getColorClass = (color) => {
    switch (color) {
      case 'forest': return 'text-forest';
      case 'ocean': return 'text-ocean';
      case 'success': return 'text-success';
      case 'achievement': return 'text-achievement';
      default: return 'text-forest';
    }
  };

  const getBgColorClass = (color) => {
    switch (color) {
      case 'forest': return 'bg-forest-gradient/20';
      case 'ocean': return 'bg-blue-50';
      case 'success': return 'bg-green-50';
      case 'achievement': return 'bg-orange-50';
      default: return 'bg-forest-gradient/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-eco-lg shadow-eco-lg border border-border w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-headline font-semibold text-forest">Mission Analytics</h2>
              <p className="text-text-secondary font-body">Comprehensive performance insights and impact metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {timeRanges?.map((range) => (
                  <button
                    key={range?.value}
                    onClick={() => setSelectedTimeRange(range?.value)}
                    className={`px-3 py-1.5 rounded-eco-sm text-sm font-medium organic-transition ${
                      selectedTimeRange === range?.value
                        ? 'bg-forest text-white'
                        : 'text-text-secondary hover:bg-forest-gradient/30 hover:text-forest'
                    }`}
                  >
                    {range?.label}
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={onClose} iconName="X" size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementMetrics?.map((metric, index) => (
              <div key={index} className={`p-6 rounded-eco-lg border border-border ${getBgColorClass(metric?.color)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getBgColorClass(metric?.color)} rounded-eco-md flex items-center justify-center`}>
                    <Icon name={metric?.icon} size={24} className={getColorClass(metric?.color)} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric?.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                    <span>{metric?.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary mb-1">{metric?.value}</div>
                  <div className="text-sm text-text-secondary">{metric?.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Participation Trends */}
            <div className="bg-white border border-border rounded-eco-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-headline font-semibold text-forest">Participation Trends</h3>
                <Icon name="TrendingUp" size={20} className="text-forest" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={participationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB', 
                        borderRadius: '8px' 
                      }} 
                    />
                    <Bar dataKey="participants" fill="#2D5A27" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mission Categories */}
            <div className="bg-white border border-border rounded-eco-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-headline font-semibold text-forest">Mission Categories</h3>
                <Icon name="PieChart" size={20} className="text-forest" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData?.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category?.color }}
                    ></div>
                    <span className="text-sm text-text-secondary">{category?.name}</span>
                    <span className="text-sm font-medium text-text-primary">{category?.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Over Time */}
          <div className="bg-white border border-border rounded-eco-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-headline font-semibold text-forest">Environmental Impact Over Time</h3>
              <Icon name="BarChart3" size={20} className="text-forest" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wasteCollected" 
                    stroke="#2D5A27" 
                    strokeWidth={3}
                    dot={{ fill: '#2D5A27', strokeWidth: 2, r: 4 }}
                    name="Waste Collected (lbs)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="treesPlanted" 
                    stroke="#1B4B73" 
                    strokeWidth={3}
                    dot={{ fill: '#1B4B73', strokeWidth: 2, r: 4 }}
                    name="Trees Planted"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volunteersEngaged" 
                    stroke="#E67E22" 
                    strokeWidth={3}
                    dot={{ fill: '#E67E22', strokeWidth: 2, r: 4 }}
                    name="Volunteers Engaged"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Missions */}
          <div className="bg-white border border-border rounded-eco-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-headline font-semibold text-forest">Top Performing Missions</h3>
              <Icon name="Award" size={20} className="text-forest" />
            </div>
            <div className="space-y-4">
              {topMissions?.map((mission, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-eco-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-forest to-green-600 rounded-eco-md flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{mission?.title}</h4>
                      <p className="text-sm text-text-secondary">{mission?.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-forest">{mission?.participants}</div>
                      <div className="text-text-secondary">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success">{mission?.completion}%</div>
                      <div className="text-text-secondary">Completion</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-forest-gradient/20 p-6 rounded-eco-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline font-semibold text-forest mb-2">Export Analytics</h3>
                <p className="text-text-secondary">Download detailed reports for stakeholder presentations</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="FileText">
                  Export PDF
                </Button>
                <Button variant="outline" iconName="Download">
                  Export CSV
                </Button>
                <Button variant="default" iconName="Share">
                  Share Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;