"use client";

import { useCallback, useRef, useState } from "react";
import { NO, TAUNTS, YES } from "@/lib/content";

const MIN_JUMP = 60;

export function AnswerButtons({ onYes }: { onYes: () => void }) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dodge = useCallback(() => {
    const arena = arenaRef.current;
    const btn = noRef.current;
    if (!arena || !btn) return;

    // offset* нь layout-ын утга бөгөөд transform-д нөлөөлөгддөггүй тул
    // товчны "анхны" байрлалыг найдвартай өгнө.
    const baseX = btn.offsetLeft;
    const baseY = btn.offsetTop;
    const maxX = Math.max(arena.clientWidth - btn.offsetWidth, 0);
    const maxY = Math.max(arena.clientHeight - btn.offsetHeight, 0);

    setOffset((prev) => {
      const curX = baseX + prev.x;
      const curY = baseY + prev.y;

      let nextX = curX;
      let nextY = curY;
      // Хэт ойрхон үсрэхээс сэргийлж хэдэн оролдлого хийнэ.
      for (let i = 0; i < 12; i++) {
        nextX = Math.random() * maxX;
        nextY = Math.random() * maxY;
        if (Math.hypot(nextX - curX, nextY - curY) >= MIN_JUMP) break;
      }

      return { x: nextX - baseX, y: nextY - baseY };
    });
    setDodges((d) => d + 1);
  }, []);

  const yesScale = Math.min(1 + dodges * 0.14, 2.2);
  const noScale = Math.max(1 - dodges * 0.08, 0.55);
  const taunt = dodges > 0 ? TAUNTS[Math.min(dodges - 1, TAUNTS.length - 1)] : null;

  return (
    <div className="flex h-full w-full flex-col">
      <div ref={arenaRef} className="relative min-h-0 flex-1">
        <button
          type="button"
          onClick={onYes}
          style={{ transform: `translate(-50%, -50%) scale(${yesScale})` }}
          className="absolute left-1/2 top-[38%] rounded-full bg-ember px-7 py-3 text-lg font-semibold text-ink shadow-[0_0_30px_-4px_var(--ember)] transition-transform duration-300 ease-out will-change-transform hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-hot active:brightness-95"
        >
          {YES}
        </button>

        <button
          ref={noRef}
          type="button"
          onPointerEnter={dodge}
          onFocus={dodge}
          onClick={(e) => {
            e.preventDefault();
            dodge();
          }}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${noScale})`,
          }}
          className="absolute left-[58%] top-[68%] rounded-full border border-smoke/40 bg-white/5 px-6 py-2.5 text-base font-medium text-smoke backdrop-blur-sm transition-transform duration-200 ease-out will-change-transform"
        >
          {NO}
        </button>
      </div>

      <p
        key={dodges}
        aria-live="polite"
        className="taunt-in min-h-6 text-center text-sm text-smoke/80"
      >
        {taunt}
      </p>
    </div>
  );
}
