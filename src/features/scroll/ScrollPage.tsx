import { useState } from 'react';
import { Star, Clock, CheckCircle, XCircle, BookmarkPlus, Film, BookOpen, Timer, ChevronDown } from 'lucide-react';
import { ANIME_DB, getCoverGradient, type AnimeEntry } from '../../mock/mockData';

type StatusFilter = 'all' | 'watching' | 'reading' | 'completed' | 'dropped' | 'planned';
type TypeFilter = 'anime' | 'manga';

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  watching: { label: 'Watching', icon: Clock, color: 'text-indigo-accent' },
  reading: { label: 'Reading', icon: BookOpen, color: 'text-indigo-accent' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-sage-green' },
  dropped: { label: 'Dropped', icon: XCircle, color: 'text-ink-muted' },
  planned: { label: 'Planned', icon: BookmarkPlus, color: 'text-gold' },
};

type ViewPreset = 'standard' | 'compact' | 'detail';
type SortMode = 'default' | 'score' | 'popularity' | 'recent';

function EntryCard({ entry, viewPreset }: { entry: AnimeEntry; viewPreset: ViewPreset }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="paper-card paper-card-hover rounded-xl overflow-hidden group">
      <div className="flex h-full">
        {/* Cover Image */}
        <div
          className={`shrink-0 relative overflow-hidden bg-ink/5 dark:bg-white/5 ${
            viewPreset === 'compact' ? 'w-16 sm:w-20' : 'w-24 sm:w-28'
          }`}
        >
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
          {entry.starred && (
            <div className="absolute top-1 right-1 drop-shadow-md">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 min-w-0 flex flex-col justify-between ${viewPreset === 'compact' ? 'p-2' : 'p-3'}`}>
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3
                  className={`font-bold text-ink dark:text-cream truncate leading-tight group-hover:text-vermillion transition-colors ${
                    viewPreset === 'compact' ? 'text-[11px]' : 'text-sm'
                  }`}
                >
                  {entry.title}
                </h3>
                <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">{entry.titleJp}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-ink/5 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${entry.status === 'dropped' ? 'from-gray-400 to-gray-500' : 'from-vermillion to-vermillion-light'}`}
                  style={{ width: entry.totalEpisodes ? `${(entry.progress / entry.totalEpisodes) * 100}%` : '50%' }}
                />
              </div>
              <span className="text-[10px] text-ink-muted dark:text-cream-muted font-medium tabular-nums">
                {entry.progress}{entry.totalEpisodes ? ` / ${entry.totalEpisodes}` : '+'} {entry.type === 'manga' ? 'ch' : 'ep'}
              </span>
            </div>

          </div>

          <div className="mt-3">
            {/* Rating & Meta */}
            <div className="flex items-center gap-3 flex-wrap">
              {entry.rating !== null && (
                <span className="flex items-center gap-0.5 text-xs">
                  <Star size={11} className="text-gold fill-gold" />
                  <span className="font-bold text-ink dark:text-cream">{entry.rating}</span>
                </span>
              )}
              {viewPreset !== 'compact' && (
                <div className="flex gap-1">
                  {entry.genres.slice(0, 2).map(g => (
                    <span key={g} className="rounded bg-ink/5 dark:bg-white/5 px-1.5 py-0.5 text-[9px] text-ink-muted dark:text-cream-muted font-medium">{g}</span>
                  ))}
                </div>
              )}
              
              {viewPreset !== 'detail' && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="ml-auto flex items-center gap-0.5 text-[10px] font-bold text-vermillion hover:opacity-80 transition-opacity"
                >
                  {expanded ? 'LESS' : 'MORE'}
                  <ChevronDown size={12} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            {(expanded || viewPreset === 'detail') && (
              <div className="mt-3 space-y-2 text-[11px] border-t border-[#e8dfd2] dark:border-white/10 pt-2 animate-in fade-in slide-in-from-top-1">
                {entry.startDate && (
                  <div className="flex gap-4">
                    <span className="text-ink-muted dark:text-cream-muted">Timeline:</span>
                    <span className="text-ink dark:text-cream font-medium">{entry.startDate} {entry.finishDate ? `→ ${entry.finishDate}` : '→ Present'}</span>
                  </div>
                )}
                {entry.note && (
                  <div className="bg-ink/3 dark:bg-white/3 p-2 rounded-lg italic">
                    <span className="text-ink-light dark:text-cream-muted">"{entry.note}"</span>
                  </div>
                )}
                {entry.echo && (
                  <div className="rounded-lg bg-vermillion/5 dark:bg-vermillion/10 p-2 border-l-2 border-vermillion">
                    <span className="text-vermillion text-[9px] font-bold block uppercase tracking-tighter mb-0.5">Echo</span>
                    <span className="text-ink dark:text-cream text-[10px]">"{entry.echo}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Scroll() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('anime');
  const [viewPreset, setViewPreset] = useState<ViewPreset>('compact');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [layoutOpen, setLayoutOpen] = useState(false);

  const filteredBase = ANIME_DB.filter(entry => {
    if (entry.type !== typeFilter) return false;
    if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
    return true;
  });

  const sortFn = (a: AnimeEntry, b: AnimeEntry) => {
    if (sortMode === 'score') {
      const ar = a.rating ?? -1;
      const br = b.rating ?? -1;
      return br - ar;
    }
    if (sortMode === 'recent') {
      const ad = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bd = b.startDate ? new Date(b.startDate).getTime() : 0;
      return bd - ad;
    }
    // default: title A-Z
    return a.title.localeCompare(b.title);
  };

  const filtered = [...filteredBase].sort(sortFn);

  const groupedByStatus = ['watching', 'reading', 'completed', 'planned', 'dropped'] as const;

  const statusCounts = groupedByStatus.reduce(
    (acc, status) => {
      acc[status] = ANIME_DB.filter(
        entry => entry.type === typeFilter && entry.status === status
      ).length;
      return acc;
    },
    {} as Record<(typeof groupedByStatus)[number], number>
  );
  const allCount = ANIME_DB.filter(entry => entry.type === typeFilter).length;

  const visibleStatusTabs =
    typeFilter === 'anime'
      ? (['watching', 'completed', 'planned', 'dropped'] as const)
      : (['reading', 'completed', 'planned', 'dropped'] as const);

  const gridColsClass =
    viewPreset === 'compact' || viewPreset === 'detail'
      ? 'sm:grid-cols-1'
      : 'sm:grid-cols-2';

  return (
    <div className="scroll-unroll space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-jp text-2xl font-bold text-ink flex items-center gap-2">
            <BookOpen size={24} className="text-vermillion" />
            My Scroll
          </h1>
          <p className="text-sm text-ink-muted mt-0.5">
            Your anime & manga tracking — every story you've unrolled
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          {/* Anime / Manga pill */}
          <div className="paper-card rounded-xl px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-cream-muted font-semibold mb-1">
              Mode
            </p>
            <div className="flex rounded-full bg-ink/5 px-1 py-1">
              {(['anime', 'manga'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => {
                    setTypeFilter(t);
                    setStatusFilter('all');
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold tracking-tight transition-all ${
                    typeFilter === t ? 'bg-white text-vermillion shadow-sm' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {t === 'anime' ? '🎬 Anime' : '📖 Manga'}
                </button>
              ))}
            </div>
          </div>

          {/* Arrange block inline */}
          <div className="paper-card rounded-xl px-3 py-2 space-y-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-cream-muted font-semibold">
              Arrange
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setSortMode('default')}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-all ${
                  sortMode === 'default'
                    ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                Title
              </button>
              <button
                onClick={() => setSortMode('score')}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-all ${
                  sortMode === 'score'
                    ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                Score
              </button>
              <button
                onClick={() => setSortMode('popularity')}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-all ${
                  sortMode === 'popularity'
                    ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                Popularity
              </button>
              <button
                onClick={() => setSortMode('recent')}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-all ${
                  sortMode === 'recent'
                    ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                }`}
              >
                Recent
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="brushstroke-divider" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Vertical tabs + Layout */}
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
                const conf = STATUS_CONFIG[s];
                const Icon = conf.icon;
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
                      <Icon size={12} className={conf.color} />
                      <span>{conf.label}</span>
                    </span>
                    <span className="text-[10px] text-ink-muted dark:text-cream-muted">
                      ({statusCounts[s] ?? 0})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="paper-card rounded-xl p-2.5 space-y-2">
            <button
              type="button"
              onClick={() => setLayoutOpen(!layoutOpen)}
              className="w-full flex items-center justify-between text-left text-[11px] uppercase tracking-[0.15em] text-ink-muted dark:text-cream-muted font-semibold"
            >
              <span>Layout</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${layoutOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {layoutOpen && (
              <div className="flex md:flex-col gap-1 pt-1">
                <button
                  onClick={() => setViewPreset('compact')}
                  className={`rounded-lg px-2 py-1.5 text-[11px] font-medium text-left transition-all ${
                    viewPreset === 'compact'
                      ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                  }`}
                >
                  Compact grid
                </button>
                <button
                  onClick={() => setViewPreset('standard')}
                  className={`rounded-lg px-2 py-1.5 text-[11px] font-medium text-left transition-all ${
                    viewPreset === 'standard'
                      ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                  }`}
                >
                  Gallery cards
                </button>
                <button
                  onClick={() => setViewPreset('detail')}
                  className={`rounded-lg px-2 py-1.5 text-[11px] font-medium text-left transition-all ${
                    viewPreset === 'detail'
                      ? 'bg-cream/90 dark:bg-ink text-vermillion shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-ink/5 dark:hover:bg-white/5'
                  }`}
                >
                  Reading log
                </button>
              </div>
            )}
          </div>

        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-5">
          {/* Grouped entries */}
          {statusFilter === 'all' ? (
            groupedByStatus.map(status => {
              const entries = filtered.filter(e => e.status === status);
              if (entries.length === 0) return null;
              const conf = STATUS_CONFIG[status];
              const Icon = conf.icon;
              return (
                <div key={status} className="scroll-unroll scroll-unroll-delay-2">
                  <h2 className="font-serif-jp text-base font-semibold text-ink mb-3 flex items-center gap-2">
                    <Icon size={16} className={conf.color} />
                    {conf.label} <span className="text-xs text-ink-muted font-normal">({entries.length})</span>
                  </h2>
                  <div className={`grid gap-3 ${gridColsClass}`}>
                    {entries.map(entry => (
                      <EntryCard key={entry.id} entry={entry} viewPreset={viewPreset} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`grid gap-3 scroll-unroll scroll-unroll-delay-1 ${gridColsClass}`}>
              {filtered.map(entry => (
                <EntryCard key={entry.id} entry={entry} viewPreset={viewPreset} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-2 text-center py-12 text-ink-muted">
                  <Film size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No entries found for this filter.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
