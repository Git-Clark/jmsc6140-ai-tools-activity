"use client";

import { CaseFile } from "@/lib/module3-data";
import EvidencePicker from "./EvidencePicker";

/** A row of EvidencePicker fields for a question that can have more than
 * one supporting file (e.g. Stage 3's animal/location/executive evidence,
 * and Stage 2's shipping-delay follow-up emails). Shared so every
 * multi-file evidence question in Activity 3 behaves identically. */
export default function EvidenceList({
  label,
  values,
  onChange,
  items,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  items?: CaseFile[];
  placeholder?: string;
}) {
  return (
    <div className="field" style={{ marginTop: 14 }}>
      <label>{label}</label>
      <div>
        {values.map((v, idx) => (
          <div className="evi-list-row" key={idx}>
            <EvidencePicker
              value={v}
              onChange={(nv) => onChange(values.map((x, i) => (i === idx ? nv : x)))}
              items={items}
              placeholder={placeholder}
            />
            {values.length > 1 && (
              <button type="button" className="evi-remove" onClick={() => onChange(values.filter((_, i) => i !== idx))}>Remove</button>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="btn" style={{ marginTop: 8 }} onClick={() => onChange([...values, ""])}>+ Add Evidence</button>
    </div>
  );
}
