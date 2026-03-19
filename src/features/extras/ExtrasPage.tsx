import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star, Clock, Flame, Quote, Download, BookOpen, Film, Trophy, Heart, MessageSquare, Smile, Archive, X, ChevronRight, Music, Zap, Award } from 'lucide-react';
import { ANIME_DB, getCoverGradient, USER_PROFILE, SEASON_CAPSULES, POSTS } from '../../mock/mockData';



const SEASON_ICONS: Record<string, string> = {
  Winter: '❄️',
  Spring: '🌸',
  Summer: '☀️',
  Fall: '🍂',
};

const generateCapsuleDetails = (capsule: any) => {
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
  if (capsuleId === SEASON_CAPSULES[0].id) {
    return {
      posts: POSTS.length + 320,
      takes: POSTS.filter(p => p.channel === 'hot-takes').length + 85
    };
  }
  const cap = SEASON_CAPSULES.find(c => c.id === capsuleId);
  return {
    posts: cap?.topPosts || 0,
    takes: cap?.topTakes || 0
  };
};

const PaperPin = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-vermillion/10 flex items-center justify-center border border-vermillion/20 shadow-sm backdrop-blur-md z-10">
    <div className="h-2 w-2 rounded-full bg-vermillion/60 dark:bg-vermillion/80" />
  </div>
);

export default function Extras() {
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
    <div className="scroll-unroll space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="font-serif-jp text-2xl font-bold text-ink dark:text-cream flex items-center gap-2">
          <Gift size={24} className="text-vermillion" />
          Extras
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-0.5">Your personal summaries, grand capsules & community echoes</p>
      </div>

      <div className="brushstroke-divider" />

      {/* CAPSULES SECTION (Moved to top) */}
      <div className="scroll-unroll scroll-unroll-delay-1 space-y-6">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream flex items-center gap-2">
          <Archive size={18} className="text-vermillion" />
          The Grand Archives
        </h2>
        
        {/* Main Seasonal Pinboard (Current/Latest) */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 ml-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-vermillion shadow-sm shadow-vermillion/40"></span>
            </span>
            <span className="text-xs font-black text-vermillion uppercase tracking-widest">Latest Exhibition</span>
          </div>
          {renderCapsuleBoard(SEASON_CAPSULES[0])}
        </div>

        {/* Past Seasons Grid */}
        <div>
          <h2 className="font-logo text-xl font-bold text-ink dark:text-cream mb-4 ml-2">
            Past Exhibitions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2">
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-300 rounded-xl shadow-2xl bg-[#e8dfd2] dark:bg-[#1a1918]">
              <button 
                onClick={() => setExpandedCapsule(null)}
                className="absolute top-4 right-4 z-[110] p-2 bg-ink dark:bg-white text-cream dark:text-ink rounded-full shadow-xl hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
              {renderCapsuleBoard(expandedCapsule)}
            </div>
          </div>
        )}
      </div>

      <div className="brushstroke-divider opacity-40 my-8" />

      {/* Emaki Wrapped */}
      <div className="scroll-unroll scroll-unroll-delay-2">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-4 flex items-center gap-2">
          🎁 Emaki Wrapped 2024
        </h2>

        <div className="paper-card rounded-2xl overflow-hidden">
          {/* Hero gradient */}
          <div className="relative bg-gradient-to-br from-vermillion via-vermillion-dark to-ink p-8 text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold font-serif-jp">
                  SK
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif-jp">{USER_PROFILE.username}'s 2024</h3>
                  <span className="text-xs opacity-80">Your year in anime & manga</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Film size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">42</div>
                  <div className="text-[10px] opacity-80">Anime Watched</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <BookOpen size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">18</div>
                  <div className="text-[10px] opacity-80">Manga Read</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Clock size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">847</div>
                  <div className="text-[10px] opacity-80">Hours Spent</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Star size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">9.1</div>
                  <div className="text-[10px] opacity-80">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5">
            {/* Top Anime */}
            <div>
              <h4 className="text-xs font-semibold text-ink-muted dark:text-cream-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Trophy size={12} className="text-gold" /> Your Top 5
              </h4>
              <div className="flex gap-2">
                {ANIME_DB.filter(a => a.rating).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5).map((entry, i) => (
                  <div key={entry.id} className="flex-1 text-center">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden relative group bg-ink/10 dark:bg-white/10">
                      {entry.cover ? (
                        <img src={entry.cover} alt={entry.title} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getCoverGradient(entry.id)} flex flex-col items-center justify-center text-white p-2`}>
                          <span className="font-serif-jp text-xl font-bold">{entry.titleJp.charAt(0)}</span>
                        </div>
                      )}
                      <span className="absolute top-1 left-1.5 text-[10px] font-bold bg-black/60 text-white rounded-full h-5 w-5 flex items-center justify-center z-10">
                        {i + 1}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 backdrop-blur-[2px]">
                        <span className="flex items-center justify-center gap-0.5 text-[10px] text-white">
                          <Star size={8} className="fill-yellow-300 text-yellow-300" /> {entry.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-ink dark:text-cream font-medium mt-1.5 leading-tight truncate px-0.5">{entry.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brushstroke-divider" />

            {/* Fun Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Flame size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">7</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Binge Sessions</div>
              </div>
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Heart size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">Action</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Top Genre</div>
              </div>
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Quote size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">23</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Echoes Written</div>
              </div>
            </div>

            {/* Share button */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-vermillion to-vermillion-dark px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-vermillion/20 hover:shadow-vermillion/30 transition-all hover:scale-105">
                <Download size={16} />
                Share as Image
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
