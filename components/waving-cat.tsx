/**
 * Дэр дээр хэвтэж, сарвуугаараа даллаж мэндэлж буй муур.
 *
 * `smoking-cat.tsx`-тэй ижил хэв маягийг (зузаан `ink` контур, `fur`
 * дүүргэлт, дугуйруулсан үзүүр) хадгалсан ШИНЭ зохион бүтээлт — тамхи,
 * утаа, ширээ, үнстэй сав байхгүй. Тамхи татаж буй муурын эх зурган дээр
 * (codepen.io/abeatrize) үндэслээгүй.
 *
 * Хөдөлгөөн: сарвуу мөрний уг дээрх цэгээс `.paw-wave` анимациар (доор нь
 * `app/globals.css`) даллана. Тогтмол SVG тул Server Component хэвээр.
 *
 * viewBox нь `smoking-cat.tsx`-тэй ЯГ ИЖИЛ харьцаатай (442×252) — админ
 * дээр муур сольсон ч картын өндөр өөрчлөгдөхгүй.
 */
export function WavingCat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 442 252"
      className={className}
      role="img"
      aria-label="Дэр дээр хэвтэж, сарвуугаараа мэндэлж буй муур"
    >
      {/* ───── Дэр ───── */}
      <g>
        <ellipse
          cx="221"
          cy="214"
          rx="205"
          ry="32"
          fill="var(--cushion)"
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <ellipse
          cx="221"
          cy="206"
          rx="185"
          ry="18"
          fill="var(--cushion-edge)"
          opacity="0.55"
        />
        {/* даавууны хумхи — жижиг чимэглэл */}
        <path
          d="M170,207 q6,9 12,0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M272,207 q6,9 12,0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>

      {/* ───── Сүүл ───── */}
      <path
        d="M330,175 C372,170 392,140 378,112 C368,92 344,96 348,116"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* ───── Бие (хэвтэж буй) ───── */}
      <rect
        x="95"
        y="118"
        width="250"
        height="92"
        rx="46"
        fill="var(--fur)"
        stroke="var(--ink)"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      {/* ───── Амрах урд сарвуу (хөдөлгөөнгүй) ───── */}
      <ellipse
        cx="150"
        cy="176"
        rx="30"
        ry="17"
        transform="rotate(-10 150 176)"
        fill="var(--fur)"
        stroke="var(--ink)"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      {/* ───── Толгой ───── */}
      <g>
        <circle
          cx="128"
          cy="104"
          r="56"
          fill="var(--fur)"
          stroke="var(--ink)"
          strokeWidth="7"
        />

        {/* чих */}
        <path
          d="M90,66 L82,18 L118,54 Z"
          fill="var(--fur)"
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M150,54 L172,14 L182,64 Z"
          fill="var(--fur)"
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d="M94,58 L90,32 L108,50 Z" fill="#ef97b0" />
        <path d="M156,50 L170,26 L176,54 Z" fill="#ef97b0" />

        {/* хацар */}
        <circle cx="98" cy="122" r="9" fill="#ef97b0" opacity="0.55" />
        <circle cx="158" cy="122" r="9" fill="#ef97b0" opacity="0.55" />

        {/* инээмсэглэсэн хаалттай нүд */}
        <path
          d="M104,104 q10,-12 20,0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M144,104 q10,-12 20,0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* хамар + ам */}
        <circle cx="128" cy="118" r="3.2" fill="var(--ink)" />
        <path
          d="M118,124 Q128,134 138,124"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* ───── Даллах сарвуу ───── */}
      <g className="paw-wave">
        <path
          d="M175,140 C182,102 198,76 220,70 C232,67 244,74 240,88 C236,104 210,124 188,138 Z"
          fill="var(--fur)"
          stroke="var(--ink)"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <ellipse cx="210" cy="95" rx="4" ry="5" fill="var(--ink)" opacity="0.85" />
        <ellipse cx="220" cy="90" rx="4" ry="5" fill="var(--ink)" opacity="0.85" />
        <ellipse cx="229" cy="97" rx="4" ry="5" fill="var(--ink)" opacity="0.85" />
      </g>
    </svg>
  );
}
