import { ConfigForm } from "@/components/admin/config-form";
import { getSiteConfig } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const config = await getSiteConfig();

  return (
    <main className="px-5">
      <ConfigForm initial={config} />
    </main>
  );
}
