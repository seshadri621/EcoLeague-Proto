import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weatherData, isVisible }) => {
  if (!isVisible || !weatherData) return null;

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case'clear':
        return 'Sun';
      case 'cloudy': case'overcast':
        return 'Cloud';
      case 'rainy': case'rain':
        return 'CloudRain';
      case 'stormy':
        return 'CloudLightning';
      case 'snowy': case'snow':
        return 'CloudSnow';
      case 'windy':
        return 'Wind';
      default:
        return 'Cloud';
    }
  };

  const getOptimalMissionSuggestion = (weather) => {
    if (weather?.temperature >= 65 && weather?.temperature <= 80 && weather?.condition === 'sunny') {
      return { text: 'Perfect for outdoor missions!', color: 'text-success' };
    } else if (weather?.condition === 'rainy') {
      return { text: 'Indoor missions recommended', color: 'text-warning' };
    } else if (weather?.temperature < 40) {
      return { text: 'Bundle up for missions!', color: 'text-ocean' };
    } else {
      return { text: 'Good conditions for missions', color: 'text-forest' };
    }
  };

  const suggestion = getOptimalMissionSuggestion(weatherData);

  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-4 w-64">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-headline font-semibold text-forest">Current Weather</h3>
          <div className="flex items-center space-x-2">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={20} className="text-ocean" />
            <span className="text-lg font-bold text-text-primary">{weatherData?.temperature}°F</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Condition:</span>
            <span className="font-medium text-text-primary capitalize">{weatherData?.condition}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Humidity:</span>
            <span className="font-medium text-text-primary">{weatherData?.humidity}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Wind:</span>
            <span className="font-medium text-text-primary">{weatherData?.windSpeed} mph</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">UV Index:</span>
            <span className="font-medium text-text-primary">{weatherData?.uvIndex}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} className="text-achievement" />
            <span className={`text-sm font-medium ${suggestion?.color}`}>
              {suggestion?.text}
            </span>
          </div>
        </div>

        {/* Air Quality Index */}
        <div className="mt-3 p-2 bg-forest-gradient/10 rounded-eco-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Air Quality:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                weatherData?.airQuality === 'Good' ? 'bg-success' :
                weatherData?.airQuality === 'Moderate' ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="text-sm font-medium text-text-primary">{weatherData?.airQuality}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;