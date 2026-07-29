import { Builder } from "@/components/builder";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col justify-center overflow-hidden px-5 py-10">
      {/* дэвсгэрийн гэрэлтэлт */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_20%,rgba(255,138,61,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_110%,rgba(154,163,178,0.08),transparent_70%)]"
      />

      <div className="relative">
        <Builder />
      </div>
    </main>
  );
}
