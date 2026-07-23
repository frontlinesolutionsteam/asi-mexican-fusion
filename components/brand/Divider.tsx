/**
 * Brass diamond flourish — the little "◆ ✦ ◆" rule that sits between the
 * eyebrow and the heading throughout the mockups.
 */
export function Divider({
  className = "",
  color = "text-gold",
  width = "w-full max-w-xs",
}: {
  className?: string;
  color?: string;
  width?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${color} ${width} ${className}`}>
      <span className="h-px flex-1 bg-current opacity-40" />
      <Flourish />
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}

function Flourish() {
  return (
    <svg width="46" height="12" viewBox="0 0 46 12" fill="currentColor" aria-hidden="true">
      <path d="M6 6 3 3 0 6l3 3z" />
      <path d="M23 0l2.4 3.6L29 6l-3.6 2.4L23 12l-2.4-3.6L17 6l3.6-2.4z" />
      <path d="M40 6l3-3 3 3-3 3z" />
    </svg>
  );
}
