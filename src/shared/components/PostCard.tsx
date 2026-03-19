import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, ThumbsDown, Send, ChevronDown, ChevronRight, Hash, Lightbulb, Zap, Flame } from 'lucide-react';
import { ANIME_DB, getCoverGradient, USER_PROFILE, type Post } from '../../mock/mockData';

export const CHANNEL_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; desc: string }> = {
  episode: { label: 'Episode Discussion', icon: Hash, color: 'bg-indigo-accent/10 text-indigo-accent', desc: 'Per-episode threads with spoiler containment' },
  analysis: { label: 'Analysis', icon: Lightbulb, color: 'bg-sage-green/10 text-sage-green', desc: 'Deep dives and breakdowns' },
  recommendations: { label: 'Recommendations', icon: Zap, color: 'bg-gold/10 text-gold', desc: '"If you loved this, watch ___"' },
  'hot-takes': { label: 'Hot Takes', icon: Flame, color: 'bg-vermillion/10 text-vermillion', desc: 'Spicy opinions — agree or disagree' },
};

export function ReplyCard({ author, rank, content, timestamp, initialAgrees, isNested = false }: any) {
  const [agrees, setAgrees] = useState(initialAgrees);
  const [voted, setVoted] = useState<'agree' | 'disagree' | null>(null);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  
  const [childReplies, setChildReplies] = useState<any[]>(() => {
    if (initialAgrees > 10 && !isNested) {
      return [{ id: 'nr1', author: 'AnimeFan99', rank: 'Genin', content: 'I totally disagree, but to each their own I guess.', timestamp: '1h ago', initialAgrees: 2, isNested: true }];
    }
    return [];
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handlePostReply = async () => {
    if (!replyInput.trim()) return;
    setIsSubmittingReply(true);
    await new Promise(r => setTimeout(r, 400));
    
    const newReply = {
      id: Date.now().toString(),
      author: USER_PROFILE.username,
      rank: USER_PROFILE.rank.name,
      content: replyInput,
      timestamp: 'Just now',
      initialAgrees: 0,
      isNested: true
    };
    
    setChildReplies(prev => [...prev, newReply]);
    setReplyInput('');
    setIsSubmittingReply(false);
    setShowReplyInput(false);
    setIsCollapsed(false);
  };

  const handleVote = (type: 'agree' | 'disagree') => {
    if (voted === type) {
      setVoted(null);
      setAgrees((prev: number) => type === 'agree' ? prev - 1 : prev + 1);
    } else {
      setVoted(type);
      setAgrees((prev: number) => {
        let newA = prev;
        if (voted === 'agree') newA -= 1;
        if (voted === 'disagree') newA += 1;
        return type === 'agree' ? newA + 1 : newA - 1;
      });
    }
  };

  return (
    <div className={`mt-3 ${isNested ? 'ml-6 border-l-2 border-white/5 pl-4' : 'border-t border-white/5 pt-3'}`}>
      <div className="flex items-start gap-2.5">
        {!isCollapsed && (
          <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${getCoverGradient(author.length)} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
            {author.substring(0, 2).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="text-ink-muted hover:text-ink dark:text-cream-muted dark:hover:text-cream transition-colors p-0.5 -ml-0.5 rounded bg-ink/5 dark:bg-white/5 hover:bg-ink/10 dark:hover:bg-white/10"
            >
              {isCollapsed ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
            </button>
            <span className="text-xs font-semibold text-ink dark:text-cream cursor-pointer hover:underline">{author}</span>
            <span className="text-[9px] font-semibold text-vermillion/80">{rank}</span>
            <span className="text-[9px] text-ink-muted dark:text-cream-muted">• {timestamp}</span>
            {isCollapsed && (
              <span className="text-[10px] text-ink-muted italic ml-1">
                ({childReplies.length > 0 ? `+${childReplies.length + 1} more` : 'Collapsed'})
              </span>
            )}
          </div>
          
          {!isCollapsed && (
            <>
              <p className="mt-1 text-xs text-ink-light dark:text-cream/80 leading-relaxed">{content}</p>
              <div className="mt-1.5 flex items-center gap-3">
                <button onClick={() => handleVote('agree')} className={`flex items-center gap-1 text-[10px] font-medium transition-all ${voted === 'agree' ? 'text-sage-green' : 'text-ink-muted hover:text-sage-green'}`}>
                  <ThumbsUp size={10} /> {agrees > 0 && agrees}
                </button>
                <button onClick={() => handleVote('disagree')} className={`flex items-center gap-1 text-[10px] font-medium transition-all ${voted === 'disagree' ? 'text-vermillion' : 'text-ink-muted hover:text-vermillion'}`}>
                  <ThumbsDown size={10} />
                </button>
                <button onClick={() => setShowReplyInput(!showReplyInput)} className={`flex items-center gap-1 text-[10px] transition-colors ${showReplyInput ? 'text-cream' : 'text-ink-muted hover:text-cream'}`}>
                  <MessageSquare size={10} /> Reply
                </button>
              </div>
          
              {showReplyInput && (
                <div className="mt-2 pt-2 border-t border-white/5 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full bg-ink/5 dark:bg-white/5 border border-transparent focus:border-[#e8dfd2] dark:focus:border-white/10 rounded-lg py-1.5 pl-3 pr-8 text-[11px] focus:outline-none transition-all resize-none h-7 custom-scrollbar placeholder:text-ink-muted/50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePostReply();
                          }
                        }}
                      />
                      <button
                        onClick={handlePostReply}
                        disabled={!replyInput.trim() || isSubmittingReply}
                        className="absolute right-1.5 top-1 text-ink-muted hover:text-vermillion disabled:opacity-30 transition-colors"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Render nested replies */}
              {childReplies.length > 0 && (
                <div className="mt-1">
                  {childReplies.map(reply => (
                    <ReplyCard key={reply.id} {...reply} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  const [localAgrees, setLocalAgrees] = useState(post.agrees ?? 0);
  const [localDisagrees, setLocalDisagrees] = useState(post.disagrees ?? 0);
  const [voted, setVoted] = useState<'agree' | 'disagree' | null>(null);
  const [showReplies, setShowReplies] = useState(false);
  
  // Use a fallback config if channel doesn't exist
  const conf = CHANNEL_CONFIG[post.channel] || { label: post.channel, icon: Hash, color: 'bg-ink/10 text-ink', desc: '' };
  const ChannelIcon = conf.icon;

  const [repliesList, setRepliesList] = useState<any[]>(() => {
    return post.replies && post.replies > 0 ? [
      { id: 'mock1', author: "WanderingSoul", rank: "Wanderer", content: "This is such a profound take. I hadn't realized this parallel!", timestamp: "1h ago", initialAgrees: 12 },
      { id: 'mock2', author: "LoreMaster", rank: "Captain", content: "Exactly. Furthermore, if you look at the background art in that sequence...", timestamp: "30m ago", initialAgrees: 4 }
    ] : [];
  });
  const [replyInput, setReplyInput] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handlePostReply = async () => {
    if (!replyInput.trim()) return;
    setIsSubmittingReply(true);
    // Simulate backend API call delay for future integration
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newReply = {
      id: Date.now().toString(),
      author: USER_PROFILE.username,
      rank: USER_PROFILE.rank.name,
      content: replyInput,
      timestamp: 'Just now',
      initialAgrees: 0
    };
    
    setRepliesList(prev => [...prev, newReply]);
    setReplyInput('');
    setIsSubmittingReply(false);
  };

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
    <div className="paper-card rounded-xl p-3.5 paper-card-hover text-left flex flex-col">
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
          <div className="mt-0.5 flex items-center gap-1.5 border border-white/5 bg-white/5 rounded-lg pr-2 w-fit">
            <div className="h-4 w-4 rounded-l overflow-hidden bg-white dark:bg-night-paper flex items-center justify-center shrink-0">
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
            <Link to={`/entry/${post.animeId}`} className="text-[11px] font-bold text-cream hover:text-vermillion transition-colors truncate">
              {post.animeTitle}
            </Link>
            {post.episode && (
              <span className="rounded bg-ink/5 dark:bg-white/10 px-1.5 py-0.5 text-[9px] text-ink-muted dark:text-cream font-bold">
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
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className={`flex items-center gap-1 text-xs transition-colors rounded-lg px-2.5 py-1 ${showReplies ? 'bg-white/10 text-cream' : 'text-ink-muted dark:text-cream-muted hover:text-ink dark:hover:text-cream hover:bg-white/5'}`}
            >
              <MessageSquare size={12} /> {post.replies} replies
            </button>
          </div>
          
          {/* Replies Section */}
          {showReplies && (
            <div className="mt-2 pl-2 border-l-2 border-white/5 animate-in slide-in-from-top-2 fade-in duration-300">
              {/* Post Reply Input */}
              <div className="pt-3 pb-2 flex items-start gap-2 border-b border-white/5 mb-2">
                <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${getCoverGradient(USER_PROFILE.username.length)} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
                  {USER_PROFILE.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full bg-ink/5 dark:bg-white/5 border border-transparent focus:border-[#e8dfd2] dark:focus:border-white/10 rounded-lg py-1.5 pl-3 pr-8 text-xs focus:outline-none transition-all resize-none h-8 custom-scrollbar placeholder:text-ink-muted/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handlePostReply();
                      }
                    }}
                  />
                  <button
                    onClick={handlePostReply}
                    disabled={!replyInput.trim() || isSubmittingReply}
                    className="absolute right-1.5 top-1.5 text-ink-muted hover:text-vermillion disabled:opacity-30 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>

              {repliesList.length > 0 ? (
                <>
                  {repliesList.map(reply => (
                    <ReplyCard key={reply.id} {...reply} />
                  ))}
                </>
              ) : (
                <div className="pt-2 pb-2 text-xs text-cream/30 italic">No replies yet. Be the first to add to the thread!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
