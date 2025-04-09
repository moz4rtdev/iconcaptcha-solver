/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Adiciona suporte para arquivos .node
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
    return config;
  }
}

module.exports = nextConfig