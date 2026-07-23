"use client";

import { useId } from "react";

type Variant = "flags" | "mono";

/**
 * The Así signature: a butterfly whose left wing is the flag of Mexico and
 * right wing the flag of Jordan — "two cultures, one family, one kitchen."
 * Rendered as inline SVG so it stays crisp at any size and can be recolored.
 *
 * variant="flags" — full-color, for hero / story / footer moments
 * variant="mono"  — single-color line art (use `color`), for nav & dividers
 */
export function ButterflyEmblem({
  className,
  variant = "flags",
  color = "currentColor",
  title = "Así butterfly emblem — the flags of Mexico and Jordan",
}: {
  className?: string;
  variant?: Variant;
  color?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const clipL = `${id}-cl`;
  const clipR = `${id}-cr`;

  // Right-side wing shapes (mirrored to the left across x=100)
  const upper =
    "M100,57 C118,29 151,17 173,26 C191,33 188,59 175,71 C165,81 129,83 108,74 C102,71 100,65 100,57 Z";
  const lower =
    "M100,84 C121,85 151,90 165,105 C177,117 172,135 155,139 C139,143 115,132 105,111 C101,103 100,94 100,84 Z";

  const wingStroke = variant === "mono" ? color : "#3a2c22";

  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <clipPath id={clipL}>
          <g transform="translate(200,0) scale(-1,1)">
            <path d={upper} />
            <path d={lower} />
          </g>
        </clipPath>
        <clipPath id={clipR}>
          <path d={upper} />
          <path d={lower} />
        </clipPath>
      </defs>

      {variant === "flags" ? (
        <>
          {/* LEFT WING — flag of Mexico (green / white / red, vertical) */}
          <g clipPath={`url(#${clipL})`}>
            <rect x="18" y="10" width="28" height="140" fill="#0b6b3a" />
            <rect x="46" y="10" width="28" height="140" fill="#ffffff" />
            <rect x="74" y="10" width="28" height="140" fill="#ce1126" />
          </g>
          {/* RIGHT WING — flag of Jordan (black / white / green + red hoist + star) */}
          <g clipPath={`url(#${clipR})`}>
            <rect x="98" y="16" width="90" height="42" fill="#1a1a1a" />
            <rect x="98" y="58" width="90" height="42" fill="#ffffff" />
            <rect x="98" y="100" width="90" height="42" fill="#0b7a3b" />
            <polygon points="98,16 98,142 152,79" fill="#ce1126" />
            <Star cx={120} cy={79} r={7} fill="#ffffff" />
          </g>
        </>
      ) : (
        <>
          <g transform="translate(200,0) scale(-1,1)" fill={color} opacity="0.14">
            <path d={upper} />
            <path d={lower} />
          </g>
          <g fill={color} opacity="0.14">
            <path d={upper} />
            <path d={lower} />
          </g>
        </>
      )}

      {/* Wing outlines */}
      <g
        fill="none"
        stroke={wingStroke}
        strokeWidth={variant === "mono" ? 2.5 : 2}
        strokeLinejoin="round"
        opacity={variant === "mono" ? 0.9 : 0.85}
      >
        <path d={upper} />
        <path d={lower} />
        <g transform="translate(200,0) scale(-1,1)">
          <path d={upper} />
          <path d={lower} />
        </g>
      </g>

      {/* Body + head + antennae */}
      <g
        fill={variant === "mono" ? color : "#3a2c22"}
        stroke={variant === "mono" ? color : "#3a2c22"}
      >
        <rect x="96.5" y="52" width="7" height="82" rx="3.5" />
        <circle cx="100" cy="49" r="6" />
      </g>
      <g fill="none" stroke={variant === "mono" ? color : "#3a2c22"} strokeWidth="2.4" strokeLinecap="round">
        <path d="M100,47 C94,34 88,29 82,25" />
        <path d="M100,47 C106,34 112,29 118,25" />
      </g>
      <g fill={variant === "mono" ? color : "#c0963c"}>
        <circle cx="82" cy="24" r="3" />
        <circle cx="118" cy="24" r="3" />
      </g>
    </svg>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const points = [];
  const spikes = 7;
  const inner = r * 0.46;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? r : inner;
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    points.push(`${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`);
  }
  return <polygon points={points.join(" ")} fill={fill} />;
}
