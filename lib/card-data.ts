export type CardData = {
  /** Муурын асуух гол асуулт */
  q: string;
  /** «Тийм» дарсны дараах асуулт */
  f: string;
  /** Өнгөний түлхүүр — lib/palettes.ts */
  c: string;
};

const MAX_LEN = 60;

/**
 * Кирилл текстийг base64url болгоно.
 *
 * `btoa` нь зөвхөн Latin-1 хүлээж авдаг тул шууд `btoa(JSON.stringify(...))`
 * гэвэл монгол үсэг дээр `InvalidCharacterError` шидэнэ. Тиймээс эхлээд
 * `TextEncoder`-оор UTF-8 байт болгоно. Энэ хувилбар нь сервер (Node 18+)
 * болон браузер хоёуланд ажиллана.
 */
function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(slug: string): string {
  const padded = slug.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeCard(data: CardData): string {
  return toBase64Url(JSON.stringify([data.q, data.f, data.c]));
}

/** Эвдэрсэн эсвэл хуурамч slug ирвэл `null` — дуудагч тал `notFound()` дуудна. */
export function decodeCard(slug: string): CardData | null {
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(slug));
    if (!Array.isArray(parsed) || parsed.length < 3) return null;

    const [q, f, c] = parsed;
    if (typeof q !== "string" || typeof f !== "string" || typeof c !== "string") {
      return null;
    }
    if (!q.trim() || !f.trim()) return null;

    return { q: q.slice(0, MAX_LEN), f: f.slice(0, MAX_LEN), c: c.slice(0, 16) };
  } catch {
    return null;
  }
}

export { MAX_LEN };
