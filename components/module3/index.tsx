"use client";

import { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { usePersistentState } from "@/lib/storage";
import { HELP_TEXT, TRANSITION_TEXT } from "@/lib/content";
import Modal, { ModalHeader } from "../Modal";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import OnboardingModal from "./OnboardingModal";
import DebriefModal from "./DebriefModal";
import { P3State, checkCase, checkStage1, checkStage2, defaultP3State, isP3State } from "./state";

export interface Module3Handle {
  /** Ports goToActivity3(): shows the tab and, on a first visit, opens the
   * onboarding slideshow automatically. */
  enter: () => void;
}

const Module3 = forwardRef<Module3Handle, { onStatusChange: (done: boolean) => void }>(function Module3(
  { onStatusChange },
  ref
) {
  const [p3, setP3] = usePersistentState<P3State>("jmsc6140_activity3_v3", defaultP3State, isP3State);
  const [s1Feedback, setS1Feedback] = useState("");
  const [s2Feedback, setS2Feedback] = useState("");
  const [transitionOpen, setTransitionOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [debriefOpen, setDebriefOpen] = useState(false);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [onboardAllowReturn, setOnboardAllowReturn] = useState(false);

  useEffect(() => { onStatusChange(p3.unlocked); }, [p3.unlocked, onStatusChange]);

  useImperativeHandle(ref, () => ({
    enter() {
      if (!p3.onboardSeen) {
        setOnboardAllowReturn(false);
        setOnboardOpen(true);
      }
    },
  }));

  function patch(p: Partial<P3State>) {
    setP3((s) => ({ ...s, ...p }));
  }

  function submitStage1() {
    const result = checkStage1(p3.stage1);
    if (result.allOk) {
      setS1Feedback("");
      setP3((s) => ({ ...s, stage1Done: true, currentStage: 2 }));
    } else {
      setS1Feedback("Check your: " + result.missing.join(", ") + ".");
    }
  }

  function submitStage2() {
    const result = checkStage2(p3.stage2);
    if (result.allOk) {
      setS2Feedback("");
      setTransitionOpen(true);
    } else {
      setS2Feedback("Check your: " + result.missing.join(", ") + ".");
    }
  }

  const caseResult = p3.hasSubmittedCase ? checkCase(p3) : null;

  function submitCase() {
    const result = checkCase(p3);
    setP3((s) => ({ ...s, unlocked: result.allOk, hasSubmittedCase: true }));
  }

  return (
    <div className="panel-inner" id="panel-3">
      <div className="activity-head">
        <div>
          <p className="kicker">Activity 3</p>
          <h2>Data Leak Investigation</h2>
        </div>
        <div className="head-actions">
          <button className="btn" type="button" onClick={() => { setOnboardAllowReturn(true); setOnboardOpen(true); }}>Instructions</button>
          <button className="btn btn-gold" type="button" onClick={() => setHelpOpen(true)}>Help</button>
          <a className="btn dl btn-disabled" href="#" aria-disabled="true" title="The real case files are still being uploaded" onClick={(e) => e.preventDefault()}>Download Case Files (Coming Soon)</a>
        </div>
      </div>

      <div className="a3-stepper">
        {[
          { n: 1, label: "Background" },
          { n: 2, label: "Recent Activity" },
          { n: 3, label: "Solve the Case" },
        ].map((step, i) => {
          const done = (step.n === 1 && p3.stage1Done) || (step.n === 2 && p3.stage2Done);
          const reachable = step.n === 1 || (step.n === 2 && p3.stage1Done) || (step.n === 3 && p3.stage2Done);
          return (
            <Fragment key={step.n}>
              {i > 0 && <div className="a3-step-line" />}
              <button
                type="button"
                className={"a3-step" + (p3.currentStage === step.n ? " active" : "") + (done && p3.currentStage !== step.n ? " complete" : "") + (reachable ? " clickable" : "")}
                onClick={() => reachable && patch({ currentStage: step.n as 1 | 2 | 3 })}
              >
                <span className="a3-step-num">{step.n}</span>
                <span className="a3-step-label">{step.label}</span>
              </button>
            </Fragment>
          );
        })}
      </div>

      {p3.currentStage === 1 && (
        <Stage1
          s={p3.stage1}
          onChange={(pp) => patch({ stage1: { ...p3.stage1, ...pp } })}
          feedback={s1Feedback}
          onNext={submitStage1}
        />
      )}
      {p3.currentStage === 2 && (
        <Stage2
          s={p3.stage2}
          onChange={(pp) => patch({ stage2: { ...p3.stage2, ...pp } })}
          feedback={s2Feedback}
          onBack={() => patch({ currentStage: 1 })}
          onNext={submitStage2}
        />
      )}
      {p3.currentStage === 3 && (
        <Stage3
          p3={p3}
          onChange={patch}
          onBack={() => patch({ currentStage: 2 })}
          onSubmit={submitCase}
          result={caseResult}
          onOpenDebrief={() => setDebriefOpen(true)}
        />
      )}

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)}>
        <ModalHeader title="Help" onClose={() => setHelpOpen(false)} />
        <div className="modal-body"><p>{HELP_TEXT}</p></div>
      </Modal>

      <div className={"modal-overlay" + (transitionOpen ? " open" : "")}>
        <div className="modal">
          <div className="modal-body" style={{ paddingTop: 28 }}>
            <p>{TRANSITION_TEXT}</p>
            <button
              type="button"
              className="btn btn-gold"
              style={{ marginTop: 6 }}
              onClick={() => {
                setTransitionOpen(false);
                patch({ stage2Done: true, currentStage: 3 });
              }}
            >
              Continue to Stage 3
            </button>
          </div>
        </div>
      </div>

      <OnboardingModal
        open={onboardOpen}
        allowReturn={onboardAllowReturn}
        p3={p3}
        onChange={patch}
        onClose={() => setOnboardOpen(false)}
        onStart={() => {
          patch({ onboardSeen: true });
          setOnboardOpen(false);
        }}
      />

      <DebriefModal open={debriefOpen} onClose={() => setDebriefOpen(false)} p3={p3} />
    </div>
  );
});

export default Module3;
