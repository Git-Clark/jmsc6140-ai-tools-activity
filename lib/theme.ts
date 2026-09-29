"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";
const THEME_KEY = "jmsc6140_theme";

/** Ports the prototype's applyTheme()/initTheme() exactly: 'system' removes
 * the data-theme attribute (so the prefers-color-scheme media query in
 * globals.css takes over), otherwise data-theme is set explicitly. */
export function useTheme(): [ThemeMode, (mode: ThemeMode) => void] {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: ThemeMode = "system";
    try {
      saved = (window.localStorage.getItem(THEME_KEY) as ThemeMode) || "system";
    } catch {
      /* ignore */
    }
    // One-time hydration read from localStorage after mount -- SSR has no
    // access to it, so this can't be lazy useState init. Not a react-hooks
    // anti-pattern in the usual sense: nothing is "subscribed", this just
    // syncs once from the one external source that only exists client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, mounted]);

  return [theme, setThemeState];
}
