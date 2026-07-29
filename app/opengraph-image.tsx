import { SITE_NAME } from "@/lib/content";
import { OG_ALT, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOgCard({ question: SITE_NAME });
}
