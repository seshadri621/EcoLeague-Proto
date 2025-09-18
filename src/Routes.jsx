import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MissionUploadPortal from './pages/mission-upload-portal';
import AchievementGallery from './pages/achievement-gallery';
import QuestMap from './pages/quest-map';
import LearningArena from './pages/learning-arena';
import MissionControlDashboard from './pages/mission-control-dashboard';
import CommunityImpactHub from './pages/community-impact-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MissionControlDashboard />} />
        <Route path="/mission-control-dashboard" element={<MissionControlDashboard />} />
        <Route path="/mission-upload-portal" element={<MissionUploadPortal />} />
        <Route path="/achievement-gallery" element={<AchievementGallery />} />
        <Route path="/quest-map" element={<QuestMap />} />
        <Route path="/learning-arena" element={<LearningArena />} />
        <Route path="/community-impact-hub" element={<CommunityImpactHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
