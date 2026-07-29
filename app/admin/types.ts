/**
 * `actions.ts` нь `"use server"` файл тул зөвхөн async функц export хийж
 * болно — төрлийг тусдаа файлд байрлуулав.
 */
export type SaveState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const INITIAL_SAVE_STATE: SaveState = { status: "idle" };
