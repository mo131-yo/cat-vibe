# Асуух уу?

Муураар дамжуулан асуултаа асуудаг, Messenger-ээр илгээх линк үүсгэгч.

Асуултаа сонгож (Тамхи · Уулзалт · Зав · Хаана · Болзоо · өөрөө бичих), муурынхаа
өнгийг сонгоод холбоосоо найздаа явуулна. Найз чинь нээхэд тамхи татаж буй Bongo
Cat (бүхэлдээ SVG + CSS) яриа бөмбөлгөөр асуулт асууна. «Үгүй» товч хулгана
ойртох бүрд зугтаж шоолно; «Тийм» дарахад 2 дахь асуулт гарч, хариултыг нь
буцааж илгээнэ.

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Bun

## Зам

| Зам | Юу |
| --- | --- |
| `/` | Үүсгэгч — асуулт, өнгө сонгож холбоос гаргана |
| `/c/[data]` | Хүлээн авагчийн карт. Өгөгдөл нь замд base64url-ээр кодлогдоно |
| `/c/[data]/opengraph-image` | Тухайн асуулт, өнгөөр нь preview зураг |

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
| `lib/presets.ts` | 6 асуулт, тус бүрийн 2 дахь асуулт, хариулт, шоолол. **Асуулт нэмэхдээ энд.** |
| `lib/palettes.ts` | Муурын 8 өнгө (үс + accent) |
| `lib/content.ts` | Бусад бүх монгол текст |
| `lib/card-data.ts` | Холбоосны base64url кодчилол. Кирилл тул `TextEncoder`-оор байт болгосны дараа `btoa` дуудна |
| `components/builder.tsx` | Үүсгэгчийн 4 алхам + амьд урьдчилан үзүүлбэр |
| `components/question-card.tsx` | Хүлээн авагчийн карт, `ask` → `followup` үе шат |
| `components/send-to-friend.tsx` | Messenger дээр нэг хүн рүү илгээх (доор үзнэ үү) |
| `components/smoking-cat.tsx` | SVG Bongo Cat. Үсний өнгө нь `var(--fur)` |
| `app/globals.css` дэх `--smoke-cycle` | Тамхи татах мөчлөгийн хугацаа (7s). Бүх утааны анимэйшн үүнд уягдсан. |
| `components/answer-buttons.tsx` | «Тийм» / зугтдаг «Үгүй» |
| `lib/og-card.tsx` | Линкийн preview зураг (1200×630), асуулт+өнгө параметртэй |
| `app/fonts/NotoSans-*.ttf` | Preview зурган дээрх кирилл үсэг |
| `app/globals.css` | Тем, keyframes, `prefers-reduced-motion` |

## Messenger дээр нэг хүн рүү илгээх

Гурван горим — ажиллах үедээ автоматаар сонгогдоно:

| Нөхцөл | Юу болох |
| --- | --- |
| Утас | `fb-messenger://share` — апп өөрөө хүн сонгуулна |
| Дэсктоп + `NEXT_PUBLIC_FB_APP_ID` | Facebook-ийн Send Dialog — жинхэнэ хүн сонгох цонх |
| Дэсктоп, App ID байхгүй | `@нэр` бичихэд холбоос хуулагдаж `m.me/<нэр>` нээгдэнэ |

**App ID авах:** developers.facebook.com → Create App → Settings → Basic →
**App Domains**-д домэйнээ нэм → Add Platform → Website → Site URL. Дараа нь
`.env.local`-д `NEXT_PUBLIC_FB_APP_ID=...` гэж бич. Дэлгэрэнгүйг `.env.example`-ээс.

> **Хязгаарлалт:** Send Dialog нь `localhost` дээр ажиллахгүй (домэйн бүртгүүлсэн
> байх ёстой) бөгөөд утсан дээр дэмжигдэхгүй. `m.me` нь мессежийг урьдчилан бичиж
> өгч чаддаггүй — тиймээс холбоосыг санах ойд хуулаад «наагаад илгээ» гэж заана.
> Мөн найз чинь Messenger дээрээ хэрэглэгчийн нэр тохируулсан байх шаардлагатай.

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
