import { decodeCard } from "@/lib/card-data";
import { OG_ALT, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { paletteById } from "@/lib/palettes";
import { SITE_NAME } from "@/lib/content";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * Slug бүрт өөр зураг — Messenger-т хуваалцахад тухайн хүний асуулт харагдана.
 * Нэг л удаа рендерлээд кэшлэнэ (slug өөрчлөгдөхгүй тул хугацаа хязгаарлахгүй).
 */
export const revalidate = false;

export default async function Image({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const { data } = await params;
  const card = decodeCard(data);

  return renderOgCard({
    question: card?.q ?? SITE_NAME,
    palette: paletteById(card?.c ?? ""),
  });
}
