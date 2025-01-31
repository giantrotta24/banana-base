import Link from "next/link";
import { auth } from "~/server/auth";

export async function Nav() {
  const session = await auth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-yellow-400/90 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-yellow-900">
          🍌 Banana Base
        </Link>
        {session && (
          <Link
            href="/inventory"
            className="rounded-full bg-yellow-500/50 px-4 py-2 text-sm font-semibold text-yellow-950 transition hover:bg-yellow-500"
          >
            🗃️ My Inventory
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-yellow-900">{session.user?.name}</span>
            <Link
              href="/api/auth/signout"
              className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-yellow-950 transition hover:bg-yellow-600"
            >
              Sign out
            </Link>
          </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-yellow-950 transition hover:bg-yellow-600"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
