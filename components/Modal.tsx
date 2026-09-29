"use client";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  wide?: boolean;
  children: ReactNode;
  /** When true, clicking the dimmed backdrop closes the modal (matches
   * every overlay in the prototype except the onboarding modal, which
   * has no such handler). */
  closeOnBackdrop?: boolean;
}

/** Generic .modal-overlay/.modal shell, matching the prototype's modal
 * markup and open/close behavior exactly. */
export default function Modal({
  open,
  onClose,
  wide,
  children,
  closeOnBackdrop = true,
}: ModalProps) {
  return (
    <div
      className={"modal-overlay" + (open ? " open" : "")}
      onClick={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
    >
      <div className={"modal" + (wide ? " wide" : "")}>{children}</div>
    </div>
  );
}

export function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="modal-head">
      <div>
        <h3>{title}</h3>
      </div>
      <button className="modal-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
    </div>
  );
}
