"use client";

import Modal, { ModalHeader } from "../Modal";
import { DEBRIEF_FACTS_STATIC } from "@/lib/module3-data";
import { P3State, normA3 } from "./state";

/** The your()/ok() halves of the prototype's DEBRIEF_FACTS, evaluated
 * against live p3State, in the same order as DEBRIEF_FACTS_STATIC. */
function evaluate(p3: P3State) {
  const yours = [
    p3.animal || "(blank)",
    p3.container || "(blank)",
    p3.exec || "(blank)",
    [p3.portDest, p3.countryDest].filter((v) => !!v).join(", ") || "(blank)",
  ];
  const oks = [
    normA3(p3.animal).indexOf("otter") !== -1,
    normA3(p3.container).replace(/\s+/g, "") === "yllu3719322",
    /farhana|nok|nur/.test(normA3(p3.exec)),
    /manaus|brazil/.test(normA3(p3.portDest) + " " + normA3(p3.countryDest)),
  ];
  return { yours, oks };
}

export default function DebriefModal({ open, onClose, p3 }: { open: boolean; onClose: () => void; p3: P3State }) {
  const { yours, oks } = evaluate(p3);
  return (
    <Modal open={open} onClose={onClose} wide>
      <ModalHeader title="Case Debrief" onClose={onClose} />
      <div className="modal-body">
        <div className="debrief-grid">
          {DEBRIEF_FACTS_STATIC.map((f, i) => (
            <div className={"debrief-row " + (oks[i] ? "ok" : "bad")} key={f.label}>
              <div className="debrief-row-label">{f.label}</div>
              <div className="debrief-answers">
                <span className="your">Your answer: {yours[i]}</span>
                <span className="correct">Correct answer: <b>{f.correct}</b></span>
              </div>
              <p className="debrief-explain">{f.explain}</p>
            </div>
          ))}
        </div>
        <h4>How the Otter Traveled</h4>
        <div className="debrief-map">
          <svg viewBox="0 0 900 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of the otter's route from Alor Setar to Manaus, Brazil">
            <line x1="60" y1="70" x2="840" y2="70" stroke="var(--line)" strokeWidth="2" strokeDasharray="6 6" />
            <g fontFamily="inherit">
              <circle cx="60" cy="70" r="10" fill="var(--gold)" />
              <text x="60" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-ink)">1</text>
              <text x="60" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">Alor Setar</text>
              <text x="60" y="53" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Wildlife Park</text>
              <text x="60" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Otter taken during</text>
              <text x="60" y="113" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">a routine delivery</text>

              <circle cx="255" cy="70" r="10" fill="var(--gold)" />
              <text x="255" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-ink)">2</text>
              <text x="255" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">Port Klang</text>
              <text x="255" y="53" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Company HQ</text>
              <text x="255" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Container YLLU3719322</text>
              <text x="255" y="113" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">departs by sea</text>

              <circle cx="450" cy="70" r="10" fill="var(--gold)" />
              <text x="450" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-ink)">3</text>
              <text x="450" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">Bangkok</text>
              <text x="450" y="53" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Chatuchak Toy Market</text>
              <text x="450" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Cargo released, empty</text>
              <text x="450" y="113" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">container re-booked</text>

              <circle cx="645" cy="70" r="10" fill="var(--gold)" />
              <text x="645" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-ink)">4</text>
              <text x="645" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">Laem Chabang</text>
              <text x="645" y="53" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Siam Seashell yard</text>
              <text x="645" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Shell company handoff,</text>
              <text x="645" y="113" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">export re-booking</text>

              <circle cx="840" cy="70" r="10" fill="var(--bad)" />
              <text x="840" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--gold-ink)">5</text>
              <text x="840" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">Manaus, Brazil</text>
              <text x="840" y="53" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Final destination</text>
              <text x="840" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">Not one of the company&apos;s</text>
              <text x="840" y="113" textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">six real markets</text>
            </g>
          </svg>
        </div>
      </div>
    </Modal>
  );
}
