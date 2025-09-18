import React from 'react';
import Icon from '../../../components/AppIcon';


const MapControls = ({ 
  mapView, 
  onMapViewChange, 
  radiusFilter, 
  onRadiusFilterChange, 
  showWeather, 
  onWeatherToggle,
  onLocationCenter,
  isCreatorMode,
  onCreatorModeToggle 
}) => {
  const radiusOptions = [
    { value: 1, label: '1 mile', icon: 'MapPin' },
    { value: 5, label: '5 miles', icon: 'Navigation' },
    { value: 10, label: '10 miles', icon: 'Car' },
    { value: 25, label: '25 miles', icon: 'Truck' }
  ];

  return (
    <div className="absolute top-4 left-4 z-20 space-y-3">
      {/* Map View Toggle */}
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onMapViewChange('satellite')}
            className={`px-3 py-2 rounded-eco-sm organic-transition text-sm font-body ${
              mapView === 'satellite' ?'bg-forest text-white' :'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
            }`}
          >
            <Icon name="Satellite" size={16} className="mr-1" />
            Satellite
          </button>
          <button
            onClick={() => onMapViewChange('illustrated')}
            className={`px-3 py-2 rounded-eco-sm organic-transition text-sm font-body ${
              mapView === 'illustrated' ?'bg-forest text-white' :'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
            }`}
          >
            <Icon name="Palette" size={16} className="mr-1" />
            Adventure
          </button>
        </div>
      </div>
      {/* Radius Filter */}
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-3">
        <h3 className="text-sm font-headline font-semibold text-forest mb-2">Search Radius</h3>
        <div className="grid grid-cols-2 gap-2">
          {radiusOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onRadiusFilterChange(option?.value)}
              className={`flex items-center space-x-2 px-2 py-2 rounded-eco-sm organic-transition text-xs font-body ${
                radiusFilter === option?.value
                  ? 'bg-forest-gradient text-forest border border-forest/20'
                  : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
              }`}
            >
              <Icon name={option?.icon} size={14} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Additional Controls */}
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-3 space-y-2">
        <button
          onClick={onWeatherToggle}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition text-sm font-body ${
            showWeather
              ? 'bg-ocean-gradient text-ocean border border-ocean/20' :'text-text-secondary hover:text-ocean hover:bg-ocean-gradient/30'
          }`}
        >
          <Icon name="Cloud" size={16} />
          <span>Weather Info</span>
        </button>

        <button
          onClick={onLocationCenter}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition text-sm font-body text-text-secondary hover:text-forest hover:bg-forest-gradient/30"
        >
          <Icon name="Crosshair" size={16} />
          <span>Center on Me</span>
        </button>

        <button
          onClick={onCreatorModeToggle}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-eco-sm organic-transition text-sm font-body ${
            isCreatorMode
              ? 'bg-achievement-gradient text-achievement border border-achievement/20' :'text-text-secondary hover:text-achievement hover:bg-achievement-gradient/30'
          }`}
        >
          <Icon name="Plus" size={16} />
          <span>Creator Mode</span>
        </button>
      </div>
    </div>
  );
};

export default MapControls;