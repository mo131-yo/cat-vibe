import { QuestionCard } from "@/components/question-card";
import { getSiteConfig } from "@/lib/store";

// Admin дээр хийсэн засварыг үргэлж шинээр татахын тулд статик кэшлэхгүй.
export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-10">
      {/* дэвсгэрийн гэрэлтэлт */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_35%,rgba(255,138,61,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_110%,rgba(154,163,178,0.10),transparent_70%)]"
      />

      <QuestionCard {...config} />
    </main>
  );
}
