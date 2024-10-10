/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // serverActions: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com'
            }
        ], // Corrected domain
    },
};

export default nextConfig;