import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MissionUploadPortal from './pages/mission-upload-portal';
import AchievementGallery from './pages/achievement-gallery';
import QuestMap from './pages/quest-map';
import LearningArena from './pages/learning-arena';
import MissionControlDashboard from './pages/mission-control-dashboard';
import CommunityImpactHub from './pages/community-impact-hub';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";

const Routes = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={!currentUser ? <LandingPage /> : <Navigate to="/mission-control-dashboard" />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/mission-control-dashboard" element={<MissionControlDashboard />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/mission-upload-portal" element={<MissionUploadPortal />} />
            <Route path="/achievement-gallery" element={<AchievementGallery />} />
            <Route path="/quest-map" element={<QuestMap />} />
            <Route path="/learning-arena" element={<LearningArena />} />
            <Route path="/community-impact-hub" element={<CommunityImpactHub />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
