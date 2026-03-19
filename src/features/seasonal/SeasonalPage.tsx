import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Flame, Smile, Archive, X, Star, ChevronRight, Music, Zap, Award } from 'lucide-react';
import { SEASON_CAPSULES, ANIME_DB, POSTS } from '../../mock/mockData';

const SEASON_ICONS: Record<string, string> = {
  Winter: '❄️',
  Spring: '🌸',
  Summer: '☀️',
  Fall: '🍂',
};

// Mock generator for the extra details requested
const generateCapsuleDetails = (capsule: any) => {
  // Try to match anime titles to DB IDs for proper linking, fallback to Frieren (1) if not found in mock DB.
  const matchedAnime = capsule.coverAnime.map((title: string) => {
    const dbEntry = ANIME_DB.find(a => 
      a.title.toLowerCase().includes(title.toLowerCase()) || 
      (a.alternativeTitles && a.alternativeTitles.some(alt => alt.toLowerCase().includes(title.toLowerCase())))
    );
    return { title, id: dbEntry ? dbEntry.id : 1 };
  });

  return {
    topShows: [...matchedAnime, { title: 'Frieren: Beyond Journey\'s End', id: 1 }, { title: 'Dandadan', id: 3 }].slice(0, 5),
    topMemes: [
      '"Nah, I\'d win"',
      'Senshi Cooking Montage',
      'Fern\'s Pout',
      'Bocchi Glitch Frame',
      'Stark\'s Cowardice'
    ],
    surprise: { title: 'The Elusive Samurai', id: 1 },
    mvp: { title: 'Himmel the Hero', animeId: 1 },
    op: { title: 'Bling-Bang-Bang-Born (Creepy Nuts)', animeId: 12 },
    ed: { title: 'Anytime Anywhere (milet)', animeId: 1 }
  };
};

const getMetrics = (capsuleId: number) => {
  // In a real backend scenario, this hooks into the DB filtering by season dates.
  // We simulate live dynamic data for the current active capsule, and static historical data for past ones.
  if (capsuleId === SEASON_CAPSULES[0].id) {
    return {
      posts: POSTS.length + 320, // Base offset to simulate volume
      takes: POSTS.filter(p => p.channel === 'hot-takes').length + 85
    };
  }
  const cap = SEASON_CAPSULES.find(c => c.id === capsuleId);
  return {
    posts: cap?.topPosts || 0,
    takes: cap?.topTakes || 0
  };
};

// Subtle pin aesthetic to keep the motif without breaking the design language
const PaperPin = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-vermillion/10 flex items-center justify-center border border-vermillion/20 shadow-sm backdrop-blur-md z-10">
    <div className="h-2 w-2 rounded-full bg-vermillion/60 dark:bg-vermillion/80" />
  </div>
);

export default function Seasonal() {
  const [expandedCapsule, setExpandedCapsule] = useState<any>(null);

  const renderCapsuleBoard = (capsule: any) => {
    const details = generateCapsuleDetails(capsule);
    const metrics = getMetrics(capsule.id);
    
    return (
      <div className="paper-card relative p-6 sm:p-10 border-t-4 border-t-vermillion/60 bg-[#fffdf8] dark:bg-night-paper mt-3 shadow-lg">
        <PaperPin />
        
        {/* Header */}
        <div className="text-center mb-10 border-b border-black/5 dark:border-white/5 pb-6">
          <h2 className="font-logo text-3xl sm:text-4xl font-black text-ink dark:text-cream flex items-center justify-center gap-3">
            <span className="text-4xl">{SEASON_ICONS[capsule.season]}</span>
            {capsule.season} {capsule.year}
          </h2>
          <p className="text-sm text-ink-muted italic mt-3 max-w-lg mx-auto">
            "{capsule.description}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Column 1: The Vanguard */}
          <div className="bg-ink/5 dark:bg-white/5 rounded-xl p-6 border border-black/5 dark:border-white/5 h-full">
            <h3 className="font-logo text-xl font-bold text-ink dark:text-cream mb-4 flex items-center gap-2">
              <Star size={18} className="text-gold" /> The Vanguard
            </h3>
            <div className="flex flex-col gap-3">
              {details.topShows.map((show, idx) => (
                <Link 
                  key={idx} 
                  to={`/entry/${show.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 hover:border-vermillion/40 hover:shadow-md transition-all group"
                >
                  <span className="text-vermillion font-bold text-lg w-4">{idx + 1}.</span>
                  <span className="text-sm font-semibold text-ink-light dark:text-cream leading-tight group-hover:text-vermillion transition-colors">
                    {show.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Memes & Music */}
          <div className="space-y-6 h-full flex flex-col">
            <div className="bg-[#fffce8] dark:bg-[#33302a] rounded-xl p-6 shadow-inner border border-amber-500/10 flex-1">
              <h3 className="font-logo text-lg font-bold text-ink dark:text-cream mb-4 flex items-center gap-2">
                <Smile size={16} className="text-amber-500" /> Your Favourite Memes
              </h3>
              <ul className="space-y-3 font-serif italic text-sm text-ink-light dark:text-cream/90">
                {details.topMemes.map((meme, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 opacity-50">•</span> 
                    <span className="leading-tight">{meme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-6 shadow-inner border border-indigo-500/10 space-y-6">
              <div>
                <h3 className="font-logo text-sm font-bold text-ink dark:text-cream mb-2 flex items-center gap-2 opacity-80 uppercase tracking-widest">
                  <Music size={14} className="text-indigo-400" /> Top Opening
                </h3>
                <Link to={`/entry/${details.op.animeId}`} className="font-bold text-indigo-accent hover:text-indigo-500 dark:hover:text-indigo-300 block line-clamp-2">
                  {details.op.title}
                </Link>
              </div>
              <div>
                <h3 className="font-logo text-sm font-bold text-ink dark:text-cream mb-2 flex items-center gap-2 opacity-80 uppercase tracking-widest">
                  <Music size={14} className="text-indigo-400" /> Top Ending
                </h3>
                <Link to={`/entry/${details.ed.animeId}`} className="font-bold text-indigo-accent hover:text-indigo-500 dark:hover:text-indigo-300 block line-clamp-2">
                  {details.ed.title}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Awards & Metrics */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* Awards */}
            <div className="bg-ink/5 dark:bg-white/5 rounded-xl p-6 border border-black/5 dark:border-white/5 space-y-6 flex-1">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-vermillion mb-1 block flex items-center gap-1"><Zap size={12} /> Surprise of the season</span>
                <Link to={`/entry/${details.surprise.id}`} className="font-bold text-ink dark:text-cream text-lg leading-tight hover:text-vermillion transition-colors block">
                  {details.surprise.title}
                </Link>
              </div>
              
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-1 block flex items-center gap-1"><Award size={12} /> Community MVP</span>
                <Link to={`/entry/${details.mvp.animeId}`} className="font-bold text-ink dark:text-cream text-lg leading-tight hover:text-gold transition-colors block">
                  {details.mvp.title}
                </Link>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-6 bg-white dark:bg-night-paper rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-ink-muted uppercase tracking-widest text-[10px] font-bold">
                    <MessageSquare size={14} /> Total Threads
                  </div>
                  <div className="text-2xl font-black text-ink dark:text-cream">{metrics.posts.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink-muted uppercase tracking-widest text-[10px] font-bold">
                    <Flame size={14} className="text-vermillion" /> Blazing Takes
                  </div>
                  <div className="text-2xl font-black text-ink dark:text-cream">{metrics.takes.toLocaleString()}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="scroll-unroll space-y-8 max-w-6xl mx-auto px-4 pb-12">
      {/* Header */}
      <div className="text-center md:text-left mb-10">
        <h1 className="font-logo text-4xl font-bold text-ink dark:text-cream flex items-center justify-center md:justify-start gap-4">
          <Archive size={36} className="text-vermillion" />
          The Grand Archives
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-3 max-w-2xl mx-auto md:mx-0 leading-relaxed md:text-base">
          A majestic chronicle of community history. Relive the best shows, the spiciest takes, and the soundtracks that defined every season.
        </p>
      </div>

      {/* Main Seasonal Pinboard (Current/Latest) */}
      <div className="scroll-unroll scroll-unroll-delay-1 mb-16">
        <div className="flex items-center gap-2 mb-2 ml-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-vermillion shadow-sm shadow-vermillion/40"></span>
          </span>
          <span className="text-xs font-black text-vermillion uppercase tracking-widest">Latest Exhibition</span>
        </div>
        
        {renderCapsuleBoard(SEASON_CAPSULES[0])}
      </div>

      <div className="brushstroke-divider opacity-20 my-12" />

      {/* Past Seasons Grid */}
      <div className="scroll-unroll scroll-unroll-delay-2">
        <h2 className="font-logo text-2xl font-bold text-ink dark:text-cream flex items-center gap-3 mb-6 ml-2">
          <Archive size={22} className="text-ink-muted dark:text-cream-muted" />
          Past Exhibitions
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {SEASON_CAPSULES.slice(1).map((capsule) => (
            <div 
              key={capsule.id} 
              onClick={() => setExpandedCapsule(capsule)}
              className="paper-card paper-card-hover group cursor-pointer relative p-6 border-t-4 border-t-vermillion/40 hover:border-t-vermillion flex flex-col items-center justify-center text-center mt-3"
            >
              <PaperPin />
              <span className="text-5xl filter drop-shadow-sm mb-4 block mt-2">{SEASON_ICONS[capsule.season]}</span>
              <h3 className="font-logo text-xl font-bold text-ink dark:text-cream">{capsule.season} {capsule.year}</h3>
              
              <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 w-full">
                <span className="text-[10px] uppercase font-bold text-ink-muted group-hover:text-vermillion tracking-wider flex items-center justify-center gap-1 transition-colors">
                  Open Board <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      {expandedCapsule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-300 rounded-xl shadow-2xl bg-[#e8dfd2] dark:bg-[#1a1918]">
            <button 
              onClick={() => setExpandedCapsule(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-ink dark:bg-white text-cream dark:text-ink rounded-full shadow-xl hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
            {renderCapsuleBoard(expandedCapsule)}
          </div>
        </div>
      )}

    </div>
  );
}
