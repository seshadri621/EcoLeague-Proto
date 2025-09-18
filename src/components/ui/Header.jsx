import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Mission Control', path: '/mission-control-dashboard', icon: 'Compass' },
    { name: 'Quest Map', path: '/quest-map', icon: 'Map' },
    { name: 'Learning Arena', path: '/learning-arena', icon: 'BookOpen' },
    { name: 'Community Hub', path: '/community-impact-hub', icon: 'Users' }
  ];

  const secondaryItems = [
    { name: 'Upload Mission', path: '/mission-upload-portal', icon: 'Upload' },
    { name: 'Achievements', path: '/achievement-gallery', icon: 'Award' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-eco border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/mission-control-dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-forest to-primary rounded-eco-md flex items-center justify-center mission-pulse">
                  <Icon name="Leaf" size={24} color="white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-headline font-bold text-gradient-forest">
                  EcoLeague
                </h1>
                <p className="text-xs text-text-secondary font-body">
                  Environmental Heroes
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-eco-sm organic-transition font-body font-medium ${
                  isActivePath(item?.path)
                    ? 'bg-forest-gradient text-forest border border-forest/20'
                    : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-eco-sm organic-transition font-body font-medium text-text-secondary hover:text-forest hover:bg-forest-gradient/50">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-eco-md shadow-eco-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible organic-transition">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 organic-transition font-body ${
                        isActivePath(item?.path)
                          ? 'bg-forest-gradient text-forest'
                          : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/30'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-achievement rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>

            {/* Profile Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-1 rounded-eco-sm organic-transition hover:bg-forest-gradient/30">
                <div className="w-8 h-8 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </button>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-eco-md shadow-eco-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible organic-transition">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-body font-medium text-text-primary">Environmental Hero</p>
                    <p className="text-sm text-text-secondary">Level 5 Explorer</p>
                  </div>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-left organic-transition font-body text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-left organic-transition font-body text-text-secondary hover:text-forest hover:bg-forest-gradient/30">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-left organic-transition font-body text-text-secondary hover:text-error hover:bg-red-50">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-eco-sm organic-transition text-text-secondary hover:text-forest hover:bg-forest-gradient/30"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-eco-sm organic-transition font-body font-medium ${
                    isActivePath(item?.path)
                      ? 'bg-forest-gradient text-forest border border-forest/20'
                      : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/50'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-eco-sm organic-transition font-body font-medium ${
                      isActivePath(item?.path)
                        ? 'bg-forest-gradient text-forest border border-forest/20'
                        : 'text-text-secondary hover:text-forest hover:bg-forest-gradient/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;