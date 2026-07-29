"use server";

import { revalidatePath } from "next/cache";
import { setSiteConfig } from "@/lib/store";
import type { SaveState } from "@/app/admin/types";

export async function saveConfig(
  _prevState: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const question = String(formData.get("question") ?? "").trim();
  const followUp = String(formData.get("followUp") ?? "").trim();

  if (!question || !followUp) {
    return { status: "error", message: "Асуулт хоосон байж болохгүй." };
  }

  await setSiteConfig({ question, followUp });

  // Нүүр хуудас `force-dynamic` тул шинэ тохиргоог автоматаар авна,
  // OG зургууд нь кэшлэгддэг тул тэдгээрийг тусад нь хүчингүй болгоно.
  revalidatePath("/");
  revalidatePath("/opengraph-image");
  revalidatePath("/twitter-image");

  return { status: "success", message: "Хадгалагдлаа." };
}
