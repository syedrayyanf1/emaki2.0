import { useState, useMemo } from 'react';
import { Compass, ArrowRight, ThumbsUp, ThumbsDown, Sparkles, BookOpen, Search, Filter, X, Zap, Star } from 'lucide-react';
import { RECOMMENDATION_CHAINS, EMAKI_PICKS, ANIME_DB, getCoverGradient, type RecommendationChain } from '../../mock/mockData';
import { Link } from 'react-router-dom';

const getAnimeId = (searchTitle: string) => {
  const t = searchTitle.toLowerCase();
  const found = ANIME_DB.find(a => 
    a.title.toLowerCase() === t || 
    a.alternativeTitles?.some(alt => alt.toLowerCase() === t) ||
    a.title.toLowerCase().includes(t)
  );
  return found?.id || 0;
};

function RecCard({ rec }: { rec: RecommendationChain }) {
  const [agrees, setAgrees] = useState(rec.agrees);
  const [disagrees, setDisagrees] = useState(rec.disagrees);
  const [voted, setVoted] = useState<'agree' | 'disagree' | null>(null);

  const handleVote = (type: 'agree' | 'disagree') => {
    if (voted === type) {
      setVoted(null);
      if (type === 'agree') setAgrees(rec.agrees);
      else setDisagrees(rec.disagrees);
    } else {
      setVoted(type);
      setAgrees(type === 'agree' ? rec.agrees + 1 : rec.agrees);
      setDisagrees(type === 'disagree' ? rec.disagrees + 1 : rec.disagrees);
    }
  };

  return (
    <div className="paper-card paper-card-hover rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        {/* Source */}
        <div className={`h-11 w-11 rounded-lg overflow-hidden relative bg-gradient-to-br ${getCoverGradient(rec.sourceId)} flex items-center justify-center text-white text-sm font-bold font-serif-jp shrink-0 shadow-sm border border-white/5`}>
          {ANIME_DB.find(a => a.id === rec.sourceId)?.cover ? (
            <img src={ANIME_DB.find(a => a.id === rec.sourceId)!.cover} alt={rec.sourceTitle} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            rec.sourceTitle.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase tracking-widest font-black">If you loved</div>
          <Link to={`/entry/${rec.sourceId}`} className="text-sm font-bold text-ink dark:text-cream truncate leading-tight hover:text-vermillion transition-colors block">
            {rec.sourceTitle}
          </Link>
        </div>

        <ArrowRight size={16} className="text-vermillion shrink-0 mx-1.5 opacity-50" />

        {/* Target */}
        <div className={`h-11 w-11 rounded-lg overflow-hidden relative bg-gradient-to-br ${getCoverGradient(rec.targetId + 7)} flex items-center justify-center text-white text-sm font-bold font-serif-jp shrink-0 shadow-sm border border-white/5`}>
          {rec.targetCover ? (
            <img src={rec.targetCover} alt={rec.targetTitle} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            rec.targetTitle.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase tracking-widest font-black">Watch / Read</div>
          <Link to={`/entry/${getAnimeId(rec.targetTitle)}`} className="text-sm font-bold text-ink dark:text-cream truncate leading-tight hover:text-vermillion transition-colors block">
            {rec.targetTitle}
          </Link>
        </div>
      </div>

      {/* Reason */}
      <p className="text-xs text-ink-light dark:text-cream-muted bg-ink/3 dark:bg-white/3 rounded-lg px-3 py-2 italic">"{rec.reason}"</p>

      {/* Footer */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] text-ink-muted dark:text-cream-muted">by {rec.author}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote('agree')}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
              voted === 'agree' ? 'bg-sage-green/15 text-sage-green' : 'text-ink-muted dark:text-cream-muted hover:text-sage-green hover:bg-sage-green/5'
            }`}
          >
            <ThumbsUp size={11} /> {agrees}
          </button>
          <button
            onClick={() => handleVote('disagree')}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
              voted === 'disagree' ? 'bg-vermillion/15 text-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-vermillion hover:bg-vermillion/5'
            }`}
          >
            <ThumbsDown size={11} /> {disagrees}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Discovery() {
  const [recFilter, setRecFilter] = useState<'all' | 'top'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'anime' | 'manga'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'airing' | 'completed'>('all');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    ANIME_DB.forEach(entry => entry.genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  }, []);

  const filteredResults = useMemo(() => {
    return ANIME_DB.filter(entry => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        entry.title.toLowerCase().includes(q) || 
        entry.titleJp.toLowerCase().includes(q) ||
        entry.alternativeTitles?.some(t => t.toLowerCase().includes(q));
      
      const matchesType = typeFilter === 'all' || entry.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'airing' ? entry.airing : entry.status === statusFilter);
      
      const matchesGenre = selectedGenres.length === 0 || 
        selectedGenres.every(g => entry.genres.includes(g));
      
      return matchesSearch && matchesType && matchesStatus && matchesGenre;
    });
  }, [searchQuery, typeFilter, statusFilter, selectedGenres]);

  const isSearching = searchQuery !== '' || typeFilter !== 'all' || statusFilter !== 'all' || selectedGenres.length > 0;

  const sortedRecs = recFilter === 'top'
    ? [...RECOMMENDATION_CHAINS].sort((a, b) => (b.agrees - b.disagrees) - (a.agrees - a.disagrees))
    : RECOMMENDATION_CHAINS;

  return (
    <div className="scroll-unroll space-y-8 pb-20">
      {/* Header & Majestic Search */}
      <div className="space-y-6">
        <div>
          <h1 className="font-serif-jp text-3xl font-bold text-ink dark:text-cream flex items-center gap-3 tracking-tight">
            <Compass size={32} className="text-vermillion" />
            Discover
          </h1>
          <p className="text-sm text-ink-muted dark:text-cream-muted mt-1 max-w-lg">
            No algorithms — just community wisdom, purely chronological chronicles from across the realms.
          </p>
        </div>

        {/* Search Bar & Filters */}
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={18} className="text-cream/40 group-focus-within:text-vermillion transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by title, Japanese name, or alternative titles..."
              className="w-full pl-12 pr-12 py-3.5 bg-night-paper/50 border-2 border-white/10 rounded-2xl text-cream placeholder-cream/30 focus:outline-none focus:border-vermillion/50 focus:bg-night-paper/80 transition-colors font-medium text-base shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-5 flex items-center text-cream/30 hover:text-vermillion transition-colors"
                title="Clear Search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`paper-card px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
                isFilterOpen || isSearching ? 'text-vermillion border-vermillion/40 bg-vermillion/5' : 'text-cream/60 hover:text-cream'
              }`}
            >
              <Filter size={16} />
              Refine Search
            </button>

            {/* Type Chips */}
            <div className="flex p-1 bg-night-paper/50 rounded-xl border border-white/5">
              {['all', 'anime', 'manga'].map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as any)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    typeFilter === type ? 'bg-vermillion text-white shadow-lg' : 'text-cream/40 hover:text-cream'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Status Chips */}
            <div className="flex p-1 bg-night-paper/50 rounded-xl border border-white/5">
              {['all', 'airing', 'completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    statusFilter === status ? 'bg-indigo-accent text-white shadow-lg' : 'text-cream/40 hover:text-cream'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {isSearching && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setSelectedGenres([]);
                }}
                className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 hover:text-vermillion transition-colors flex items-center gap-1.5 ml-auto"
              >
                <X size={14} />
                Clear All
              </button>
            )}
          </div>

          {/* Genre Filters Expanded */}
          {isFilterOpen && (
            <div className="paper-card p-5 rounded-2xl bg-night-paper/40 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-4 border-b border-white/5 pb-2">Filter by Genres</h4>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => {
                      setSelectedGenres(prev => 
                        prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                      selectedGenres.includes(genre) 
                        ? 'bg-vermillion/20 border-vermillion/40 text-vermillion' 
                        : 'bg-white/5 border-white/5 text-cream/40 hover:border-white/20 hover:text-cream/70'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="brushstroke-divider opacity-20" />

      {/* Search Results Section */}
      {isSearching && (
        <div className="scroll-unroll space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-jp text-xl font-bold text-ink dark:text-cream flex items-center gap-2">
              <Zap size={20} className="text-gold" />
              Found Chronicles
              <span className="text-xs text-ink-muted dark:text-cream-muted font-normal ml-2">({filteredResults.length})</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredResults.map(entry => (
              <Link
                key={entry.id}
                to={`/entry/${entry.id}`}
                className="paper-card paper-card-hover rounded-xl overflow-hidden group block h-24"
              >
                <div className="flex h-full">
                  <div className="w-20 shrink-0 relative overflow-hidden bg-ink/5 dark:bg-white/5">
                    <img
                      src={entry.cover}
                      alt={entry.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-ink dark:text-cream truncate leading-tight group-hover:text-vermillion transition-colors text-sm">
                        {entry.title}
                      </h3>
                      <p className="text-[10px] text-vermillion/60 font-black uppercase tracking-widest mt-0.5">{entry.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] text-ink-muted dark:text-cream-muted font-medium">{entry.genres[0]}</span>
                       {entry.rating && (
                         <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                           <Star size={10} className="fill-amber-500" /> {entry.rating}
                         </span>
                       )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredResults.length === 0 && (
              <div className="col-span-full py-12 text-center paper-card bg-white/[0.02] border-dashed">
                <p className="text-cream/30 text-sm italic font-medium">No chronicles found in the repository matching these seals.</p>
              </div>
            )}
          </div>
          
          <div className="brushstroke-divider opacity-10" />
        </div>
      )}

      {/* Emaki Picks */}
      <div className="scroll-unroll scroll-unroll-delay-1">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-gold" />
          Emaki Picks
          <span className="text-xs text-ink-muted dark:text-cream-muted font-normal">— Curated by Mods & Sages</span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EMAKI_PICKS.map(pick => (
            <div key={pick.id} className="paper-card paper-card-hover rounded-xl overflow-hidden cursor-pointer">
              {/* Cover mosaic */}
              <div className="grid grid-cols-4 h-24 overflow-hidden">
                {pick.entries.map((entry, i) => (
                  <Link 
                    key={entry.title} 
                    to={`/entry/${getAnimeId(entry.title)}`}
                    className="relative h-full w-full bg-night-paper/50 block hover:z-10"
                  >
                    {entry.cover ? (
                      <img src={entry.cover} alt={entry.title} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCoverGradient(i + pick.id * 4)} flex items-center justify-center text-white opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100`}>
                        <span className="font-serif-jp text-lg font-bold">{entry.title.charAt(0)}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              <div className="p-4">
                <h3 className="font-serif-jp text-sm font-bold text-ink dark:text-cream">{pick.title}</h3>
                <p className="text-xs text-ink-light dark:text-cream-muted mt-1 leading-relaxed">{pick.description}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {pick.entries.map(entry => {
                    const dbId = getAnimeId(entry.title);
                    return (
                      <Link 
                        key={entry.title} 
                        to={`/entry/${dbId}`}
                        className="rounded-full bg-ink/5 dark:bg-white/5 hover:bg-vermillion/10 hover:text-vermillion transition-colors px-2 py-0.5 text-[9px] text-ink-muted dark:text-cream-muted font-medium"
                      >
                        {entry.title}
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[10px] text-ink-muted dark:text-cream-muted">Curated by</span>
                  <span className="text-[10px] font-semibold text-ink dark:text-cream">{pick.curator}</span>
                  <span className="text-[10px] font-serif-jp text-vermillion">{pick.curatorRank.kanji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation Chains */}
      <div className="scroll-unroll scroll-unroll-delay-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-accent" />
            Recommendation Chains
          </h2>
          <div className="flex rounded-lg bg-ink/5 dark:bg-white/5 p-0.5 border border-[#e8dfd2] dark:border-white/10">
            <button
              onClick={() => setRecFilter('all')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                recFilter === 'all' ? 'bg-white dark:bg-night text-vermillion shadow-sm' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setRecFilter('top')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                recFilter === 'top' ? 'bg-white dark:bg-night text-vermillion shadow-sm' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream'
              }`}
            >
              Top Rated
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {sortedRecs.map(rec => (
            <RecCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
