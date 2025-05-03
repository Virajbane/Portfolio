// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['via.placeholder.com'],
    },
    i18n: {
      locales: ['en', 'cs'],
      defaultLocale: 'en',
    },
  };
  
  export default nextConfig;
 