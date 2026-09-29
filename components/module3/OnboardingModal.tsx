"use client";

import { useEffect, useState } from "react";
import { ONBOARD_SLIDES } from "@/lib/content";
import { P3State } from "./state";

export default function OnboardingModal({
  open,
  allowReturn,
  p3,
  onChange,
  onClose,
  onStart,
}: {
  open: boolean;
  allowReturn: boolean;
  p3: P3State;
  onChange: (patch: Partial<P3State>) => void;
  onClose: () => void;
  onStart: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const isLast = idx === ONBOARD_SLIDES.length - 1;

  // Reset to slide 0 every time the modal opens (mirrors openOnboarding()).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setIdx(0);
  }, [open]);

  return (
    <div className={"modal-overlay" + (open ? " open" : "")}>
      <div className="modal onboard-modal">
        <div className="modal-body">
          {ONBOARD_SLIDES.map((slide, i) => (
            <div className="onboard-slide" key={slide.label} hidden={i !== idx}>
              <p className="onboard-label">{slide.label}</p>
              {slide.paras.map((p, pi) => <p key={pi}>{p}</p>)}
              {i === 4 && (
                <>
                  <div className="field"><label>Team Name</label>
                    <input type="text" placeholder="e.g. The Night Desk" value={p3.teamName} onChange={(e) => onChange({ teamName: e.target.value })} />
                  </div>
                  <div className="field" style={{ marginTop: 16 }}>
                    <label>Group Members</label>
                    <p className="field-hint" style={{ marginTop: 2 }}>(For reporting roles with 2 classmates, add both names)</p>
                  </div>
                  <div className="field" style={{ marginTop: 10 }}><label>Company Background &amp; Executive Reporter</label>
                    <input type="text" placeholder="Full name(s)" value={p3.teamRole1} onChange={(e) => onChange({ teamRole1: e.target.value })} />
                  </div>
                  <div className="field" style={{ marginTop: 12 }}><label>Invoice &amp; Shipping Data Reporter</label>
                    <input type="text" placeholder="Full name(s)" value={p3.teamRole2} onChange={(e) => onChange({ teamRole2: e.target.value })} />
                  </div>
                  <div className="field" style={{ marginTop: 12 }}><label>Email &amp; Internal Communication Reporter</label>
                    <input type="text" placeholder="Full name(s)" value={p3.teamRole3} onChange={(e) => onChange({ teamRole3: e.target.value })} />
                  </div>
                </>
              )}
              {i === 5 && (
                <button
                  type="button"
                  className="btn btn-gold onboard-start"
                  onClick={() => {
                    onStart();
                    setIdx(0);
                  }}
                >
                  Start Investigating
                </button>
              )}
            </div>
          ))}
          <div className="onboard-nav">
            <div className="onboard-dots">
              {ONBOARD_SLIDES.map((slide, i) => (
                <div key={slide.label} className={"dot" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} />
              ))}
            </div>
            <div className="onboard-buttons">
              <button type="button" className="btn" hidden={!allowReturn} onClick={() => { onClose(); setIdx(0); }}>Return to Activity</button>
              <button type="button" className="btn" hidden={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))}>Back</button>
              <button type="button" className="btn btn-gold" hidden={isLast} onClick={() => setIdx((i) => Math.min(ONBOARD_SLIDES.length - 1, i + 1))}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
