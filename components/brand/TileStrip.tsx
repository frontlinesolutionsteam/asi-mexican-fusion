/**
 * Talavera / zellige tile band — the interlocking 8-pointed star pattern that
 * frames sections and the footer in the mockups. Pure tileable SVG.
 *
 * The tile draws a full 8-point star at its centre and quarter-stars at each
 * corner; when the pattern repeats, the corners meet to form the classic
 * interlocking star-and-cross zellige lattice.
 */
function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
}

export function TileStrip({
  className = "",
  height = 44,
  tone = "blue",
}: {
  className?: string;
  height?: number;
  tone?: "blue" | "cream";
}) {
  const s = 60; // tile size in user units
  const bg = tone === "blue" ? "#16295b" : "#1a2f66";
  const star = "#ecdcb5"; // warm cream
  const accent = "#b4472e"; // terracotta
  const gold = "#c0963c";
  const id = `zellige-${tone}`;

  const R = 19;
  const r = 8.4;

  return (
    <div className={className} aria-hidden="true" style={{ height, lineHeight: 0 }}>
      <svg width="100%" height={height} preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
        <defs>
          <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
            <rect width={s} height={s} fill={bg} />
            {/* corner stars (quartered → interlock across tiles) */}
            {[
              [0, 0],
              [s, 0],
              [0, s],
              [s, s],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <polygon points={starPoints(cx, cy, R, r)} fill={star} />
                <polygon points={starPoints(cx, cy, r * 0.9, r * 0.4)} fill={accent} />
              </g>
            ))}
            {/* centre star */}
            <polygon points={starPoints(s / 2, s / 2, R, r)} fill={star} />
            <polygon points={starPoints(s / 2, s / 2, r * 0.9, r * 0.4)} fill={accent} />
            <circle cx={s / 2} cy={s / 2} r={2.2} fill={gold} />
            {/* small connecting diamonds at edge midpoints */}
            {[
              [s / 2, 0],
              [0, s / 2],
              [s, s / 2],
              [s / 2, s],
            ].map(([cx, cy], i) => (
              <polygon
                key={`d${i}`}
                points={`${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}`}
                fill={gold}
                opacity="0.85"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
