import type { NextConfig } from 'next';
import './server/jobs';

const nextConfig: NextConfig = {
	/* config options here */
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard',
				permanent: true,
			},
		];
	},
	productionBrowserSourceMaps: false,
};

export default nextConfig;
