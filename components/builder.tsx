"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { QuestionCard } from "@/components/question-card";
import { ShareRow } from "@/components/share-row";
import { encodeCard, MAX_LEN } from "@/lib/card-data";
import {
  BUILDER_SUB,
  BUILDER_TITLE,
  FOLLOWUP_PLACEHOLDER,
  OG_HINT,
  PREVIEW_NOTE,
  QUESTION_PLACEHOLDER,
  STEP_COLOR,
  STEP_FOLLOWUP,
  STEP_QUESTION,
  STEP_SHARE,
} from "@/lib/content";
import { DEFAULT_PALETTE, PALETTES } from "@/lib/palettes";
import { DEFAULT_PRESET, PRESETS } from "@/lib/presets";

/** Дугаарласан алхмын гарчиг — «ойлгомжтой» болгох гол хэсэг. */
function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h2 className="mb-3 flex items-center gap-2.5 text-sm font-semibold">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ember text-xs font-bold text-ink">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

const CHIP =
  "rounded-full border px-3.5 py-1.5 text-sm transition-colors cursor-pointer";
const CHIP_ON = "border-ember bg-ember text-ink";
const CHIP_OFF =
  "border-smoke/30 text-smoke hover:border-smoke/70 hover:text-foreground";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-smoke/45 focus:border-ember focus:outline-none";

export function Builder() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET.id);
  const [question, setQuestion] = useState(DEFAULT_PRESET.question);
  const [followUp, setFollowUp] = useState(DEFAULT_PRESET.followUp);
  const [paletteId, setPaletteId] = useState(DEFAULT_PALETTE.id);

  // Холбоосыг зөвхөн браузер дээр угсарна — сервер дээр `location` байхгүй.
  // useSyncExternalStore нь серверийн утгыг тусад нь өгдөг тул hydration
  // зөрөхгүй, мөн эффект дотор setState дуудах шаардлагагүй.
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  const isCustom = presetId === "custom";

  const pickPreset = (id: string) => {
    setPresetId(id);
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset || id === "custom") return;
    setQuestion(preset.question);
    setFollowUp(preset.followUp);
  };

  const data = useMemo(
    () => ({
      q: question.trim() || QUESTION_PLACEHOLDER,
      f: followUp.trim() || FOLLOWUP_PLACEHOLDER,
      c: paletteId,
    }),
    [question, followUp, paletteId],
  );

  const ready = question.trim().length > 0 && followUp.trim().length > 0;
  const url = origin ? `${origin}/c/${encodeCard(data)}` : "";

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
      {/* ── Амьд урьдчилан үзүүлбэр ── */}
      <div className="flex flex-col items-center gap-3">
        {/* key — асуулт солигдоход урьдчилан үзүүлбэр эхнээсээ эхэлнэ */}
        <QuestionCard key={`${data.q}|${data.f}`} data={data} interactive={false} />
        <p className="text-xs text-smoke/70">{PREVIEW_NOTE}</p>
      </div>

      {/* ── Удирдлага ── */}
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {BUILDER_TITLE}
          </h1>
          <p className="mt-1.5 text-balance text-sm text-smoke">{BUILDER_SUB}</p>
        </header>

        <Step n={1} title={STEP_QUESTION}>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => pickPreset(preset.id)}
                className={`${CHIP} ${presetId === preset.id ? CHIP_ON : CHIP_OFF}`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {isCustom ? (
            <div className="mt-3">
              <input
                autoFocus
                value={question}
                onChange={(e) => setQuestion(e.target.value.slice(0, MAX_LEN))}
                placeholder={QUESTION_PLACEHOLDER}
                className={FIELD}
              />
              <p className="mt-1.5 text-right text-xs text-smoke/60">
                {question.length}/{MAX_LEN}
              </p>
            </div>
          ) : null}
        </Step>

        <Step n={2} title={STEP_FOLLOWUP}>
          <input
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value.slice(0, MAX_LEN))}
            placeholder={FOLLOWUP_PLACEHOLDER}
            className={FIELD}
          />
          <p className="mt-1.5 text-right text-xs text-smoke/60">
            {followUp.length}/{MAX_LEN}
          </p>
        </Step>

        <Step n={3} title={STEP_COLOR}>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {PALETTES.map((palette) => {
              const active = paletteId === palette.id;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => setPaletteId(palette.id)}
                  aria-pressed={active}
                  className="flex flex-col items-center gap-1.5"
                >
                  {/* Хоёр өнгөтэй дугуй: зүүн тал нь үс, баруун нь accent */}
                  <span
                    className={`size-9 rounded-full border-2 transition-colors ${
                      active ? "border-ember" : "border-white/15"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${palette.fur} 0 50%, ${palette.accent} 50% 100%)`,
                    }}
                  />
                  <span
                    className={`text-[11px] ${active ? "text-foreground" : "text-smoke/70"}`}
                  >
                    {palette.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={4} title={STEP_SHARE}>
          {ready && url ? (
            <ShareRow url={url} text={`${data.q} ${OG_HINT}`} />
          ) : (
            <p className="text-sm text-smoke/70">
              Асуулт болон дараагийн асуултаа бөглөнө үү.
            </p>
          )}
        </Step>
      </div>
    </div>
  );
}
