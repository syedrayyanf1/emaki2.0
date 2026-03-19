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
  banner: string;
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
  studio?: string;
  alternativeTitles?: string[];
  characters?: { name: string; role: string; image: string; }[];
  related?: { id: number; title: string; type: string; }[];
  releaseDate?: string;
  endDate?: string;
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
  favoriteCharacters: FavoriteCharacter[];
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
  targetCover?: string;
}

export interface EmakiPick {
  id: number;
  title: string;
  description: string;
  curator: string;
  curatorRank: RankInfo;
  entries: { title: string; cover: string }[];
}

export interface ProfileStats {
  entries: number;
  completed: number;
  planning: number;
}

export interface FavoriteCharacter {
  id: string;
  name: string;
  series: string;
}

export interface MockProfile {
  id: string;
  username: string;
  rank: RankInfo;
  byosha: string;
  stats: ProfileStats;
  featuredPosts: Post[];
  starredEntries: AnimeEntry[];
  favoriteCharacters: FavoriteCharacter[];
  scrollData: AnimeEntry[];
  joinDate: string;
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
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-9VovXpA67vXf.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-9VovXpA67vXf.jpg',
    type: 'anime', status: 'completed', rating: 9.5, rewatchability: 9,
    startDate: '2023-10-01', finishDate: '2024-03-22', 
    note: 'In a world where the Hero party has already defeated the Demon King, an elf mage named Frieren begins a new journey to understand the fleeting lives of humans and the beauty of memories.',
    starred: true, progress: 28, totalEpisodes: 28, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Adventure', 'Fantasy', 'Drama'],
    studio: 'Madhouse', alternativeTitles: ['Sousou no Frieren', 'Frieren at the Funeral'],
    releaseDate: 'Sep 29, 2023', endDate: 'Mar 22, 2024',
    characters: [
      { name: 'Frieren', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b154587-nBy0DmcVNoV9.jpg' },
      { name: 'Fern', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b154588-nBy0DmcVNoV9.jpg' },
      { name: 'Stark', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b154589-nBy0DmcVNoV9.jpg' }
    ],
    related: [{ id: 18, title: 'Frieren Specials', type: 'Special' }]
  },
  {
    id: 2, title: 'Chainsaw Man', titleJp: 'チェンソーマン',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-VR9u96EbcSBy.png',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-S9EOhr97X9S0.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-S9EOhr97X9S0.jpg',
    type: 'anime', status: 'completed', rating: 8.5, rewatchability: 8,
    startDate: '2022-10-11', finishDate: '2022-12-27', 
    note: 'Denji is a young man trapped in poverty, working as a Devil Hunter to pay off his father\'s debt. Everything changes when he merges with his pet devil, Pochita, and becomes Chainsaw Man.',
    starred: true, progress: 12, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Horror', 'Dark Fantasy'],
    studio: 'MAPPA', alternativeTitles: ['CSM', 'Chenso Man'],
    releaseDate: 'Oct 12, 2022', endDate: 'Dec 28, 2022',
    characters: [
      { name: 'Denji', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130003-HTDmeL4RGeJ4.png' },
      { name: 'Makima', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130004-HTDmeL4RGeJ4.png' },
      { name: 'Power', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130005-HTDmeL4RGeJ4.png' }
    ]
  },
  {
    id: 3, title: 'Dandadan', titleJp: 'ダンダダン',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-D76fLpT2Y12o.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-T8eJ8J8eJ8J8.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-T8eJ8J8eJ8J8.jpg',
    type: 'anime', status: 'watching', rating: null, rewatchability: null,
    startDate: '2024-10-03', finishDate: null, 
    note: 'Momo Ayase and Ken Takakura find themselves at the center of an occult war involving aliens, ghosts, and bizarre curses after they challenge each other to visit haunted locations.',
    starred: false, progress: 8, totalEpisodes: 12, airing: true, nextEpisode: 9, nextEpisodeDate: '2024-11-28',
    genres: ['Action', 'Comedy', 'Supernatural'],
    studio: 'Science Saru', alternativeTitles: ['Dan Da Dan'],
    releaseDate: 'Oct 4, 2024',
    characters: [
      { name: 'Momo Ayase', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b171018-nBy0DmcVNoV9.jpg' },
      { name: 'Ken Takakura', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b171019-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 4, title: 'One Piece', titleJp: 'ワンピース',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCD6uz9XfM3X.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-63S7f6eS7f6e.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-63S7f6eS7f6e.jpg',
    type: 'manga', status: 'reading', rating: null, rewatchability: null,
    startDate: '2020-01-15', finishDate: null, 
    note: 'Monkey D. Luffy sets sail with his ragtag crew, the Straw Hat Pirates, to find the legendary treasure One Piece and become the Pirate King in a world of vast oceans and mysterious fruits.',
    starred: true, progress: 1108, totalEpisodes: null, airing: true, nextEpisode: 1109, nextEpisodeDate: '2024-12-01',
    genres: ['Adventure', 'Action', 'Comedy'],
    studio: 'Weekly Shonen Jump', alternativeTitles: ['OP'],
    releaseDate: 'Jul 22, 1997',
    characters: [
      { name: 'Monkey D. Luffy', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b1-VR9u96EbcSBy.png' },
      { name: 'Roronoa Zoro', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b2-VR9u96EbcSBy.png' }
    ]
  },
  {
    id: 5, title: 'Vagabond', titleJp: 'バガボンド',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9VovXpA67vXf.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/manga/banner/30656-9VovXpA67vXf.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9VovXpA67vXf.jpg',
    type: 'manga', status: 'reading', rating: null, rewatchability: null,
    startDate: '2023-06-01', finishDate: null, 
    note: 'A philosophical masterpiece following the life of Miyamoto Musashi as he seeks to become "Invincible Under the Sun" and eventually discovers the true meaning of strength and enlightenment.',
    starred: true, progress: 280, totalEpisodes: 327, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Drama', 'Historical'],
    studio: 'Morning', alternativeTitles: ['Musashi'],
    releaseDate: 'Sep 3, 1998',
    characters: [
      { name: 'Miyamoto Musashi', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b30656-nBy0DmcVNoV9.jpg' },
      { name: 'Sasaki Kojirou', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b30657-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 6, title: 'Bocchi the Rock!', titleJp: 'ぼっち・ざ・ろっく！',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-HTDmeL4RGeJ4.png',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130003-FEBlngeJSTEm.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130003-FEBlngeJSTEm.jpg',
    type: 'anime', status: 'completed', rating: 9.0, rewatchability: 10,
    startDate: '2022-10-08', finishDate: '2022-12-24', 
    note: 'Hitori "Bocchi" Gotoh is a socially anxious high school girl who dreams of playing in a band. Her life begins to change when she is invited to join Kessoku Band as their lead guitarist.',
    starred: false, progress: 12, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Comedy', 'Music', 'Slice of Life'],
    studio: 'CloverWorks', alternativeTitles: ['BTR', 'Rock on Bocchi'],
    releaseDate: 'Oct 9, 2022', endDate: 'Dec 25, 2022',
    characters: [
      { name: 'Hitori Gotoh', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130003-HTDmeL4RGeJ4.png' },
      { name: 'Nijika Ijichi', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b130004-HTDmeL4RGeJ4.png' }
    ]
  },
  {
    id: 7, title: 'Berserk', titleJp: 'ベルセルク',
    cover: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=600',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21560-6S7f6eS7f6e.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Berserk_vol_1.jpg',
    type: 'manga', status: 'completed', rating: 10, rewatchability: 8,
    startDate: '2019-03-01', finishDate: '2023-11-15', 
    note: 'Guts, a lone mercenary, and Griffith, the leader of the Band of the Hawk, forge a deep bond until a catastrophic betrayal plunges Guts into a lifelong struggle against the forces of fate and demons.',
    starred: true, progress: 374, totalEpisodes: 374, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Dark Fantasy', 'Horror'],
    studio: 'Young Animal', alternativeTitles: ['Berserk 1989'],
    releaseDate: 'Aug 25, 1989',
    characters: [
      { name: 'Guts', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b21560-nBy0DmcVNoV9.jpg' },
      { name: 'Griffith', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b21561-nBy0DmcVNoV9.jpg' },
      { name: 'Casca', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b21562-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 8, title: 'Mob Psycho 100', titleJp: 'モブサイコ100',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21507-6S7f6eS7f6e.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Mob_Psycho_100_volume_1_cover.jpg',
    type: 'anime', status: 'completed', rating: 9.2, rewatchability: 9,
    startDate: '2022-01-05', finishDate: '2023-03-30', 
    note: 'Shigeo Kageyama, known as Mob, is a middle school boy with immense psychic powers. He tries to live a normal life and suppress his emotions, which act as a trigger for his volatile abilities.',
    starred: false, progress: 37, totalEpisodes: 37, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Comedy', 'Supernatural'],
    studio: 'Bones', alternativeTitles: ['Mob Psycho'],
    releaseDate: 'Jul 12, 2016', endDate: 'Dec 22, 2022',
    characters: [
      { name: 'Shigeo Kageyama', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b21507-nBy0DmcVNoV9.jpg' },
      { name: 'Arataka Reigen', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b21508-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 9, title: 'Spy x Family', titleJp: 'スパイファミリー',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg',
    type: 'anime', status: 'watching', rating: null, rewatchability: null,
    startDate: '2022-04-09', finishDate: null, 
    note: 'A spy, an assassin, and a telepath must pretend to be a family to complete a mission and maintain world peace, all while keeping their true identities hidden from each other.',
    starred: false, progress: 37, totalEpisodes: null, airing: true, nextEpisode: 38, nextEpisodeDate: '2024-12-07',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    studio: 'Wit Studio, CloverWorks', alternativeTitles: ['SxF'],
    releaseDate: 'Apr 9, 2022',
    characters: [
      { name: 'Loid Forger', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b140960-nBy0DmcVNoV9.jpg' },
      { name: 'Anya Forger', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b140961-nBy0DmcVNoV9.jpg' },
      { name: 'Yor Forger', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b140962-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 10, title: 'Neon Genesis Evangelion', titleJp: '新世紀エヴァンゲリオン',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/30-6S7f6eS7f6e.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Neon_Genesis_Evangelion_vol_1.jpg',
    type: 'anime', status: 'completed', rating: 8.8, rewatchability: 7,
    startDate: '2018-05-20', finishDate: '2018-06-15', 
    note: 'In the year 2015, the world stands on the brink of destruction. Fifteen years after the Second Impact, special Eva units are piloted by children to fight the mysterious Angels.',
    starred: false, progress: 26, totalEpisodes: 26, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Mecha', 'Psychological', 'Sci-Fi'],
    studio: 'Gainax', alternativeTitles: ['Eva', 'NGE'],
    releaseDate: 'Oct 4, 1995', endDate: 'Mar 27, 1996',
    characters: [
      { name: 'Shinji Ikari', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b30-nBy0DmcVNoV9.jpg' },
      { name: 'Rei Ayanami', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b31-nBy0DmcVNoV9.jpg' },
      { name: 'Asuka Langley Souryuu', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b32-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 11, title: 'Jujutsu Kaisen', titleJp: '呪術廻戦',
    cover: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-FC7peS7f6e.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_Kaisen_manga_volume_1_cover.jpg',
    type: 'anime', status: 'dropped', rating: 7.0, rewatchability: 5,
    startDate: '2023-07-06', finishDate: null, 
    note: 'Yuji Itadori, a high school boy with exceptional physical strength, joins the Jujutsu Sorcerers after consuming a powerful cursed object – the finger of Sukuna Ryomen.',
    starred: false, progress: 35, totalEpisodes: 47, airing: false, nextEpisode: null, nextEpisodeDate: null,
    dropReason: 'Pacing issues in S2, felt like it prioritized spectacle over story.',
    genres: ['Action', 'Supernatural', 'Dark Fantasy'],
    studio: 'MAPPA', alternativeTitles: ['JJK'],
    releaseDate: 'Oct 3, 2020',
    characters: [
      { name: 'Yuji Itadori', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b113415-nBy0DmcVNoV9.jpg' },
      { name: 'Megumi Fushiguro', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b113416-nBy0DmcVNoV9.jpg' },
      { name: 'Gojo Satoru', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b113417-nBy0DmcVNoV9.jpg' }
    ]
  },
  {
    id: 12, title: 'Solo Leveling', titleJp: '俺だけレベルアップな件',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg',
    logo: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg',
    type: 'anime', status: 'planned', rating: null, rewatchability: null,
    startDate: null, finishDate: null, 
    note: 'In a world where Hunters must risk their lives to clear dungeons, Sung Jinwoo, the world\'s weakest Hunter, gains the ability to level up through a mysterious System, transforming into a formidable force.',
    starred: false, progress: 0, totalEpisodes: 12, airing: false, nextEpisode: null, nextEpisodeDate: null,
    genres: ['Action', 'Fantasy'],
    studio: 'A-1 Pictures', alternativeTitles: ['I Alone Level Up'],
    releaseDate: 'Jan 7, 2024',
    characters: [
      { name: 'Sung Jinwoo', role: 'Main', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b151807-nBy0DmcVNoV9.jpg' }
    ]
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
    favoriteCharacters: [
      { id: 'frieren', name: 'Frieren', series: "Frieren: Beyond Journey's End" },
      { id: 'musashi', name: 'Miyamoto Musashi', series: 'Vagabond' }
    ]
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
    favoriteCharacters: [
      { id: 'denji', name: 'Denji', series: 'Chainsaw Man' },
      { id: 'mob', name: 'Shigeo Kageyama', series: 'Mob Psycho 100' }
    ]
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
    favoriteCharacters: [
      { id: 'griffith', name: 'Griffith', series: 'Berserk' },
      { id: 'frieren', name: 'Frieren', series: "Frieren: Beyond Journey's End" },
      { id: 'musashi', name: 'Miyamoto Musashi', series: 'Vagabond' }
    ]
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
    favoriteCharacters: [
      { id: 'guts', name: 'Guts', series: 'Berserk' },
      { id: 'bocchi', name: 'Hitori Gotoh', series: 'Bocchi the Rock!' }
    ]
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
    favoriteCharacters: [
      { id: 'nya', name: 'Anya Forger', series: 'Spy x Family' }
    ]
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
  {
    id: 9, userId: 'artcritic', author: 'ArtCritic', avatar: '', rank: RANKS[4],
    content: 'Frieren Episode 27 was a masterclass in subtle animation. The way Fern\'s coat moved in the wind...',
    timestamp: '1w ago', channel: 'episode', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    episode: 27, replies: 12, agrees: 45,
  },
  {
    id: 10, userId: 'waverider', author: 'WaveRider', avatar: '', rank: RANKS[2],
    content: 'Episode 26 combat scene was incredibly fluid. Himmel\'s flashbacks still get me.',
    timestamp: '2w ago', channel: 'episode', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    episode: 26, replies: 5, agrees: 22,
  },
  {
    id: 11, userId: 'mangaphilosopher', author: 'MangaPhilosopher', avatar: '', rank: RANKS[6],
    content: 'Just started Dandadan. Episode 1 is totally chaotic in the best way possible.',
    timestamp: '1m ago', channel: 'episode', animeId: 3, animeTitle: 'Dandadan',
    episode: 1, replies: 0,
  },
  {
    id: 12, userId: 'inkblade', author: 'InkBlade', avatar: '', rank: RANKS[5],
    content: 'Hot take: Frieren would be boring if it was animated by any studio other than Madhouse.',
    timestamp: '3d ago', channel: 'hot-takes', animeId: 1, animeTitle: 'Frieren: Beyond Journey\'s End',
    agrees: 15, disagrees: 112, replies: 44,
  },
];

export const SEASON_CAPSULES: SeasonCapsule[] = [
  { id: 1, season: 'Fall', year: 2024, coverAnime: ['Dandadan', 'Blue Lock S2', 'Re:Zero S3'], topPosts: 342, topTakes: 89, topMemes: 56, description: 'The season of surprises. Dandadan took everyone by storm.' },
  { id: 2, season: 'Summer', year: 2024, coverAnime: ['Oshi no Ko S2', 'Tower of God S2', 'Wistoria'], topPosts: 287, topTakes: 74, topMemes: 43, description: 'Idol drama and dungeon climbing defined this summer.' },
  { id: 3, season: 'Spring', year: 2024, coverAnime: ['Kaiju No. 8', 'Mushoku Tensei S2P2', 'Bartender'], topPosts: 315, topTakes: 91, topMemes: 67, description: 'Kaiju No. 8 brought the hype, Mushoku brought the feels.' },
  { id: 4, season: 'Winter', year: 2024, coverAnime: ['Frieren', 'Solo Leveling', 'Dungeon Meshi'], topPosts: 456, topTakes: 112, topMemes: 89, description: 'An all-timer winter season. Frieren\'s finale was legendary.' },
];

export const RECOMMENDATION_CHAINS: RecommendationChain[] = [
  { id: 1, sourceTitle: 'Frieren', sourceId: 1, targetTitle: 'Mushishi', targetId: 0, reason: 'Same contemplative beauty, episodic nature exploration', author: 'WaveRider', agrees: 31, disagrees: 2, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx457-1YgE9QhB1K4k.png' },
  { id: 2, sourceTitle: 'Chainsaw Man', sourceId: 2, targetTitle: 'Dorohedoro', targetId: 0, reason: 'Chaotic energy, dark humor, incredible world-building', author: 'InkBlade', agrees: 45, disagrees: 5, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx105228-2tBwJ6W2Z7h2.jpg' },
  { id: 3, sourceTitle: 'Berserk', sourceId: 7, targetTitle: 'Vinland Saga', targetId: 0, reason: 'Epic medieval journey of a warrior seeking meaning', author: 'ArtCritic', agrees: 78, disagrees: 8, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-11P5KpsH6oON.jpg' },
  { id: 4, sourceTitle: 'Bocchi the Rock!', sourceId: 6, targetTitle: 'K-On!', targetId: 0, reason: 'Music + friendship, but K-On is pure comfort', author: 'NightOwl', agrees: 22, disagrees: 4, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5680-nPL9N54GzKWe.jpg' },
  { id: 5, sourceTitle: 'Mob Psycho 100', sourceId: 8, targetTitle: 'Saiki K', targetId: 0, reason: 'Overpowered psychics who just want a normal life', author: 'SilentReader', agrees: 56, disagrees: 7, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21804-rQ6oI0T8R5y4.jpg' },
  { id: 6, sourceTitle: 'One Piece', sourceId: 4, targetTitle: 'Hunter x Hunter', targetId: 0, reason: 'Expansive world, brilliant power system, emotional depth', author: 'MangaPhilosopher', agrees: 92, disagrees: 12, targetCover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-sObrowEAEGpt.png' },
];

export const EMAKI_PICKS: EmakiPick[] = [
  {
    id: 1, title: 'The Art of Solitude', description: 'Stories about characters finding beauty in being alone.',
    curator: 'MangaPhilosopher', curatorRank: RANKS[6],
    entries: [{ title: 'Frieren', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-nBy0DmcVNoV9.jpg' }, { title: 'Mushishi', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx457-1YgE9QhB1K4k.png' }, { title: 'A Silent Voice', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-UMb6Kl7ZL8Ke.jpg' }, { title: 'March Comes in Like a Lion', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21366-B1r3sIqItQkY.jpg' }],
  },
  {
    id: 2, title: 'Sakuga Showcase', description: 'When animation transcends the screen.',
    curator: 'ScrollKeeper', curatorRank: RANKS[4],
    entries: [{ title: 'Mob Psycho 100', cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600' }, { title: 'Chainsaw Man', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-VR9u96EbcSBy.png' }, { title: 'Bocchi the Rock!', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-HTDmeL4RGeJ4.png' }, { title: 'Dandadan', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-D76fLpT2Y12o.jpg' }],
  },
  {
    id: 3, title: 'The Weight of the Sword', description: 'Manga where combat carries philosophical weight.',
    curator: 'ArtCritic', curatorRank: RANKS[4],
    entries: [{ title: 'Berserk', cover: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=600' }, { title: 'Vagabond', cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9VovXpA67vXf.jpg' }, { title: 'Blade of the Immortal', cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx3658-vKjT5gJ0F0ZJ.jpg' }, { title: 'Vinland Saga', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-11P5KpsH6oON.jpg' }],
  },
];

export const WATCH_CLUBS = [
  { id: 1, name: 'Frieren Rewatch Club', members: 45, currentEpisode: 12, totalEpisodes: 28, type: 'watch' as const },
  { id: 2, name: 'One Piece Catch-Up Crew', members: 23, currentEpisode: 850, totalEpisodes: null, type: 'watch' as const },
  { id: 3, name: 'Berserk First Read', members: 31, currentEpisode: 120, totalEpisodes: 374, type: 'read' as const },
];

export const mockProfiles: MockProfile[] = [
  {
    id: 'mangaphilosopher',
    username: 'MangaPhilosopher',
    rank: RANKS[6],
    byosha: 'Seeker of truth in the inked panels. Analyzing themes that transcend paper.',
    stats: {
      entries: 543,
      completed: 210,
      planning: 42,
    },
    featuredPosts: POSTS.filter(p => p.userId === 'mangaphilosopher'),
    starredEntries: ANIME_DB.filter(a => [5, 7, 10].includes(a.id)),
    favoriteCharacters: [
      { id: 'griffith', name: 'Griffith', series: 'Berserk' },
      { id: 'frieren', name: 'Frieren', series: "Frieren: Beyond Journey's End" },
      { id: 'musashi', name: 'Miyamoto Musashi', series: 'Vagabond' },
    ],
    scrollData: ANIME_DB.filter(a => [5, 7, 10].includes(a.id)),
    joinDate: '2022-08-22',
  },
  {
    id: 'inkblade',
    username: 'InkBlade',
    rank: RANKS[5],
    byosha: 'Tracing the lines between reality and fiction. Visual storytelling enthusiast.',
    stats: {
      entries: 182,
      completed: 95,
      planning: 18,
    },
    featuredPosts: POSTS.filter(p => p.userId === 'inkblade'),
    starredEntries: ANIME_DB.filter(a => [1, 3, 6, 9].includes(a.id)),
    favoriteCharacters: [
      { id: 'denji', name: 'Denji', series: 'Chainsaw Man' },
      { id: 'mob', name: 'Shigeo Kageyama', series: 'Mob Psycho 100' },
    ],
    scrollData: ANIME_DB.filter(a => [1, 3, 6, 9].includes(a.id)),
    joinDate: '2023-03-10',
  },
  {
    id: 'artcritic',
    username: 'ArtCritic',
    rank: RANKS[4],
    byosha: 'Frame by frame, stroke by stroke. Only the finest visuals survive my scroll.',
    stats: {
      entries: 210,
      completed: 130,
      planning: 27,
    },
    featuredPosts: POSTS.filter(p => p.userId === 'artcritic'),
    starredEntries: ANIME_DB.filter(a => [3, 5, 8, 12].includes(a.id)),
    favoriteCharacters: [
      { id: 'guts', name: 'Guts', series: 'Berserk' },
      { id: 'bocchi', name: 'Hitori Gotoh', series: 'Bocchi the Rock!' },
    ],
    scrollData: ANIME_DB.filter(a => [3, 5, 8, 12].includes(a.id)),
    joinDate: '2023-06-15',
  },
];
