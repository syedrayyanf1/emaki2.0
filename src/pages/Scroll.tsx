import { useState } from 'react';
import { Star, Clock, CheckCircle, XCircle, BookmarkPlus, Film, BookOpen, Timer, ChevronDown } from 'lucide-react';
import { ANIME_DB, getCoverGradient, type AnimeEntry } from '../data/mockData';

type StatusFilter = 'all' | 'watching' | 'reading' | 'completed' | 'dropped' | 'planned';
type TypeFilter = 'all' | 'anime' | 'manga';

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  watching: { label: 'Watching', icon: Clock, color: 'text-indigo-accent' },
  reading: { label: 'Reading', icon: BookOpen, color: 'text-indigo-accent' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-sage-green' },
  dropped: { label: 'Dropped', icon: XCircle, color: 'text-ink-muted' },
  planned: { label: 'Planned', icon: BookmarkPlus, color: 'text-gold' },
};

function EntryCard({ entry }: { entry: AnimeEntry }) {
  const [expanded, setExpanded] = useState(false);
  const statusConf = STATUS_CONFIG[entry.status];
  const StatusIcon = statusConf.icon;

  return (
    <div className="paper-card paper-card-hover rounded-xl overflow-hidden group">
      <div className="flex h-full">
        {/* Cover Image */}
        <div className="w-24 sm:w-28 shrink-0 relative overflow-hidden bg-ink/5 dark:bg-white/5">
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
        <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-ink dark:text-cream truncate leading-tight group-hover:text-vermillion transition-colors">{entry.title}</h3>
                <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">{entry.titleJp}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 bg-ink/5 dark:bg-white/5 px-1.5 py-0.5 rounded-full">
                <StatusIcon size={12} className={statusConf.color} />
                <span className={`text-[9px] font-bold uppercase tracking-tight ${statusConf.color}`}>{statusConf.label}</span>
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

            {/* Airing indicator */}
            {entry.airing && (
              <div className="mt-2 flex items-center gap-1.5 bg-vermillion/5 dark:bg-vermillion/10 w-fit px-2 py-0.5 rounded-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-vermillion"></span>
                </span>
                <span className="text-[9px] text-vermillion font-bold">
                  {entry.type === 'manga' ? 'Ch' : 'Ep'} {entry.nextEpisode} — {entry.nextEpisodeDate}
                </span>
              </div>
            )}
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
              <div className="flex gap-1">
                {entry.genres.slice(0, 2).map(g => (
                  <span key={g} className="rounded bg-ink/5 dark:bg-white/5 px-1.5 py-0.5 text-[9px] text-ink-muted dark:text-cream-muted font-medium">{g}</span>
                ))}
              </div>
              
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-auto flex items-center gap-0.5 text-[10px] font-bold text-vermillion hover:opacity-80 transition-opacity"
              >
                {expanded ? 'LESS' : 'MORE'}
                <ChevronDown size={12} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {expanded && (
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
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filtered = ANIME_DB.filter(entry => {
    if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
    if (typeFilter !== 'all' && entry.type !== typeFilter) return false;
    return true;
  });

  const groupedByStatus = ['watching', 'reading', 'completed', 'planned', 'dropped'] as const;

  return (
    <div className="scroll-unroll space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-jp text-2xl font-bold text-ink flex items-center gap-2">
            <BookOpen size={24} className="text-vermillion" />
            My Scroll
          </h1>
          <p className="text-sm text-ink-muted mt-0.5">Your anime & manga tracking — every story you've unrolled</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-lg bg-ink/5 p-0.5">
            {(['all', 'anime', 'manga'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  typeFilter === t ? 'bg-white text-vermillion shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t === 'all' ? 'All' : t === 'anime' ? '🎬 Anime' : '📖 Manga'}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg bg-ink/5 p-0.5 flex-wrap">
            {(['all', 'watching', 'reading', 'completed', 'dropped', 'planned'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-all ${
                  statusFilter === s ? 'bg-white text-vermillion shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="brushstroke-divider" />

      {/* Currently Airing Highlight */}
      {statusFilter === 'all' && (
        <div className="scroll-unroll scroll-unroll-delay-1">
          <h2 className="font-serif-jp text-base font-semibold text-ink mb-3 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermillion"></span>
            </span>
            Currently Airing
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {ANIME_DB.filter(a => a.airing && (a.status === 'watching' || a.status === 'reading')).map(entry => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      )}

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
              <div className="grid gap-3 sm:grid-cols-2">
                {entries.map(entry => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 scroll-unroll scroll-unroll-delay-1">
          {filtered.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
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
  );
}
