"use client";

import { useActionState, useState } from "react";
import { logout, saveConfig } from "@/app/admin/actions";
import { INITIAL_SAVE_STATE } from "@/app/admin/types";
import { SmokingCat } from "@/components/smoking-cat";
import { WavingCat } from "@/components/waving-cat";
import { MAX_LEN, type SiteConfig } from "@/lib/store";

const CAT_OPTIONS: { value: SiteConfig["activeCat"]; label: string }[] = [
  { value: "smoking", label: "Тамхи татаж буй" },
  { value: "waving", label: "Даллаж мэндэлж буй" },
];

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-smoke/45 focus:border-ember focus:outline-none";

export function ConfigForm({ initial }: { initial: SiteConfig }) {
  const [state, formAction, pending] = useActionState(
    saveConfig,
    INITIAL_SAVE_STATE,
  );

  // Талбарууд аль хэдийн хадгалагдсан утгаараа эхэлнэ, амьд урьдчилан
  // үзүүлбэрт шууд харагдахын тулд controlled байдлаар удирдана.
  const [question, setQuestion] = useState(initial.question);
  const [followUp, setFollowUp] = useState(initial.followUp);
  const [activeCat, setActiveCat] = useState(initial.activeCat);

  const Cat = activeCat === "waving" ? WavingCat : SmokingCat;

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-8 py-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
      {/* Амьд урьдчилан үзүүлбэр */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex aspect-3/4 w-full max-w-xs flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-4 pb-5 pt-5">
          <div className="relative mx-auto max-w-[19rem] rounded-2xl bg-white px-4 py-3 text-center">
            <p className="text-sm font-semibold leading-snug text-ink">
              {question || "…"}
            </p>
          </div>
          <Cat className="relative mt-2 w-[92%]" />
        </div>
        <p className="text-xs text-smoke/60">Ингэж харагдана</p>
      </div>

      {/* Удирдлага */}
      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Admin</h1>
          <button
            type="button"
            onClick={() => logout()}
            className="text-xs text-smoke/70 underline-offset-2 hover:text-foreground hover:underline"
          >
            Гарах
          </button>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Гол асуулт</span>
          <input
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, MAX_LEN))}
            className={FIELD}
          />
          <span className="text-right text-xs text-smoke/60">
            {question.length}/{MAX_LEN}
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">
            «Тийм» гэсний дараах асуулт
          </span>
          <input
            name="followUp"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value.slice(0, MAX_LEN))}
            className={FIELD}
          />
          <span className="text-right text-xs text-smoke/60">
            {followUp.length}/{MAX_LEN}
          </span>
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-semibold">Муур</legend>
          <div className="grid grid-cols-2 gap-3">
            {CAT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                  activeCat === option.value
                    ? "border-ember bg-ember/10"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="activeCat"
                  value={option.value}
                  checked={activeCat === option.value}
                  onChange={() => setActiveCat(option.value)}
                  className="sr-only"
                />
                <div className="aspect-3/4 w-full max-w-24 overflow-hidden rounded-lg bg-white/5 p-1.5">
                  {option.value === "waving" ? (
                    <WavingCat className="w-full" />
                  ) : (
                    <SmokingCat className="w-full" />
                  )}
                </div>
                <span className="text-center text-xs text-smoke">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-ember px-4 py-3 text-sm font-semibold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Хадгалж байна…" : "Хадгалах"}
        </button>

        {state.status !== "idle" ? (
          <p
            className={`text-sm ${
              state.status === "success" ? "text-ember-hot" : "text-red-400"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
