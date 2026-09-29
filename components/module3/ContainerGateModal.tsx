"use client";

/** Shown once, right after a successful Submit & Unlock, before the real
 * reveal (RevealBox) appears. A closed-container illustration plus a
 * button the team clicks to actually "open" it -- matching the
 * professor's request for a short "ready to open?" beat instead of the
 * reveal appearing immediately. No close/X: the only way past it is the
 * button, same pattern as the existing Stage 2 -> Stage 3 transition
 * overlay in index.tsx. */
export default function ContainerGateModal({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <div className={"modal-overlay" + (open ? " open" : "")}>
      <div className="modal">
        <div className="modal-body container-gate-body">
          <h2 className="container-gate-heading">Ready to open the container?</h2>
          <svg
            className="container-gate-img"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="A closed shipping container, sealed and ready to open"
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
          <button type="button" className="btn btn-gold container-gate-btn" onClick={onOpen}>
            Open the Container &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
