"use client";

import Modal, { ModalHeader } from "./Modal";
import { AI_POLICY_TEXT } from "@/lib/content";

export default function AIPolicyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader title="AI Policy Notice" onClose={onClose} />
      <div className="modal-body">
        <p>{AI_POLICY_TEXT}</p>
      </div>
    </Modal>
  );
}
