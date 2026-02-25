/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimized image loading
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vilva-backup.blr1.digitaloceanspaces.com',
        port: '',
        pathname: '/vilvabusiness/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'whatsease.vilvabusiness.com',
        port: '',
        pathname: '/**',
      },
      // ADD THIS - For product images from digital_cart
      {
        protocol: 'https',
        hostname: 'assetsvilva.blr1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // URL rewrites / proxies
  async rewrites() {
    return [
      {
        source: '/download/vcf',
        destination:
          'https://vilva-backup.blr1.digitaloceanspaces.com/vilvabusiness/common%20files/VilvaVcf.vcf',
      },
    ];
  },

  // Enable React Strict Mode
  reactStrictMode: true,
};

export default nextConfig;