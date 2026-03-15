export const RANKS = [
  { name: 'Genin', kanji: '下忍', minLevel: 0 },
  { name: 'Wanderer', kanji: '流浪', minLevel: 10 },
  { name: 'Scout', kanji: '斥候', minLevel: 25 },
  { name: 'Alchemist', kanji: '錬金', minLevel: 50 },
  { name: 'Captain', kanji: '隊長', minLevel: 100 },
  { name: 'Sovereign', kanji: '君主', minLevel: 200 },
  { name: 'Sage', kanji: '仙人', minLevel: 500 },
] as const;

export type RankInfo = (typeof RANKS)[number];

export interface AnimeEntry {
  id: number;
  title: string;
  titleJp: string;
  cover: string;
  logo: string;
  type: 'anime' | 'manga';
  status: 'watching' | 'reading' | 'completed' | 'dropped' | 'planned';
  rating: number | null;
  rewatchability: number | null;
  startDate: string | null;
  finishDate: string | null;
  note: string;
  starred: boolean;
  progress: number;
  totalEpisodes: number | null;
  airing: boolean;
  nextEpisode: number | null;
  nextEpisodeDate: string | null;
  dropReason?: string;
  echo?: string;
  genres: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  rank: RankInfo;
  bio: string;
  scrollCount: number;
  following: number;
  followers: number;
  tasteTwin: number;
  joinDate: string;
  starred: AnimeEntry[];
}

export interface Post {
  id: number;
  userId: string;
  author: string;
  avatar: string;
  rank: RankInfo;
  content: string;
  timestamp: string;
  channel: 'episode' | 'analysis' | 'recommendations' | 'hot-takes';
  animeId: number;
  animeTitle: string;
  episode?: number;
  agrees?: number;
  disagrees?: number;
  pinned?: boolean;
  replies?: number;
}

export interface SeasonCapsule {
  id: number;
  season: string;
  year: number;
  coverAnime: string[];
  topPosts: number;
  topTakes: number;
  topMemes: number;
  description: string;
}

export interface RecommendationChain {
  id: number;
  sourceTitle: string;
  sourceId: number;
  targetTitle: string;
  targetId: number;
  reason: string;
  author: string;
  agrees: number;
  disagrees: number;
}

export interface EmakiPick {
  id: number;
  title: string;
  description: string;
  curator: string;
  curatorRank: RankInfo;
  entries: { title: string; cover: string }[];
}

export const COVER_COLORS = [
  'from-rose-400 to-red-600',
  'from-blue-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-600',
  'from-purple-400 to-violet-600',
  'from-cyan-400 to-blue-600',
  'from-pink-400 to-rose-600',
  'from-lime-400 to-green-600',
  'from-fuchsia-400 to-purple-600',
  'from-sky-400 to-cyan-600',
];

export function getCoverGradient(id: number): string {
  return COVER_COLORS[id % COVER_COLORS.length];
}

export const ANIME_DB: AnimeEntry[] = [
  {
    id: 1, title: 'Frieren: Beyond Journey\'s End', titleJp: '葬送のフリーレン',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-nBy0DmcVNoV9.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-9VovXpA67vXf.jpg',
    type: 'anime', status: 'completed', rating: 9.5, rewatchability: 9,
    startDate: '2023-10-01', finishDate: '2024-03-22', note: 'A masterpiece of melancholy and beauty.',
    starred: true, progress: 28, totalEpisodes: 28, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'Time moves differently when you learn to cherish it.', genres: ['Adventure', 'Fantasy', 'Drama']
  },
  {
    id: 2, title: 'Chainsaw Man', titleJp: 'チェンソーマン',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-VR9u96EbcSBy.png',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-S9EOhr97X9S0.jpg',
    type: 'anime', status: 'completed', rating: 8.5, rewatchability: 8,
    startDate: '2022-10-11', finishDate: '2022-12-27', note: 'Raw, chaotic energy.',
    starred: true, progress: 12, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'Sometimes the simplest dreams are worth dying for.', genres: ['Action', 'Horror', 'Dark Fantasy']
  },
  {
    id: 3, title: 'Dandadan', titleJp: 'ダンダダン',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-D76fLpT2Y12o.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-T8eJ8J8eJ8J8.jpg',
    type: 'anime', status: 'watching', rating: null, rewatchability: null,
    startDate: '2024-10-03', finishDate: null, note: '',
    starred: false, progress: 8, totalEpisodes: 12, airing: true, nextEpisode: 9, nextEpisodeDate: '2024-11-28',
    genres: ['Action', 'Comedy', 'Supernatural']
  },
  {
    id: 4, title: 'One Piece', titleJp: 'ワンピース',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCD6uz9XfM3X.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-63S7f6eS7f6e.jpg',
    type: 'manga', status: 'reading', rating: null, rewatchability: null,
    startDate: '2020-01-15', finishDate: null, note: 'The greatest adventure ever told.',
    starred: true, progress: 1108, totalEpisodes: null, airing: true, nextEpisode: 1109, nextEpisodeDate: '2024-12-01',
    genres: ['Adventure', 'Action', 'Comedy']
  },
  {
    id: 5, title: 'Vagabond', titleJp: 'バガボンド',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9VovXpA67vXf.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9VovXpA67vXf.jpg',
    type: 'manga', status: 'reading', rating: null, rewatchability: null,
    startDate: '2023-06-01', finishDate: null, note: 'The art is transcendent.',
    starred: true, progress: 280, totalEpisodes: 327, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Drama', 'Historical']
  },
  {
    id: 6, title: 'Bocchi the Rock!', titleJp: 'ぼっち・ざ・ろっく！',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-HTDmeL4RGeJ4.png',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130003-FEBlngeJSTEm.jpg',
    type: 'anime', status: 'completed', rating: 9.0, rewatchability: 10,
    startDate: '2022-10-08', finishDate: '2022-12-24', note: 'Relatable anxiety + incredible music animation.',
    starred: false, progress: 12, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'Even the quietest voice can make the loudest music.', genres: ['Comedy', 'Music', 'Slice of Life']
  },
  {
    id: 7, title: 'Berserk', titleJp: 'ベルセルク',
    cover: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=600',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Berserk_vol_1.jpg',
    type: 'manga', status: 'completed', rating: 10, rewatchability: 8,
    startDate: '2019-03-01', finishDate: '2023-11-15', note: 'Miura\'s magnum opus. RIP.',
    starred: true, progress: 374, totalEpisodes: 374, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'In the deepest darkness, the struggle itself is the light.', genres: ['Action', 'Dark Fantasy', 'Horror']
  },
  {
    id: 8, title: 'Mob Psycho 100', titleJp: 'モブサイコ100',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Mob_Psycho_100_volume_1_cover.jpg',
    type: 'anime', status: 'completed', rating: 9.2, rewatchability: 9,
    startDate: '2022-01-05', finishDate: '2023-03-30', note: 'ONE is a genius. Season 3 ending was perfect.',
    starred: false, progress: 37, totalEpisodes: 37, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'Your powers don\'t define you. Your kindness does.', genres: ['Action', 'Comedy', 'Supernatural']
  },
  {
    id: 9, title: 'Spy x Family', titleJp: 'スパイファミリー',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg',
    type: 'anime', status: 'watching', rating: null, rewatchability: null,
    startDate: '2022-04-09', finishDate: null, note: 'Wholesome chaos.',
    starred: false, progress: 37, totalEpisodes: null, airing: true, nextEpisode: 38, nextEpisodeDate: '2024-12-07',
    genres: ['Action', 'Comedy', 'Slice of Life']
  },
  {
    id: 10, title: 'Neon Genesis Evangelion', titleJp: '新世紀エヴァンゲリオン',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Neon_Genesis_Evangelion_vol_1.jpg',
    type: 'anime', status: 'completed', rating: 8.8, rewatchability: 7,
    startDate: '2018-05-20', finishDate: '2018-06-15', note: 'Get in the robot.',
    starred: false, progress: 26, totalEpisodes: 26, airing: false, nextEpisode: null, nextEpisodeDate: null,
    echo: 'Congratulations.', genres: ['Mecha', 'Psychological', 'Sci-Fi']
  },
  {
    id: 11, title: 'Jujutsu Kaisen', titleJp: '呪術廻戦',
    cover: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_Kaisen_manga_volume_1_cover.jpg',
    type: 'anime', status: 'dropped', rating: 7.0, rewatchability: 5,
    startDate: '2023-07-06', finishDate: null, note: 'S2 started amazing but lost me.',
    starred: false, progress: 35, totalEpisodes: 47, airing: false, nextEpisode: null, nextEpisodeDate: null,
    dropReason: 'Pacing issues in S2, felt like it prioritized spectacle over story.',
    genres: ['Action', 'Supernatural', 'Dark Fantasy']
  },
  {
    id: 12, title: 'Solo Leveling', titleJp: '俺だけレベルアップな件',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg',
    type: 'anime', status: 'planned', rating: null, rewatchability: null,
    startDate: null, finishDate: null, note: '',
    starred: false, progress: 0, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Fantasy']
  },
];

export const USERS: UserProfile[] = [
  {
    id: 'scrollkeeper',
    username: 'ScrollKeeper',
    avatar: '',
    rank: RANKS[4], // Captain
    bio: 'Collector of stories, keeper of scrolls. Manga reader by day, anime watcher by night. Always searching for the next tale that moves the soul. 📜',
    scrollCount: 147,
    following: 89,
    followers: 234,
    tasteTwin: 100,
    joinDate: '2023-01-15',
    starred: ANIME_DB.filter(a => [1, 2, 4, 5, 7].includes(a.id)),
  },
  {
    id: 'inkblade',
    username: 'InkBlade',
    avatar: '',
    rank: RANKS[5], // Sovereign
    bio: 'Tracing the lines between reality and fiction. Visual storytelling enthusiast.',
    scrollCount: 82,
    following: 120,
    followers: 430,
    tasteTwin: 82,
    joinDate: '2023-03-10',
    starred: ANIME_DB.filter(a => [1, 3, 6, 9].includes(a.id)),
  },
  {
    id: 'mangaphilosopher',
    username: 'MangaPhilosopher',
    avatar: '',
    rank: RANKS[6], // Sage
    bio: 'Seeker of truth in the inked panels. Analyzing themes that transcend paper.',
    scrollCount: 543,
    following: 200,
    followers: 1200,
    tasteTwin: 65,
    joinDate: '2022-08-22',
    starred: ANIME_DB.filter(a => [5, 7, 10].includes(a.id)),
  },
  {
    id: 'artcritic',
    username: 'ArtCritic',
    avatar: '',
    rank: RANKS[4], // Captain
    bio: 'Frame by frame, stroke by stroke. Only the finest visuals survive my scroll.',
    scrollCount: 210,
    following: 154,
    followers: 560,
    tasteTwin: 74,
    joinDate: '2023-06-15',
    starred: ANIME_DB.filter(a => [3, 5, 8, 12].includes(a.id)),
  },
  {
    id: 'waverider',
    username: 'WaveRider',
    avatar: '',
    rank: RANKS[2], // Scout
    bio: 'Surfing the waves of the latest seasonal releases. 🌊',
    scrollCount: 45,
    following: 30,
    followers: 112,
    tasteTwin: 78,
    joinDate: '2024-01-05',
    starred: ANIME_DB.filter(a => [1, 9, 11].includes(a.id)),
  }
];

export const CURRENT_USER_ID = 'scrollkeeper';
export const USER_PROFILE = USERS.find(u => u.id === CURRENT_USER_ID)!;

export const POSTS: Post[] = [
  {
    id: 1, userId: 'scrollkeeper', author: 'ScrollKeeper', avatar: '', rank: RANKS[4],
    content: 'The way Frieren handles the passage of time is unlike anything I\'ve seen. Episode 18\'s exam arc is peak storytelling — it manages to make a test feel like the most important thing in the world.',
    timestamp: '2h ago', channel: 'analysis', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    agrees: 42, disagrees: 3, pinned: true, replies: 8,
  },
  {
    id: 2, userId: 'inkblade', author: 'InkBlade', avatar: '', rank: RANKS[5],
    content: 'Just finished episode 28. I\'m not crying, you\'re crying. The way they animated that final sequence with the cherry blossoms was breathtaking.',
    timestamp: '5h ago', channel: 'episode', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    episode: 28, replies: 15,
  },
  {
    id: 3, userId: 'mangaphilosopher', author: 'MangaPhilosopher', avatar: '', rank: RANKS[6],
    content: 'Hot take: Chainsaw Man Part 2 manga is BETTER than Part 1. The character work with Asa Mitaka elevates everything.',
    timestamp: '1d ago', channel: 'hot-takes', animeId: 2, animeTitle: 'Chainsaw Man',
    agrees: 67, disagrees: 89, replies: 34,
  },
  {
    id: 4, userId: 'waverider', author: 'WaveRider', avatar: '', rank: RANKS[2],
    content: 'If you loved Frieren, watch Mushishi. Same contemplative pacing, same beautiful exploration of what it means to exist alongside nature and spirits.',
    timestamp: '3h ago', channel: 'recommendations', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    agrees: 31, disagrees: 2, replies: 5,
  },
  {
    id: 5, userId: 'artcritic', author: 'ArtCritic', avatar: '', rank: RANKS[4],
    content: 'Dandadan episode 8 was INSANE. The sakuga in that fight scene was movie quality. Science SARU is doing God\'s work.',
    timestamp: '12h ago', channel: 'episode', animeId: 3, animeTitle: 'Dandadan',
    episode: 8, replies: 22,
  },
  {
    id: 6, userId: 'inkblade', author: 'InkBlade', avatar: '', rank: RANKS[5],
    content: 'One Piece chapter 1108 hits different after everything. Oda really is the GOAT of foreshadowing.',
    timestamp: '6h ago', channel: 'episode', animeId: 4, animeTitle: 'One Piece',
    episode: 1108, replies: 18,
  },
  {
    id: 7, userId: 'artcritic', author: 'ArtCritic', avatar: '', rank: RANKS[4],
    content: 'Hot take: Vagabond\'s art has NEVER been surpassed in manga. Not even by modern digital artists with all their tools.',
    timestamp: '2d ago', channel: 'hot-takes', animeId: 5, animeTitle: 'Vagabond',
    agrees: 124, disagrees: 15, replies: 41,
  },
  {
    id: 8, userId: 'scrollkeeper', author: 'ScrollKeeper', avatar: '', rank: RANKS[4],
    content: 'The way Bocchi\'s anxiety is portrayed through animation is genuinely innovative. The medium IS the message here.',
    timestamp: '4h ago', channel: 'analysis', animeId: 6, animeTitle: 'Bocchi the Rock!',
    agrees: 28, disagrees: 1, pinned: true, replies: 6,
  },
];

export const SEASON_CAPSULES: SeasonCapsule[] = [
  { id: 1, season: 'Fall', year: 2024, coverAnime: ['Dandadan', 'Blue Lock S2', 'Re:Zero S3'], topPosts: 342, topTakes: 89, topMemes: 56, description: 'The season of surprises. Dandadan took everyone by storm.' },
  { id: 2, season: 'Summer', year: 2024, coverAnime: ['Oshi no Ko S2', 'Tower of God S2', 'Wistoria'], topPosts: 287, topTakes: 74, topMemes: 43, description: 'Idol drama and dungeon climbing defined this summer.' },
  { id: 3, season: 'Spring', year: 2024, coverAnime: ['Kaiju No. 8', 'Mushoku Tensei S2P2', 'Bartender'], topPosts: 315, topTakes: 91, topMemes: 67, description: 'Kaiju No. 8 brought the hype, Mushoku brought the feels.' },
  { id: 4, season: 'Winter', year: 2024, coverAnime: ['Frieren', 'Solo Leveling', 'Dungeon Meshi'], topPosts: 456, topTakes: 112, topMemes: 89, description: 'An all-timer winter season. Frieren\'s finale was legendary.' },
];

export const RECOMMENDATION_CHAINS: RecommendationChain[] = [
  { id: 1, sourceTitle: 'Frieren', sourceId: 1, targetTitle: 'Mushishi', targetId: 0, reason: 'Same contemplative beauty, episodic nature exploration', author: 'WaveRider', agrees: 31, disagrees: 2 },
  { id: 2, sourceTitle: 'Chainsaw Man', sourceId: 2, targetTitle: 'Dorohedoro', targetId: 0, reason: 'Chaotic energy, dark humor, incredible world-building', author: 'InkBlade', agrees: 45, disagrees: 5 },
  { id: 3, sourceTitle: 'Berserk', sourceId: 7, targetTitle: 'Vinland Saga', targetId: 0, reason: 'Epic medieval journey of a warrior seeking meaning', author: 'ArtCritic', agrees: 78, disagrees: 8 },
  { id: 4, sourceTitle: 'Bocchi the Rock!', sourceId: 6, targetTitle: 'K-On!', targetId: 0, reason: 'Music + friendship, but K-On is pure comfort', author: 'NightOwl', agrees: 22, disagrees: 4 },
  { id: 5, sourceTitle: 'Mob Psycho 100', sourceId: 8, targetTitle: 'Saiki K', targetId: 0, reason: 'Overpowered psychics who just want a normal life', author: 'SilentReader', agrees: 56, disagrees: 7 },
  { id: 6, sourceTitle: 'One Piece', sourceId: 4, targetTitle: 'Hunter x Hunter', targetId: 0, reason: 'Expansive world, brilliant power system, emotional depth', author: 'MangaPhilosopher', agrees: 92, disagrees: 12 },
];

export const EMAKI_PICKS: EmakiPick[] = [
  {
    id: 1, title: 'The Art of Solitude', description: 'Stories about characters finding beauty in being alone.',
    curator: 'MangaPhilosopher', curatorRank: RANKS[6],
    entries: [{ title: 'Frieren', cover: '' }, { title: 'Mushishi', cover: '' }, { title: 'A Silent Voice', cover: '' }, { title: 'March Comes in Like a Lion', cover: '' }],
  },
  {
    id: 2, title: 'Sakuga Showcase', description: 'When animation transcends the screen.',
    curator: 'ScrollKeeper', curatorRank: RANKS[4],
    entries: [{ title: 'Mob Psycho 100', cover: '' }, { title: 'Chainsaw Man', cover: '' }, { title: 'Bocchi the Rock!', cover: '' }, { title: 'Dandadan', cover: '' }],
  },
  {
    id: 3, title: 'The Weight of the Sword', description: 'Manga where combat carries philosophical weight.',
    curator: 'ArtCritic', curatorRank: RANKS[4],
    entries: [{ title: 'Berserk', cover: '' }, { title: 'Vagabond', cover: '' }, { title: 'Blade of the Immortal', cover: '' }, { title: 'Vinland Saga', cover: '' }],
  },
];

export const WATCH_CLUBS = [
  { id: 1, name: 'Frieren Rewatch Club', members: 45, currentEpisode: 12, totalEpisodes: 28, type: 'watch' as const },
  { id: 2, name: 'One Piece Catch-Up Crew', members: 23, currentEpisode: 850, totalEpisodes: null, type: 'watch' as const },
  { id: 3, name: 'Berserk First Read', members: 31, currentEpisode: 120, totalEpisodes: 374, type: 'read' as const },
];
