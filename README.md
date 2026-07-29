# Цуг тамхилах уу?

Messenger/Instagram-аар илгээх интерактив линк хуудас.
Нүүрэн талд нь тамхи татаж буй Bongo Cat (бүхэлдээ SVG + CSS): сарвуугаараа тамхиа
ам руугаа өргөж → уушиглаж → буулгаж → утаагаа үлээнэ (7 секундын мөчлөг).
Асуулт нь муурын яриа бөмбөлөгт шууд гарна — «Тийм / Үгүй» товч доор нь. «Үгүй»
товч хулгана ойртох бүрд зугтаж, «Тийм» дарахад 2 дахь асуулт гарч ирнэ.

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Bun

## Ажиллуулах

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
bun run lint
```

## Файлын бүтэц

| Файл | Үүрэг |
| --- | --- |
| `lib/content.ts` | Бүх монгол текст. **Асуултаа солихдоо энэ файлыг л засна.** |
| `components/smoking-cat.tsx` | SVG Bongo Cat — гар, тамхи, утаа, үнстэй сав |
| `app/globals.css` дэх `--smoke-cycle` | Тамхи татах мөчлөгийн хугацаа (7s). Бүх утааны анимэйшн үүнд уягдсан. |
| `components/question-card.tsx` | Нэг дөрвөлжин карт, `ask` → `followup` үе шат |
| `components/speech-bubble.tsx` | Муурын яриа бөмбөлөг |
| `components/answer-buttons.tsx` | «Тийм» / зугтдаг «Үгүй» |
| `lib/og-card.tsx` | Линкийн preview зураг (1200×630) |
| `app/fonts/NotoSans-*.ttf` | Preview зурган дээрх кирилл үсэг |
| `app/globals.css` | Тем, keyframes, `prefers-reduced-motion` |

## Vercel дээр deploy хийх

```bash
vercel --prod
```

Эсвэл GitHub руу push хийж [vercel.com/new](https://vercel.com/new)-ээс импортлоно.

Орчны хувьсагч **заавал биш**. Vercel дээр `VERCEL_PROJECT_PRODUCTION_URL`-ээс
домэйныг автоматаар олж `og:image`-ийг бүрэн URL болгоно. Хэрэв өөрийн домэйн
(жишээ нь `tamhi.mn`) залгасан бол `NEXT_PUBLIC_SITE_URL=https://tamhi.mn`
гэж нэмнэ — эс бөгөөс preview нь `*.vercel.app` домэйн рүү заана.

Deploy хийсний дараа [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
дээр URL-аа оруулж **«Scrape Again»** дарна. Facebook preview-г удаан кэшлэдэг тул
энэ алхмыг алгасвал хуучин эсвэл хоосон зураг харагдана.

## Preview зургийн тухай

`app/opengraph-image.tsx` нь `lib/og-card.tsx`-ээс 1200×630 PNG үүсгэдэг.
Хөдөлгөөнгүй боловч бүх платформ дээр найдвартай ажиллана.

> **Анхаар:** Messenger болон Instagram нь `og:image`-ийг дахин кодчилдог тул
> GIF өгсөн ч зөвхөн **эхний кадрыг** харуулна. Telegram, Discord дээр GIF
> жинхэнэ хөдөлдөг. Жинхэнэ анимэйшн нь линкийг дарж орсны дараа өрнөнө.

### GIF-ээр солих

1. GIF-ээ `app/opengraph-image.gif` болгон хийнэ (8MB-аас бага).
2. `app/opengraph-image.tsx`-ийг **устгана** — Next нэг сегментэд зураг файл
   болон код хоёуланг зэрэг зөвшөөрдөггүй.
3. `app/twitter-image.tsx` хэвээр үлдэнэ (Twitter GIF хөдөлгөдөггүй тул
   тод PNG нь илүү).

GIF-ийн **эхний кадр** нь дангаараа бүтэн мессежээ дамжуулж чадахаар байх ёстой.

## Зохиогчийн эрх / Attribution

Муурны дүр бол **Bongo Cat** — [@StrayRogue](https://twitter.com/StrayRogue) зурсан,
[@DitzyFlama](https://twitter.com/DitzyFlama) мем болгосон.
SVG хувилбарыг [abeatrize](https://codepen.io/abeatrize/pen/LJqYey) CodePen дээр гаргасан.

Энэ төсөлд зөөврийн компьютерын хэсгийг хасаж, тамхи, утаа, үнстэй сав нэмж,
өнгийг шөнийн темд тохируулсан. Артворкийг ашиглах бүрдээ атрибуцийг үлдээнэ үү —
`components/smoking-cat.tsx` болон `lib/og-card.tsx` файлын толгойд бичсэн байгаа.
