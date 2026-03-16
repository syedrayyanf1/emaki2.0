import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Profile from '../features/profile/ProfilePage';
import Scroll from '../features/scroll/ScrollPage';
import Channels from '../features/channels/ChannelsPage';
import Seasonal from '../features/seasonal/SeasonalPage';
import Discovery from '../features/discovery/DiscoveryPage';
import Extras from '../features/extras/ExtrasPage';
import Landing from '../features/landing/LandingPage';

export function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Landing page for unauthenticated users */}
        {!isAuthenticated ? (
          <Route path="*" element={<Landing onAuth={handleAuth} />} />
        ) : (
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Profile />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/scroll" element={<Scroll />} />
                  <Route path="/channels" element={<Channels />} />
                  <Route path="/seasonal" element={<Seasonal />} />
                  <Route path="/discover" element={<Discovery />} />
                  <Route path="/extras" element={<Extras />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
        )}
      </Routes>
    </HashRouter>
  );
}
