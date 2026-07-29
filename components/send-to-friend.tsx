"use client";

import { useState, useSyncExternalStore } from "react";
import {
  BAD_USERNAME,
  FRIEND_PLACEHOLDER,
  MESSENGER_BTN,
  PASTE_HINT,
  RECENT,
  SEND_BTN,
  SEND_DIRECT,
  USERNAME_NOTE,
} from "@/lib/content";
import {
  addFriend,
  getFriends,
  getServerFriends,
  normalizeUsername,
  removeFriend,
  subscribeFriends,
} from "@/lib/recent-friends";

/** Байвал дэсктоп дээр Messenger-ийн хүн сонгох цонх нээгдэнэ. */
const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

const NEVER_CHANGES = () => () => {};

/**
 * Утас эсэх. `useEffect` + `setState` биш `useSyncExternalStore` ашиглаж
 * байгаа шалтгаан: эффект дотор setState дуудвал нэмэлт рендер үүсгэдэг
 * бөгөөд энэ төслийн lint үүнийг хориглодог.
 */
export function useIsCoarsePointer(): boolean {
  return useSyncExternalStore(
    NEVER_CHANGES,
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
}

function useFriends(): readonly string[] {
  return useSyncExternalStore(subscribeFriends, getFriends, getServerFriends);
}

export function SendToFriend({ url }: { url: string }) {
  const isMobile = useIsCoarsePointer();
  const friends = useFriends();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [pasted, setPasted] = useState(false);

  /* ── a) Утас: апп өөрөө хүн сонгуулна ── */
  if (isMobile) {
    return (
      <Frame>
        <a
          href={`fb-messenger://share/?link=${encodeURIComponent(url)}`}
          className="block rounded-xl bg-ember px-4 py-3 text-center font-semibold text-ink"
        >
          {MESSENGER_BTN}
        </a>
      </Frame>
    );
  }

  /* ── b) Дэсктоп + App ID: Facebook-ийн Send Dialog ── */
  if (FB_APP_ID) {
    const dialog =
      `https://www.facebook.com/dialog/send?app_id=${encodeURIComponent(FB_APP_ID)}` +
      `&link=${encodeURIComponent(url)}` +
      `&redirect_uri=${encodeURIComponent(url)}`;

    return (
      <Frame>
        <button
          type="button"
          onClick={() =>
            window.open(dialog, "messenger-send", "width=640,height=640")
          }
          className="w-full rounded-xl bg-ember px-4 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {MESSENGER_BTN}
        </button>
      </Frame>
    );
  }

  /* ── c) Дэсктоп, App ID байхгүй: m.me ── */
  const send = async () => {
    const username = normalizeUsername(name);
    if (!username) {
      setError(true);
      return;
    }
    setError(false);

    // Эхлээд хуулна — m.me нь мессежийг урьдчилан бичиж өгөх боломжгүй тул
    // хэрэглэгч чат нээгдмэгц наахад л хангалттай болно.
    try {
      await navigator.clipboard.writeText(url);
      setPasted(true);
    } catch {
      // Clipboard хаалттай ч чатыг нээх нь илүү дээр
    }

    addFriend(username);
    setName("");
    window.open(`https://m.me/${username}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Frame>
      {friends.length ? (
        <div className="mb-2.5">
          <p className="mb-1.5 text-xs text-smoke/60">{RECENT}</p>
          <div className="flex flex-wrap gap-1.5">
            {friends.map((friend) => (
              <span
                key={friend}
                className="flex items-center gap-1 rounded-full border border-smoke/25 pl-3 pr-1 text-sm text-smoke"
              >
                <button
                  type="button"
                  onClick={() => setName(friend)}
                  className="py-1 transition-colors hover:text-foreground"
                >
                  @{friend}
                </button>
                <button
                  type="button"
                  onClick={() => removeFriend(friend)}
                  aria-label={`${friend}-г устгах`}
                  className="grid size-5 place-items-center rounded-full text-smoke/50 transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={FRIEND_PLACEHOLDER}
          aria-invalid={error}
          className={`min-w-0 flex-1 rounded-xl border bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-smoke/45 focus:outline-none ${
            error ? "border-red-400/70" : "border-white/10 focus:border-ember"
          }`}
        />
        <button
          type="button"
          onClick={send}
          className="shrink-0 rounded-xl bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {SEND_BTN}
        </button>
      </div>

      <p className="mt-1.5 text-xs text-smoke/55">
        {error ? (
          <span className="text-red-400">{BAD_USERNAME}</span>
        ) : pasted ? (
          <span className="text-ember-hot">{PASTE_HINT}</span>
        ) : (
          USERNAME_NOTE
        )}
      </p>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ember/25 bg-ember/[0.06] p-3.5">
      <p className="mb-2.5 text-sm font-semibold">{SEND_DIRECT}</p>
      {children}
    </div>
  );
}
