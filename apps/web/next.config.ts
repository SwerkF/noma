import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  eslint: {
    dirs: ['src/app', 'src/components', 'src/lib', 'src/pages', 'src/utils'],
  },
};

export default nextConfig;
