import { createHash } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "rauchen_admin";

function envPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export function verifyPassword(input: string): boolean {
  const expected = envPassword();
  return Boolean(expected) && input === expected;
}

/**
 * Cookie-д хадгалах утга. Нууц үгийн sha256 хэш — plaintext нууц үгийг
 * cookie-д хадгалахгүйн тулд. Зөвхөн нууц үгээ мэдэх хүн л зөв утга
 * гаргаж чадна.
 */
function sessionToken(): string | null {
  const password = envPassword();
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export async function setAdminCookie() {
  const token = sessionToken();
  if (!token) return;

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthed(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;

  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === token;
}
