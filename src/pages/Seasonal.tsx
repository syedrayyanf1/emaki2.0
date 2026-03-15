import { Cherry, MessageSquare, Flame, Smile, Archive } from 'lucide-react';
import { SEASON_CAPSULES, getCoverGradient } from '../data/mockData';

const SEASON_ICONS: Record<string, string> = {
  Winter: '❄️',
  Spring: '🌸',
  Summer: '☀️',
  Fall: '🍂',
};

const SEASON_GRADIENTS: Record<string, string> = {
  Winter: 'from-blue-100 to-indigo-100',
  Spring: 'from-pink-100 to-rose-100',
  Summer: 'from-amber-100 to-yellow-100',
  Fall: 'from-orange-100 to-red-100',
};

export default function Seasonal() {
  return (
    <div className="scroll-unroll space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif-jp text-2xl font-bold text-ink dark:text-cream flex items-center gap-2">
          <Cherry size={24} className="text-vermillion" />
          Season Capsules
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-0.5">Community time capsules — the best posts, takes, and memes from every season</p>
      </div>

      <div className="brushstroke-divider" />

      {/* Current Season Highlight */}
      <div className="scroll-unroll scroll-unroll-delay-1">
        <div className="paper-card rounded-2xl overflow-hidden border border-[#e8dfd2] dark:border-white/10">
          <div className={`bg-gradient-to-r ${SEASON_GRADIENTS[SEASON_CAPSULES[0].season]} p-6 opacity-90 dark:opacity-80`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{SEASON_ICONS[SEASON_CAPSULES[0].season]}</span>
              <div>
                <h2 className="font-serif-jp text-xl font-bold text-ink dark:text-cream">
                  {SEASON_CAPSULES[0].season} {SEASON_CAPSULES[0].year}
                </h2>
                <span className="inline-flex items-center gap-1 text-xs text-vermillion font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-vermillion"></span>
                  </span>
                  Currently Active
                </span>
              </div>
            </div>

            <p className="text-sm text-ink-light dark:text-cream-muted mb-4">{SEASON_CAPSULES[0].description}</p>

            <div className="flex gap-2 mb-4">
              {SEASON_CAPSULES[0].coverAnime.map((title, i) => {
                const anime = ANIME_DB.find(a => a.title === title);
                return (
                  <div
                    key={title}
                    className="flex-1 rounded-xl overflow-hidden relative group aspect-[4/5] bg-ink/10 dark:bg-white/10"
                  >
                    {anime?.cover ? (
                      <img src={anime.cover} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCoverGradient(i + 10)} flex items-center justify-center text-white`}>
                        <div className="font-serif-jp text-lg font-bold">{title.charAt(0)}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      <div className="text-[10px] text-white font-medium leading-tight">{title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-sm text-ink-light dark:text-cream-muted">
                <MessageSquare size={14} className="text-indigo-accent" />
                <span className="font-semibold">{SEASON_CAPSULES[0].topPosts}</span> posts
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ink-light dark:text-cream-muted">
                <Flame size={14} className="text-vermillion" />
                <span className="font-semibold">{SEASON_CAPSULES[0].topTakes}</span> hot takes
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ink-light dark:text-cream-muted">
                <Smile size={14} className="text-gold" />
                <span className="font-semibold">{SEASON_CAPSULES[0].topMemes}</span> memes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Seasons Grid */}
      <div className="scroll-unroll scroll-unroll-delay-2">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-4 flex items-center gap-2">
          <Archive size={18} className="text-ink-muted dark:text-cream-muted" />
          Past Seasons
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEASON_CAPSULES.slice(1).map(capsule => (
            <div key={capsule.id} className="paper-card paper-card-hover rounded-xl overflow-hidden cursor-pointer">
              <div className={`bg-gradient-to-r ${SEASON_GRADIENTS[capsule.season]} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{SEASON_ICONS[capsule.season]}</span>
                  <h3 className="font-serif-jp text-base font-bold text-ink dark:text-cream">
                    {capsule.season} {capsule.year}
                  </h3>
                </div>
                <p className="text-xs text-ink-light dark:text-cream-muted leading-relaxed mb-3">{capsule.description}</p>

                {/* Mini covers */}
                <div className="flex gap-1.5 mb-3">
                  {capsule.coverAnime.map((title, i) => {
                    const anime = ANIME_DB.find(a => a.title === title);
                    return (
                      <div
                        key={title}
                        className="h-10 w-10 rounded-lg overflow-hidden relative group bg-ink/10 dark:bg-white/10"
                        title={title}
                      >
                        {anime?.cover ? (
                          <img src={anime.cover} alt={title} className="h-full w-full object-cover transition-transform group-hover:scale-125" />
                        ) : (
                          <div className={`h-full w-full bg-gradient-to-br ${getCoverGradient(i + capsule.id * 3)} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {title.charAt(0)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Stats bar */}
                <div className="flex gap-3 text-[10px] text-ink-muted dark:text-cream-muted">
                  <span className="flex items-center gap-0.5"><MessageSquare size={10} /> {capsule.topPosts}</span>
                  <span className="flex items-center gap-0.5"><Flame size={10} /> {capsule.topTakes}</span>
                  <span className="flex items-center gap-0.5"><Smile size={10} /> {capsule.topMemes}</span>
                </div>
              </div>

              {/* Archived badge */}
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] text-ink-muted dark:text-cream-muted flex items-center gap-1">
                  <Archive size={10} /> Archived
                </span>
                <span className="text-[10px] text-vermillion font-medium">View Capsule →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Lane */}
      <div className="scroll-unroll scroll-unroll-delay-3 paper-card rounded-xl p-5">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-1">✨ Memory Lane</h2>
        <p className="text-xs text-ink-muted dark:text-cream-muted mb-4">Curated highlights from past seasons — a permanent trip down memory lane</p>
        <div className="brushstroke-divider mb-4" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-vermillion/5 dark:bg-vermillion/10 p-3">
            <span className="text-[10px] font-semibold text-vermillion">Best Take — Winter 2024</span>
            <p className="text-xs text-ink-light dark:text-cream mt-1">"Frieren is what happens when a story about immortality makes you feel the weight of every second."</p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-1 block">— MangaPhilosopher 仙人</span>
          </div>
          <div className="rounded-lg bg-indigo-accent/5 dark:bg-indigo-accent/10 p-3">
            <span className="text-[10px] font-semibold text-indigo-accent">Best Analysis — Spring 2024</span>
            <p className="text-xs text-ink-light dark:text-cream mt-1">"Kaiju No. 8's power scaling mirrors corporate Japan hierarchy — and that's entirely intentional."</p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-1 block">— ArtCritic 隊長</span>
          </div>
          <div className="rounded-lg bg-gold/5 dark:bg-gold/10 p-3">
            <span className="text-[10px] font-semibold text-gold">Top Meme — Summer 2024</span>
            <p className="text-xs text-ink-light dark:text-cream mt-1">"POV: You're reading Tower of God S2 and pretending you remember what happened in S1"</p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-1 block">— NightOwl 錬金</span>
          </div>
          <div className="rounded-lg bg-sage-green/5 dark:bg-sage-green/10 p-3">
            <span className="text-[10px] font-semibold text-sage-green">Best Rec — Fall 2024</span>
            <p className="text-xs text-ink-light dark:text-cream mt-1">"If Dandadan is your first Science SARU show, go back and watch Devilman Crybaby. You won't sleep, but you'll understand art."</p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-1 block">— WaveRider 斥候</span>
          </div>
        </div>
      </div>
    </div>
  );
}
