/**
 * Муурын яриа бөмбөлөг — цагаан дэвсгэр дээр бараан текст.
 *
 * Сүүл нь доош, муурын толгой руу заана. Текст солигдох бүрд `key` өөрчлөгдөж
 * дахин гарч ирэх анимаци тоглоно (`bubble-in` — globals.css).
 */
export function SpeechBubble({ text }: { text: string }) {
  return (
    <div key={text} className="bubble-in relative mx-auto max-w-[19rem]">
      <div className="relative rounded-2xl bg-white px-5 py-4 text-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
        <p className="text-balance text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
          {text}
        </p>
        {/* сүүл */}
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[10px] border-t-[12px] border-x-transparent border-t-white"
        />
      </div>
    </div>
  );
}
