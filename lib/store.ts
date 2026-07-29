import { Redis } from "@upstash/redis";
import { FOLLOWUP, QUESTION } from "@/lib/content";

export type SiteConfig = {
  question: string;
  followUp: string;
};

const KEY = "rauchen:config";
export const MAX_LEN = 60;

const DEFAULTS: SiteConfig = {
  question: QUESTION,
  followUp: FOLLOWUP,
};

/**
 * `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` байхгүй үед (локал
 * хөгжүүлэлт) Redis-д огт хандахгүй, процессын доторх энгийн объектод
 * хадгална. Dev сервер ажиллаж байх хугацаанд л ажиллана — production дээр
 * эдгээр хувьсагч заавал байх ёстой.
 */
const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = hasRedis ? Redis.fromEnv() : null;

let memoryConfig: SiteConfig = { ...DEFAULTS };

function sanitize(raw: Partial<SiteConfig> | null | undefined): SiteConfig {
  if (!raw) return { ...DEFAULTS };
  return {
    question: typeof raw.question === "string" && raw.question.trim()
      ? raw.question.slice(0, MAX_LEN)
      : DEFAULTS.question,
    followUp: typeof raw.followUp === "string" && raw.followUp.trim()
      ? raw.followUp.slice(0, MAX_LEN)
      : DEFAULTS.followUp,
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!redis) return memoryConfig;

  try {
    const raw = await redis.get<Partial<SiteConfig>>(KEY);
    return sanitize(raw);
  } catch {
    // Redis түр ажиллахгүй байвал апп унахгүйн тулд анхны утга руу буцна
    return { ...DEFAULTS };
  }
}

export async function setSiteConfig(
  patch: Partial<SiteConfig>,
): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const next = sanitize({ ...current, ...patch });

  if (redis) {
    await redis.set(KEY, next);
  } else {
    memoryConfig = next;
  }

  return next;
}
