// Activity 3 state shape -- ported verbatim from the prototype's
// defaultP3State()/loadP3State(). One shared shape used by index.tsx and
// every stage/modal subcomponent.

export interface ExecMatch {
  ceo: string;
  cfo: string;
  coo: string;
  logistics: string;
  design: string;
}

export interface Stage1State {
  name: string;
  sells: string;
  hq: string;
  execMatch: ExecMatch;
  topProduct: string;
  countries: string;
  shippers: string;
  invoices: string;
  activeships: string;
  filecount: string;
  dbsize: string;
  longestcall: string;
  mostemails: string;
  newmarkets: string;
}

export interface Stage2State {
  execWatch: ExecMatch;
  shipissues: string;
  transferred: string;
  followup: string;
  /** File names picked from the real Emails manifest for the "past 3
   * days with shipping delays" follow-up question. Presence-only check
   * (like the Stage 3 evidence pickers) -- the exact 2 correct emails
   * aren't identified in the fact pattern doc, so any picked file(s)
   * count, matching how evidence citations are graded everywhere else. */
  delayEmails: string[];
  /** "Which executive is most involved in follow up orders?" -- a
   * dropdown over EXEC_NAMES, correct answer Farhana binti Nur. */
  mostInvolvedExec: string;
}

export interface TimelineRow {
  desc: string;
  evi: string;
}

export interface P3State {
  animal: string;
  animalEvi: string[];
  portNow: string;
  cityNow: string;
  container: string;
  locationEvi: string[];
  exec: string;
  execWhy: string;
  execEvi: string[];
  timeline: TimelineRow[];
  portDest: string;
  countryDest: string;
  unlocked: boolean;
  hasSubmittedCase: boolean;
  teamName: string;
  teamRole1: string;
  teamRole2: string;
  teamRole3: string;
  onboardSeen: boolean;
  currentStage: 1 | 2 | 3;
  stage1Done: boolean;
  stage2Done: boolean;
  stage1: Stage1State;
  stage2: Stage2State;
}

export function defaultP3State(): P3State {
  return {
    animal: "", animalEvi: [""],
    portNow: "", cityNow: "", container: "", locationEvi: [""],
    exec: "", execWhy: "", execEvi: [""],
    timeline: [{ desc: "", evi: "" }, { desc: "", evi: "" }, { desc: "", evi: "" }, { desc: "", evi: "" }, { desc: "", evi: "" }],
    portDest: "", countryDest: "",
    unlocked: false, hasSubmittedCase: false,
    teamName: "", teamRole1: "", teamRole2: "", teamRole3: "", onboardSeen: false,
    currentStage: 1, stage1Done: false, stage2Done: false,
    stage1: {
      name: "", sells: "", hq: "",
      execMatch: { ceo: "", cfo: "", coo: "", logistics: "", design: "" },
      topProduct: "", countries: "", shippers: "", invoices: "", activeships: "",
      filecount: "", dbsize: "", longestcall: "", mostemails: "", newmarkets: "",
    },
    stage2: {
      execWatch: { ceo: "", cfo: "", coo: "", logistics: "", design: "" },
      shipissues: "", transferred: "", followup: "", delayEmails: [""], mostInvolvedExec: "",
    },
  };
}

export function isP3State(v: unknown): v is P3State {
  const s = v as P3State;
  return (
    !!s &&
    Array.isArray(s.timeline) &&
    Array.isArray(s.animalEvi) &&
    !!s.stage1 &&
    !!s.stage2 &&
    // Stage2's shape changed 2026-09-29 (deadline -> delayEmails,
    // repeatfollowup -> mostInvolvedExec). Without this check, a browser
    // that still has the OLD shape saved in localStorage would pass the
    // loose checks above, load verbatim, and then crash Stage 2 on
    // render (EvidenceList calling .map on an undefined delayEmails) --
    // that's the "Stage 2 can't load" bug. Rejecting stale shapes here
    // falls back to a fresh default state instead of crashing.
    Array.isArray(s.stage2.delayEmails) &&
    typeof s.stage2.mostInvolvedExec === "string"
  );
}

export function normA3(s: string): string {
  return (s || "").toString().trim().toLowerCase();
}

export function numOnlyA3(s: string): string {
  const m = (s || "").toString().match(/\d+/);
  return m ? m[0] : "";
}

/** Pulls the first decimal (or whole) number out of a free-typed answer,
 * e.g. "about 16.9 MB" -> 16.9. Used for the database-size check, which
 * needs a tolerance rather than exact string equality. */
export function numFloatA3(s: string): number | null {
  const m = (s || "").toString().match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

export interface StageCheckResult {
  allOk: boolean;
  missing: string[];
}

// Stage 1's three lang-section boxes, in on-page order. Used to highlight
// a whole section red when any field inside it is wrong.
export const STAGE1_SECTIONS = ["company", "shipments", "database"] as const;
export type Stage1Section = (typeof STAGE1_SECTIONS)[number];

export interface Stage1CheckResult extends StageCheckResult {
  badSections: Set<Stage1Section>;
}

// File-count and phone-call answers were updated 2026-09-29 to match the
// real KLSF_Investigation_Student_Packet the professor uploaded: 799
// files in the database (747 case files + 30 voice messages + 22 chart
// images referenced by the market reports; 800 is also accepted for
// rounding), and Call_16_Lam_Tze_foon_James as the longest phone call.
export function checkStage1(s: Stage1State): Stage1CheckResult {
  const dbsizeNum = numFloatA3(s.dbsize);
  const checks: { field: string; ok: boolean; section: Stage1Section }[] = [
    { field: "company name", ok: normA3(s.name).indexOf("stuffed friends") !== -1, section: "company" },
    { field: "what they sell", ok: s.sells === "Stuffed Animals", section: "company" },
    { field: "headquarters city", ok: normA3(s.hq).indexOf("port klang") !== -1, section: "company" },
    { field: "executive matches", ok: s.execMatch.ceo === "Chen Takaaki" && s.execMatch.cfo === "Lam Tzefoon James" && s.execMatch.coo === "Adam bin Ibrahim" && s.execMatch.logistics === "Siti binti Muhammad" && s.execMatch.design === "Farhana binti Nur", section: "company" },
    { field: "top selling product", ok: !!s.topProduct.trim(), section: "company" },
    { field: "countries they do business with", ok: numOnlyA3(s.countries) === "6", section: "shipments" },
    { field: "shipping companies under contract", ok: !!s.shippers.trim(), section: "shipments" },
    { field: "total invoices", ok: numOnlyA3(s.invoices) === "88", section: "shipments" },
    { field: "current active shipments", ok: !!s.activeships.trim(), section: "shipments" },
    { field: "file count", ok: ["799", "800"].includes(numOnlyA3(s.filecount)), section: "database" },
    { field: "database size", ok: dbsizeNum !== null && Math.abs(dbsizeNum - 16.9) < 0.05, section: "database" },
    { field: "longest phone call topic", ok: normA3(s.longestcall).indexOf("call_16") !== -1, section: "database" },
    { field: "executive who sent the most emails", ok: !!s.mostemails, section: "database" },
    { field: "new markets ordering samples", ok: numOnlyA3(s.newmarkets) === "3", section: "database" },
  ];
  const bad = checks.filter((c) => !c.ok);
  return {
    allOk: bad.length === 0,
    missing: bad.map((c) => c.field),
    badSections: new Set(bad.map((c) => c.section)),
  };
}

export function checkStage2(s: Stage2State): StageCheckResult {
  const checks = [
    { field: "CEO's city", ok: normA3(s.execWatch.ceo).indexOf("port klang") !== -1 },
    { field: "CFO's city", ok: normA3(s.execWatch.cfo).indexOf("dubai") !== -1 },
    { field: "COO's city", ok: normA3(s.execWatch.coo).indexOf("taman negara") !== -1 },
    { field: "Head of Global Logistics' city", ok: normA3(s.execWatch.logistics).indexOf("dubai") !== -1 },
    { field: "Head of Design, QC & Packaging's city", ok: normA3(s.execWatch.design).indexOf("port klang") !== -1 },
    { field: "orders with shipping issues", ok: numOnlyA3(s.shipissues) === "3" },
    { field: "orders transferred to a different port", ok: numOnlyA3(s.transferred) === "2" },
    { field: "customer follow-up emails", ok: numOnlyA3(s.followup) === "2" },
    { field: "shipping-delay follow-up email file(s)", ok: s.delayEmails.some((v) => !!v) },
    { field: "executive most involved in follow-up orders", ok: s.mostInvolvedExec === "Farhana binti Nur" },
  ];
  return { allOk: checks.every((c) => c.ok), missing: checks.filter((c) => !c.ok).map((c) => c.field) };
}

export interface CaseResult {
  allOk: boolean;
  animalOk: boolean;
  containerOk: boolean;
  cityNowOk: boolean;
  portNowOk: boolean;
  execOk: boolean;
  destOk: boolean;
  evidenceOk: boolean;
}

export function checkCase(p3: P3State): CaseResult {
  const animalOk = normA3(p3.animal).indexOf("otter") !== -1;
  const containerOk = normA3(p3.container).replace(/\s+/g, "") === "yllu3719322";
  const cityNowOk = normA3(p3.cityNow).indexOf("bangkok") !== -1;
  const portNowOk = normA3(p3.portNow).indexOf("laem chabang") !== -1;
  const execOk = /farhana|nok|nur/.test(normA3(p3.exec));
  const destOk = /manaus|brazil/.test(normA3(p3.portDest) + " " + normA3(p3.countryDest));
  const animalEviOk = p3.animalEvi.some((v) => !!v);
  const locationEviOk = p3.locationEvi.some((v) => !!v);
  const execEviOk = p3.execEvi.some((v) => !!v);
  const evidenceOk = animalEviOk && locationEviOk && execEviOk && p3.timeline.every((r) => !!r.evi);
  return {
    allOk: animalOk && containerOk && cityNowOk && portNowOk && execOk && destOk && evidenceOk,
    animalOk, containerOk, cityNowOk, portNowOk, execOk, destOk, evidenceOk,
  };
}
