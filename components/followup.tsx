"use client";

import { useState } from "react";
import { CUSTOM_ANSWER, REPLY_PLACEHOLDER, SEND_REPLY, SENT_NOTE } from "@/lib/content";

/**
 * 2 дахь асуултын хариулт. Хүлээн авагч нэгийг сонгоод (эсвэл өөрөө бичээд)
 * илгээхэд Messenger бэлэн текстээр нээгдэнэ.
 *
 * `fb-messenger://` схем нь зөвхөн апп суусан төхөөрөмж дээр нээгддэг тул
 * дарсны дараа текстийг санах ойд хуулж, гараар наах боломжийг бас өгнө.
 */
export function Followup({ options }: { options: string[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);

  const answer = (picked === CUSTOM_ANSWER ? custom.trim() : picked) ?? "";
  const canSend = answer.length > 0;

  const send = async () => {
    const text = `Тэгье! ${answer}`;
    setSent(true);

    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      // Хэрэглэгч цуцалсан — доорх хуулах руу шилжинэ
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard хаагдсан бол ч гэсэн хариу дэлгэц харагдана
    }
    window.location.href = `fb-messenger://share/?link=${encodeURIComponent(
      window.location.href,
    )}`;
  };

  if (sent) {
    return (
      <div className="rise-in flex flex-col items-center gap-2 text-center">
        <p className="text-3xl">✓</p>
        <p className="font-semibold text-ember-hot">{answer}</p>
        <p className="max-w-[16rem] text-balance text-sm text-smoke">{SENT_NOTE}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {[...options, CUSTOM_ANSWER].map((option) => {
          const active = picked === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(option)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-ember bg-ember text-ink"
                  : "border-smoke/35 text-smoke hover:border-smoke/70 hover:text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked === CUSTOM_ANSWER ? (
        <input
          autoFocus
          value={custom}
          onChange={(e) => setCustom(e.target.value.slice(0, 40))}
          placeholder={REPLY_PLACEHOLDER}
          className="w-full max-w-[16rem] rounded-full border border-smoke/35 bg-white/5 px-4 py-2 text-center text-sm text-foreground placeholder:text-smoke/50 focus:border-ember focus:outline-none"
        />
      ) : null}

      <button
        type="button"
        onClick={send}
        disabled={!canSend}
        className="rounded-full bg-ember px-6 py-2.5 font-semibold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
      >
        {SEND_REPLY}
      </button>
    </div>
  );
}
