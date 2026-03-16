import { Gift, Star, Clock, Flame, Quote, Download, BookOpen, Film, Trophy, Heart } from 'lucide-react';
import { ANIME_DB, getCoverGradient, USER_PROFILE } from '../../mock/mockData';

const echoes = ANIME_DB.filter(a => a.echo);

export default function Extras() {
  return (
    <div className="scroll-unroll space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif-jp text-2xl font-bold text-ink dark:text-cream flex items-center gap-2">
          <Gift size={24} className="text-vermillion" />
          Extras
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-0.5">Your personal summary & community echoes</p>
      </div>

      <div className="brushstroke-divider" />

      {/* Emaki Wrapped */}
      <div className="scroll-unroll scroll-unroll-delay-1">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-4 flex items-center gap-2">
          🎁 Emaki Wrapped 2024
        </h2>

        <div className="paper-card rounded-2xl overflow-hidden">
          {/* Hero gradient */}
          <div className="relative bg-gradient-to-br from-vermillion via-vermillion-dark to-ink p-8 text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold font-serif-jp">
                  SK
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif-jp">{USER_PROFILE.username}'s 2024</h3>
                  <span className="text-xs opacity-80">Your year in anime & manga</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Film size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">42</div>
                  <div className="text-[10px] opacity-80">Anime Watched</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <BookOpen size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">18</div>
                  <div className="text-[10px] opacity-80">Manga Read</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Clock size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">847</div>
                  <div className="text-[10px] opacity-80">Hours Spent</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Star size={20} className="mx-auto mb-1 opacity-80" />
                  <div className="text-2xl font-bold font-serif-jp">9.1</div>
                  <div className="text-[10px] opacity-80">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5">
            {/* Top Anime */}
            <div>
              <h4 className="text-xs font-semibold text-ink-muted dark:text-cream-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Trophy size={12} className="text-gold" /> Your Top 5
              </h4>
              <div className="flex gap-2">
                {ANIME_DB.filter(a => a.rating).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5).map((entry, i) => (
                  <div key={entry.id} className="flex-1 text-center">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden relative group bg-ink/10 dark:bg-white/10">
                      {entry.cover ? (
                        <img src={entry.cover} alt={entry.title} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getCoverGradient(entry.id)} flex flex-col items-center justify-center text-white p-2`}>
                          <span className="font-serif-jp text-xl font-bold">{entry.titleJp.charAt(0)}</span>
                        </div>
                      )}
                      <span className="absolute top-1 left-1.5 text-[10px] font-bold bg-black/60 text-white rounded-full h-5 w-5 flex items-center justify-center z-10">
                        {i + 1}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 backdrop-blur-[2px]">
                        <span className="flex items-center justify-center gap-0.5 text-[10px] text-white">
                          <Star size={8} className="fill-yellow-300 text-yellow-300" /> {entry.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-ink dark:text-cream font-medium mt-1.5 leading-tight truncate px-0.5">{entry.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brushstroke-divider" />

            {/* Fun Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Flame size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">7</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Binge Sessions</div>
              </div>
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Heart size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">Action</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Top Genre</div>
              </div>
              <div className="paper-card rounded-xl p-3 text-center border border-[#e8dfd2] dark:border-white/10">
                <Quote size={16} className="mx-auto mb-1 text-vermillion" />
                <div className="text-lg font-bold font-serif-jp text-ink dark:text-cream">23</div>
                <div className="text-[10px] text-ink-muted dark:text-cream-muted">Echoes Written</div>
              </div>
            </div>

            {/* Share button */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-vermillion to-vermillion-dark px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-vermillion/20 hover:shadow-vermillion/30 transition-all hover:scale-105">
                <Download size={16} />
                Share as Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Echoes */}
      <div className="scroll-unroll scroll-unroll-delay-2">
        <h2 className="font-serif-jp text-lg font-semibold text-ink dark:text-cream mb-1 flex items-center gap-2">
          <Quote size={18} className="text-indigo-accent" />
          Echoes
        </h2>
        <p className="text-xs text-ink-muted dark:text-cream-muted mb-4">"What did this leave you with?" — one sentence on completion, displayed as a community wall</p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {echoes.map(entry => (
            <div
              key={entry.id}
              className="paper-card rounded-xl p-4 break-inside-avoid paper-card-hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg overflow-hidden bg-white dark:bg-night-paper border border-[#e8dfd2] dark:border-white/10 flex items-center justify-center shrink-0">
                  {entry.logo ? (
                    <img src={entry.logo} alt={entry.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${getCoverGradient(entry.id)} flex items-center justify-center text-white text-[10px] font-bold font-serif-jp`}>
                      {entry.titleJp.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-ink dark:text-cream truncate">{entry.title}</h4>
                  <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">{entry.titleJp}</span>
                </div>
              </div>

              <div className="brushstroke-divider-indigo mb-2" />

              <p className="text-sm text-ink-light dark:text-cream-muted italic leading-relaxed">
                "{entry.echo}"
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-ink-muted dark:text-cream-muted">— {USER_PROFILE.username}</span>
                {entry.rating && (
                  <span className="flex items-center gap-0.5 text-[10px] text-ink dark:text-cream">
                    <Star size={9} className="text-gold fill-gold" /> {entry.rating}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Extra community echoes */}
          <div className="paper-card rounded-xl p-4 break-inside-avoid paper-card-hover border border-[#e8dfd2] dark:border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold font-serif-jp shrink-0">
                鬼
              </div>
              <div>
                <h4 className="text-xs font-semibold text-ink dark:text-cream">Demon Slayer</h4>
                <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">鬼滅の刃</span>
              </div>
            </div>
            <div className="brushstroke-divider-indigo mb-2" />
            <p className="text-sm text-ink-light dark:text-cream-muted italic leading-relaxed">
              "Family is the blade that never dulls."
            </p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-2 block">— InkBlade</span>
          </div>

          <div className="paper-card rounded-xl p-4 break-inside-avoid paper-card-hover border border-[#e8dfd2] dark:border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold font-serif-jp shrink-0">
                進
              </div>
              <div>
                <h4 className="text-xs font-semibold text-ink dark:text-cream">Attack on Titan</h4>
                <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">進撃の巨人</span>
              </div>
            </div>
            <div className="brushstroke-divider-indigo mb-2" />
            <p className="text-sm text-ink-light dark:text-cream-muted italic leading-relaxed">
              "Freedom was never free. That's the whole point."
            </p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-2 block">— WaveRider</span>
          </div>

          <div className="paper-card rounded-xl p-4 break-inside-avoid paper-card-hover border border-[#e8dfd2] dark:border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center text-white text-xs font-bold font-serif-jp shrink-0">
                銀
              </div>
              <div>
                <h4 className="text-xs font-semibold text-ink dark:text-cream">Gintama</h4>
                <span className="text-[10px] text-ink-muted dark:text-cream-muted font-serif-jp">銀魂</span>
              </div>
            </div>
            <div className="brushstroke-divider-indigo mb-2" />
            <p className="text-sm text-ink-light dark:text-cream-muted italic leading-relaxed">
              "It taught me that the funniest people carry the heaviest hearts."
            </p>
            <span className="text-[10px] text-ink-muted dark:text-cream-muted mt-2 block">— NightOwl</span>
          </div>
        </div>
      </div>
    </div>
  );
}
