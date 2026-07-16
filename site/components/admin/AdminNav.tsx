"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Filter, Sparkles, Shield, UserX, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

const ITENS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/funil", label: "Funil", icon: Filter },
  { href: "/admin/insights", label: "Insights IA", icon: Sparkles },
  { href: "/admin/notificacoes", label: "Notificações", icon: BellRing },
  { href: "/admin/equipe", label: "Equipe", icon: Shield },
  { href: "/admin/privacidade", label: "Privacidade", icon: UserX },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {ITENS.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-cream-soft/10 text-cream-soft"
                : "text-cream-soft/60 hover:bg-cream-soft/5 hover:text-cream-soft",
            )}
          >
            <it.icon className="h-[18px] w-[18px]" strokeWidth={2} />
            {it.label}
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-yellow" />}
          </Link>
        );
      })}
    </nav>
  );
}
