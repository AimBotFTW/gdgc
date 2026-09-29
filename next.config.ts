import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Parent directories outside this repo contain a package-lock.json that
  // would otherwise be treated as the Turbopack workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
