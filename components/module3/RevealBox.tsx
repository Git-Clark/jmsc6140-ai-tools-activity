"use client";

import { useEffect, useState } from "react";
import { pickRevealImage, REVEAL_IMAGE_SRC } from "@/lib/module3-data";

const CONFETTI_COLORS = ["#7748D1", "#2E7D4F", "#D4B24C", "#E5766D", "#5FBE83"];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
}

/** Ports fireConfetti(): 40 CSS-animated pieces that self-remove after
 * their animation ends. No external library, matching the prototype. */
function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  useEffect(() => {
    // Randomized once on mount (matches fireConfetti() generating each
    // piece's random position/color/timing when the win state first
    // renders); nothing to subscribe to, so a plain lazy init can't do this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        duration: 2.2 + Math.random() * 1.4,
        delay: Math.random() * 0.3,
      }))
    );
  }, []);
  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left + "vw",
            background: p.color,
            animationDuration: p.duration + "s",
            animationDelay: p.delay + "s",
          }}
          onAnimationEnd={(e) => (e.target as HTMLElement).remove()}
        />
      ))}
    </>
  );
}

/** Ports showReveal(): hidden until an animal guess is entered, then shows
 * the otter-win image + confetti on an all-correct submission, or the
 * matching (or fallback otter) "wrong container" image otherwise. */
export default function RevealBox({ animalGuess, allOk }: { animalGuess: string; allOk: boolean }) {
  const guess = (animalGuess || "").toString().trim();
  if (!guess) return null;

  if (allOk) {
    return (
      <div className="a3-reveal">
        <img src={REVEAL_IMAGE_SRC.otterwin} alt="A small-clawed otter revealed inside the shipping container" />
        <div className="a3-reveal-caption win">You saved the baby otter!</div>
        <Confetti />
      </div>
    );
  }
  const key = pickRevealImage(guess);
  return (
    <div className="a3-reveal">
      <img src={REVEAL_IMAGE_SRC[key]} alt="Shipping container opened, no real animals found" />
      <div className="a3-reveal-caption lose">No real animals here.</div>
    </div>
  );
}
