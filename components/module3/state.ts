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
  deadline: string;
  repeatfollowup: string;
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
      shipissues: "", transferred: "", followup: "", deadline: "", repeatfollowup: "",
    },
  };
}

export function isP3State(v: unknown): v is P3State {
  const s = v as P3State;
  return !!s && Array.isArray(s.timeline) && Array.isArray(s.animalEvi) && !!s.stage1 && !!s.stage2;
}

export function normA3(s: string): string {
  return (s || "").toString().trim().toLowerCase();
}
// PLACEHOLDER file-count answer key -- left at 620 per the professor's
// explicit instruction (the real packet was rebuilt to 720 files; he will
// adjust this himself once the real packet is finalized). Do not "fix".
export function numOnlyA3(s: string): string {
  const m = (s || "").toString().match(/\d+/);
  return m ? m[0] : "";
}

export interface StageCheckResult {
  allOk: boolean;
  missing: string[];
}

export function checkStage1(s: Stage1State): StageCheckResult {
  const checks = [
    { field: "company name", ok: normA3(s.name).indexOf("stuffed friends") !== -1 },
    { field: "what they sell", ok: s.sells === "Stuffed Animal" },
    { field: "headquarters city", ok: normA3(s.hq).indexOf("port klang") !== -1 },
    { field: "executive matches", ok: s.execMatch.ceo === "Chen Takaaki" && s.execMatch.cfo === "Lam Tzefoon James" && s.execMatch.coo === "Adam bin Ibrahim" && s.execMatch.logistics === "Siti binti Muhammad" && s.execMatch.design === "Farhana binti Nur" },
    { field: "top selling product", ok: !!s.topProduct.trim() },
    { field: "countries they do business with", ok: numOnlyA3(s.countries) === "6" },
    { field: "shipping companies under contract", ok: !!s.shippers.trim() },
    { field: "total invoices", ok: numOnlyA3(s.invoices) === "88" },
    { field: "current active shipments", ok: !!s.activeships.trim() },
    { field: "file count", ok: numOnlyA3(s.filecount) === "620" },
    { field: "database size", ok: !!s.dbsize.trim() },
    { field: "longest phone call topic", ok: !!s.longestcall },
    { field: "executive who sent the most emails", ok: !!s.mostemails },
    { field: "new markets ordering samples", ok: !!s.newmarkets.trim() },
  ];
  return { allOk: checks.every((c) => c.ok), missing: checks.filter((c) => !c.ok).map((c) => c.field) };
}

export function checkStage2(s: Stage2State): StageCheckResult {
  const checks = [
    { field: "each executive’s whereabouts", ok: (["ceo", "cfo", "coo", "logistics", "design"] as const).every((k) => !!s.execWatch[k].trim()) },
    { field: "orders with shipping issues", ok: !!s.shipissues.trim() },
    { field: "orders transferred to a different port", ok: !!s.transferred.trim() },
    { field: "customer follow-up emails", ok: !!s.followup.trim() },
    { field: "deadline mentions", ok: !!s.deadline.trim() },
    { field: "repeat follow-ups", ok: !!s.repeatfollowup.trim() },
  ];
  return { allOk: checks.every((c) => c.ok), missing: checks.filter((c) => !c.ok).map((c) => c.field) };
}

export interface CaseResult {
  allOk: boolean;
  animalOk: boolean;
  containerOk: boolean;
  execOk: boolean;
  destOk: boolean;
  evidenceOk: boolean;
}

export function checkCase(p3: P3State): CaseResult {
  const animalOk = normA3(p3.animal).indexOf("otter") !== -1;
  const containerOk = normA3(p3.container).replace(/\s+/g, "") === "yllu3719322";
  const execOk = /farhana|nok|nur/.test(normA3(p3.exec));
  const destOk = /manaus|brazil/.test(normA3(p3.portDest) + " " + normA3(p3.countryDest));
  const animalEviOk = p3.animalEvi.some((v) => !!v);
  const locationEviOk = p3.locationEvi.some((v) => !!v);
  const execEviOk = p3.execEvi.some((v) => !!v);
  const evidenceOk = animalEviOk && locationEviOk && execEviOk && p3.timeline.every((r) => !!r.evi);
  return { allOk: animalOk && containerOk && execOk && destOk && evidenceOk, animalOk, containerOk, execOk, destOk, evidenceOk };
}
