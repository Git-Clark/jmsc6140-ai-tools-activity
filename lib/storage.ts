"use client";

import { useEffect, useState } from "react";

/**
 * Ports the prototype's loadState()/saveState() pattern: read a JSON blob
 * from localStorage on mount, fall back to the default shape if it's
 * missing or doesn't match (via `validate`), and persist every change
 * back to the same key. SSR renders the default value; the real stored
 * value (if any) is applied once after mount, matching the prototype's
 * "everything runs after the page loads" behavior. The save effect is
 * gated on `hydrated` so we never write the default back over real data
 * before the load has had a chance to apply it.
 */
export function usePersistentState<T>(
  key: string,
  makeDefault: () => T,
  validate?: (parsed: unknown) => parsed is T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(makeDefault);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!validate || validate(parsed)) {
          // One-time hydration read after mount, mirroring the prototype's
          // "everything runs after the page loads" pattern; SSR has no
          // access to localStorage so this can't be a lazy useState init.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setState(parsed as T);
        }
      }
    } catch {
      /* ignore, keep default */
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore quota errors etc, same as the prototype */
    }
  }, [key, state, hydrated]);

  return [state, setState];
}
