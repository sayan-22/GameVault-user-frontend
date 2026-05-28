export type Game = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  banner: string;
  trailer: string;
  heroVideo?: string;
  price: number;
  discount?: number;
  free?: boolean;
  tags: string[];
  description: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  screenshots: string[];
  rating: number;
  reviewCount: number;
  systemRequirements: {
    minimum: Record<string, string>;
    recommended: Record<string, string>;
  };
  reviews: Array<{ author: string; rating: number; date: string; body: string }>;
};

const img = (seed: string, w = 600, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const wide = (seed: string) => `https://picsum.photos/seed/${seed}/1600/900`;

const TRAILERS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
];

const stdReq = {
  minimum: {
    OS: "Windows 10 64-bit",
    CPU: "Intel Core i5-4670K / AMD Ryzen 3 1200",
    RAM: "8 GB",
    GPU: "NVIDIA GTX 960 4GB / AMD R9 280",
    Storage: "60 GB available",
  },
  recommended: {
    OS: "Windows 11 64-bit",
    CPU: "Intel Core i7-9700K / AMD Ryzen 5 5600X",
    RAM: "16 GB",
    GPU: "NVIDIA RTX 3060 / AMD RX 6600 XT",
    Storage: "60 GB SSD",
  },
};

const reviews = [
  { author: "NovaStrike", rating: 5, date: "2026-04-02", body: "Combat feels weighty and the world is gorgeous on Ultra." },
  { author: "PixelKnight", rating: 4, date: "2026-03-18", body: "Story has pacing issues mid-game but the ending lands." },
  { author: "voidwalker_77", rating: 5, date: "2026-04-22", body: "Best soundtrack I've heard all year. Buy it just for that." },
  { author: "h3xqueen", rating: 3, date: "2026-02-11", body: "Solid but unremarkable — discount it." },
];

export const GAMES: Game[] = [
  {
    id: "1", title: "Neon Drift: Hyperion", slug: "neon-drift-hyperion",
    cover: img("neon-drift"), banner: wide("neon-drift-banner"),
    trailer: TRAILERS[0], heroVideo: TRAILERS[0],
    price: 59.99, discount: 40,
    tags: ["Racing", "Cyberpunk", "Open World"],
    description: "Tear through a rain-slick megacity at 400 km/h. Hyperion blends arcade drifting with deep car tuning and a neon-drenched open world that responds to your driving style.",
    developer: "Voltlight Studio", publisher: "Aurora Interactive", releaseDate: "2026-03-14",
    screenshots: [wide("neon-1"), wide("neon-2"), wide("neon-3"), wide("neon-4")],
    rating: 4.7, reviewCount: 12840, systemRequirements: stdReq, reviews,
  },
  {
    id: "2", title: "Ashen Crown", slug: "ashen-crown",
    cover: img("ashen-crown"), banner: wide("ashen-banner"),
    trailer: TRAILERS[1], price: 49.99, discount: 25,
    tags: ["Action RPG", "Dark Fantasy", "Souls-like"],
    description: "A kingdom under perpetual eclipse. Forge your blade, master the parry, and unearth the truth buried beneath the Ashen Throne.",
    developer: "Ironvale", publisher: "Black Lantern Games", releaseDate: "2026-01-29",
    screenshots: [wide("ashen-1"), wide("ashen-2"), wide("ashen-3"), wide("ashen-4")],
    rating: 4.6, reviewCount: 9320, systemRequirements: stdReq, reviews,
  },
  {
    id: "3", title: "Starbound Cartel", slug: "starbound-cartel",
    cover: img("starbound"), banner: wide("starbound-banner"),
    trailer: TRAILERS[2], price: 39.99,
    tags: ["Strategy", "Sci-Fi", "Management"],
    description: "Run smuggling routes between dying colonies. Negotiate, betray, and survive — every system has its price.",
    developer: "Pale Comet", publisher: "Pale Comet", releaseDate: "2026-05-10",
    screenshots: [wide("star-1"), wide("star-2"), wide("star-3"), wide("star-4")],
    rating: 4.4, reviewCount: 4210, systemRequirements: stdReq, reviews,
  },
  {
    id: "4", title: "Hollow Tide", slug: "hollow-tide",
    cover: img("hollow-tide"), banner: wide("hollow-banner"),
    trailer: TRAILERS[3], price: 0, free: true,
    tags: ["Free to Play", "Roguelite", "Co-op"],
    description: "Dive into a drowned cathedral with up to four friends. Procedural depths, modular builds, no two runs alike.",
    developer: "Driftwood Collective", publisher: "Aurora Interactive", releaseDate: "2025-12-02",
    screenshots: [wide("tide-1"), wide("tide-2"), wide("tide-3"), wide("tide-4")],
    rating: 4.5, reviewCount: 21500, systemRequirements: stdReq, reviews,
  },
  {
    id: "5", title: "Paper Engine", slug: "paper-engine",
    cover: img("paper-engine"), banner: wide("paper-banner"),
    trailer: TRAILERS[4], price: 19.99, discount: 50,
    tags: ["Puzzle", "Indie", "Hand-drawn"],
    description: "Bend the rules of an origami world to escape its folds. 80 levels, all illustrated by hand.",
    developer: "Twofold", publisher: "Twofold", releaseDate: "2026-04-04",
    screenshots: [wide("paper-1"), wide("paper-2"), wide("paper-3"), wide("paper-4")],
    rating: 4.8, reviewCount: 3120, systemRequirements: stdReq, reviews,
  },
  {
    id: "6", title: "Frostline: Last Watch", slug: "frostline-last-watch",
    cover: img("frostline"), banner: wide("frost-banner"),
    trailer: TRAILERS[5], price: 69.99, discount: 15,
    tags: ["FPS", "Tactical", "Multiplayer"],
    description: "A six-vs-six tactical FPS set on a collapsing Arctic research base. Every match changes the map.",
    developer: "Ninth Wave", publisher: "Black Lantern Games", releaseDate: "2026-02-21",
    screenshots: [wide("frost-1"), wide("frost-2"), wide("frost-3"), wide("frost-4")],
    rating: 4.3, reviewCount: 18700, systemRequirements: stdReq, reviews,
  },
  {
    id: "7", title: "Verdant Veil", slug: "verdant-veil",
    cover: img("verdant"), banner: wide("verdant-banner"),
    trailer: TRAILERS[0], price: 0, free: true,
    tags: ["Free to Play", "Adventure", "Exploration"],
    description: "Walk an overgrown world that remembers every visitor. No combat, no UI — just listen.",
    developer: "Quietfern", publisher: "Quietfern", releaseDate: "2026-04-30",
    screenshots: [wide("verdant-1"), wide("verdant-2"), wide("verdant-3"), wide("verdant-4")],
    rating: 4.6, reviewCount: 6730, systemRequirements: stdReq, reviews,
  },
  {
    id: "8", title: "Iron Sigil", slug: "iron-sigil",
    cover: img("iron-sigil"), banner: wide("iron-banner"),
    trailer: TRAILERS[1], price: 29.99, discount: 60,
    tags: ["Strategy", "Tactical", "Turn-Based"],
    description: "Lead a band of mercenaries through a fractured empire. Permadeath optional, regret guaranteed.",
    developer: "Hexbound", publisher: "Pale Comet", releaseDate: "2025-11-12",
    screenshots: [wide("iron-1"), wide("iron-2"), wide("iron-3"), wide("iron-4")],
    rating: 4.5, reviewCount: 7820, systemRequirements: stdReq, reviews,
  },
  {
    id: "9", title: "Helix Protocol", slug: "helix-protocol",
    cover: img("helix"), banner: wide("helix-banner"),
    trailer: TRAILERS[2], price: 44.99, discount: 30,
    tags: ["Action", "Stealth", "Sci-Fi"],
    description: "A corporate hacker turned ghost. Infiltrate, rewrite, escape — every level supports six approaches.",
    developer: "Voltlight Studio", publisher: "Aurora Interactive", releaseDate: "2026-05-01",
    screenshots: [wide("helix-1"), wide("helix-2"), wide("helix-3"), wide("helix-4")],
    rating: 4.7, reviewCount: 5410, systemRequirements: stdReq, reviews,
  },
  {
    id: "10", title: "Sable Republic", slug: "sable-republic",
    cover: img("sable"), banner: wide("sable-banner"),
    trailer: TRAILERS[3], price: 34.99,
    tags: ["RPG", "Political", "Branching Story"],
    description: "A nation on the brink. Your dialogue choices reshape borders, alliances, and the people who outlive you.",
    developer: "Ironvale", publisher: "Black Lantern Games", releaseDate: "2026-03-28",
    screenshots: [wide("sable-1"), wide("sable-2"), wide("sable-3"), wide("sable-4")],
    rating: 4.4, reviewCount: 2980, systemRequirements: stdReq, reviews,
  },
];

export const CATEGORIES = [
  { name: "Action", slug: "action", image: wide("cat-action") },
  { name: "RPG", slug: "rpg", image: wide("cat-rpg") },
  { name: "Strategy", slug: "strategy", image: wide("cat-strategy") },
  { name: "Indie", slug: "indie", image: wide("cat-indie") },
  { name: "Racing", slug: "racing", image: wide("cat-racing") },
  { name: "Adventure", slug: "adventure", image: wide("cat-adv") },
];
