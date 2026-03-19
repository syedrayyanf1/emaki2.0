import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Profile from '../features/profile/ProfilePage';
import Scroll from '../features/scroll/ScrollPage';
import Channels from '../features/channels/ChannelsPage';
import Discovery from '../features/discovery/DiscoveryPage';
import Extras from '../features/extras/ExtrasPage';
import Landing from '../features/landing/LandingPage';
import EntryDetail from '../features/entry/EntryDetailPage';

export function AppRouter() {
  useEffect(() => {
    // Enforce dark mode as the default majestic aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* Landing page as a dedicated starting point */}
        <Route path="/" element={<Landing />} />
        
        {/* App Shell Routes */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/scroll" element={<Scroll />} />
                <Route path="/channels" element={<Channels />} />
                <Route path="/discover" element={<Discovery />} />
                <Route path="/extras" element={<Extras />} />
                <Route path="/entry/:entryId" element={<EntryDetail />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}
