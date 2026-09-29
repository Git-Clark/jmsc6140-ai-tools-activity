"use client";

import Modal, { ModalHeader } from "./Modal";
import { INSTRUCTIONS } from "@/lib/instructions";

export default function InstructionsModal({
  activity,
  onClose,
}: {
  activity: "1" | "2" | "3" | null;
  onClose: () => void;
}) {
  const data = activity ? INSTRUCTIONS[activity] : null;
  return (
    <Modal open={activity !== null} onClose={onClose}>
      <ModalHeader title={data ? data.title : "Activity"} onClose={onClose} />
      <div className="modal-body">
        {data && (
          <>
            <p>{data.intro}</p>
            <h4>Required Outputs</h4>
            <ul>
              {data.outputs.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Modal>
  );
}
