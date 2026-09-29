"use client";

import { HOME_KICKER, HOME_H2, HOME_PARAS, HOME_ACTIVITIES } from "@/lib/content";
import type { View } from "./PortalApp";

export default function Home({ onGo }: { onGo: (view: View) => void }) {
  return (
    <div className="panel-inner" id="panel-home">
      <div className="home-hero">
        <p className="kicker">{HOME_KICKER}</p>
        <h2>{HOME_H2}</h2>
      </div>
      <div className="home-card">
        {HOME_PARAS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="home-activities">
        {HOME_ACTIVITIES.map((a) => (
          <button
            key={a.num}
            className="home-activity-btn"
            onClick={() => onGo(a.num as View)}
          >
            <span className="step-num num-tab">{a.num}</span>
            <span className="title">{a.title}</span>
            <span className="desc">{a.desc}</span>
            <span className="go">Start &rarr;</span>
          </button>
        ))}
      </div>

      <button className="home-credits-link" onClick={() => onGo("credits")}>
        Credits &amp; course information
      </button>
    </div>
  );
}
