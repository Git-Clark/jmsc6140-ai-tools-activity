"use client";

import { useEffect, useState } from "react";
import {
  Lang,
  TOOLS,
  AlignOp,
  scoreText,
  scoreBadgeClass,
  barColor,
} from "@/lib/wer";
import { usePersistentState } from "@/lib/storage";
import Modal, { ModalHeader } from "./Modal";
import { CLIP_EN_NAME, CLIP_YUE_NAME, LANG_CITE_EN_LINK_TEXT, LANG_CITE_EN_LINK_HREF, LANG_CITE_EN_SUFFIX, LANG_CITE_YUE } from "@/lib/content";

interface Entry {
  tool: string;
  fileName: string;
  text: string;
  accuracy: number | null;
  ops: AlignOp[] | null;
}

interface P1State {
  en: Entry[];
  yue: Entry[];
}

function defaultEntry(): Entry {
  return { tool: "", fileName: "", text: "", accuracy: null, ops: null };
}

function defaultP1State(): P1State {
  return {
    en: [defaultEntry(), defaultEntry(), defaultEntry()],
    yue: [defaultEntry(), defaultEntry(), defaultEntry()],
  };
}

function isP1State(v: unknown): v is P1State {
  const s = v as P1State;
  return !!s && Array.isArray(s.en) && Array.isArray(s.yue);
}

function esc(s: string) {
  return s;
}

function renderColumn(ops: AlignOp[], lang: Lang, side: "ref" | "hyp") {
  const sep = lang === "en" ? " " : "";
  return ops.map((op, i) => {
    if (side === "ref") {
      if (op.type === "match") return <span key={i} className="w-match">{op.ref}{sep}</span>;
      if (op.type === "sub") return <span key={i} className="w-sub-ref">{op.ref}{sep}</span>;
      if (op.type === "del") return <span key={i} className="w-del">{op.ref}{sep}</span>;
      return null;
    } else {
      if (op.type === "match") return <span key={i} className="w-match">{op.hyp}{sep}</span>;
      if (op.type === "sub") return <span key={i} className="w-sub-hyp">{op.hyp}{sep}</span>;
      if (op.type === "ins") return <span key={i} className="w-ins">{op.hyp}{sep}</span>;
      return null;
    }
  });
}

function ToolRow({
  lang,
  idx,
  entry,
  onToolChange,
  onFile,
}: {
  lang: Lang;
  idx: number;
  entry: Entry;
  onToolChange: (v: string) => void;
  onFile: (file: File) => void;
}) {
  const [open, setOpen] = useState(false);
  const cls = scoreBadgeClass(entry.accuracy);
  return (
    <div className="tool-row">
      <div className="field">
        <label>Tool {idx + 1} Name</label>
        <input
          type="text"
          placeholder="e.g. Otter.ai"
          value={entry.tool}
          onChange={(e) => onToolChange(e.target.value)}
        />
      </div>
      <div className="field">
        <label>.txt Transcript</label>
        <label className="dropzone">
          <span className="fname">{entry.fileName ? entry.fileName : "Choose .txt file…"}</span>
          <span>&uarr;</span>
          <input
            type="file"
            accept=".txt,text/plain"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <div>
        <span className={"badge " + cls}>
          {entry.accuracy === null ? "Awaiting file" : entry.accuracy.toFixed(1) + "% match"}
        </span>
      </div>
      {entry.accuracy !== null && entry.ops && (
        <div className="diff-wrap">
          <button className="diff-toggle" type="button" onClick={() => setOpen((o) => !o)}>
            {open ? "Hide diff ↑" : "View diff ↓"}
          </button>
          <div className={"diff-box" + (open ? " open" : "")}>
            <div className="diff-legend">
              <span><i className="legend-dot" style={{ background: "var(--text)" }}></i>Match</span>
              <span><i className="legend-dot" style={{ background: "var(--bad)" }}></i>Missing / wrong</span>
              <span><i className="legend-dot" style={{ background: "var(--good)" }}></i>Extra word added</span>
            </div>
            {renderColumn(entry.ops, lang, "ref")}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Module1({
  onStatusChange,
  onInstructions,
}: {
  onStatusChange: (done: boolean) => void;
  onInstructions: () => void;
}) {
  const [state, setState] = usePersistentState<P1State>("jmsc6140_activity1_v2", defaultP1State, isP1State);
  const [compare, setCompare] = useState<{ lang: Lang; idx: number } | null>(null);

  const doneCount = state.en.filter((e) => e.accuracy !== null).length + state.yue.filter((e) => e.accuracy !== null).length;
  useEffect(() => { onStatusChange(doneCount === 6); }, [doneCount, onStatusChange]);

  function updateEntry(lang: Lang, idx: number, patch: Partial<Entry>) {
    setState((s) => {
      const next = { ...s, [lang]: s[lang].map((e, i) => (i === idx ? { ...e, ...patch } : e)) };
      return next;
    });
  }

  function handleFile(lang: Lang, idx: number, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = String(e.target?.result || "");
      const result = scoreText(lang, text);
      updateEntry(lang, idx, { fileName: file.name, text, accuracy: result.accuracy, ops: result.ops });
    };
    reader.readAsText(file);
  }

  const all: (Entry & { lang: Lang; langLabel: string; idx: number })[] = [
    ...state.en.map((e, idx) => ({ ...e, lang: "en" as Lang, langLabel: "EN", idx })),
    ...state.yue.map((e, idx) => ({ ...e, lang: "yue" as Lang, langLabel: "粤", idx })),
  ];
  const scoredEn = state.en.filter((e) => e.accuracy !== null);
  const scoredYue = state.yue.filter((e) => e.accuracy !== null);
  let bestLine: React.ReactNode = "Upload at least one file in each language to see a comparison.";
  if (scoredEn.length || scoredYue.length) {
    const parts: React.ReactNode[] = [];
    if (scoredEn.length) {
      const bestEn = scoredEn.reduce((a, b) => ((b.accuracy as number) > (a.accuracy as number) ? b : a));
      parts.push(<span key="en">English: <strong>{bestEn.tool || "unnamed tool"}</strong> leads at {(bestEn.accuracy as number).toFixed(1)}%</span>);
    }
    if (scoredYue.length) {
      const bestYue = scoredYue.reduce((a, b) => ((b.accuracy as number) > (a.accuracy as number) ? b : a));
      parts.push(<span key="yue">Cantonese: <strong>{bestYue.tool || "unnamed tool"}</strong> leads at {(bestYue.accuracy as number).toFixed(1)}%</span>);
    }
    bestLine = parts.flatMap((p, i) => (i === 0 ? [p] : [<span key={"sep" + i}>&nbsp;|&nbsp;</span>, p]));
  }

  const cmpEntry = compare ? state[compare.lang][compare.idx] : null;

  return (
    <div className="panel-inner" id="panel-1">
      <div className="activity-head">
        <div>
          <p className="kicker">Activity 1</p>
          <h2>Subtitle Accuracy Checker</h2>
          <p className="activity-warning">Please upload as a .txt file only! SRT and PDF files will not work.</p>
        </div>
        <div className="head-actions">
          <button className="btn" onClick={onInstructions}>Instructions</button>
        </div>
      </div>

      <div className="clip-strip">
        <div className="clip-card">
          <div className="flag">EN</div>
          <div className="meta">
            <div className="name">{CLIP_EN_NAME}</div>
            <div className="sub">Source clip for transcription</div>
          </div>
          <a className="btn dl" href="/audio/english-feature-video-news-report.mp3" download>Download</a>
        </div>
        <div className="clip-card">
          <div className="flag">&#31908;</div>
          <div className="meta">
            <div className="name">{CLIP_YUE_NAME}</div>
            <div className="sub">Source clip for transcription</div>
          </div>
          <a className="btn dl" href="/audio/cantonese-news-broadcast.mp3" download>Download</a>
        </div>
      </div>

      <div className="lang-section" data-lang="en">
        <div className="lang-head">
          <h3>
            <span className="lang-flag">EN</span> English{" "}
            <span className="lang-cite">- <a href={LANG_CITE_EN_LINK_HREF} target="_blank" rel="noopener">{LANG_CITE_EN_LINK_TEXT}</a>{LANG_CITE_EN_SUFFIX}</span>
          </h3>
          <div className="info-wrap">
            <span className="info-btn">i</span>
            <div className="info-pop">
              <strong>Tool ideas (not required, not exhaustive)</strong>
              <ul className="tool-list">{TOOLS.map((t) => <li key={t}>{t}</li>)}</ul>
              <span className="note">You are not limited to this list.</span>
            </div>
          </div>
        </div>
        <div className="lang-body">
          {state.en.map((entry, idx) => (
            <ToolRow key={idx} lang="en" idx={idx} entry={entry}
              onToolChange={(v) => updateEntry("en", idx, { tool: v })}
              onFile={(f) => handleFile("en", idx, f)} />
          ))}
        </div>
      </div>

      <div className="lang-section" data-lang="yue">
        <div className="lang-head">
          <h3><span className="lang-flag">&#31908;</span> Traditional Chinese (Cantonese) <span className="lang-cite">- {LANG_CITE_YUE}</span></h3>
          <div className="info-wrap">
            <span className="info-btn">i</span>
            <div className="info-pop">
              <strong>Tool ideas (not required, not exhaustive)</strong>
              <ul className="tool-list">{TOOLS.map((t) => <li key={t}>{t}</li>)}</ul>
              <span className="note">You are not limited to this list.</span>
            </div>
          </div>
        </div>
        <div className="lang-body">
          {state.yue.map((entry, idx) => (
            <ToolRow key={idx} lang="yue" idx={idx} entry={entry}
              onToolChange={(v) => updateEntry("yue", idx, { tool: v })}
              onFile={(f) => handleFile("yue", idx, f)} />
          ))}
        </div>
      </div>

      <div className="lang-section summary">
        <div className="lang-head"><h3>Summary Dashboard</h3></div>
        <div className="lang-body">
          <p className="hint">All six scores, side by side. Click a scored tile to see the full comparison.</p>
          <div className="score-grid">
            {all.map((entry) => {
              const scored = entry.accuracy !== null;
              return (
                <button
                  key={entry.lang + entry.idx}
                  className={"score-tile" + (scored ? " clickable" : " empty")}
                  onClick={() => scored && setCompare({ lang: entry.lang, idx: entry.idx })}
                  disabled={!scored}
                >
                  <div className="lang-tag">{entry.langLabel}</div>
                  <div className="tool-name">{entry.tool ? esc(entry.tool) : <span style={{ color: "var(--text-dim)", fontWeight: 500 }}>Unnamed tool</span>}</div>
                  <div className="pct">{scored ? (entry.accuracy as number).toFixed(1) + "%" : "Not scored"}</div>
                  <div className="bar"><i style={{ width: (entry.accuracy || 0) + "%", background: barColor(entry.accuracy || 0) }}></i></div>
                  {scored && <div className="view-link">View comparison &rarr;</div>}
                </button>
              );
            })}
          </div>
          <div className="best-line">{bestLine}</div>
        </div>
      </div>

      <Modal open={!!compare} onClose={() => setCompare(null)} wide>
        {cmpEntry && compare && cmpEntry.ops && (
          <>
            <ModalHeader title={(cmpEntry.tool || "Unnamed tool") + " — " + (compare.lang === "en" ? "English" : "Cantonese")} onClose={() => setCompare(null)} />
            <div className="modal-body">
              {(() => {
                const total = cmpEntry.ops!.filter((o) => o.type === "match" || o.type === "sub" || o.type === "del").length;
                const matched = cmpEntry.ops!.filter((o) => o.type === "match").length;
                const missing: Record<string, number> = {};
                const extra: Record<string, number> = {};
                cmpEntry.ops!.forEach((o) => {
                  if (o.type === "sub" || o.type === "del") missing[o.ref] = (missing[o.ref] || 0) + 1;
                  if (o.type === "sub" || o.type === "ins") extra[o.hyp] = (extra[o.hyp] || 0) + 1;
                });
                const unit = compare.lang === "en" ? "words" : "characters";
                return (
                  <>
                    <div className="cmp-stats">
                      <div className="cmp-stat"><div className="label">Accuracy</div><div className="value">{cmpEntry.accuracy!.toFixed(1)}%</div></div>
                      <div className="cmp-stat"><div className="label">{compare.lang === "en" ? "Words" : "Characters"} Matched</div><div className="value">{matched} / {total}</div></div>
                      <div className="cmp-stat"><div className="label">File</div><div className="value" style={{ fontSize: 13, fontWeight: 600 }}>{cmpEntry.fileName || "—"}</div></div>
                    </div>
                    <div className="cmp-cols">
                      <div className="cmp-col"><div className="cmp-col-head">Reference Transcript</div><div className="cmp-col-body">{renderColumn(cmpEntry.ops!, compare.lang, "ref")}</div></div>
                      <div className="cmp-col"><div className="cmp-col-head">{cmpEntry.tool || "Upload"}</div><div className="cmp-col-body">{renderColumn(cmpEntry.ops!, compare.lang, "hyp")}</div></div>
                    </div>
                    <div className="cmp-words">
                      <h4>Words to review</h4>
                      {compare.lang === "yue" && <p style={{ color: "var(--text-dim)", fontSize: 12.5, margin: "-4px 0 14px" }}>Simplified characters are marked wrong.</p>}
                      <div className="cmp-word-group">
                        <div className="glabel" style={{ color: "var(--bad)" }}>Missing or Wrong ({unit})</div>
                        {Object.keys(missing).length ? (
                          <div className="cmp-chip-list">{Object.entries(missing).map(([k, n]) => <span key={k} className="cmp-chip miss">{k}{n > 1 ? " ×" + n : ""}</span>)}</div>
                        ) : <p style={{ color: "var(--text-dim)", fontSize: 13, margin: 0 }}>None.</p>}
                      </div>
                      <div className="cmp-word-group">
                        <div className="glabel" style={{ color: "var(--good)" }}>Extra or Wrong ({unit})</div>
                        {Object.keys(extra).length ? (
                          <div className="cmp-chip-list">{Object.entries(extra).map(([k, n]) => <span key={k} className="cmp-chip extra">{k}{n > 1 ? " ×" + n : ""}</span>)}</div>
                        ) : <p style={{ color: "var(--text-dim)", fontSize: 13, margin: 0 }}>None.</p>}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
