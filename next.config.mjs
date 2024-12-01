/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pixabay.com",
                port: "",
                pathname: "/api/**",
            },
            {
                protocol: "https",
                hostname: "pixabay.com",
                port: "",
                pathname: "/get/**",
            },
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
    output: "standalone",
};

export default nextConfig;