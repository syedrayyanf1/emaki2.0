import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Scroll from './pages/Scroll';
import Channels from './pages/Channels';
import Seasonal from './pages/Seasonal';
import Discovery from './pages/Discovery';
import Extras from './pages/Extras';
import Landing from './pages/Landing';

export function App() {
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
