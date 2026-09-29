"use client";

import { useEffect, useRef, useState } from "react";
import { TOPICS, ICONS } from "@/lib/module2-data";
import { usePersistentState } from "@/lib/storage";
import AIPolicyModal from "./AIPolicyModal";

interface CoverageRow { link: string; diff: string }
interface P2State {
  topicIndex: number | null;
  fullName: string;
  englishName: string;
  headline: string;
  summary: string;
  background: string;
  visuals: string;
  flourish: string;
  coverage: CoverageRow[];
}

function defaultP2State(): P2State {
  return {
    topicIndex: null,
    fullName: "", englishName: "",
    headline: "", summary: "", background: "", visuals: "", flourish: "",
    coverage: [{ link: "", diff: "" }, { link: "", diff: "" }, { link: "", diff: "" }],
  };
}
function isP2State(v: unknown): v is P2State {
  const s = v as P2State;
  return !!s && Array.isArray(s.coverage);
}

// Loads /hku-logo.png (extracted from the prototype's inline base64 constant)
// and returns it as a data URI for jsPDF's addImage, mirroring HKU_LOGO_DATA_URI.
async function loadLogoDataUri(): Promise<string> {
  const res = await fetch("/hku-logo.png");
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function Module2({
  onStatusChange,
  onInstructions,
}: {
  onStatusChange: (done: boolean) => void;
  onInstructions: () => void;
}) {
  const [state, setState] = usePersistentState<P2State>("jmsc6140_activity2_v2", defaultP2State, isP2State);
  const [spinning, setSpinning] = useState(false);
  const [spinLabel, setSpinLabel] = useState("Spin for a Topic");
  const [spinIconIdx, setSpinIconIdx] = useState<number | null>(null);
  const [picking, setPicking] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const spinTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const coverageDone = state.coverage.every((r) => r.link.trim() && r.diff.trim());
  const complete = state.topicIndex !== null && state.fullName.trim() && state.headline.trim() &&
    state.summary.trim() && state.background.trim() && state.visuals.trim() && state.flourish.trim() && coverageDone;
  useEffect(() => { onStatusChange(!!complete); }, [complete, onStatusChange]);

  useEffect(() => () => { if (spinTimer.current) clearInterval(spinTimer.current); }, []);

  function showTopic(idx: number) {
    setState((s) => ({ ...s, topicIndex: idx }));
    setPicking(false);
  }

  function spin() {
    setSpinning(true);
    let ticks = 0;
    const maxTicks = 14;
    spinTimer.current = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * TOPICS.length);
      setSpinLabel(TOPICS[randomIdx].name);
      setSpinIconIdx(randomIdx);
      ticks++;
      if (ticks >= maxTicks) {
        if (spinTimer.current) clearInterval(spinTimer.current);
        setSpinning(false);
        setSpinLabel("Spin for a Topic");
        showTopic(Math.floor(Math.random() * TOPICS.length));
      }
    }, 90);
  }

  function field<K extends keyof P2State>(key: K) {
    return {
      value: state[key] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setState((s) => ({ ...s, [key]: e.target.value })),
    };
  }

  const summaryWords = state.summary.trim() ? state.summary.trim().split(/\s+/).length : 0;
  const wordCountClass = "word-count" + (summaryWords > 50 ? " bad" : summaryWords >= 45 ? " warn" : "");

  async function exportPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginL = 20, marginR = 20;
    const contentWidth = pageWidth - marginL - marginR;
    const pageBottom = pageHeight - 20;
    let y = 22;

    try {
      const logoDataUri = await loadLogoDataUri();
      const logoW = 48, logoH = logoW * (225 / 1000);
      doc.addImage(logoDataUri, "PNG", pageWidth - marginR - logoW, 15, logoW, logoH);
    } catch { /* logo is optional */ }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("JMSC6140 AI & Media Innovation", marginL, y); y += 6;
    doc.text("Fall 2026", marginL, y); y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const nameLine = (state.fullName || "[Full name]") + (state.englishName ? ", " + state.englishName : "");
    doc.text(nameLine, marginL, y); y += 6;
    doc.text("Class 5 – AI Tools for Journalists", marginL, y); y += 6;
    doc.text("29 September 2026", marginL, y); y += 14;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Story Pitch In-Class Activity", pageWidth / 2, y, { align: "center" }); y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    function drawItem(num: number, label: string, value: string) {
      if (y > pageBottom - 10) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text(num + ". " + label + ":", marginL, y); y += 6;
      doc.setFont("helvetica", "normal");
      const lines: string[] = doc.splitTextToSize(value || "(not yet completed)", contentWidth - 6);
      lines.forEach((line) => {
        if (y > pageBottom) { doc.addPage(); y = 20; }
        doc.text(line, marginL + 6, y); y += 6;
      });
      y += 4;
    }

    drawItem(1, "Headline", state.headline);
    drawItem(2, "50-word Pitch", state.summary);
    drawItem(3, "Visual Strategy", state.visuals);
    drawItem(4, "Data Visualization", state.flourish);
    drawItem(5, "Background Information & Context", state.background);

    if (y > pageBottom - 10) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.text("6. Existing Coverage & Angle Differentiation:", marginL, y); y += 6;
    doc.setFont("helvetica", "normal");
    const letters = ["a", "b", "c"];
    state.coverage.forEach((row, idx) => {
      const letter = letters[idx] || String(idx + 1);
      const text = letter + ". " + (row.link || "(story " + (idx + 1) + ")") + (row.diff ? " — " + row.diff : "");
      const lines: string[] = doc.splitTextToSize(text, contentWidth - 6);
      lines.forEach((line) => {
        if (y > pageBottom) { doc.addPage(); y = 20; }
        doc.text(line, marginL + 6, y); y += 6;
      });
    });

    const filename = (state.headline || "story-pitch").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + ".pdf";
    doc.save(filename);
  }

  const t = state.topicIndex !== null ? TOPICS[state.topicIndex] : null;

  return (
    <div className="panel-inner" id="panel-2">
      <div className="activity-head">
        <div>
          <p className="kicker">Activity 2</p>
          <h2>Story Pitch &amp; AI Research</h2>
        </div>
        <div className="head-actions">
          <button className="ai-policy-btn" aria-label="AI Policy Notice" title="AI Policy Notice" onClick={() => setPolicyOpen(true)}>i</button>
          <button className="btn" onClick={onInstructions}>Instructions</button>
          <button className="btn btn-gold" onClick={exportPdf}>Export Pitch Summary</button>
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Your Topic</h3></div>
        <div className="lang-body">
          {state.topicIndex === null && !picking && (
            <div className="topic-pre-layout">
              <div className="topic-icon-box" dangerouslySetInnerHTML={{ __html: ICONS[spinIconIdx ?? 0] }} />
              <div>
                <p style={{ color: "var(--text-dim)", fontSize: 14, margin: "0 0 14px" }}>Spin to get one of five randomly assigned reporting topics and its dataset.</p>
                <button className="btn btn-gold" disabled={spinning} onClick={spin}>{spinLabel}</button>
              </div>
            </div>
          )}
          {state.topicIndex !== null && !picking && t && (
            <div className="topic-card topic-card-layout">
              <div className="topic-icon-box" dangerouslySetInnerHTML={{ __html: ICONS[state.topicIndex] }} />
              <div>
                <div className="topic-name">{t.name}</div>
                <p className="topic-scope">{t.scope}</p>
                <div className="topic-actions">
                  <a className="btn dl" href={"/" + t.file} download>Download Dataset (.xlsx)</a>
                  <button className="btn" onClick={() => setPicking(true)}>Choose a Different Topic</button>
                </div>
                <p className="topic-fictitious">The figures in this dataset are entirely fictitious, made up for this activity.</p>
              </div>
            </div>
          )}
          {picking && (
            <div>
              <p style={{ fontSize: 13, color: "var(--text-dim)", margin: 0 }}>Pick a topic manually:</p>
              <div className="topic-pick-grid">
                {TOPICS.map((topic, idx) => (
                  <button key={topic.name} className="topic-pick-btn" onClick={() => showTopic(idx)}>
                    <span className="topic-icon-box" dangerouslySetInnerHTML={{ __html: ICONS[idx] }} />
                    <span>{topic.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lang-section">
        <div className="lang-head"><h3>Your Name</h3></div>
        <div className="lang-body">
          <div className="form-grid">
            <div className="field"><label>Full Name</label><input type="text" placeholder="As it appears on your student record" {...field("fullName")} /></div>
            <div className="field"><label>English Name</label><input type="text" placeholder="If different from your full name" {...field("englishName")} /></div>
          </div>
        </div>
      </div>

      {state.topicIndex !== null && (
        <div className="lang-section">
          <div className="lang-head"><h3>Build Your Pitch</h3></div>
          <div className="lang-body">
            <div className="field">
              <label>Background Information &amp; Context</label>
              <p className="field-hint">Please provide key facts, statistics, and background research that is relevant to the story that may not exactly fit in your pitch summary. Anything you find interesting and relevant should be here. There is no word limit in this section.</p>
              <textarea rows={4} placeholder="Synthesize what you learned from your dataset and research" {...field("background")} />
            </div>

            <div style={{ marginTop: 22 }}>
              <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--text-dim)", marginBottom: 4, fontWeight: 600 }}>Existing Coverage &amp; Angle Differentiation</label>
              <p style={{ fontSize: 12.5, color: "var(--text-dim)", margin: "0 0 4px" }}>List 3 similar stories you found using AI search tools (such as Perplexity or DeepSeek), and explain how your angle is different.</p>
              {state.coverage.map((row, idx) => (
                <div key={idx} className="coverage-row">
                  <div className="field">
                    <label>Similar Story {idx + 1} (title or link)</label>
                    <input type="text" value={row.link} onChange={(e) => setState((s) => ({ ...s, coverage: s.coverage.map((r, i) => (i === idx ? { ...r, link: e.target.value } : r)) }))} />
                  </div>
                  <div className="field">
                    <label>How your angle differs</label>
                    <input type="text" value={row.diff} onChange={(e) => setState((s) => ({ ...s, coverage: s.coverage.map((r, i) => (i === idx ? { ...r, diff: e.target.value } : r)) }))} />
                  </div>
                </div>
              ))}
            </div>

            <div className="field" style={{ marginTop: 22 }}>
              <label>Visual Strategy &mdash; proposed images for the pitch and final story</label>
              <textarea rows={3} placeholder="What images would support this story?" {...field("visuals")} />
            </div>

            <div className="field" style={{ marginTop: 16 }}>
              <label>Data Visualization &mdash; <a href="https://flourish.studio/" target="_blank" rel="noopener">Flourish AI</a> link</label>
              <input type="text" placeholder="https://flo.uri.sh/visualisation/.../embed" {...field("flourish")} />
            </div>

            <div className="field" style={{ marginTop: 16 }}>
              <label>Headline (NO A.I.)</label>
              <input type="text" placeholder="Write it yourself" {...field("headline")} />
            </div>

            <div className="field" style={{ marginTop: 16 }}>
              <label>50-Word Pitch Summary (NO A.I.)</label>
              <textarea rows={3} placeholder="Summarize your story angle in 50 words or fewer" {...field("summary")} />
              <div className={wordCountClass}>{summaryWords} / 50 words</div>
            </div>
          </div>
        </div>
      )}

      <AIPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </div>
  );
}
