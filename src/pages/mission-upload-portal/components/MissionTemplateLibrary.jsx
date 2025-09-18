import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionTemplateLibrary = ({ onSelectTemplate, onCreateFromScratch }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 'beach-cleanup',
      title: 'Beach Cleanup Mission',
      category: 'cleanup',
      difficulty: 'beginner',
      duration: '3 hours',
      participants: '15-30',
      description: 'Organize a comprehensive beach cleanup with waste sorting and data collection.',
      features: ['Waste categorization', 'Photo documentation', 'Impact measurement', 'Safety protocols'],
      icon: 'Waves',
      color: 'ocean'
    },
    {
      id: 'tree-planting',
      title: 'Community Tree Planting',
      category: 'planting',
      difficulty: 'intermediate',
      duration: '4 hours',
      participants: '10-25',
      description: 'Plant native trees with proper soil preparation and long-term care planning.',
      features: ['Species selection guide', 'Planting techniques', 'Care instructions', 'Growth tracking'],
      icon: 'TreePine',
      color: 'forest'
    },
    {
      id: 'wildlife-monitoring',
      title: 'Urban Wildlife Survey',
      category: 'monitoring',
      difficulty: 'advanced',
      duration: '5 hours',
      participants: '8-15',
      description: 'Conduct systematic wildlife observation and data collection in urban environments.',
      features: ['Species identification', 'Data recording sheets', 'Observation techniques', 'Habitat assessment'],
      icon: 'Binoculars',
      color: 'achievement'
    },
    {
      id: 'river-cleanup',
      title: 'River Restoration Project',
      category: 'cleanup',
      difficulty: 'intermediate',
      duration: '6 hours',
      participants: '12-20',
      description: 'Clean waterways and restore riparian habitats with invasive species removal.',
      features: ['Water quality testing', 'Invasive species guide', 'Restoration techniques', 'Safety measures'],
      icon: 'Droplets',
      color: 'ocean'
    },
    {
      id: 'community-garden',
      title: 'Community Garden Setup',
      category: 'planting',
      difficulty: 'beginner',
      duration: '4 hours',
      participants: '15-25',
      description: 'Establish a community garden with sustainable growing practices.',
      features: ['Garden planning', 'Soil preparation', 'Plant selection', 'Maintenance schedule'],
      icon: 'Sprout',
      color: 'forest'
    },
    {
      id: 'education-workshop',
      title: 'Environmental Education Workshop',
      category: 'education',
      difficulty: 'beginner',
      duration: '2 hours',
      participants: '20-40',
      description: 'Interactive workshop teaching environmental awareness and sustainable practices.',
      features: ['Activity guides', 'Educational materials', 'Interactive games', 'Take-home resources'],
      icon: 'GraduationCap',
      color: 'achievement'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Templates', icon: 'Grid3X3' },
    { value: 'cleanup', label: 'Cleanup Projects', icon: 'Trash2' },
    { value: 'planting', label: 'Planting & Restoration', icon: 'TreePine' },
    { value: 'monitoring', label: 'Wildlife Monitoring', icon: 'Binoculars' },
    { value: 'education', label: 'Education & Outreach', icon: 'BookOpen' }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    const matchesSearch = template?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'forest': return 'from-green-500 to-green-600';
      case 'ocean': return 'from-blue-500 to-blue-600';
      case 'achievement': return 'from-orange-500 to-orange-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  return (
    <div className="bg-white rounded-eco-lg shadow-eco-md border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-headline font-semibold text-forest">Mission Templates</h2>
            <p className="text-text-secondary font-body">Choose from pre-built templates or start from scratch</p>
          </div>
          <Button variant="outline" onClick={onCreateFromScratch} iconName="Plus">
            Create from Scratch
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-eco-md focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => setSelectedCategory(category?.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-eco-md organic-transition whitespace-nowrap ${
                  selectedCategory === category?.value
                    ? 'bg-forest text-white'
                    : 'bg-muted text-text-secondary hover:bg-forest-gradient/30 hover:text-forest'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span className="text-sm font-medium">{category?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Templates Grid */}
      <div className="p-6">
        {filteredTemplates?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="font-headline font-medium text-text-primary mb-2">No templates found</h3>
            <p className="text-text-secondary mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates?.map((template) => (
              <div
                key={template?.id}
                className="bg-white border border-border rounded-eco-lg hover:shadow-eco-md organic-transition group"
              >
                {/* Template Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(template?.color)} rounded-eco-md flex items-center justify-center`}>
                      <Icon name={template?.icon} size={24} color="white" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template?.difficulty)}`}>
                      {template?.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="font-headline font-semibold text-text-primary mb-2">{template?.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{template?.description}</p>
                </div>

                {/* Template Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{template?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{template?.participants}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Includes:</h4>
                    <div className="space-y-1">
                      {template?.features?.slice(0, 3)?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-xs text-text-secondary">{feature}</span>
                        </div>
                      ))}
                      {template?.features?.length > 3 && (
                        <div className="text-xs text-text-secondary">
                          +{template?.features?.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => onSelectTemplate(template)}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-forest">{templates?.length}</div>
            <div className="text-sm text-text-secondary">Templates Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ocean">4</div>
            <div className="text-sm text-text-secondary">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-achievement">2-6</div>
            <div className="text-sm text-text-secondary">Hours Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">8-40</div>
            <div className="text-sm text-text-secondary">Participants</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTemplateLibrary;