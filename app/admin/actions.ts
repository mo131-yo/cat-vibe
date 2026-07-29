"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminCookie, setAdminCookie, verifyPassword } from "@/lib/admin-auth";
import { setSiteConfig, type CatVariant } from "@/lib/store";
import type { SaveState } from "@/app/admin/types";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    redirect("/admin?error=1");
  }

  await setAdminCookie();
  redirect("/admin");
}

export async function logout() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function saveConfig(
  _prevState: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const question = String(formData.get("question") ?? "").trim();
  const followUp = String(formData.get("followUp") ?? "").trim();
  const activeCat = String(formData.get("activeCat") ?? "");

  if (!question || !followUp) {
    return { status: "error", message: "Асуулт хоосон байж болохгүй." };
  }
  if (activeCat !== "smoking" && activeCat !== "waving") {
    return { status: "error", message: "Муур сонгогдоогүй байна." };
  }

  await setSiteConfig({
    question,
    followUp,
    activeCat: activeCat as CatVariant,
  });

  // Нүүр хуудас `force-dynamic` тул шинэ тохиргоог автоматаар авна,
  // OG зургууд нь кэшлэгддэг тул тэдгээрийг тусад нь хүчингүй болгоно.
  revalidatePath("/");
  revalidatePath("/opengraph-image");
  revalidatePath("/twitter-image");

  return { status: "success", message: "Хадгалагдлаа." };
}
