"use client";

import ClosedContainerGraphic from "./ClosedContainerGraphic";

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
          <ClosedContainerGraphic className="container-gate-img" />
          <button type="button" className="btn btn-gold container-gate-btn" onClick={onOpen}>
            Open the Container &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
