import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for deploys — avoids running pnpm install on
  // the memory-constrained server; PM2 runs the bundle's server.js directly.
  output: "standalone",
  // Stray lockfiles higher up the tree make Next infer the wrong workspace
  // root, which nests the standalone bundle under the full host path.
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
