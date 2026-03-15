import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Scroll from './pages/Scroll';
import Channels from './pages/Channels';
import Seasonal from './pages/Seasonal';
import Discovery from './pages/Discovery';
import Extras from './pages/Extras';

export function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/scroll" element={<Scroll />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/discover" element={<Discovery />} />
          <Route path="/extras" element={<Extras />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
