import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JMSC6140 Activity Portal",
  description:
    "Multi-Tool Journalism Activity Portal for JMSC6140 AI & Media Innovation, School of Future Media, HKU.",
};

// Inline, blocking theme-init script: reads the saved theme preference
// before paint so switching pages / reloading never flashes the wrong
// theme. Dark is the default for a first-time visitor (no saved
// preference yet); "System" is still selectable from the toggle.
const THEME_INIT_SCRIPT = `
(function(){
  try {
    var saved = localStorage.getItem('jmsc6140_theme') || 'dark';
    if (saved !== 'system') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Loaded the same way as the prototype -- a plain stylesheet link,
            not next/font -- so the build never depends on reaching Google's
            font-building service at build time. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
