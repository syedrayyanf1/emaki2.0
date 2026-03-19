import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Heart,
  Share2, 
  MoreHorizontal, 
  Plus, 
  Play,
  Clock, 
  Library,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  History,
  Info,
  Users,
  Check,
  Star,
  Trash2,
  Hash,
  Lightbulb,
  Zap,
  Flame
} from 'lucide-react';
import { ANIME_DB, POSTS, getCoverGradient, RECOMMENDATION_CHAINS, type Post } from '../../mock/mockData';

const CHANNEL_CONFIG: Record<string, { label: string; icon: any; color: string; desc: string }> = {
  episode: { label: 'Episode Discussion', icon: Hash, color: 'bg-indigo-accent/10 text-indigo-accent', desc: 'Per-episode threads with spoiler containment' },
  analysis: { label: 'Analysis', icon: Lightbulb, color: 'bg-sage-green/10 text-sage-green', desc: 'Deep dives and breakdowns' },
  recommendations: { label: 'Recommendations', icon: Zap, color: 'bg-gold/10 text-gold', desc: '"If you loved this, watch ___"' },
  'hot-takes': { label: 'Hot Takes', icon: Flame, color: 'bg-vermillion/10 text-vermillion', desc: 'Spicy opinions — agree or disagree' },
};

function EntryPostCard({ post, conf }: { post: Post, conf: any }) {
  const [localAgrees, setLocalAgrees] = useState(post.agrees ?? 0);
  const [localDisagrees, setLocalDisagrees] = useState(post.disagrees ?? 0);
  const [voted, setVoted] = useState<'agree' | 'disagree' | null>(null);
  const ChannelIcon = conf.icon;

  const handleVote = (type: 'agree' | 'disagree') => {
    if (voted === type) {
      setVoted(null);
      if (type === 'agree') setLocalAgrees(prev => prev - 1);
      else setLocalDisagrees(prev => prev - 1);
    } else {
      if (voted === 'agree') setLocalAgrees(prev => prev - 1);
      if (voted === 'disagree') setLocalDisagrees(prev => prev - 1);
      setVoted(type);
      if (type === 'agree') setLocalAgrees(prev => prev + 1);
      else setLocalDisagrees(prev => prev + 1);
    }
  };

  return (
    <div className="paper-card rounded-xl p-4 paper-card-hover text-left">
      <div className="flex items-start gap-3">
        <Link to={`/profile/${post.userId}`} className={`h-10 w-10 rounded-full bg-gradient-to-br ${getCoverGradient(post.id + 3)} flex items-center justify-center text-white text-[12px] font-bold shrink-0 hover:scale-110 transition-transform`}>
          {post.author.substring(0, 2).toUpperCase()}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to={`/profile/${post.userId}`} className="text-sm font-semibold text-cream hover:text-vermillion transition-colors">{post.author}</Link>
            <span className="text-[10px] font-semibold text-vermillion/80">{post.rank.name}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${conf.color}`}>
              <ChannelIcon size={10} />
              {conf.label}
            </span>
            <span className="text-[10px] text-cream-muted">• {post.timestamp}</span>
          </div>
          {post.episode && (
            <div className="mt-1">
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-cream-muted">
                {ANIME_DB.find(a => a.id === post.animeId)?.type === 'manga' ? 'Ch' : 'Ep'} {post.episode}
              </span>
            </div>
          )}
          <p className="mt-2 text-sm text-cream/80 leading-relaxed">{post.content}</p>
          <div className="mt-3 flex items-center gap-4">
            {post.channel === 'hot-takes' || post.channel === 'analysis' || post.channel === 'recommendations' ? (
              <>
                <button
                  onClick={() => handleVote('agree')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    voted === 'agree' ? 'bg-sage-green/15 text-sage-green' : 'text-cream/40 hover:text-sage-green hover:bg-sage-green/5'
                  }`}
                >
                  <ThumbsUp size={12} /> Agree {localAgrees > 0 && <span className="text-[10px]">{localAgrees}</span>}
                </button>
                <button
                  onClick={() => handleVote('disagree')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    voted === 'disagree' ? 'bg-vermillion/15 text-vermillion' : 'text-cream/40 hover:text-vermillion hover:bg-vermillion/5'
                  }`}
                >
                  <ThumbsDown size={12} /> Disagree {localDisagrees > 0 && <span className="text-[10px]">{localDisagrees}</span>}
                </button>
              </>
            ) : null}
            <button className="flex items-center gap-1 text-xs text-cream/40 hover:text-cream transition-colors">
              <MessageSquare size={12} /> {post.replies} replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntryDetailPage() {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const entry = ANIME_DB.find(a => a.id === Number(entryId));
  
  const [activeTab, setActiveTab] = useState<'overview' | 'characters' | 'discussions'>('overview');
  const [addStatus, setAddStatus] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(entry?.starred || false);
  const [agreedRecs, setAgreedRecs] = useState<number[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>('all');
  const [favCharacters, setFavCharacters] = useState<string[]>([]);

  const toggleCharacterFav = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavCharacters(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">🏮</div>
        <h2 className="text-2xl font-bold text-ink dark:text-cream">Lost in the Chronicle</h2>
        <p className="text-ink-muted dark:text-cream-muted mt-2">This story hasn't been unrolled yet.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center gap-2 text-vermillion font-bold hover:underline"
        >
          <ChevronLeft size={18} /> Return to Library
        </button>
      </div>
    );
  }

  const relatedPosts = POSTS.filter(p => p.animeId === entry.id);
  const recommendations = RECOMMENDATION_CHAINS.filter(r => r.sourceId === entry.id);

  return (
    <div className="min-h-screen -mt-6 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero Banner Section */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={entry.banner} 
            alt={entry.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        </div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Action Buttons (Top Right) */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all">
            <Share2 size={18} />
          </button>
          <button className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Content Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar (Left) */}
          <div className="w-48 sm:w-64 shrink-0 mx-auto md:mx-0 -mt-10 md:mt-0">
            <div className="paper-card rounded-2xl overflow-hidden shadow-2xl border-2 border-white/5 bg-night-paper">
              <img 
                src={entry.cover} 
                alt={entry.title} 
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
            
            {/* Quick Actions Below Cover */}
            <div className="mt-6 space-y-3 relative z-30">
              <div className="relative">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group ${
                      addStatus 
                        ? 'bg-sage-green text-white' 
                        : 'bg-vermillion hover:bg-vermillion-light text-white'
                    }`}
                  >
                    {addStatus ? (
                      <>
                        <Check size={18} />
                        {addStatus}
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add to Scroll
                      </>
                    )}
                  </button>
                  {addStatus && (
                    <button
                      onClick={() => {
                        setAddStatus(null);
                        setIsDropdownOpen(false);
                      }}
                      className="w-12 flex items-center justify-center bg-vermillion/10 hover:bg-vermillion text-vermillion hover:text-white rounded-xl transition-all border border-vermillion/20"
                      title="Remove from Scroll"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-night-paper border-2 border-white/5 rounded-xl shadow-2xl z-50 flex flex-col gap-1">
                    {['Watching', 'Planning', 'Completed', 'Dropped'].map((status) => {
                      let label = status;
                      if (entry.type === 'manga' && status === 'Watching') label = 'Reading';
                      
                      return (
                        <button
                          key={label}
                          onClick={() => {
                            setAddStatus(label);
                            setIsDropdownOpen(false);
                          }}
                          className={`text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            addStatus === label
                              ? 'bg-vermillion/20 text-vermillion'
                              : 'text-cream hover:bg-white/5'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsFavourite(!isFavourite)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10 ${
                  isFavourite 
                    ? 'bg-vermillion/10 text-vermillion border-vermillion/20' 
                    : 'bg-white/5 dark:bg-white/5 hover:bg-white/10 text-cream/70'
                }`}
              >
                <Heart size={14} className={isFavourite ? 'fill-vermillion' : ''} />
                {isFavourite ? 'Favourited' : 'Favourite'}
              </button>
            </div>

            {/* Sidebar Metadata */}
            <div className="mt-8 space-y-6">
              {/* Alternative Titles */}
              {entry.alternativeTitles && entry.alternativeTitles.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-2">Alternative Titles</h4>
                  <div className="space-y-1">
                    {entry.alternativeTitles.map(t => (
                      <p key={t} className="text-xs text-cream/70 leading-relaxed">{t}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-1">Status</h4>
                <p className="text-xs text-cream font-medium capitalize">{entry.status}</p>
              </div>

              {/* Genres */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-2">Genres</h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.genres.map(g => (
                    <span key={g} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-cream/60 hover:text-vermillion transition-colors cursor-pointer">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Studio */}
              {entry.studio && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-1">Studio</h4>
                  <p className="text-xs text-cream font-medium">{entry.studio}</p>
                </div>
              )}

              {/* Release Dates */}
              <div className="grid grid-cols-2 gap-4">
                {entry.releaseDate && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-1">Premiered</h4>
                    <p className="text-xs text-cream font-medium">{entry.releaseDate}</p>
                  </div>
                )}
                {entry.endDate && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-vermillion/60 mb-1">Finished</h4>
                    <p className="text-xs text-cream font-medium">{entry.endDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title & Info Section */}
          <div className="flex-1 text-center md:text-left pt-10 md:pt-40">
            <div className="mb-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="bg-vermillion/20 text-vermillion text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-vermillion/20">
                {entry.type}
              </span>
              <span className="bg-indigo-accent/20 text-indigo-accent text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-accent/20">
                {entry.status}
              </span>
              {entry.rating && (
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star size={14} className="fill-amber-400" />
                  {entry.rating}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-serif-jp font-bold text-cream mb-2 drop-shadow-lg uppercase tracking-tight">
              {entry.title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-serif-jp text-cream/60 mb-6 italic">
              {entry.titleJp}
            </h2>

            {/* Quick Metadata (Compact) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-cream/50 font-medium pb-8 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-vermillion/60" />
                <span>{entry.type === 'anime' ? `${entry.totalEpisodes || '?'} Episodes` : `${entry.totalEpisodes || '?'} Chapters`}</span>
              </div>
              <div className="flex items-center gap-2">
                <History size={16} className="text-vermillion/60" />
                <span>{entry.airing ? 'Currently Airing' : 'Completed Chronicle'}</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mt-8 flex items-center justify-center md:justify-start gap-8 border-b border-white/5 pb-0">
              {[
                { id: 'overview', label: 'Overview', icon: Info },
                { id: 'characters', label: 'Characters', icon: Users },
                { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.id 
                      ? 'text-vermillion border-b-2 border-vermillion' 
                      : 'text-cream/40 hover:text-cream/70'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {/* Synopsis */}
                  <div className="paper-card rounded-2xl p-6 bg-night-paper/50">
                    <p className="text-cream/80 leading-relaxed font-medium text-lg">
                      {entry.note || "No official chronicle has been recorded for this series yet."}
                    </p>
                  </div>
                  
                  {/* Related Section */}
                  {(entry.related && entry.related.length > 0) && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-serif-jp font-bold text-cream flex items-center gap-2">
                        <Library size={20} className="text-vermillion" />
                        Related Chronicles
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {entry.related.map(rel => (
                          <div key={rel.id} className="paper-card p-4 flex items-center justify-between group hover:border-vermillion/30 transition-all cursor-pointer">
                            <div>
                              <p className="text-sm font-bold text-cream group-hover:text-vermillion transition-colors">{rel.title}</p>
                              <p className="text-[10px] text-cream/40 uppercase tracking-widest">{rel.type}</p>
                            </div>
                            <ChevronLeft className="rotate-180 text-cream/20 group-hover:text-vermillion/50" size={16} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Episodes/Chapters Section */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif-jp font-bold text-cream flex items-center gap-2">
                        <Play size={20} className="text-vermillion" />
                        {entry.type === 'anime' ? 'Episodes' : 'Chapters'}
                      </h3>
                      <span className="text-[10px] text-cream/40 uppercase tracking-widest font-black">
                        Progress: {entry.progress} / {entry.totalEpisodes || '?'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: entry.totalEpisodes || 12 }).slice(0, 48).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-10 h-10 flex items-center justify-center rounded-md border text-[10px] font-black transition-all cursor-pointer relative group/ep ${
                            i + 1 <= entry.progress
                              ? 'bg-vermillion/10 border-vermillion/30 text-vermillion shadow-[inset_0_0_10px_rgba(199,62,29,0.1)] hover:bg-vermillion/20'
                              : 'bg-white/5 border-white/10 text-cream/30 hover:border-vermillion/40 hover:text-vermillion/60 hover:bg-vermillion/5'
                          }`}
                        >
                          {i + 1}
                          {i + 1 === entry.progress && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-vermillion rounded-full shadow-[0_0_8px_rgba(199,62,29,0.6)] animate-pulse" />
                          )}
                        </div>
                      ))}
                      {(entry.totalEpisodes || 0) > 48 && (
                        <div className="w-10 h-10 flex items-center justify-center rounded-md border border-dashed border-white/10 text-cream/30 text-[9px] bg-white/[0.02] font-black">
                          +{entry.totalEpisodes! - 48}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <h3 className="text-xl font-serif-jp font-bold text-cream flex items-center gap-2">
                        <Star size={20} className="text-vermillion" />
                        Recommendations
                      </h3>
                      <div className="grid gap-4">
                        {recommendations.map(rec => (
                          <div key={rec.id} className="paper-card p-4 bg-white/[0.02] border-dashed border-white/5 group hover:border-vermillion/20 transition-all">
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-cream/80 italic leading-relaxed">
                                "{rec.reason}"
                              </p>
                              <div className="text-right shrink-0 ml-4 flex items-center gap-3">
                                <div>
                                  <p className="text-[10px] text-vermillion font-black uppercase tracking-widest leading-none mb-1">Recommended</p>
                                  <p className="text-sm font-bold text-cream group-hover:text-vermillion transition-colors">{rec.targetTitle}</p>
                                </div>
                                <div className={`h-11 w-11 rounded-lg overflow-hidden relative bg-gradient-to-br ${getCoverGradient(rec.targetId + 7)} flex items-center justify-center text-white text-sm font-bold font-serif-jp shrink-0 shadow-sm border border-white/5 group-hover:scale-105 transition-transform`}>
                                  {rec.targetCover ? (
                                    <img src={rec.targetCover} alt={rec.targetTitle} className="absolute inset-0 w-full h-full object-cover" />
                                  ) : (
                                    rec.targetTitle.charAt(0)
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-cream/30">
                              <span>Proposed by {rec.author}</span>
                              <button 
                                onClick={() => {
                                  if (agreedRecs.includes(rec.id)) setAgreedRecs(prev => prev.filter(id => id !== rec.id));
                                  else setAgreedRecs(prev => [...prev, rec.id]);
                                }}
                                className={`flex items-center gap-1 font-black transition-colors ${agreedRecs.includes(rec.id) ? 'text-sage-green' : 'hover:text-vermillion/80'}`}
                              >
                                <ThumbsUp size={10} className={agreedRecs.includes(rec.id) ? 'fill-sage-green' : ''} /> 
                                {rec.agrees + (agreedRecs.includes(rec.id) ? 1 : 0)} Agrees
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'characters' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {entry.characters && entry.characters.length > 0 ? (
                    entry.characters.map(char => (
                      <div key={char.name} className="group cursor-pointer relative">
                        <div className="paper-card rounded-2xl overflow-hidden aspect-[3/4] mb-3 relative">
                          <img 
                            src={char.image} 
                            alt={char.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <button 
                            onClick={(e) => toggleCharacterFav(e, char.name)}
                            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all z-10 
                              ${favCharacters.includes(char.name) 
                                ? 'bg-vermillion/20 text-vermillion border border-vermillion/30 shadow-[0_0_10px_rgba(199,62,29,0.5)] opacity-100' 
                                : 'bg-black/40 text-white/50 border border-white/10 opacity-0 group-hover:opacity-100 hover:text-vermillion hover:bg-black/60'
                              }
                            `}
                          >
                            <Heart size={14} className={favCharacters.includes(char.name) ? 'fill-vermillion' : ''} />
                          </button>
                        </div>
                        <h4 className="font-bold text-cream text-sm group-hover:text-vermillion transition-colors">{char.name}</h4>
                        <p className="text-[10px] text-cream/40 uppercase tracking-widest">{char.role}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center paper-card border-dashed">
                      <p className="text-cream/40">The cast of this chronicle hasn't been unrolled yet.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'discussions' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-serif-jp font-bold text-cream">Community Chronicles</h3>
                    <button className="bg-vermillion/10 text-vermillion px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-vermillion/20 transition-all">
                      Unroll New Thread
                    </button>
                  </div>
                  
                  {/* Channels Filter */}
                  <div className="paper-card rounded-xl p-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveChannel('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeChannel === 'all' ? 'bg-vermillion/20 text-vermillion border border-vermillion/30 shadow-[inset_0_0_10px_rgba(199,62,29,0.1)]' : 'text-cream/50 hover:bg-white/5'
                      }`}
                    >
                      All
                    </button>
                    {Object.entries(CHANNEL_CONFIG).map(([key, conf]) => {
                      const Icon = conf.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveChannel(key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            activeChannel === key ? 'bg-vermillion/20 text-vermillion border border-vermillion/30 shadow-[inset_0_0_10px_rgba(199,62,29,0.1)]' : 'text-cream/50 hover:bg-white/5'
                          }`}
                        >
                          <Icon size={12} />
                          {conf.label}
                        </button>
                      );
                    })}
                  </div>

                  {activeChannel === 'episode' && (
                    <div className="paper-card rounded-xl p-4 border-indigo-accent/20">
                      <h4 className="text-xs font-bold text-cream mb-3">Episode Threads</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: entry.totalEpisodes || 12 }, (_, i) => i + 1).slice(0, 24).map(ep => {
                          const hasPost = relatedPosts.some(p => p.channel === 'episode' && p.episode === ep);
                          return (
                            <button
                              key={ep}
                              className={`h-8 w-10 text-xs font-bold rounded-lg transition-all ${
                                hasPost
                                  ? 'bg-indigo-accent/20 text-indigo-accent hover:bg-indigo-accent/30 hover:scale-105'
                                  : 'bg-white/5 text-cream/30 hover:bg-white/10'
                              }`}
                            >
                              {ep}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mt-6">
                    {relatedPosts.filter(p => activeChannel === 'all' || p.channel === activeChannel).length > 0 ? (
                      relatedPosts
                        .filter(p => activeChannel === 'all' || p.channel === activeChannel)
                        .map(post => {
                          const conf = CHANNEL_CONFIG[post.channel] || { label: 'General', icon: MessageSquare, color: 'bg-white/10 text-cream', desc: '' };
                          return <EntryPostCard key={post.id} post={post} conf={conf} />;
                        })
                    ) : (
                      <div className="text-center py-12 paper-card rounded-2xl border-dashed border-2 border-white/5">
                        <MessageSquare size={32} className="mx-auto mb-3 opacity-30 text-cream" />
                        <p className="text-cream/40 text-sm">The scroll for discussions in this channel is currently empty.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
