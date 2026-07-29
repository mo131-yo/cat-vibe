"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SendToFriend } from "@/components/send-to-friend";
import { COPIED, COPY_LINK } from "@/lib/content";

/**
 * Браузерын боломжийг SSR-д аюулгүйгээр уншина.
 *
 * `useEffect` дотор `setState` дуудвал нэмэлт рендер үүсгэдэг; шууд render
 * дотор `navigator`-ыг уншвал сервер дээр унана. `useSyncExternalStore` нь
 * серверийн утгыг тусад нь өгдөг тул хоёуланг нь шийднэ.
 */
function useCanShare(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && !!navigator.share,
    () => false,
  );
}

type Target = {
  id: string;
  label: string;
  href: (url: string, text: string) => string;
};

/** Messenger энд байхгүй — тэр нь `SendToFriend` блок руу бүрэн шилжсэн. */
const TARGETS: Target[] = [
  {
    id: "telegram",
    label: "Telegram",
    href: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export function ShareRow({ url, text }: { url: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const canShare = useCanShare();

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard хаагдсан — доорх талбараас гараар хуулж болно
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Нэг хүн рүү шууд илгээх — хамгийн түгээмэл хэрэглээ тул дээр нь */}
      <SendToFriend url={url} />

      {/* Холбоос — гараар ч хуулж болохоор ил харагдана */}
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 bg-transparent px-2 py-1 font-mono text-xs text-smoke outline-none"
          aria-label="Үүсгэсэн холбоос"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg bg-ember px-3.5 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {copied ? COPIED : COPY_LINK}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {canShare ? (
          <button
            type="button"
            onClick={() => navigator.share({ text, url }).catch(() => {})}
            className="rounded-full border border-ember/50 bg-ember/10 px-4 py-2 text-sm text-ember-hot transition-colors hover:border-ember"
          >
            Хуваалцах…
          </button>
        ) : null}

        {TARGETS.map((target) => (
          <a
            key={target.id}
            href={target.href(url, text)}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-smoke/30 px-4 py-2 text-sm text-smoke transition-colors hover:border-smoke/70 hover:text-foreground"
          >
            {target.label}
          </a>
        ))}
      </div>
    </div>
  );
}
