import { login } from "@/app/admin/actions";

export function LoginForm({ error }: { error?: boolean }) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xs flex-col justify-center gap-4">
      <h1 className="text-xl font-bold tracking-tight">Admin</h1>

      <form action={login} className="flex flex-col gap-3">
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="Нууц үг"
          className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-smoke/45 focus:border-ember focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          Нэвтрэх
        </button>
      </form>

      {error ? (
        <p className="text-sm text-red-400">Нууц үг буруу байна.</p>
      ) : null}
    </div>
  );
}
