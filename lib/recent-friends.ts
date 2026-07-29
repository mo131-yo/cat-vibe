const KEY = "rauchen:friends";
const MAX = 5;

/** Messenger-ийн хэрэглэгчийн нэр: үсэг, тоо, цэг. */
const VALID = /^[a-zA-Z0-9.]{2,50}$/;

/** Урд талын `@`, хоосон зайг арилгаад шалгана. Буруу бол `null`. */
export function normalizeUsername(raw: string): string | null {
  const name = raw.trim().replace(/^@+/, "").replace(/^(https?:\/\/)?m\.me\//, "");
  return VALID.test(name) ? name : null;
}

/* --------------------------------------------------------------------------
 * Жижиг store — `useSyncExternalStore`-д зориулав.
 *
 * `useEffect` дотор `setState` дуудахыг энэ төслийн lint хориглодог тул
 * localStorage-ыг эффектээр биш, гаднын эх сурвалж болгон уншина.
 *
 * `getSnapshot` нь ЗААВАЛ ижил reference буцаах ёстой — шинэ массив бүрд
 * React дахин рендерлэж, эцэс төгсгөлгүй давталтад орно. Тиймээс `cache`-ыг
 * зөвхөн бодит өөрчлөлт болоход л сольж байна.
 * ----------------------------------------------------------------------- */

const EMPTY: readonly string[] = [];

let cache: readonly string[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): readonly string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const names = parsed.filter((n): n is string => typeof n === "string");
    return names.length ? names.slice(0, MAX) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: readonly string[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Quota дүүрсэн эсвэл хувийн горим — санах нь чухал биш тул алгасна
  }
  listeners.forEach((fn) => fn());
}

export function subscribeFriends(callback: () => void): () => void {
  listeners.add(callback);
  // Өөр табд өөрчлөгдвөл мөн шинэчилнэ
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    loaded = false;
    callback();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function getFriends(): readonly string[] {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

/** Сервер дээр localStorage байхгүй — үргэлж ижил хоосон массив. */
export function getServerFriends(): readonly string[] {
  return EMPTY;
}

export function addFriend(name: string) {
  const current = getFriends();
  commit([name, ...current.filter((n) => n !== name)].slice(0, MAX));
}

export function removeFriend(name: string) {
  commit(getFriends().filter((n) => n !== name));
}
