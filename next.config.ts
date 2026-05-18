// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "http",
//         hostname: "10.10.12.111",
//         port: "8050",
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow loading images from private/local IPs (for development)
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Production API domain
      {
        protocol: "https",
        hostname: "api.winnersregionalcenter.com",
        pathname: "/media/projects/**",
      },
      {
        protocol: "https",
        hostname: "api.winnersregionalcenter.com",
        pathname: "/media/profile_images/**",
      },
      {
        protocol: "https",
        hostname: "api.winnersregionalcenter.com",
        pathname: "/media/blog_images/**",
      },

      // Local server (optional - for development only)
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/projects/**",
      },
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/profile_images/**",
      },
      {
        protocol: "http",
        hostname: "10.10.12.111",
        port: "8050",
        pathname: "/media/blog_images/**",
      },
    ],
  },
};

module.exports = nextConfig;