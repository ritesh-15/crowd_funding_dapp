/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["avatars.dicebear.com", "crowdfundingrk.infura-ipfs.io"],
  },
};

module.exports = nextConfig;
