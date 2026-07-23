// Crops real dish photos + a text-free hero background out of the brand mockups.
// Run: node scripts/prepare-images.mjs
// (One-time asset prep. Safe to re-run; it overwrites the generated files.)
import sharp from "sharp";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG = path.join(ROOT, "public", "images");

async function crop(src, { left, top, width, height }, out, resize) {
  let pipe = sharp(src).extract({ left, top, width, height });
  if (resize) pipe = pipe.resize(resize.w, resize.h, { fit: "cover" });
  await pipe.jpeg({ quality: 86 }).toFile(out);
  console.log("✓", path.relative(ROOT, out));
}

const grid = path.join(IMG, "mockups", "asi-menu-grid.png"); // 1003 x 1568
const hero = path.join(IMG, "asi-hero.png"); // 1672 x 941

// --- 6 signature dishes from THE FUSION MENU grid (3 cols x 2 rows) ---
const W = 302,
  H = 352;
const colL = [29, 351, 673];
const rowT = [305, 894];
const dishes = [
  ["beef-shawarma-tostaditas", 0, 0],
  ["shakshuka-a-la-mexicana", 1, 0],
  ["al-pastor-chicken-kebab", 2, 0],
  ["chicken-shawarma-fries", 0, 1],
  ["falafel-burrito", 1, 1],
  ["hummus-salsa-macha", 2, 1],
];

for (const [name, c, r] of dishes) {
  await crop(
    grid,
    { left: colL[c], top: rowT[r], width: W, height: H },
    path.join(IMG, "menu", `${name}.jpg`),
  );
}

// --- Text-free hero food background (right portion of the spread) ---
await crop(hero, { left: 768, top: 198, width: 900, height: 743 }, path.join(IMG, "hero-food.jpg"));

// --- Feature dish (left portion of "Shawarma meets Tostada") ---
const feature = path.join(IMG, "asi-feature.png"); // 1672 x 941
await crop(feature, { left: 30, top: 40, width: 820, height: 861 }, path.join(IMG, "feature-food.jpg"));

console.log("Done.");
