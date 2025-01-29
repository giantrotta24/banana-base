import Link from "next/link";
import { type ReactNode } from "react";

interface BananaButtonProps {
  href: string;
  children: ReactNode;
}

export function BananaButton({ href, children }: BananaButtonProps) {
  return (
    <div className="group relative">
      {/* Banana glow effect */}
      <div className="absolute -inset-1 rounded-full bg-yellow-300 opacity-0 blur transition-all duration-300 group-hover:opacity-75" />

      {/* Floating bananas that appear on hover */}
      <div className="absolute -left-4 -top-4 text-2xl opacity-0 transition-all duration-500 group-hover:translate-y-[-1rem] group-hover:opacity-100">
        🍌
      </div>
      <div className="absolute -right-4 -top-4 text-2xl opacity-0 transition-all duration-500 group-hover:translate-y-[-1rem] group-hover:opacity-100 group-hover:delay-100">
        🍌
      </div>

      <Link
        href={href}
        className="relative flex items-center gap-2 rounded-full bg-yellow-500 px-8 py-3 text-lg font-semibold text-yellow-950 transition-all duration-300 hover:scale-105 hover:bg-yellow-600 hover:shadow-lg"
      >
        {children}
      </Link>
    </div>
  );
}
