import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, BookOpen, MessageSquare, Compass, Cherry, Gift, Menu, X } from 'lucide-react';
import { USER_PROFILE, RANKS } from '../data/mockData';

const NAV_ITEMS = [
  { path: '/', label: 'Profile', icon: User },
  { path: '/scroll', label: 'Scroll', icon: BookOpen },
  { path: '/channels', label: 'Channels', icon: MessageSquare },
  { path: '/seasonal', label: 'Seasonal', icon: Cherry },
  { path: '/discover', label: 'Discover', icon: Compass },
  { path: '/extras', label: 'Extras', icon: Gift },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }, []);

  return (
    <div className="min-h-screen bg-parchment transition-colors duration-300 dark:bg-night">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[#e8dfd2] dark:border-white/5 bg-parchment/95 dark:bg-night/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Emaki Logo" className="h-8 w-8 transition-transform group-hover:rotate-12 drop-shadow-[0_0_8px_rgba(199,62,29,0.3)]" />
            <span className="font-logo text-2xl font-bold tracking-tight text-ink dark:text-cream">
              Emaki
            </span>
            <span className="font-serif-jp text-xs text-ink-muted hidden sm:block">絵巻</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? 'bg-vermillion/10 text-vermillion dark:bg-vermillion/20'
                      : 'text-ink-muted hover:text-ink dark:hover:text-cream hover:bg-ink/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Profile + Actions */}
          <div className="flex items-center gap-4">
            {/* User mini */}
            <div className="flex items-center gap-2 pl-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-vermillion to-vermillion-dark flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-vermillion/20 border border-white/10">
                SK
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-ink dark:text-cream leading-none">{USER_PROFILE.username}</span>
                <span className="text-[10px] text-vermillion dark:text-vermillion-light font-medium">{USER_PROFILE.rank.kanji} {USER_PROFILE.rank.name}</span>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-[#e8dfd2] dark:border-white/5 bg-parchment dark:bg-night px-4 py-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-vermillion/10 text-vermillion'
                      : 'text-ink-muted hover:text-ink dark:hover:text-cream hover:bg-ink/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#e8dfd2] dark:border-white/5 bg-parchment-dark/30 dark:bg-night-paper/30 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-2xl">🏮</span>
                <span className="font-serif-jp text-xl font-bold tracking-wide text-ink dark:text-cream">
                  Emaki
                </span>
              </div>
              <p className="text-sm text-ink-muted dark:text-cream-muted leading-relaxed">
                Your Anime & Manga Scroll. A curated digital chronicle of stories that move the soul.
              </p>
            </div>

            {/* Global Rank Ladder */}
            <div className="paper-card rounded-xl p-6 flex-1 max-w-md">
              <h3 className="text-xs font-semibold text-ink-muted dark:text-cream-muted uppercase tracking-widest mb-4">Rank Ladder</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2">
                {RANKS.map(rank => (
                  <div
                    key={rank.name}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-3 text-center transition-all ${
                      rank.name === USER_PROFILE.rank.name
                        ? 'bg-vermillion/10 text-vermillion dark:bg-vermillion/20 border border-vermillion/20'
                        : 'text-ink-muted dark:text-cream-muted hover:bg-ink/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="font-serif-jp text-lg">{rank.kanji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{rank.name}</span>
                    {rank.name === USER_PROFILE.rank.name && <span className="text-[8px] font-medium opacity-70">CURRENT</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#e8dfd2] dark:border-white/5 text-center">
            <p className="text-[10px] text-ink-muted dark:text-cream-muted uppercase tracking-widest">
              © 2024 EMAKI — UNROLL YOUR STORY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
