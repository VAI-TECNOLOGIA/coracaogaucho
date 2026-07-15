"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={sair}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cream-soft/60 transition-colors hover:bg-cream-soft/5 hover:text-red"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </button>
  );
}
