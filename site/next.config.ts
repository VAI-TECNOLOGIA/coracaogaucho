import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Fixa a raiz no diretório do app (há outro lockfile na home do usuário).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
