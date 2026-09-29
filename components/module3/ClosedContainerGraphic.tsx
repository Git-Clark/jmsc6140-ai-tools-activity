"use client";

/** The sealed shipping container illustration -- shared by the
 * pre-reveal "ready to open?" gate (Stage 3, on a correct submit) and
 * the wrong-guess reveal state (a failed submit now shows the closed
 * container instead of a specific decoy animal image). Inline SVG
 * rather than a photo, matching the app's existing hand-drawn debrief
 * map, and it themes automatically since it uses the CSS custom
 * properties. */
export default function ClosedContainerGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A closed shipping container, sealed shut"
    >
      <rect width="400" height="400" rx="18" fill="var(--panel-2)" />
      <rect x="40" y="120" width="320" height="200" rx="10" fill="#C2A542" stroke="#8A7226" strokeWidth="4" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={40 + i * 36} y1="120" x2={40 + i * 36} y2="320" stroke="#8A7226" strokeWidth="2" opacity="0.55" />
      ))}
      <rect x="196" y="120" width="8" height="200" fill="#8A7226" />
      <circle cx="200" cy="220" r="34" fill="var(--gold-ink)" stroke="#5C4A16" strokeWidth="3" />
      <rect x="188" y="205" width="24" height="20" rx="4" fill="#5C4A16" />
      <rect x="192" y="196" width="16" height="16" rx="8" fill="none" stroke="#5C4A16" strokeWidth="4" />
      <text x="200" y="360" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text)">YLLU3719322</text>
      <text x="200" y="380" textAnchor="middle" fontSize="11" fill="var(--text-dim)">Sealed. Awaiting inspection.</text>
    </svg>
  );
}
