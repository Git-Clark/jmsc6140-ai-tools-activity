"use client";

import { CASE_FILES, EXEC_NAMES_ALPHA, EXEC_POSITIONS } from "@/lib/module3-data";
import { CASE_DESCRIPTION, PREVIEW_NOTE } from "@/lib/content";
import { Stage2State } from "./state";
import EvidenceList from "./EvidenceList";

const EMAIL_FILES = CASE_FILES.filter((f) => f.cat === "Emails");

export default function Stage2({
  s,
  onChange,
  feedback,
  onBack,
  onNext,
}: {
  s: Stage2State;
  onChange: (patch: Partial<Stage2State>) => void;
  feedback: string;
  onBack: () => void;
  onNext: () => void;
}) {
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
        <div className="lang-head"><h3>Executives Watch - City</h3></div>
        <div className="lang-body">
          <p className="field-hint" style={{ margin: "0 0 8px" }}>What city is each executive right now, based on what you&apos;ve found?</p>
          <div>
            {EXEC_POSITIONS.map((p) => (
              <div className="field" style={{ marginBottom: 12 }} key={p.key}>
                <label>{p.name} ({p.label})</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={s.execWatch[p.key]}
                  onChange={(e) => onChange({ execWatch: { ...s.execWatch, [p.key]: e.target.value } })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Recent Orders</h3></div>
        <div className="lang-body">
          <div className="form-grid">
            <div className="field"><label>How many current active orders are experiencing shipping issues?</label><input type="text" value={s.shipissues} onChange={(e) => onChange({ shipissues: e.target.value })} /></div>
            <div className="field"><label>How many orders in the past 3 days have been transferred to a different port?</label><input type="text" value={s.transferred} onChange={(e) => onChange({ transferred: e.target.value })} /></div>
          </div>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Customer Communication</h3></div>
        <div className="lang-body">
          <div className="field"><label>For the orders in the past 3 days with shipping delays, how many customers sent a follow-up email asking when they will receive their order?</label><input type="text" value={s.followup} onChange={(e) => onChange({ followup: e.target.value })} /></div>
          <EvidenceList
            label="Please select the file names for the past 3 days with shipping delays follow up emails"
            values={s.delayEmails}
            onChange={(v) => onChange({ delayEmails: v })}
            items={EMAIL_FILES}
            placeholder="Search emails…"
          />
          <div className="field" style={{ marginTop: 14 }}>
            <label>Which executive is most involved in follow up orders?</label>
            <select className="field-select" value={s.mostInvolvedExec} onChange={(e) => onChange({ mostInvolvedExec: e.target.value })}>
              <option value="">Choose an executive…</option>
              {EXEC_NAMES_ALPHA.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="a3-stage-actions">
        <button className="btn" type="button" onClick={onBack}>&larr; Back</button>
        <div className={"a3-stage-feedback" + (feedback ? " bad" : "")}>{feedback}</div>
        <button className="btn btn-gold" type="button" onClick={onNext}>Next Stage &rarr;</button>
      </div>
    </div>
  );
}
