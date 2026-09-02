/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Fail the production build on lint errors instead of silently shipping them.
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Local screenshots live in /public/projects. Add remote hosts here if you
    // ever serve project images from a CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
