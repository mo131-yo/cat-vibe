import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { decodeCard } from "@/lib/card-data";
import { OG_HINT } from "@/lib/content";

type Props = { params: Promise<{ data: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await params;
  const card = decodeCard(data);
  if (!card) return { title: "Олдсонгүй" };

  return {
    title: card.q,
    description: OG_HINT,
    openGraph: { title: card.q, description: OG_HINT, type: "website" },
    twitter: { card: "summary_large_image", title: card.q, description: OG_HINT },
  };
}

export default async function CardPage({ params }: Props) {
  const { data } = await params;
  const card = decodeCard(data);
  // Эвдэрсэн эсвэл хуурамч slug — апп унахгүй, 404 харуулна
  if (!card) notFound();

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_35%,rgba(255,138,61,0.16),transparent_70%)]"
      />
      <QuestionCard data={card} />
    </main>
  );
}
