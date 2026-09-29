"use client";

import { useRef, useState } from "react";
import Home from "./Home";
import Credits from "./Credits";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3, { Module3Handle } from "./module3";
import InstructionsModal from "./InstructionsModal";
import { TAB_LABELS, FOOTER_TEXT } from "@/lib/content";
import { useTheme, ThemeMode } from "@/lib/theme";

export type View = "home" | "1" | "2" | "3" | "credits";

const THEME_OPTIONS: { mode: ThemeMode; label: string }[] = [
  { mode: "system", label: "Auto" },
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
];

export default function PortalApp() {
  const [view, setView] = useState<View>("home");
  const [instructionsActivity, setInstructionsActivity] = useState<
    "1" | "2" | null
  >(null);
  const [tabDone, setTabDone] = useState<Record<"1" | "2" | "3", boolean>>({
    "1": false,
    "2": false,
    "3": false,
  });
  const [theme, setTheme] = useTheme();
  const module3Ref = useRef<Module3Handle>(null);

  function goTo(n: View) {
    if (n === "3") {
      setView("3");
      module3Ref.current?.enter();
      return;
    }
    setView(n);
    if (n === "1" || n === "2") {
      setInstructionsActivity(n);
    }
  }

  return (
    <>
      {/* Vestigial in the prototype: CSS keeps this permanently hidden
          (no media query ever shows it). Kept for structural fidelity. */}
      <div className="mobile-gate">
        <div className="icon">&#128421;</div>
        <h2>Desktop Only</h2>
        <p>
          This activity portal is built for laptop and desktop screens.
          Please switch to a larger device to continue.
        </p>
      </div>

      <div className="app-shell">
        <header className="masthead">
          <div className="masthead-row">
            <button className="home-btn" onClick={() => setView("home")}>
              <h1 className="masthead-title">JMSC6140 Activity Portal</h1>
            </button>
            <div className="header-controls">
              <div className="theme-toggle" role="group" aria-label="Theme">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.mode}
                    className={theme === opt.mode ? "active" : ""}
                    onClick={() => setTheme(opt.mode)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                className="credits-btn"
                hidden={view === "home" || view === "credits"}
                onClick={() => setView("credits")}
              >
                Credits
              </button>
            </div>
          </div>
          <nav className="tabbar">
            {TAB_LABELS.map((t) => (
              <button
                key={t.n}
                className={
                  "tab" +
                  (view === t.n ? " active" : "") +
                  (tabDone[t.n as "1" | "2" | "3"] ? " done" : "")
                }
                onClick={() => goTo(t.n as View)}
              >
                <span className="tab-num num-tab">{t.n}</span> {t.label}{" "}
                <span className="status-dot"></span>
              </button>
            ))}
          </nav>
        </header>

        <main>
          {view === "home" && <Home onGo={goTo} />}

          <div hidden={view !== "1"}>
            <Module1
              onStatusChange={(done) =>
                setTabDone((d) => ({ ...d, "1": done }))
              }
              onInstructions={() => setInstructionsActivity("1")}
            />
          </div>

          <div hidden={view !== "2"}>
            <Module2
              onStatusChange={(done) =>
                setTabDone((d) => ({ ...d, "2": done }))
              }
              onInstructions={() => setInstructionsActivity("2")}
            />
          </div>

          <div hidden={view !== "3"}>
            <Module3
              ref={module3Ref}
              onStatusChange={(done) =>
                setTabDone((d) => ({ ...d, "3": done }))
              }
            />
          </div>

          {view === "credits" && <Credits />}
        </main>

        <footer>
          <p>{FOOTER_TEXT}</p>
        </footer>
      </div>

      <InstructionsModal
        activity={instructionsActivity}
        onClose={() => setInstructionsActivity(null)}
      />
    </>
  );
}
