import { useState } from 'react';
import { Search, LogIn, UserPlus } from 'lucide-react';
import { ANIME_DB } from '../data/mockData';

interface LandingProps {
  onAuth: () => void;
}

export default function Landing({ onAuth }: LandingProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : ANIME_DB.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleJp.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <div className="min-h-screen bg-parchment dark:bg-night flex flex-col items-center justify-center p-6 text-center scroll-unroll">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-vermillion blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-vermillion blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full space-y-12">
        {/* Branding */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-vermillion/10 shadow-2xl shadow-vermillion/20 mb-4 group transition-transform hover:scale-105 duration-500">
            <img src="/logo.png" alt="Emaki Logo" className="h-16 w-16 drop-shadow-[0_0_15px_rgba(199,62,29,0.5)]" />
          </div>
          <h1 className="font-logo text-6xl font-bold tracking-tight text-ink dark:text-cream">
            Emaki
            <span className="font-serif-jp text-xl text-ink-muted ml-3 opacity-60">絵巻</span>
          </h1>
          <p className="text-xl text-ink-muted dark:text-cream-muted max-w-lg mx-auto leading-relaxed">
            Your majestic chronicle of anime and manga. Unroll the scroll and share your journey with the community.
          </p>
        </div>

        {/* Global Unified Search */}
        <div className="relative max-w-md mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-vermillion/30 to-vermillion-dark/30 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-ink-muted group-focus-within:text-vermillion transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search anime or manga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-vermillion/20 focus:border-vermillion/50 transition-all text-ink dark:text-cream shadow-xl"
            />
          </div>

          {/* Search Results Preview */}
          {filteredResults.length > 0 && (
            <div className="absolute top-full mt-3 w-full paper-card rounded-2xl overflow-hidden shadow-2xl p-2 z-50">
              {filteredResults.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-vermillion/5 transition-colors cursor-pointer group">
                  <div className="h-12 w-8 rounded-md overflow-hidden bg-ink/10">
                    <img src={item.cover} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink dark:text-cream truncate">{item.title}</div>
                    <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase font-black tracking-widest">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onAuth}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-vermillion hover:bg-vermillion-dark text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-vermillion/30"
          >
            <UserPlus size={20} />
            Start Your Scroll
          </button>
          <button 
            onClick={onAuth}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-white/5 hover:bg-ink/5 dark:hover:bg-white/10 border border-[#e8dfd2] dark:border-white/10 text-ink dark:text-cream px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <LogIn size={20} />
            Login
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-8 opacity-40">
          <p className="text-xs text-ink-muted dark:text-cream-muted uppercase tracking-[0.2em] font-black">
            No account required for discovery & exploration
          </p>
        </div>
      </div>
    </div>
  );
}
