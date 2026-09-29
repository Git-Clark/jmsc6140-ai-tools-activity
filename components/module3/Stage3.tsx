"use client";

import { useState } from "react";
import { CASE_DESCRIPTION, PREVIEW_NOTE } from "@/lib/content";
import { EXEC_POSITIONS } from "@/lib/module3-data";
import EvidencePicker from "./EvidencePicker";
import EvidenceList from "./EvidenceList";
import RevealBox from "./RevealBox";
import ContainerGateModal from "./ContainerGateModal";
import { CaseResult, P3State } from "./state";

export default function Stage3({
  p3,
  onChange,
  onBack,
  onSubmit,
  result,
  onOpenDebrief,
}: {
  p3: P3State;
  onChange: (patch: Partial<P3State>) => void;
  onBack: () => void;
  onSubmit: () => void;
  result: CaseResult | null;
  onOpenDebrief: () => void;
}) {
  const [containerOpened, setContainerOpened] = useState(() => p3.unlocked);
  const showGate = p3.hasSubmittedCase && !!result?.allOk && !containerOpened;
  const revealVisible = p3.hasSubmittedCase && !!result && (!result.allOk || containerOpened);

  const lockState = !p3.hasSubmittedCase ? "" : result?.allOk ? " unlocked" : " failed";
  const lockIcon = !p3.hasSubmittedCase ? "\u{1F512}" : result?.allOk ? "\u{1F513}" : "\u{1F512}";
  const lockTitle = !p3.hasSubmittedCase ? "Container Locked" : result?.allOk ? "Container Unlocked" : "Not Quite Yet";
  let lockSub = "Fill in your findings above, then submit to try to open the container.";
  if (p3.hasSubmittedCase && result) {
    if (result.allOk) {
      lockSub = "Case solved. Your team correctly identified the animal, container, executive, and destination.";
    } else {
      const missing: string[] = [];
      if (!result.animalOk) missing.push("animal");
      if (!result.containerOk) missing.push("container ID");
      if (!result.cityNowOk) missing.push("current city");
      if (!result.portNowOk) missing.push("current port/yard");
      if (!result.execOk) missing.push("guilty executive");
      if (!result.destOk) missing.push("final destination");
      if (!result.evidenceOk) missing.push("an evidence file for every claim");
      lockSub = "Check your: " + missing.join(", ") + ". Keep digging.";
    }
  }

  return (
    <div className="a3-stage">
      <div className="lang-section a3-case-box">
        <div className="lang-head"><h3>The Case</h3></div>
        <div className="lang-body">
          <p style={{ margin: "0 0 10px" }}>{CASE_DESCRIPTION}</p>
          <p className="topic-fictitious">{PREVIEW_NOTE}</p>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Timeline of Events - From Beginning to the Present</h3></div>
        <div className="lang-body">
          <p style={{ fontSize: 12.5, color: "var(--text-dim)", margin: "0 0 4px" }}>List the events, in order, that build your case. Each one needs a supporting file name.</p>
          <div>
            {p3.timeline.map((row, idx) => (
              <div className="timeline-row" key={idx}>
                <div className="field">
                  <label>Event {idx + 1}</label>
                  <input
                    type="text"
                    placeholder="What happened?"
                    value={row.desc}
                    onChange={(e) => onChange({ timeline: p3.timeline.map((r, i) => (i === idx ? { ...r, desc: e.target.value } : r)) })}
                  />
                </div>
                <div className="field">
                  <label>Evidence File</label>
                  <EvidencePicker
                    value={row.evi}
                    onChange={(v) => onChange({ timeline: p3.timeline.map((r, i) => (i === idx ? { ...r, evi: v } : r)) })}
                  />
                  {p3.timeline.length > 5 && (
                    <button type="button" className="tl-remove" onClick={() => onChange({ timeline: p3.timeline.filter((_, i) => i !== idx) })}>Remove</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="btn" type="button" style={{ marginTop: 10 }} onClick={() => onChange({ timeline: [...p3.timeline, { desc: "", evi: "" }] })}>+ Add Event</button>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>The Guilty Executive</h3></div>
        <div className="lang-body">
          <div className="field">
            <label>Name</label>
            <select className="field-select" value={p3.exec} onChange={(e) => onChange({ exec: e.target.value })}>
              <option value="">Choose an executive…</option>
              {EXEC_POSITIONS.map((p) => <option key={p.key} value={p.name}>{p.name} ({p.label})</option>)}
            </select>
          </div>
          <div className="field" style={{ marginTop: 14 }}><label>How do we know?</label><textarea rows={3} placeholder="Explain what the evidence shows" value={p3.execWhy} onChange={(e) => onChange({ execWhy: e.target.value })} /></div>
          <EvidenceList label="Evidence Files" values={p3.execEvi} onChange={(v) => onChange({ execEvi: v })} />
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Current Location of Missing Animal</h3></div>
        <div className="lang-body">
          <div className="form-grid-3">
            <div className="field"><label>Port / Yard</label><input type="text" placeholder="Name of the port or yard" value={p3.portNow} onChange={(e) => onChange({ portNow: e.target.value })} /></div>
            <div className="field"><label>City</label><input type="text" placeholder="City name" value={p3.cityNow} onChange={(e) => onChange({ cityNow: e.target.value })} /></div>
            <div className="field"><label>Shipping Container ID</label><input type="text" placeholder="e.g. ABCD1234567" value={p3.container} onChange={(e) => onChange({ container: e.target.value })} /></div>
          </div>
          <EvidenceList label="Evidence Files" values={p3.locationEvi} onChange={(v) => onChange({ locationEvi: v })} />
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Final Destination</h3></div>
        <div className="lang-body">
          <div className="form-grid">
            <div className="field"><label>Port</label><input type="text" placeholder="Name of the port" value={p3.portDest} onChange={(e) => onChange({ portDest: e.target.value })} /></div>
            <div className="field"><label>Country</label><input type="text" placeholder="Country name" value={p3.countryDest} onChange={(e) => onChange({ countryDest: e.target.value })} /></div>
          </div>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>The Trafficked Animal</h3></div>
        <div className="lang-body">
          <div className="field"><label>Species</label><input type="text" placeholder="What animal is being trafficked?" value={p3.animal} onChange={(e) => onChange({ animal: e.target.value })} /></div>
          <EvidenceList label="Evidence Files" values={p3.animalEvi} onChange={(v) => onChange({ animalEvi: v })} />
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Submit Your Case</h3></div>
        <div className="lang-body">
          <div className={"container-lock" + lockState}>
            <div className="lock-icon">{lockIcon}</div>
            <div className="lock-text">
              <div className="lock-title">{lockTitle}</div>
              <p className="lock-sub">{lockSub}</p>
            </div>
          </div>
          <button className="btn btn-gold" type="button" style={{ marginTop: 14 }} onClick={onSubmit}>Submit &amp; Unlock Container</button>
          {p3.hasSubmittedCase && (
            <button className="btn" type="button" style={{ marginTop: 14, marginLeft: 10 }} onClick={onOpenDebrief}>See Debrief</button>
          )}
          {revealVisible && result && <RevealBox animalGuess={p3.animal} allOk={result.allOk} />}
        </div>
      </div>

      <div className="a3-stage-actions">
        <button className="btn" type="button" onClick={onBack}>&larr; Back</button>
        <div className="a3-stage-feedback"></div>
      </div>

      <ContainerGateModal open={showGate} onOpen={() => setContainerOpened(true)} />
    </div>
  );
}
