import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";

const MissionUploadPortal = lazy(() => import('./pages/mission-upload-portal'));
const AchievementGallery = lazy(() => import('./pages/achievement-gallery'));
const QuestMap = lazy(() => import('./pages/quest-map'));
const LearningArena = lazy(() => import('./pages/learning-arena'));
const MissionControlDashboard = lazy(() => import('./pages/mission-control-dashboard'));
const CommunityImpactHub = lazy(() => import('./pages/community-impact-hub'));
const NgoList = lazy(() => import('./pages/NgoList'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const Routes = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={!currentUser ? <Login /> : <Navigate to="/mission-control-dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/mission-control-dashboard" element={<MissionControlDashboard />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/mission-upload-portal" element={<MissionUploadPortal />} />
              <Route path="/achievement-gallery" element={<AchievementGallery />} />
              <Route path="/quest-map" element={<QuestMap />} />
              <Route path="/learning-arena" element={<LearningArena />} />
              <Route path="/community-impact-hub" element={<CommunityImpactHub />} />
              <Route path="/ngo-list" element={<NgoList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;