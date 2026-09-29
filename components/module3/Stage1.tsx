"use client";

import { EXEC_POSITIONS, EXEC_NAMES_ALPHA } from "@/lib/module3-data";
import { CASE_DESCRIPTION, PREVIEW_NOTE } from "@/lib/content";
import { Stage1State } from "./state";

export default function Stage1({
  s,
  onChange,
  feedback,
  onNext,
}: {
  s: Stage1State;
  onChange: (patch: Partial<Stage1State>) => void;
  feedback: string;
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
        <div className="lang-head"><h3>Company Info - Company Background &amp; Executive Reporter</h3></div>
        <div className="lang-body">
          <div className="field">
            <label>What is the company&apos;s name?</label>
            <input type="text" value={s.name} onChange={(e) => onChange({ name: e.target.value })} />
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label>What do they sell?</label>
            <select className="field-select" value={s.sells} onChange={(e) => onChange({ sells: e.target.value })}>
              <option value="">Choose one…</option>
              <option>Palm Sugar</option>
              <option>Semiconductors</option>
              <option>Stuffed Animal</option>
              <option>Make-up</option>
              <option>Liquefied Natural Gas</option>
            </select>
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label>What city is their headquarters located in? (City, Country)</label>
            <input type="text" value={s.hq} onChange={(e) => onChange({ hq: e.target.value })} />
          </div>
          <div style={{ marginTop: 18 }}>
            <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--text-dim)", marginBottom: 4, fontWeight: 600 }}>Who are their executives?</label>
            <p className="field-hint" style={{ margin: "0 0 4px" }}>Match each position to the executive who holds it.</p>
            <p className="field-hint" style={{ margin: "0 0 8px" }}>Executives: {EXEC_POSITIONS.map((p) => p.name).join(", ")}</p>
            <div>
              {EXEC_POSITIONS.map((p) => (
                <div className="a3-match-row" key={p.key}>
                  <span className="a3-match-label">{p.label}</span>
                  <select
                    value={s.execMatch[p.key]}
                    onChange={(e) => onChange({ execMatch: { ...s.execMatch, [p.key]: e.target.value } })}
                  >
                    <option value="">Choose an executive…</option>
                    {EXEC_NAMES_ALPHA.map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label>What is their top selling product in the past ten years?</label>
            <input type="text" value={s.topProduct} onChange={(e) => onChange({ topProduct: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Current Shipments - Invoice &amp; Shipping Data Reporter</h3></div>
        <div className="lang-body">
          <div className="form-grid">
            <div className="field"><label>How many countries does KL Stuffed Friends do business with?</label><input type="text" value={s.countries} onChange={(e) => onChange({ countries: e.target.value })} /></div>
            <div className="field"><label>How many shipping companies do they have contracts with?</label><input type="text" value={s.shippers} onChange={(e) => onChange({ shippers: e.target.value })} /></div>
            <div className="field"><label>How many total invoices are in the data leak?</label><input type="text" value={s.invoices} onChange={(e) => onChange({ invoices: e.target.value })} /></div>
            <div className="field"><label>How many current active shipments are there?</label><input type="text" value={s.activeships} onChange={(e) => onChange({ activeships: e.target.value })} /></div>
          </div>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Database Parameters - Email &amp; Internal Communication Reporter</h3></div>
        <div className="lang-body">
          <div className="form-grid">
            <div className="field"><label>How many files are in the database?</label><input type="text" value={s.filecount} onChange={(e) => onChange({ filecount: e.target.value })} /></div>
            <div className="field"><label>What is the size, in Megabytes, of the entire database?</label><input type="text" value={s.dbsize} onChange={(e) => onChange({ dbsize: e.target.value })} /></div>
            <div className="field">
              <label>What is the topic of the longest phone call?</label>
              <select className="field-select" value={s.longestcall} onChange={(e) => onChange({ longestcall: e.target.value })}>
                <option value="">Choose one…</option>
                <option>Animal Trafficking</option>
                <option>The Weather</option>
                <option>Company Stock Price Falling</option>
                <option>Japanese Order Details</option>
                <option>Directions to Padang Besar Border Crossing</option>
                <option>Delayed Factory Production in Vietnam</option>
              </select>
            </div>
            <div className="field">
              <label>Which company executive sent the most emails to company employees?</label>
              <select className="field-select" value={s.mostemails} onChange={(e) => onChange({ mostemails: e.target.value })}>
                <option value="">Choose one…</option>
                {EXEC_POSITIONS.map((p) => <option key={p.key} value={p.name}>{p.name} ({p.label})</option>)}
              </select>
            </div>
            <div className="field"><label>In the past 2 months, how many new markets ordered product samples?</label><input type="text" value={s.newmarkets} onChange={(e) => onChange({ newmarkets: e.target.value })} /></div>
          </div>
        </div>
      </div>

      <div className="a3-stage-actions">
        <div className={"a3-stage-feedback" + (feedback ? " bad" : "")}>{feedback}</div>
        <button className="btn btn-gold" type="button" onClick={onNext}>Next Stage &rarr;</button>
      </div>
    </div>
  );
}
