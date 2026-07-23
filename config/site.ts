/* ============================================================================
   Así Mexican Fusion Bistro — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Edit everything about the restaurant here: name, contact, hours, menu,
   prices, images, reviews, catering copy. Components read from this file, so
   you can update the whole site without touching any component code.

   IMAGES: paths point at /public/images/*. Drop real photos there with the
   same filename to swap a placeholder. Anything marked  ⟶ REAL PHOTO  is a
   placeholder waiting for a real Yelp / Instagram image.
   ============================================================================ */

export const site = {
  name: "Así Mexican Fusion Bistro",
  shortName: "Así",
  tagline: "Where two cultures meet",
  // Hero headline (Spanish, matching the brand mockup) + English subtitle
  heroHeadline: "Donde dos culturas se encuentran",
  heroSubtitle: "Mexican & Middle Eastern fusion — San Jose",
  description:
    "Family-owned, halal Mexican–Middle Eastern fusion bistro in San Jose, CA. Beef shawarma tostaditas, shakshuka a la Mexicana, al pastor kebabs, and more — two cultures, one family, one kitchen.",

  // ---- Contact & location ------------------------------------------------
  contact: {
    phone: "408-387-6777",
    phoneHref: "tel:+14083876777",
    email: "hello@asimexicanfusion.com", // TODO: confirm real inbox
    address: {
      street: "6239 Santa Teresa Blvd",
      city: "San Jose",
      state: "CA",
      zip: "95119",
    },
    // Used for the "Get directions" link and embedded map query
    mapQuery: "6239 Santa Teresa Blvd, San Jose, CA 95119",
    parkingNote: "Free parking in the plaza lot. Street parking on Santa Teresa Blvd.",
    instagram: "https://www.instagram.com/asimexicanfusion", // TODO: confirm handle
    yelp: "https://www.yelp.com/biz/asi-mexican-fusion-san-jose", // TODO: confirm URL
    doordash:
      "https://www.doordash.com/store/asi-mexican-fusion-bistro-san-jose-28377796/37461549/?event_type=autocomplete&pickup=false",
    // Search link to the Google Business listing — used for "read/write a review"
    // until a Place ID is confirmed and swapped in below.
    googleReviewSearchUrl:
      "https://www.google.com/search?q=As%C3%AD+Mexican+Fusion+Bistro+San+Jose+reviews",
  },

  // ---- Hours (easy to edit) ---------------------------------------------
  // Use 24h "HH:MM" strings so the "Open now" logic works. closed: true = dark.
  // NOTE: confirm/adjust these with the restaurant.
  hours: [
    { day: "Monday", short: "Mon", closed: true },
    { day: "Tuesday", short: "Tue", open: "11:30", close: "20:00" },
    { day: "Wednesday", short: "Wed", open: "11:30", close: "20:00" },
    { day: "Thursday", short: "Thu", open: "11:30", close: "20:00" },
    { day: "Friday", short: "Fri", open: "11:30", close: "21:00" },
    { day: "Saturday", short: "Sat", open: "11:30", close: "21:00" }, // TODO: confirm weekend
    { day: "Sunday", short: "Sun", open: "11:30", close: "20:00" }, // TODO: confirm weekend
  ] as HoursEntry[],

  // ---- Ordering ----------------------------------------------------------
  ordering: {
    enabled: true,
    pickup: true,
    delivery: false, // flip on when a delivery partner is wired up
    taxRate: 0.09125, // Santa Clara County — adjust if needed
    tipPresets: [0.15, 0.18, 0.2, 0.25],
    // Minutes from "now" offered as pickup slots
    pickupLeadMinutes: 20,
    pickupSlotStepMinutes: 15,
    currency: "USD",
  },

  // ---- Brand images ------------------------------------------------------
  // hero-food.jpg is cropped from the brand food-spread; menu photos are
  // cropped from the menu mockups (see scripts/prepare-images.mjs).
  images: {
    hero: "/images/hero-food.jpg", // text-free food spread (hero background)
    feature: "/images/feature-food.jpg", // "Shawarma meets Tostada" close-up
    team: "/images/asi-team.png", // real team photo — Lourdes & daughters
    interior: "/images/asi-interior.png", // dining room + butterfly mural
    mural: "/images/asi-interior.png", // butterfly mural lives in this shot
    logo: "/images/asi-logo.jpg", // round chili + olive brand logo (provided)
    // Real two-flag butterfly artwork (navy bg knocked out to transparent)
    butterflyMark: "/images/asi-butterfly-mark.png", // wings only
    butterflyLockup: "/images/asi-butterfly-cut.png", // butterfly + ASÍ text
  },
} as const;

export type HoursEntry = {
  day: string;
  short: string;
  open?: string;
  close?: string;
  closed?: boolean;
};

/* ---------------------------------------------------------------------------
   MENU
   Each item: id, name, description, price (number), image, category, tags,
   and optional `options` (modifier groups) for the cart.
   Prices match the mockup menu; adjust freely.
--------------------------------------------------------------------------- */

export type ModifierOption = {
  id: string;
  label: string;
  price?: number; // added to item price; omit/0 = free
};

export type ModifierGroup = {
  id: string;
  label: string;
  required?: boolean;
  min?: number;
  max?: number; // 1 = single select; >1 = multi
  options: ModifierOption[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  tags?: string[]; // e.g. "Signature", "Vegetarian", "Spicy"
  options?: ModifierGroup[];
};

export type MenuCategory = {
  id: string;
  name: string;
  blurb: string;
};

export const menuCategories: MenuCategory[] = [
  { id: "tostaditas", name: "Tostaditas", blurb: "Crispy blue-corn tostadas, piled high." },
  { id: "kebab-plates", name: "Kebab Plates", blurb: "Charcoal-kissed skewers with rice & salad." },
  { id: "burritos", name: "Burritos", blurb: "Wrapped to perfection, two cultures inside." },
  { id: "shawarma-fries", name: "Shawarma Fries", blurb: "Loaded fries, our way." },
  { id: "appetizers", name: "Appetizers", blurb: "To start, to share." },
  { id: "sides", name: "Sides", blurb: "The supporting cast." },
  { id: "drinks", name: "Drinks", blurb: "Aguas frescas, micheladas & more." },
];

// Reusable modifier groups
const spiceLevel: ModifierGroup = {
  id: "spice",
  label: "Spice level",
  required: true,
  min: 1,
  max: 1,
  options: [
    { id: "mild", label: "Mild" },
    { id: "medium", label: "Medium" },
    { id: "hot", label: "Hot — salsa macha" },
  ],
};

const extraSauces: ModifierGroup = {
  id: "sauces",
  label: "Add signature sauces",
  min: 0,
  max: 4,
  options: [
    { id: "toum", label: "Toum (garlic)", price: 0.75 },
    { id: "tahini-chipotle", label: "Tahini-chipotle crema", price: 0.75 },
    { id: "salsa-macha", label: "Salsa macha", price: 0.75 },
    { id: "salsa-verde", label: "Salsa verde", price: 0.75 },
  ],
};

const proteinSwap: ModifierGroup = {
  id: "protein",
  label: "Choose your protein",
  required: true,
  min: 1,
  max: 1,
  options: [
    { id: "beef", label: "Beef shawarma" },
    { id: "chicken", label: "Chicken shawarma" },
    { id: "al-pastor", label: "Al pastor chicken" },
    { id: "falafel", label: "Falafel (veg)" },
  ],
};

export const menu: MenuItem[] = [
  // ---- Tostaditas ----
  {
    id: "beef-shawarma-tostaditas",
    name: "Beef Shawarma Tostaditas",
    description:
      "Blue-corn tostadas layered with tender beef shawarma, toum, sumac-pickled onions, and cilantro.",
    price: 14.99,
    image: "/images/menu/beef-shawarma-tostaditas.jpg", //  ⟶ REAL PHOTO
    categoryId: "tostaditas",
    tags: ["Signature", "Halal"],
    options: [extraSauces],
  },
  {
    id: "shakshuka-a-la-mexicana",
    name: "Shakshuka a la Mexicana",
    description:
      "Spiced tomato sauce with eggs, feta, and cilantro, served with warm pita and tortillas.",
    price: 15.99,
    image: "/images/menu/shakshuka-a-la-mexicana.jpg", //  ⟶ REAL PHOTO
    categoryId: "tostaditas",
    tags: ["Signature", "Vegetarian", "Halal"],
    options: [spiceLevel],
  },
  // ---- Kebab Plates ----
  {
    id: "al-pastor-chicken-kebab",
    name: "Al Pastor Chicken Kebab Plate",
    description:
      "Marinated al pastor chicken skewer with cilantro rice, cucumber salad, grilled tomato, pita, and toum.",
    price: 17.99,
    image: "/images/menu/al-pastor-chicken-kebab.jpg", //  ⟶ REAL PHOTO
    categoryId: "kebab-plates",
    tags: ["Signature", "Halal"],
    options: [extraSauces],
  },
  {
    id: "beef-kebab-plate",
    name: "Beef Kebab Plate",
    description:
      "Charcoal-grilled beef skewer with cilantro rice, cucumber salad, grilled tomato, pita, and toum.",
    price: 18.99,
    image: "/images/menu/beef-kebab-plate.jpg", //  ⟶ REAL PHOTO
    categoryId: "kebab-plates",
    tags: ["Halal"],
    options: [extraSauces],
  },
  // ---- Burritos ----
  {
    id: "falafel-burrito",
    name: "Falafel Burrito",
    description:
      "Falafel, hummus, pickled turnips, pico de gallo, lettuce, rice, and toum, wrapped to perfection.",
    price: 13.99,
    image: "/images/menu/falafel-burrito.jpg", //  ⟶ REAL PHOTO
    categoryId: "burritos",
    tags: ["Signature", "Vegetarian", "Halal"],
    options: [extraSauces],
  },
  {
    id: "shawarma-burrito",
    name: "Shawarma Burrito",
    description:
      "Your choice of shawarma with rice, hummus, pickled turnips, pico de gallo, and tahini-chipotle crema.",
    price: 14.99,
    image: "/images/menu/shawarma-burrito.jpg", //  ⟶ REAL PHOTO
    categoryId: "burritos",
    tags: ["Halal"],
    options: [proteinSwap, extraSauces],
  },
  // ---- Shawarma Fries ----
  {
    id: "chicken-shawarma-fries",
    name: "Chicken Shawarma Loaded Fries",
    description:
      "Crispy fries topped with chicken shawarma, toum, feta, pickled turnips, cilantro, and salsa macha.",
    price: 14.99,
    image: "/images/menu/chicken-shawarma-fries.jpg", //  ⟶ REAL PHOTO
    categoryId: "shawarma-fries",
    tags: ["Signature", "Halal"],
    options: [proteinSwap, extraSauces],
  },
  // ---- Appetizers ----
  {
    id: "hummus-salsa-macha",
    name: "Hummus con Salsa Macha",
    description:
      "Creamy hummus crowned with salsa macha and chickpeas, served with warm pita and tortilla chips.",
    price: 10.99,
    image: "/images/menu/hummus-salsa-macha.jpg", //  ⟶ REAL PHOTO
    categoryId: "appetizers",
    tags: ["Signature", "Vegetarian", "Halal"],
  },
  {
    id: "falafel-bites",
    name: "Falafel Bites",
    description: "Crispy falafel with tahini-chipotle crema and pickled turnips.",
    price: 8.99,
    image: "/images/menu/falafel-bites.jpg", //  ⟶ REAL PHOTO
    categoryId: "appetizers",
    tags: ["Vegetarian", "Halal"],
  },
  // ---- Sides ----
  {
    id: "cilantro-rice",
    name: "Cilantro Rice",
    description: "Fluffy rice with fresh cilantro and lime.",
    price: 3.99,
    image: "/images/menu/cilantro-rice.jpg", //  ⟶ REAL PHOTO
    categoryId: "sides",
    tags: ["Vegetarian", "Halal"],
  },
  {
    id: "cucumber-salad",
    name: "Cucumber & Sumac Salad",
    description: "Crisp cucumbers, sumac, mint, and a squeeze of lime.",
    price: 4.99,
    image: "/images/menu/cucumber-salad.jpg", //  ⟶ REAL PHOTO
    categoryId: "sides",
    tags: ["Vegetarian", "Halal"],
  },
  {
    id: "sumac-pickled-onions",
    name: "Sumac Pickled Onions",
    description: "Our house pickled onions — bright, tangy, ruby-pink.",
    price: 2.5,
    image: "/images/menu/pickled-onions.jpg", //  ⟶ REAL PHOTO
    categoryId: "sides",
    tags: ["Vegetarian", "Halal"],
  },
  // ---- Drinks ----
  {
    id: "michelada",
    name: "Michelada",
    description: "Chili-salt rim, fresh lime, and our house michelada mix. (21+)",
    price: 9.99,
    image: "/images/menu/michelada.jpg", //  ⟶ REAL PHOTO
    categoryId: "drinks",
    tags: ["Signature", "21+"],
  },
  {
    id: "agua-fresca",
    name: "Agua Fresca",
    description: "Rotating house-made aguas frescas — ask about today's flavor.",
    price: 4.5,
    image: "/images/menu/agua-fresca.jpg", //  ⟶ REAL PHOTO
    categoryId: "drinks",
    tags: ["Vegetarian", "Halal"],
    options: [
      {
        id: "flavor",
        label: "Flavor",
        required: true,
        min: 1,
        max: 1,
        options: [
          { id: "horchata", label: "Horchata" },
          { id: "jamaica", label: "Jamaica (hibiscus)" },
          { id: "tamarindo", label: "Tamarindo" },
        ],
      },
    ],
  },
  {
    id: "mint-lemonade",
    name: "Mint Lemonade",
    description: "Middle Eastern–style blended lemonade with fresh mint.",
    price: 5.5,
    image: "/images/menu/mint-lemonade.jpg", //  ⟶ REAL PHOTO
    categoryId: "drinks",
    tags: ["Vegetarian", "Halal"],
  },
];

// Dishes surfaced on the home page grid (order matters)
export const signatureDishIds = [
  "beef-shawarma-tostaditas",
  "shakshuka-a-la-mexicana",
  "al-pastor-chicken-kebab",
  "chicken-shawarma-fries",
  "falafel-burrito",
  "hummus-salsa-macha",
];

/* ---------------------------------------------------------------------------
   REVIEWS — replace with real Yelp quotes as you gather them.
--------------------------------------------------------------------------- */
export type Review = {
  quote: string;
  author: string;
  source: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    quote:
      "The beef shawarma tostaditas are unlike anything else in San Jose — two cultures on one crispy blue-corn bite. Obsessed.", //  ⟶ REAL YELP QUOTE
    author: "Marisol R.",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "Finally, a halal spot that gets the details right. The al pastor kebab plate is smoky, tender, and generous. Family-run and it shows.", //  ⟶ REAL YELP QUOTE
    author: "Omar H.",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "Shakshuka a la Mexicana with warm pita AND tortillas? Genius. Warm room, warmer people. This is our new weekend spot.", //  ⟶ REAL YELP QUOTE
    author: "Jenny L.",
    source: "Yelp",
    rating: 5,
  },
];

/* ---------------------------------------------------------------------------
   GOOGLE REVIEWS
   Intentionally empty until real reviews are wired up — do NOT fill this with
   invented quotes. Two ways to populate it:

   1. Manual (fastest): copy real quotes from the Así Google Business Profile
      into the array below, matching the GoogleReview shape.
   2. Live (automated): call the Google Places API "Place Details" endpoint
      server-side (needs a Places API key + the location's Place ID) and map
      the `reviews[]` field it returns onto GoogleReview — do this in a
      server component or API route, never client-side, so the key stays
      secret. The homepage component already renders whatever this array
      contains, so swapping in live data requires no UI changes.
--------------------------------------------------------------------------- */
export type GoogleReview = {
  author: string;
  rating: number; // 1-5
  quote: string;
  relativeTime: string; // e.g. "2 weeks ago" — as shown by Google
};

export const googleReviews: GoogleReview[] = [];
export const story = {
  headline: ["Two flags.", "One family.", "One kitchen."],
  founders: "Lourdes Barraza & her daughter Isabella Astorga",
  openedText: "Opened January 2024 in San Jose, California",
  body: [
    "Así Mexican Fusion Bistro was born from the love of family, flavor, and two rich cultures.",
    "Rooted in Mexican tradition and inspired by Middle Eastern heritage, our kitchen is where recipes, memories, and generations come together. From our shawarma to our aguas frescas, every dish is made with heart, halal, and the belief that good food brings everyone to the table.",
  ],
  butterfly:
    "Our butterfly mural says it all — one wing the flag of Mexico, one wing the flag of Jordan. Two cultures, joined in the middle, where our family lives.",
  scriptLine: "Gracias por ser parte de nuestra familia.",
};

export const catering = {
  headline: "Cater with Así",
  blurb:
    "From office lunches to backyard weddings, we bring the two-culture table to you — halal, fresh, and built for a crowd. Tell us about your event and we’ll build a spread everyone remembers.",
  minGuests: 10,
  leadTimeDays: 3,
  packages: [
    {
      name: "Taco & Shawarma Bar",
      per: "per guest",
      price: 18,
      description:
        "Build-your-own with beef & chicken shawarma, al pastor, blue-corn tostadas, warm pita, rice, and all four signature sauces.",
    },
    {
      name: "Mezze + Mexicana Spread",
      per: "per guest",
      price: 22,
      description:
        "Hummus with salsa macha, falafel, shakshuka, cucumber-sumac salad, chips & tortillas, and aguas frescas.",
    },
    {
      name: "Family Feast Trays",
      per: "half / full tray",
      price: 0,
      description:
        "Mix and match trays of any signature dish. Priced by tray — tell us your headcount and we’ll quote it.",
    },
  ],
};
