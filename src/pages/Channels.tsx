import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, MessageSquare, Lightbulb, Zap, Flame, ThumbsUp, ThumbsDown, Filter, Eye, EyeOff } from 'lucide-react';
import { POSTS, ANIME_DB, getCoverGradient, type Post } from '../data/mockData';

type ChannelType = 'all' | 'episode' | 'analysis' | 'recommendations' | 'hot-takes';

const CHANNEL_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; desc: string }> = {
  episode: { label: 'Episode Discussion', icon: Hash, color: 'bg-indigo-accent/10 text-indigo-accent', desc: 'Per-episode threads with spoiler containment' },
  analysis: { label: 'Analysis', icon: Lightbulb, color: 'bg-sage-green/10 text-sage-green', desc: 'Deep dives and breakdowns' },
  recommendations: { label: 'Recommendations', icon: Zap, color: 'bg-gold/10 text-gold', desc: '"If you loved this, watch ___"' },
  'hot-takes': { label: 'Hot Takes', icon: Flame, color: 'bg-vermillion/10 text-vermillion', desc: 'Spicy opinions — agree or disagree' },
};

function PostCard({ post }: { post: Post }) {
  const [localAgrees, setLocalAgrees] = useState(post.agrees ?? 0);
  const [localDisagrees, setLocalDisagrees] = useState(post.disagrees ?? 0);
  const [voted, setVoted] = useState<'agree' | 'disagree' | null>(null);
  const conf = CHANNEL_CONFIG[post.channel];
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
    <div className="paper-card rounded-xl p-3.5 paper-card-hover text-left">
      <div className="flex items-start gap-2.5">
        <Link to={`/profile/${post.userId}`} className={`h-8 w-8 rounded-full bg-gradient-to-br ${getCoverGradient(post.id + 3)} flex items-center justify-center text-white text-[10px] font-bold shrink-0 hover:scale-110 transition-transform`}>
          {post.author.substring(0, 2).toUpperCase()}
        </Link>
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to={`/profile/${post.userId}`} className="text-sm font-semibold text-ink dark:text-cream hover:text-vermillion transition-colors">{post.author}</Link>
            <span className="text-[10px] font-semibold text-vermillion/80">{post.rank.name}</span>
            <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${conf.color}`}>
              <ChannelIcon size={9} />
              {conf.label}
            </span>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted">• {post.timestamp}</span>
          </div>

          {/* Anime context */}
          <div className="mt-0.5 flex items-center gap-1.5">
            <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 flex items-center justify-center shrink-0">
              {(() => {
                const anime = ANIME_DB.find(a => a.id === post.animeId);
                return anime?.logo ? (
                  <img src={anime.logo} alt={post.animeTitle} className="h-full w-full object-cover" />
                ) : (
                  <div className={`h-full w-full bg-gradient-to-br ${getCoverGradient(post.animeId)} flex items-center justify-center text-white text-[7px] font-bold`}>
                    {anime?.titleJp.charAt(0) || '?'}
                  </div>
                );
              })()}
            </div>
            <span className="text-[11px] font-medium text-vermillion/80 dark:text-vermillion-light truncate">{post.animeTitle}</span>
            {post.episode && (
              <span className="rounded bg-ink/5 dark:bg-white/5 px-1.5 py-0.5 text-[9px] text-ink-muted dark:text-cream-muted">
                {ANIME_DB.find(a => a.id === post.animeId)?.type === 'manga' ? 'Ch' : 'Ep'} {post.episode}
              </span>
            )}
          </div>

          {/* Content */}
          <p className="mt-2 text-sm text-ink-light dark:text-cream-muted leading-relaxed">{post.content}</p>

          {/* Actions */}
          <div className="mt-2.5 flex items-center gap-3">
            {post.channel === 'hot-takes' || post.channel === 'analysis' || post.channel === 'recommendations' ? (
              <>
                <button
                  onClick={() => handleVote('agree')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    voted === 'agree'
                      ? 'bg-sage-green/15 text-sage-green'
                      : 'text-ink-muted hover:text-sage-green hover:bg-sage-green/5'
                  }`}
                >
                  <ThumbsUp size={12} /> Agree {localAgrees > 0 && <span className="text-[10px]">{localAgrees}</span>}
                </button>
                <button
                  onClick={() => handleVote('disagree')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    voted === 'disagree'
                      ? 'bg-vermillion/15 text-vermillion'
                      : 'text-ink-muted hover:text-vermillion hover:bg-vermillion/5'
                  }`}
                >
                  <ThumbsDown size={12} /> Disagree {localDisagrees > 0 && <span className="text-[10px]">{localDisagrees}</span>}
                </button>
              </>
            ) : null}
            <button className="flex items-center gap-1 text-xs text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream transition-colors">
              <MessageSquare size={12} /> {post.replies} replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Channels() {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('all');
  const [selectedAnime, setSelectedAnime] = useState<number | null>(null);
  const [finishedOnly, setFinishedOnly] = useState(false);

  const filteredPosts = POSTS.filter(post => {
    if (activeChannel !== 'all' && post.channel !== activeChannel) return false;
    if (selectedAnime !== null && post.animeId !== selectedAnime) return false;
    return true;
  });

  const uniqueAnime = [...new Map(POSTS.map(p => [p.animeId, { id: p.animeId, title: p.animeTitle }])).values()];

  return (
    <div className="scroll-unroll">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-serif-jp text-2xl font-bold text-ink dark:text-cream flex items-center gap-2">
          <MessageSquare size={24} className="text-vermillion" />
          Channels
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-0.5">Discord-style discussions — organized by type, anime, and episode</p>
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
          <div className="paper-card rounded-xl p-3">
            <h3 className="text-[10px] font-semibold text-ink-muted dark:text-cream-muted uppercase tracking-wider mb-2 px-1">Filter by Anime</h3>
            <button
              onClick={() => setSelectedAnime(null)}
              className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                selectedAnime === null ? 'bg-vermillion/10 text-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
              }`}
            >
              All
            </button>
            {uniqueAnime.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAnime(a.id)}
                className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedAnime === a.id ? 'bg-vermillion/10 text-vermillion' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-ink/3 dark:hover:bg-white/3'
                }`}
              >
                <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 flex items-center justify-center shrink-0">
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
                <span className="truncate">{a.title}</span>
              </button>
            ))}
          </div>

          {/* Finished Only Toggle */}
          <div className="paper-card rounded-xl p-3">
            <button
              onClick={() => setFinishedOnly(!finishedOnly)}
              className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                finishedOnly ? 'bg-sage-green/10 text-sage-green' : 'text-ink-muted hover:text-ink hover:bg-ink/3'
              }`}
            >
              {finishedOnly ? <Eye size={14} /> : <EyeOff size={14} />}
              Finished Only
              <span className={`ml-auto h-4 w-8 rounded-full transition-all ${finishedOnly ? 'bg-sage-green' : 'bg-ink/10'} relative`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all shadow-sm ${finishedOnly ? 'left-4' : 'left-0.5'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="flex-1 min-w-0 space-y-3">
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

          {/* Episode threads for episode channel */}
          {activeChannel === 'episode' && selectedAnime && (
            <div className="paper-card rounded-xl p-3 scroll-unroll scroll-unroll-delay-1">
              <h3 className="text-xs font-semibold text-ink dark:text-cream mb-2">Episode Threads</h3>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(ep => {
                  const hasPost = POSTS.some(p => p.animeId === selectedAnime && p.episode === ep);
                  return (
                    <button
                      key={ep}
                      className={`h-7 w-9 rounded text-[10px] font-medium transition-all ${
                        hasPost
                          ? 'bg-vermillion/10 text-vermillion hover:bg-vermillion/20'
                          : 'bg-ink/5 text-ink-muted hover:bg-ink/10'
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
