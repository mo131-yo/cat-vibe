import { ConfigForm } from "@/components/admin/config-form";
import { LoginForm } from "@/components/admin/login-form";
import { isAuthed } from "@/lib/admin-auth";
import { getSiteConfig } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthed();

  if (!authed) {
    const { error } = await searchParams;
    return (
      <main className="px-5">
        <LoginForm error={error === "1"} />
      </main>
    );
  }

  const config = await getSiteConfig();

  return (
    <main className="px-5">
      <ConfigForm initial={config} />
    </main>
  );
}
