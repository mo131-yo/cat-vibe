"use client";

import { useState } from "react";
import { AnswerButtons } from "@/components/answer-buttons";
import { SmokingCat } from "@/components/smoking-cat";
import { SpeechBubble } from "@/components/speech-bubble";
import type { SiteConfig } from "@/lib/store";

type Stage = "ask" | "followup";

/**
 * Нэг дөрвөлжин карт — flip байхгүй. Асуулт нь муурын яриа болж бөмбөлөгт
 * шууд гарна, доор нь Тийм/Үгүй. «Тийм» дарахад бөмбөлгийн текст 2 дахь
 * асуулт руу солигдоод тэгээд зогсоно.
 *
 * `question`/`followUp` нь admin-аас тохируулагддаг (`lib/store.ts`) —
 * `app/page.tsx`-ээс серверт татагдаж prop-оор ирнэ.
 */
export function QuestionCard({ question, followUp }: SiteConfig) {
  const [stage, setStage] = useState<Stage>("ask");

  return (
    <div className="relative flex aspect-3/4 w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-5 pb-6 pt-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
      <div
        aria-hidden
        className="glow-pulse pointer-events-none absolute left-1/2 top-[52%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-3xl"
      />

      <SpeechBubble text={stage === "ask" ? question : followUp} />

      <SmokingCat className="relative -mt-1 w-[92%]" />

      <div className="relative mt-1 flex min-h-0 w-full flex-1 items-center justify-center">
        {stage === "ask" ? (
          <AnswerButtons onYes={() => setStage("followup")} />
        ) : null}
      </div>
    </div>
  );
}
