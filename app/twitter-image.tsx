import { OG_ALT, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { getSiteConfig } from "@/lib/store";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const { question } = await getSiteConfig();
  return renderOgCard({ question });
}
