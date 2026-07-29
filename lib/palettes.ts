export type Palette = {
  id: string;
  label: string;
  /** Муурын үндсэн үс */
  fur: string;
  /** Сүүдэр, гүн хэсэг */
  furDark: string;
  /** Товч, гэрэлтэлт, тамхины гал */
  accent: string;
  accentHot: string;
};

/**
 * Дэвсгэр нь бараан (#0b0b10) тул accent бүрийг үстэйгээ зэрэгцүүлэхэд
 * тодрох эсэхийг харгалзан тусад нь сонгосон — бараан муурт тод улаан,
 * цайвар муурт зөөлөн өнгө.
 */
export const PALETTES: Palette[] = [
  {
    id: "cream",
    label: "Цөцгий",
    fur: "#f4f1ea",
    furDark: "#b9b3a6",
    accent: "#ff8a3d",
    accentHot: "#ffd08a",
  },
  {
    id: "orange",
    label: "Улбар",
    fur: "#e8a55c",
    furDark: "#b4783b",
    accent: "#ffb703",
    accentHot: "#ffe08a",
  },
  {
    id: "grey",
    label: "Саарал",
    fur: "#c2c7cf",
    furDark: "#8a909a",
    accent: "#7dd3fc",
    accentHot: "#bae6fd",
  },
  {
    id: "black",
    label: "Хар",
    fur: "#4b4b57",
    furDark: "#2e2e37",
    accent: "#ff6b6b",
    accentHot: "#ffb3b3",
  },
  {
    id: "white",
    label: "Цагаан",
    fur: "#ffffff",
    furDark: "#cfd3d8",
    accent: "#a78bfa",
    accentHot: "#ddd6fe",
  },
  {
    id: "brown",
    label: "Хүрэн",
    fur: "#a9744f",
    furDark: "#7a5137",
    accent: "#fbbf24",
    accentHot: "#fde68a",
  },
  {
    id: "pink",
    label: "Ягаан",
    fur: "#f3c7d4",
    furDark: "#c294a3",
    accent: "#ec4899",
    accentHot: "#fbcfe8",
  },
  {
    id: "mint",
    label: "Ногоон",
    fur: "#bfe3d0",
    furDark: "#8bb4a0",
    accent: "#34d399",
    accentHot: "#a7f3d0",
  },
];

export const DEFAULT_PALETTE = PALETTES[0];

export function paletteById(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? DEFAULT_PALETTE;
}

/** Картын хүрээнд өгөх CSS хувьсагчид — SVG болон товчнууд үүнээс уншина. */
export function paletteVars(p: Palette): Record<string, string> {
  return {
    "--fur": p.fur,
    "--fur-dark": p.furDark,
    "--ember": p.accent,
    "--ember-hot": p.accentHot,
  };
}
