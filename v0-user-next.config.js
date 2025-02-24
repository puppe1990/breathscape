/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    instrumentationHook: true,
  },
  webpack: (config, { isServer }) => {
    // Add service worker to build
    if (!isServer) {
      config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm"
    }
    return config
  },
}

module.exports = nextConfig

