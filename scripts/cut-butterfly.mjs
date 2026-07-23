// Knocks the solid navy background out of asi-butterfly.png -> transparent PNG.
// Uses a border flood-fill so only the connected background is removed; the
// black Jordan wing (interior, surrounded by other colors) is preserved.
// Run: node scripts/cut-butterfly.mjs
import sharp from "sharp";
import path from "node:path";

const IMG = path.join(import.meta.dirname, "..", "public", "images");
const src = path.join(IMG, "asi-butterfly.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info; // C = 4

// Background reference (deep navy) + tolerance. Nearest wing colour (green ~87)
// stays outside this radius, so the fill can't leak into the butterfly.
const BG = [0, 21, 48];
const TOL = 72;
const tol2 = TOL * TOL;
const near = (i) => {
  const dr = data[i] - BG[0];
  const dg = data[i + 1] - BG[1];
  const db = data[i + 2] - BG[2];
  return dr * dr + dg * dg + db * db <= tol2;
};

const visited = new Uint8Array(W * H);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (visited[p]) return;
  visited[p] = 1;
  if (near(p * C)) {
    data[p * C + 3] = 0; // transparent
    stack.push(x, y);
  }
};

// Seed from every border pixel
for (let x = 0; x < W; x++) {
  push(x, 0);
  push(x, H - 1);
}
for (let y = 0; y < H; y++) {
  push(0, y);
  push(W - 1, y);
}
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } })
  .png()
  .toFile(path.join(IMG, "asi-butterfly-cut.png"));

// Also export a tight, wings-only version (crop off the ASÍ text below).
await sharp(path.join(IMG, "asi-butterfly-cut.png"))
  .extract({ left: 0, top: 0, width: W, height: 265 })
  .trim({ threshold: 1 })
  .png()
  .toFile(path.join(IMG, "asi-butterfly-mark.png"));

console.log("✓ asi-butterfly-cut.png (lockup) + asi-butterfly-mark.png (wings)");
