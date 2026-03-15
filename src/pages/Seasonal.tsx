import { Cherry, MessageSquare, Flame, Smile, Archive } from 'lucide-react';
import { SEASON_CAPSULES, getCoverGradient } from '../data/mockData';

const SEASON_ICONS: Record<string, string> = {
  Winter: '❄️',
  Spring: '🌸',
  Summer: '☀️',
  Fall: '🍂',
};

const SEASON_GRADIENTS_DARK: Record<string, string> = {
  Winter: 'from-blue-900/40 to-indigo-900/40',
  Spring: 'from-pink-900/40 to-rose-900/40',
  Summer: 'from-amber-900/40 to-yellow-900/40',
  Fall: 'from-orange-900/40 to-red-900/40',
};

export default function Seasonal() {
  return (
    <div className="scroll-unroll space-y-8 max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="font-logo text-3xl font-bold text-ink dark:text-cream flex items-center justify-center md:justify-start gap-3">
          <Cherry size={28} className="text-vermillion animate-pulse" />
          Season Capsules
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-2 max-w-2xl">
          Community time capsules — a majestic chronicle of the best posts, takes, and memes from every season.
        </p>
      </div>

      <div className="brushstroke-divider opacity-20" />

      {/* Current Season Highlight */}
      <div className="scroll-unroll scroll-unroll-delay-1">
        <div className="paper-card rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-br ${SEASON_GRADIENTS_DARK[SEASON_CAPSULES[0].season]} p-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl filter drop-shadow-lg">{SEASON_ICONS[SEASON_CAPSULES[0].season]}</span>
                <div>
                  <h2 className="font-logo text-2xl font-bold text-ink dark:text-cream leading-tight">
                    {SEASON_CAPSULES[0].season} {SEASON_CAPSULES[0].year}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermillion shadow-sm shadow-vermillion/40"></span>
                    </span>
                    <span className="text-xs font-bold text-vermillion uppercase tracking-wider">Currently Active</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-ink-light dark:text-cream-muted leading-relaxed mb-6 max-w-3xl italic opacity-80">
              "{SEASON_CAPSULES[0].description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {SEASON_CAPSULES[0].coverAnime.map((title, i) => {
                const colors = [
                  'from-red-600 to-red-400',
                  'from-blue-600 to-blue-400',
                  'from-emerald-600 to-emerald-400'
                ];
                return (
                  <div key={title} className="group relative">
                    <div className={`h-16 rounded-xl bg-gradient-to-r ${colors[i % colors.length]} p-0.5 shadow-lg shadow-black/20 transition-all group-hover:-translate-y-1 group-hover:shadow-vermillion/20`}>
                      <div className="h-full w-full rounded-[10px] bg-black/20 backdrop-blur-sm flex items-center px-4 gap-3">
                        <span className="font-logo text-3xl font-bold text-white/90">{title.charAt(0)}</span>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-white/60 uppercase font-black tracking-widest leading-none mb-1">Entry</span>
                          <span className="text-xs font-bold text-white truncate">{title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 group cursor-help">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <div className="text-lg font-bold text-ink dark:text-cream leading-none">{SEASON_CAPSULES[0].topPosts}</div>
                  <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase font-bold tracking-tighter">Posts</div>
                </div>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <div className="p-2 rounded-lg bg-vermillion/10 text-vermillion">
                  <Flame size={16} />
                </div>
                <div>
                  <div className="text-lg font-bold text-ink dark:text-cream leading-none">{SEASON_CAPSULES[0].topTakes}</div>
                  <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase font-bold tracking-tighter">Hot Takes</div>
                </div>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Smile size={16} />
                </div>
                <div>
                  <div className="text-lg font-bold text-ink dark:text-cream leading-none">{SEASON_CAPSULES[0].topMemes}</div>
                  <div className="text-[10px] text-ink-muted dark:text-cream-muted uppercase font-bold tracking-tighter">Memes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Seasons Grid */}
      <div className="scroll-unroll scroll-unroll-delay-2 space-y-6">
        <h2 className="font-logo text-2xl font-bold text-ink dark:text-cream flex items-center gap-3">
          <Archive size={22} className="text-ink-muted dark:text-cream-muted" />
          Past Seasons
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEASON_CAPSULES.slice(1).map(capsule => (
            <div key={capsule.id} className="paper-card paper-card-hover group rounded-2xl overflow-hidden flex flex-col h-full bg-night-paper/50">
              <div className={`h-24 bg-gradient-to-br ${SEASON_GRADIENTS_DARK[capsule.season]} relative`}>
                <div className="absolute inset-0 flex items-center justify-between px-5">
                  <div className="flex flex-col">
                    <span className="text-xs text-ink-muted dark:text-cream-muted font-bold opacity-60 uppercase tracking-widest">{capsule.year}</span>
                    <h3 className="font-logo text-xl font-bold text-ink dark:text-cream">{capsule.season}</h3>
                  </div>
                  <span className="text-3xl filter drop-shadow-md opacity-80">{SEASON_ICONS[capsule.season]}</span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-ink-light dark:text-cream-muted leading-relaxed mb-4 line-clamp-2 italic">
                  "{capsule.description}"
                </p>

                <div className="flex gap-2 mb-Auto">
                  {capsule.coverAnime.map((title, i) => (
                    <div key={title} className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getCoverGradient(i + capsule.id * 3)} flex items-center justify-center text-white text-[12px] font-bold shadow-md border border-white/10`} title={title}>
                      {title.charAt(0)}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-3 text-[10px] text-ink-muted dark:text-cream-muted font-bold">
                    <span className="flex items-center gap-1 opacity-60"><MessageSquare size={12} /> {capsule.topPosts}</span>
                    <span className="flex items-center gap-1 opacity-60"><Flame size={12} /> {capsule.topTakes}</span>
                  </div>
                  <span className="text-[10px] text-vermillion font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer">View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Lane */}
      <div className="scroll-unroll scroll-unroll-delay-3">
        <div className="paper-card rounded-2xl p-8 border-l-4 border-l-vermillion/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-logo text-2xl font-bold text-ink dark:text-cream flex items-center gap-3">
                <span className="text-vermillion">✨</span> Memory Lane
              </h2>
              <p className="text-sm text-ink-muted dark:text-cream-muted mt-1 italic">
                A permanent digital chronicle of moments that moved the scroll.
              </p>
            </div>
          </div>
          
          <div className="brushstroke-divider opacity-10 mb-8" />
          
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Best Take', season: 'Winter 2024', user: 'MangaPhilosopher', rank: 'Sage', color: 'vermillion', content: 'Frieren is what happens when a story about immortality makes you feel the weight of every second.' },
              { label: 'Best Analysis', season: 'Spring 2024', user: 'ArtCritic', rank: 'Captain', color: 'indigo', content: "Kaiju No. 8's power scaling mirrors corporate Japan hierarchy — and that's entirely intentional." },
              { label: 'Top Meme', season: 'Summer 2024', user: 'NightOwl', rank: 'Alchemist', color: 'amber', content: "POV: You're reading Tower of God S2 and pretending you remember what happened in S1" },
              { label: 'Best Rec', season: 'Fall 2024', user: 'WaveRider', rank: 'Scout', color: 'emerald', content: "If Dandadan is your first Science SARU show, go back and watch Devilman Crybaby. You won't sleep, but you'll understand art." }
            ].map((item, i) => (
              <div key={i} className="paper-card rounded-xl p-5 border border-white/5 majestic-sep">
                <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-black tracking-widest">
                  <span className={`text-${item.color}-500/80`}>{item.label}</span>
                  <span className="text-ink-muted dark:text-cream-muted opacity-40">{item.season}</span>
                </div>
                <p className="text-sm text-ink-light dark:text-cream leading-relaxed mb-4 italic opacity-90">
                  "{item.content}"
                </p>
                <div className="flex items-center gap-2">
                  <div className={`h-6 w-6 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-700 flex items-center justify-center text-white text-[8px] font-bold`}>
                    {item.user.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-ink-muted dark:text-cream-muted">
                    {item.user} <span className="text-vermillion/60 font-serif-jp ml-1">{item.rank}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
