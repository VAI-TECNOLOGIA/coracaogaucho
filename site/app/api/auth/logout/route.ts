import { NextResponse } from "next/server";
import { destruirSessaoCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  await destruirSessaoCookie();
  return NextResponse.json({ ok: true });
}
