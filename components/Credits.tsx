"use client";

import { CREDITS_LIS } from "@/lib/content";

export default function Credits() {
  return (
    <div className="panel-inner" id="panel-credits">
      <div className="credits-block">
        <p className="kicker">Credits</p>
        <h2>About this portal</h2>
        <ul>
          {CREDITS_LIS.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
        <h3>Technical Details</h3>
        <ul className="tech-list">
          <li>
            <span className="dot"></span> Built with Claude Sonnet 5
          </li>
          <li>
            <span className="dot"></span> Repository on GitHub
          </li>
          <li>
            <span className="dot"></span> Deployed with Vercel
          </li>
        </ul>
      </div>
    </div>
  );
}
