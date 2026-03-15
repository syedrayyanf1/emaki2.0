import { useState } from 'react';
import { Compass, ArrowRight, ThumbsUp, ThumbsDown, Sparkles, BookOpen } from 'lucide-react';
import { RECOMMENDATION_CHAINS, EMAKI_PICKS, getCoverGradient, type RecommendationChain } from '../data/mockData';

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
        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getCoverGradient(rec.sourceId)} flex items-center justify-center text-white text-sm font-bold font-serif-jp shrink-0`}>
          {rec.sourceTitle.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-ink-muted dark:text-cream-muted">If you loved</div>
          <div className="text-sm font-semibold text-ink dark:text-cream truncate">{rec.sourceTitle}</div>
        </div>

        <ArrowRight size={18} className="text-vermillion shrink-0 mx-1" />

        {/* Target */}
        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getCoverGradient(rec.targetId + 7)} flex items-center justify-center text-white text-sm font-bold font-serif-jp shrink-0`}>
          {rec.targetTitle.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-ink-muted dark:text-cream-muted">Watch / Read</div>
          <div className="text-sm font-semibold text-ink dark:text-cream truncate">{rec.targetTitle}</div>
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

  const sortedRecs = recFilter === 'top'
    ? [...RECOMMENDATION_CHAINS].sort((a, b) => (b.agrees - b.disagrees) - (a.agrees - a.disagrees))
    : RECOMMENDATION_CHAINS;

  return (
    <div className="scroll-unroll space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif-jp text-2xl font-bold text-ink dark:text-cream flex items-center gap-2">
          <Compass size={24} className="text-vermillion" />
          Discover
        </h1>
        <p className="text-sm text-ink-muted dark:text-cream-muted mt-0.5">No algorithms — just community wisdom, purely chronological</p>
      </div>

      <div className="brushstroke-divider" />

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
              <div className="grid grid-cols-4 h-20">
                {pick.entries.map((entry, i) => (
                  <div
                    key={entry.title}
                    className={`bg-gradient-to-br ${getCoverGradient(i + pick.id * 4)} flex items-center justify-center text-white`}
                  >
                    <span className="font-serif-jp text-lg font-bold">{entry.title.charAt(0)}</span>
                  </div>
                ))}
              </div>

              <div className="p-4">
                <h3 className="font-serif-jp text-sm font-bold text-ink dark:text-cream">{pick.title}</h3>
                <p className="text-xs text-ink-light dark:text-cream-muted mt-1 leading-relaxed">{pick.description}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {pick.entries.map(entry => (
                    <span key={entry.title} className="rounded-full bg-ink/5 dark:bg-white/5 px-2 py-0.5 text-[9px] text-ink-muted dark:text-cream-muted">
                      {entry.title}
                    </span>
                  ))}
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
