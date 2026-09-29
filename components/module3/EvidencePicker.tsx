"use client";

import { useEffect, useRef, useState } from "react";
import { CASE_FILES } from "@/lib/module3-data";

/**
 * Ports the prototype's createCiteField() exactly: a button showing the
 * picked file name, which opens a searchable list of CASE_FILES. Answers
 * cannot be typed in freely -- only picked from the case file manifest.
 */
export default function EvidencePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function openPanel() {
    setQuery("");
    setOpen(true);
    setTimeout(() => searchRef.current?.focus(), 0);
  }

  const q = query.trim().toLowerCase();
  const matches = CASE_FILES.filter((f) => !q || f.name.toLowerCase().indexOf(q) !== -1);

  return (
    <div className="evidence-field-wrap" ref={wrapRef}>
      <button
        type="button"
        className={"evidence-trigger" + (value ? " picked" : "")}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains("ev-clear")) return;
          if (!open) openPanel(); else setOpen(false);
        }}
      >
        <span className="ev-label">{value || "Search case files…"}</span>
        <span
          className="ev-clear"
          title="Clear"
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
        >
          &times;
        </span>
      </button>
      <div className={"cite-panel" + (open ? " open" : "")}>
        <input
          ref={searchRef}
          type="text"
          className="cite-search"
          placeholder="Type to filter file names…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="cite-list">
          {matches.length === 0 && <div className="cite-empty">No matching files</div>}
          {matches.map((f) => (
            <div
              key={f.name}
              className="cite-item"
              onClick={() => {
                onChange(f.name);
                setOpen(false);
              }}
            >
              <span className="cite-name">{f.name}</span>
              <span className="cite-cat">{f.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
