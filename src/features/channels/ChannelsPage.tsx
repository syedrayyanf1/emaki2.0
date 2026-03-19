import { useState } from 'react';
import { Hash, MessageSquare, Filter, Eye, EyeOff } from 'lucide-react';
import { POSTS, ANIME_DB, getCoverGradient } from '../../mock/mockData';

import { CHANNEL_CONFIG, PostCard } from '../../shared/components/PostCard';

type ChannelType = 'all' | 'episode' | 'analysis' | 'recommendations' | 'hot-takes';

export default function Channels() {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('all');
  const [selectedAnime, setSelectedAnime] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [finishedOnly, setFinishedOnly] = useState(false);
  const [animeSearch, setAnimeSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'anime' | 'manga'>('anime');

  const filteredPosts = POSTS.filter(post => {
    if (activeChannel !== 'all' && post.channel !== activeChannel) return false;
    if (selectedAnime !== null && post.animeId !== selectedAnime) return false;
    if (selectedEpisode !== null && post.episode !== selectedEpisode) return false;
    
    const anime = ANIME_DB.find(a => a.id === post.animeId);
    if (anime?.type !== typeFilter) return false;
    if (finishedOnly && anime?.status !== 'completed') return false;
    
    return true;
  });

  const uniqueAnime = [...new Map(POSTS.map(p => {
    const anime = ANIME_DB.find(a => a.id === p.animeId);
    return [p.animeId, { id: p.animeId, title: p.animeTitle, type: anime?.type, status: anime?.status }];
  })).values()].filter(a => {
    if (a.type !== typeFilter) return false;
    if (finishedOnly && a.status !== 'completed') return false;
    
    if (animeSearch.trim() === '') {
      return a.id === selectedAnime;
    }
    
    return a.title.toLowerCase().includes(animeSearch.toLowerCase());
  });

  return (
    <div className="scroll-unroll">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-accent text-3xl font-bold text-ink dark:text-cream flex items-center gap-3">
          <MessageSquare size={28} className="text-vermillion" />
          The Grand Library
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-2 max-w-2xl leading-relaxed">
          The central hub of Emaki discussions. Organized by genre, series, and specific episodes. Unroll your thoughts and join the chronicle.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Channel Sidebar */}
        <div className="lg:w-64 shrink-0 space-y-3">
          {/* Channel List */}
          <div className="paper-card rounded-xl p-3">
            <h3 className="text-[10px] font-semibold text-ink-muted dark:text-cream-muted uppercase tracking-wider mb-2 px-1">Channels</h3>
            <button
              onClick={() => setActiveChannel('all')}
              className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-all ${
                activeChannel === 'all' ? 'bg-vermillion/10 text-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
              }`}
            >
              <Filter size={14} /> All Channels
            </button>
            {Object.entries(CHANNEL_CONFIG).map(([key, conf]) => {
              const Icon = conf.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveChannel(key as ChannelType)}
                  className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-all ${
                    activeChannel === key ? 'bg-vermillion/10 text-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1 text-left text-xs">{conf.label}</span>
                  <span className="text-[10px] opacity-50">{POSTS.filter(p => p.channel === key).length}</span>
                </button>
              );
            })}
          </div>

          {/* Anime Filter */}
          <div className="paper-card rounded-xl p-3 space-y-3">
            <h3 className="text-[10px] font-black text-ink-muted dark:text-cream-muted uppercase tracking-[0.2em] mb-1 px-1">Filter Series</h3>
            
            <div className="relative">
              <input 
                type="text"
                placeholder="Search series..."
                value={animeSearch}
                onChange={(e) => setAnimeSearch(e.target.value)}
                className="w-full bg-ink/5 dark:bg-white/5 border border-[#e8dfd2] dark:border-white/10 rounded-lg py-1.5 pl-8 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-vermillion/30 transition-all"
              />
              <Filter className="absolute left-2.5 top-2 text-ink-muted opacity-40" size={12} />
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              <button
                onClick={() => setSelectedAnime(null)}
                className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                  selectedAnime === null ? 'bg-vermillion/10 text-vermillion shadow-sm' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
                }`}
              >
                All Series
              </button>
              {uniqueAnime.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAnime(a.id)}
                  className={`w-full text-left rounded-lg px-2.5 py-2 text-xs font-medium transition-all flex items-center gap-2 ${
                    selectedAnime === a.id ? 'bg-vermillion/10 text-vermillion border-l-2 border-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
                  }`}
                >
                  <div className="h-5 w-5 rounded overflow-hidden bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                    {(() => {
                      const anime = ANIME_DB.find(x => x.id === a.id);
                      return anime?.logo ? (
                        <img src={anime.logo} alt={a.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${getCoverGradient(a.id)} flex items-center justify-center text-white text-[7px] font-bold`}>
                          {anime?.titleJp.charAt(0) || '?'}
                        </div>
                      );
                    })()}
                  </div>
                  <span className="truncate flex-1">{a.title}</span>
                </button>
              ))}
              {uniqueAnime.length === 0 && animeSearch.trim() !== '' && (
                <p className="text-[10px] text-center py-4 text-ink-muted italic opacity-60">No matching series</p>
              )}
            </div>
          </div>

          {/* Finished Only Toggle */}
          <div className="paper-card rounded-xl p-3">
            <button
              onClick={() => setFinishedOnly(!finishedOnly)}
              className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-[11px] font-black uppercase tracking-wider transition-all ${
                finishedOnly ? 'bg-sage-green/10 text-sage-green shadow-[inset_0_0_10px_rgba(34,197,94,0.1)]' : 'text-ink-muted hover:text-ink hover:bg-ink/3 dark:hover:bg-white/3'
              }`}
            >
              {finishedOnly ? <Eye size={16} /> : <EyeOff size={16} />}
              <span>Finished Only</span>
              <div className={`ml-auto h-5 w-9 rounded-full transition-all duration-300 ${finishedOnly ? 'bg-sage-green' : 'bg-ink/20 dark:bg-white/10'} relative p-0.5`}>
                <div className={`h-4 w-4 rounded-full bg-white transition-all duration-300 shadow-md transform ${finishedOnly ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Sub-tabs for content type */}
          <div className="paper-card rounded-xl p-1 flex items-center gap-1 scroll-unroll">
            {(['anime', 'manga'] as const).map(type => (
              <button
                key={type}
                onClick={() => {
                  setTypeFilter(type);
                  setSelectedAnime(null);
                  setSelectedEpisode(null);
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  typeFilter === type 
                    ? 'bg-vermillion text-white shadow-lg shadow-vermillion/20' 
                    : 'text-ink-muted hover:text-ink dark:hover:text-cream hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {/* Active channel description */}
          {activeChannel !== 'all' && (
            <div className={`rounded-xl p-3 ${CHANNEL_CONFIG[activeChannel].color} scroll-unroll`}>
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = CHANNEL_CONFIG[activeChannel].icon;
                  return <Icon size={16} />;
                })()}
                <span className="text-sm font-semibold">{CHANNEL_CONFIG[activeChannel].label}</span>
              </div>
              <p className="text-xs mt-0.5 opacity-80">{CHANNEL_CONFIG[activeChannel].desc}</p>
            </div>
          )}

          {/* Episode threads when an anime is selected */}
          {selectedAnime && activeChannel === 'episode' && (
            <div className="paper-card rounded-xl p-4 scroll-unroll scroll-unroll-delay-1 border-t-2 border-vermillion/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vermillion/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <h3 className="text-sm font-bold text-ink dark:text-cream flex items-center gap-2">
                  <Hash size={16} className="text-vermillion" />
                  Filter by {typeFilter === 'anime' ? 'Episode' : 'Chapter'}
                </h3>
                {selectedEpisode && (
                  <button 
                    onClick={() => setSelectedEpisode(null)}
                    className="text-[10px] font-bold text-vermillion bg-vermillion/10 hover:bg-vermillion/20 px-2 py-1 rounded"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {Array.from({ length: 24 }, (_, i) => i + 1).map(ep => {
                  const hasPost = POSTS.some(p => p.animeId === selectedAnime && p.episode === ep);
                  return (
                    <button
                      key={ep}
                      onClick={() => setSelectedEpisode(selectedEpisode === ep ? null : ep)}
                      className={`h-8 w-10 rounded text-[11px] font-bold transition-all ${
                        selectedEpisode === ep
                          ? 'bg-vermillion text-white shadow-lg shadow-vermillion/20 scale-110'
                          : hasPost
                            ? 'bg-vermillion/15 text-vermillion hover:bg-vermillion/25'
                            : 'bg-ink/5 dark:bg-white/5 text-ink-muted dark:text-cream/30 hover:bg-ink/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {ep}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Posts */}
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-ink-muted dark:text-cream-muted">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No posts in this channel yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
