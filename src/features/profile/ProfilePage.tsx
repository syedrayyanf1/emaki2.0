import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, BarChart3, Users, Sparkles, Heart, ChevronDown, ChevronRight, Pin, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { USERS, CURRENT_USER_ID, ANIME_DB, POSTS, getCoverGradient, mockProfiles, type MockProfile, type AnimeEntry } from '../../mock/mockData';

const SIDE_SECTIONS = [
  { key: 'scroll', label: 'Scroll', icon: BookOpen },
  { key: 'stats', label: 'Stats', icon: BarChart3 },
  { key: 'social', label: 'Following / Followers', icon: Users },
  { key: 'additions', label: 'Additions', icon: Sparkles },
  { key: 'taste', label: 'Taste Twin %', icon: Heart },
];

type StatusFilter = 'all' | 'watching' | 'reading' | 'completed' | 'dropped' | 'planned';
type TypeFilter = 'anime' | 'manga';

const PROFILE_STATUS_CONFIG: Record<
  'watching' | 'reading' | 'completed' | 'dropped' | 'planned',
  { label: string; color: string }
> = {
  watching: { label: 'Watching', color: 'text-indigo-accent' },
  reading: { label: 'Reading', color: 'text-indigo-accent' },
  completed: { label: 'Completed', color: 'text-sage-green' },
  dropped: { label: 'Dropped', color: 'text-ink-muted dark:text-cream-muted' },
  planned: { label: 'Planned', color: 'text-gold' },
};

function ProfileScrollSegment({ entries }: { entries: AnimeEntry[] }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('anime');

  const base = (entries ?? []).filter(entry => entry.type === typeFilter);
  const filtered =
    statusFilter === 'all'
      ? base
      : base.filter(entry => entry.status === statusFilter);

  const groupedByStatus = ['watching', 'reading', 'completed', 'planned', 'dropped'] as const;

  const visibleStatusTabs =
    typeFilter === 'anime'
      ? (['watching', 'completed', 'planned', 'dropped'] as const)
      : (['reading', 'completed', 'planned', 'dropped'] as const);

  const statusCounts = groupedByStatus.reduce(
    (acc, status) => {
      acc[status] = base.filter(entry => entry.status === status).length;
      return acc;
    },
    {} as Record<(typeof groupedByStatus)[number], number>
  );

  const allCount = base.length;

  return (
    <div className="scroll-unroll space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-serif-jp text-xl font-bold text-ink dark:text-cream flex items-center gap-2">
            <BookOpen size={20} className="text-vermillion" />
            My Scroll
          </h2>
          <p className="text-xs text-ink-muted dark:text-cream-muted mt-0.5">
            Anime & manga this sage is tracking
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="paper-card rounded-xl px-3 py-2 min-w-[220px] max-w-[260px]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-cream-muted font-semibold">
              Mode
            </p>
            <div className="flex rounded-full bg-ink/5 px-1 py-1">
              {(['anime', 'manga'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`flex-1 rounded-full py-1.5 text-sm font-semibold tracking-tight transition-all ${
                    typeFilter === t ? 'bg-white text-vermillion shadow-sm' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {t === 'anime' ? '🎬 Anime' : '📖 Manga'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="brushstroke-divider" />

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-56 shrink-0 space-y-4 md:pt-1">
          <div className="paper-card rounded-xl p-2.5 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.15em] text-ink-muted dark:text-cream-muted font-semibold">
              {typeFilter === 'anime' ? 'Anime Status' : 'Manga Status'}
            </p>
            <div className="flex md:flex-col gap-1">
              <button
                onClick={() => setStatusFilter('all')}
                className={`flex-1 text-left rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                  statusFilter === 'all'
                    ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                All {typeFilter === 'anime' ? 'Anime' : 'Manga'}{' '}
                <span className="text-[10px] text-ink-muted dark:text-cream-muted">({allCount})</span>
              </button>
              {visibleStatusTabs.map(s => {
                const conf = PROFILE_STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`flex-1 flex items-center justify-between gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                      statusFilter === s
                        ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                        : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold ${conf.color}`}>{conf.label}</span>
                    </span>
                    <span className="text-[10px] text-ink-muted dark:text-cream-muted">
                      ({statusCounts[s] ?? 0})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map(entry => (
              <div key={entry.id} className="paper-card paper-card-hover rounded-xl overflow-hidden group">
                <div className="flex h-full">
                  <div className="shrink-0 relative overflow-hidden bg-ink/5 dark:bg-white/5 w-24 sm:w-28">
                    <img
                      src={entry.cover}
                      alt={entry.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-white/90 font-serif-jp">{entry.titleJp.charAt(0)}</span>
                        <span className="text-[8px] opacity-80">{entry.type === 'anime' ? '🎬' : '📖'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between p-3">
                    <div>
                      <h3 className="font-bold text-ink dark:text-cream truncate leading-tight text-sm group-hover:text-vermillion transition-colors">
                        {entry.title}
                      </h3>
                      <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">
                        {entry.titleJp}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-ink/5 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-vermillion to-vermillion-light"
                          style={{
                            width: entry.totalEpisodes
                              ? `${(entry.progress / (entry.totalEpisodes || 1)) * 100}%`
                              : '50%',
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-ink-muted dark:text-cream-muted font-medium tabular-nums">
                        {entry.progress}
                        {entry.totalEpisodes ? ` / ${entry.totalEpisodes}` : '+'}{' '}
                        {entry.type === 'manga' ? 'ch' : 'ep'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-ink-muted dark:text-cream-muted">
                <span className="text-sm">No entries found for this filter.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { userId } = useParams();
  const currentUserId = userId || CURRENT_USER_ID;
  const user = USERS.find(u => u.id === currentUserId) || USERS[0];
  const isOwnProfile = currentUserId === CURRENT_USER_ID;

  const profileData: MockProfile | undefined = !isOwnProfile
    ? mockProfiles.find(p => p.id === currentUserId)
    : undefined;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    scroll: true,
    stats: true,
    social: false,
    additions: false,
    taste: !isOwnProfile, // Hide taste section for own profile initially
  });
  const [activeTab, setActiveTab] = useState(isOwnProfile ? 'Activity' : 'Profile');

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = ANIME_DB.filter(a => a.status === 'completed').length;
  const watchingCount = ANIME_DB.filter(a => a.status === 'watching' || a.status === 'reading').length;
  const droppedCount = ANIME_DB.filter(a => a.status === 'dropped').length;
  const avgRating = ANIME_DB.filter(a => a.rating).reduce((sum, a) => sum + (a.rating || 0), 0) / ANIME_DB.filter(a => a.rating).length;
  const pinnedPosts = POSTS.filter(p => p.pinned);
  const profilePinnedPosts = profileData?.featuredPosts ?? POSTS.filter(p => p.userId === currentUserId && p.pinned);
  const profileRecentPosts = POSTS.filter(p => p.userId === currentUserId).slice(0, 6);

  return (
    <div className="scroll-unroll flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <aside className="w-full lg:w-72 shrink-0 space-y-3">
        {/* Avatar Card */}
        <div className="paper-card rounded-xl p-5 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-vermillion to-vermillion-dark flex items-center justify-center text-white text-2xl font-bold font-serif-jp shadow-lg shadow-vermillion/20">
            {(isOwnProfile ? user?.username : profileData?.username)?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="font-serif-jp text-xl text-vermillion/40">絵巻</span>
            <h1 className="text-lg font-bold text-ink dark:text-cream font-serif-jp">
              {isOwnProfile ? user?.username : profileData?.username}
            </h1>
          </div>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-vermillion/10 px-3 py-0.5">
            <span className="text-xs font-semibold text-vermillion">
              {isOwnProfile ? user?.rank.name : profileData?.rank.name}
            </span>
          </div>
          {/* Starred emblems (Logos) */}
          <div className="mt-4 flex justify-center gap-2">
            {(isOwnProfile ? user?.starred : profileData?.starredEntries)?.map(entry => (
              <div
                key={entry.id}
                className="group relative h-10 w-10 rounded-lg overflow-hidden border border-[#e8dfd2] dark:border-white/10 bg-white dark:bg-night-paper cursor-pointer transition-transform hover:scale-110 shadow-sm"
              >
                <img 
                  src={entry.cover} 
                  alt={entry.title} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-[8px] text-white font-bold text-center px-1 leading-tight">{entry.titleJp.charAt(0)}</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink dark:bg-night-paper px-2 py-1 text-[10px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 transform group-hover:-translate-y-1">
                  {entry.title}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-ink-muted dark:text-cream-muted">
            Joined {isOwnProfile ? user?.joinDate : profileData?.joinDate}
          </p>
        </div>

        {/* Collapsible Sections */}
        {SIDE_SECTIONS.map(section => {
          if (section.key === 'taste' && isOwnProfile) return null;
          
          const Icon = section.icon;
          const isOpen = openSections[section.key];
          return (
            <div key={section.key} className="paper-card rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.key)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-ink dark:text-cream hover:bg-ink/3 dark:hover:bg-white/3 transition-colors"
              >
                <Icon size={15} className="text-vermillion" />
                <span className="flex-1 text-left">{section.label}</span>
                {isOpen ? <ChevronDown size={14} className="text-ink-muted dark:text-cream-muted" /> : <ChevronRight size={14} className="text-ink-muted dark:text-cream-muted" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-3 text-sm">
                  <div className="brushstroke-divider mb-3" />
                  {section.key === 'scroll' && (
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Total Entries</span><span className="font-semibold text-ink dark:text-cream">{user.scrollCount}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Completed</span><span className="font-semibold text-sage-green">{completedCount}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Watching / Reading</span><span className="font-semibold text-indigo-accent">{watchingCount}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Dropped</span><span className="font-semibold text-ink-muted dark:text-cream-muted">{droppedCount}</span></div>
                    </div>
                  )}
                  {section.key === 'stats' && (
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Avg Rating</span><span className="font-semibold text-ink dark:text-cream">{avgRating.toFixed(1)}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Anime</span><span className="font-semibold text-ink dark:text-cream">{ANIME_DB.filter(a => a.type === 'anime').length}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Manga</span><span className="font-semibold text-ink dark:text-cream">{ANIME_DB.filter(a => a.type === 'manga').length}</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Top Genre</span><span className="font-semibold text-ink dark:text-cream">Action</span></div>
                    </div>
                  )}
                  {section.key === 'social' && (
                    <div className="space-y-2 text-center">
                      <p className="text-ink-muted dark:text-cream-muted text-xs">Follow freely — no counts displayed publicly</p>
                      <button className="mt-1 rounded-lg bg-vermillion/10 px-4 py-1.5 text-xs font-semibold text-vermillion hover:bg-vermillion/20 transition-colors">
                        View Connections
                      </button>
                    </div>
                  )}
                  {section.key === 'additions' && (
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Posts</span><span className="font-semibold text-ink dark:text-cream">89</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Echoes Written</span><span className="font-semibold text-ink dark:text-cream">23</span></div>
                      <div className="flex justify-between"><span className="text-ink-muted dark:text-cream-muted">Recs Given</span><span className="font-semibold text-ink dark:text-cream">15</span></div>
                    </div>
                  )}
                  {section.key === 'taste' && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-vermillion font-serif-jp">{user.tasteTwin}%</div>
                      <p className="text-xs text-ink-muted dark:text-cream-muted mt-1">match with your taste</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-5">
        {!isOwnProfile && (
          <div className="paper-card rounded-xl p-1.5 flex items-center gap-1 scroll-unroll scroll-unroll-delay-1">
            {['Profile', 'Scroll', 'Favorites'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-vermillion/10 text-vermillion' 
                    : 'text-ink-muted hover:text-ink dark:hover:text-cream hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {isOwnProfile ? (
          <>
            {/* Byosha (Bio) */}
            <div className="paper-card rounded-xl p-5 scroll-unroll scroll-unroll-delay-1">
              <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-2">Byosha</h2>
              <div className="brushstroke-divider mb-3" />
              <p className="text-sm text-ink-light dark:text-cream-muted leading-relaxed whitespace-pre-line italic">
                "{user?.bio}"
              </p>
            </div>

            {/* Pinned Posts */}
            {pinnedPosts.length > 0 && (
              <div className="space-y-3 scroll-unroll scroll-unroll-delay-2">
                <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream flex items-center gap-2">
                  <Pin size={16} className="text-vermillion" /> Featured Posts
                </h2>
                {pinnedPosts.map(post => (
                  <div key={post.id} className="paper-card paper-card-hover rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <Link to={`/profile/${post.userId}`} className="h-10 w-10 rounded-full bg-gradient-to-br from-vermillion to-vermillion-dark flex items-center justify-center text-white text-[12px] font-bold shrink-0 hover:scale-110 transition-transform">
                        {post.author.substring(0, 2).toUpperCase()}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link to={`/profile/${post.userId}`} className="text-sm font-semibold text-ink dark:text-cream hover:text-vermillion transition-colors">{post.author}</Link>
                          <span className="text-[10px] text-ink-muted dark:text-cream-muted">• {post.timestamp}</span>
                          <span className="rounded-full bg-indigo-accent/10 px-2 py-0.5 text-[10px] font-medium text-indigo-accent">{post.channel}</span>
                          <span className="text-[10px] text-ink-muted dark:text-cream-muted">in <span className="text-vermillion/80">{post.animeTitle}</span></span>
                        </div>
                        <p className="mt-2 text-sm text-ink-light dark:text-cream-muted leading-relaxed">{post.content}</p>
                        <div className="mt-3 flex items-center gap-5 text-xs text-ink-muted dark:text-cream-muted">
                          {post.agrees !== undefined && (
                            <>
                              <span className="flex items-center gap-1 hover:text-sage-green cursor-pointer transition-colors"><ThumbsUp size={12} /> {post.agrees}</span>
                              <span className="flex items-center gap-1 hover:text-vermillion cursor-pointer transition-colors"><ThumbsDown size={12} /> {post.disagrees}</span>
                            </>
                          )}
                          <span className="flex items-center gap-1 hover:text-indigo-accent cursor-pointer transition-colors"><MessageSquare size={12} /> {post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Activity */}
            <div className="space-y-3 scroll-unroll scroll-unroll-delay-3">
              <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream">Recent Activity</h2>
              <div className="brushstroke-divider" />
              <div className="grid gap-3 sm:grid-cols-2">
                {POSTS.slice(0, 6).map(post => (
                  <div key={post.id} className="paper-card paper-card-hover rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Link to={`/profile/${post.userId}`} className={`h-8 w-8 rounded-full bg-gradient-to-br ${getCoverGradient(post.id)} flex items-center justify-center text-white text-[10px] font-bold shrink-0 hover:scale-110 transition-transform`}>
                        {post.author.substring(0, 2).toUpperCase()}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link to={`/profile/${post.userId}`} className="text-xs font-semibold text-ink dark:text-cream hover:text-vermillion transition-colors">{post.author}</Link>
                          <span className="text-[9px] text-ink-muted dark:text-cream-muted">• {post.timestamp}</span>
                        </div>
                        <p className="mt-1 text-xs text-ink-light dark:text-cream-muted leading-relaxed line-clamp-2">{post.content}</p>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-ink-muted dark:text-cream-muted">
                          <span className="text-vermillion/70 font-medium truncate">{post.animeTitle}</span>
                          {post.episode && <span>Ep. {post.episode}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Profile Tab */}
            {activeTab === 'Profile' && (
              <>
                <div className="paper-card rounded-xl p-5 scroll-unroll scroll-unroll-delay-1">
                  <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-2">Byosha</h2>
                  <div className="brushstroke-divider mb-3" />
                  <p className="text-sm text-ink-light dark:text-cream-muted leading-relaxed whitespace-pre-line italic">
                    "{profileData?.byosha}"
                  </p>
                </div>

                {profilePinnedPosts && profilePinnedPosts.length > 0 && (
                  <div className="space-y-3 scroll-unroll scroll-unroll-delay-2">
                    <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream flex items-center gap-2">
                      <Pin size={16} className="text-vermillion" /> Featured Posts
                    </h2>
                    {profilePinnedPosts.map(post => (
                      <div key={post.id} className="paper-card paper-card-hover rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <Link to={`/profile/${post.userId}`} className="h-10 w-10 rounded-full bg-gradient-to-br from-vermillion to-vermillion-dark flex items-center justify-center text-white text-[12px] font-bold shrink-0 hover:scale-110 transition-transform">
                            {post.author.substring(0, 2).toUpperCase()}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link to={`/profile/${post.userId}`} className="text-sm font-semibold text-ink dark:text-cream hover:text-vermillion transition-colors">{post.author}</Link>
                              <span className="text-[10px] text-ink-muted dark:text-cream-muted">• {post.timestamp}</span>
                              <span className="rounded-full bg-indigo-accent/10 px-2 py-0.5 text-[10px] font-medium text-indigo-accent">{post.channel}</span>
                              <span className="text-[10px] text-ink-muted dark:text-cream-muted">in <span className="text-vermillion/80">{post.animeTitle}</span></span>
                            </div>
                            <p className="mt-2 text-sm text-ink-light dark:text-cream-muted leading-relaxed">{post.content}</p>
                            <div className="mt-3 flex items-center gap-5 text-xs text-ink-muted dark:text-cream-muted">
                              {post.agrees !== undefined && (
                                <>
                                  <span className="flex items-center gap-1 hover:text-sage-green cursor-pointer transition-colors"><ThumbsUp size={12} /> {post.agrees}</span>
                                  <span className="flex items-center gap-1 hover:text-vermillion cursor-pointer transition-colors"><ThumbsDown size={12} /> {post.disagrees}</span>
                                </>
                              )}
                              <span className="flex items-center gap-1 hover:text-indigo-accent cursor-pointer transition-colors"><MessageSquare size={12} /> {post.replies}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 scroll-unroll scroll-unroll-delay-3">
                  <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream">Recent Activity</h2>
                  <div className="brushstroke-divider" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profileRecentPosts.map(post => (
                      <div key={post.id} className="paper-card paper-card-hover rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Link to={`/profile/${post.userId}`} className={`h-8 w-8 rounded-full bg-gradient-to-br ${getCoverGradient(post.id)} flex items-center justify-center text-white text-[10px] font-bold shrink-0 hover:scale-110 transition-transform`}>
                            {post.author.substring(0, 2).toUpperCase()}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Link to={`/profile/${post.userId}`} className="text-xs font-semibold text-ink dark:text-cream hover:text-vermillion transition-colors">{post.author}</Link>
                              <span className="text-[9px] text-ink-muted dark:text-cream-muted">• {post.timestamp}</span>
                            </div>
                            <p className="mt-1 text-xs text-ink-light dark:text-cream-muted leading-relaxed line-clamp-2">{post.content}</p>
                            <div className="mt-2 flex items-center gap-2 text-[10px] text-ink-muted dark:text-cream-muted">
                              <span className="text-vermillion/70 font-medium truncate">{post.animeTitle}</span>
                              {post.episode && <span>Ep. {post.episode}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Scroll Tab */}
            {activeTab === 'Scroll' && (
              <div className="scroll-unroll scroll-unroll-delay-2">
                <ProfileScrollSegment entries={profileData?.scrollData ?? []} />
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'Favorites' && (
              <div className="space-y-5 scroll-unroll scroll-unroll-delay-2">
                <div>
                  <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream">
                    Starred Entries
                  </h2>
                  <div className="brushstroke-divider mb-3" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profileData?.starredEntries?.map(entry => (
                      <div key={entry.id} className="paper-card paper-card-hover rounded-xl overflow-hidden group">
                        <div className="flex h-full">
                          <div className="shrink-0 relative overflow-hidden bg-ink/5 dark:bg-white/5 w-24 sm:w-28">
                            <img
                              src={entry.cover}
                              alt={entry.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between p-3">
                            <div>
                              <h3 className="font-bold text-ink dark:text-cream truncate leading-tight text-sm group-hover:text-vermillion transition-colors">
                                {entry.title}
                              </h3>
                              <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">
                                {entry.titleJp}
                              </span>
                            </div>
                            <div className="mt-2 text-[10px] text-ink-muted dark:text-cream-muted">
                              <span className="uppercase tracking-wide">
                                {entry.type === 'anime' ? 'Anime' : 'Manga'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!profileData?.starredEntries || profileData.starredEntries.length === 0) && (
                      <p className="text-sm text-ink-muted dark:text-cream-muted">
                        No starred entries yet.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream">
                    Favorite Characters
                  </h2>
                  <div className="brushstroke-divider mb-3" />
                  <div className="grid gap-2 sm:grid-cols-2">
                    {profileData?.favoriteCharacters?.map(character => (
                      <div
                        key={character.id}
                        className="paper-card rounded-xl px-4 py-3 flex flex-col gap-1"
                      >
                        <span className="text-sm font-semibold text-ink dark:text-cream">
                          {character.name}
                        </span>
                        <span className="text-[11px] text-ink-muted dark:text-cream-muted">
                          {character.series}
                        </span>
                      </div>
                    ))}
                    {(!profileData?.favoriteCharacters ||
                      profileData.favoriteCharacters.length === 0) && (
                      <p className="text-sm text-ink-muted dark:text-cream-muted">
                        No favorite characters recorded yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
