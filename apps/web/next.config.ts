import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname, '../../'),
	eslint: {
		dirs: ['src/app', 'src/components', 'src/lib', 'src/pages', 'src/utils'],
	},
	serverExternalPackages: ['@formatjs/intl-localematcher', 'negotiator'],
	experimental: {
		authInterrupts: true,
	},
};

export default nextConfig;
