/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	env: {
		REACT_APP_PROXY_HOST: process.env.REACT_APP_PROXY_HOST,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	) => {
		// Important: return the modified config
		config.module.rules.push({
			type: 'javascript/auto',
			test: /\.json$/,
			include: /(drawkit)/,
			loader: 'lottie-web-webpack-loader',
			options: {
				assets: {
					scale: 0.5, // proportional resizing multiplier
				},
			},
		});

		// 서버에서는 경로를 그대로 사용해야 하므로, 브라우저와 구분합니다.
		config.module.rules.push({
			test: /\.(js|jsx|ts|tsx)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { targets: { node: 'current' } }],
						'@babel/preset-react',
						'@babel/preset-typescript',
					],
				},
			},
		});

		return config;
	},
	async rewrites() {
		require('dotenv').config({ path: '.env' });

		if (process.env.REACT_APP_NODE_ENV === 'development') {
			require('dotenv').config({ path: '.env.dev' });
		} else if (process.env.REACT_APP_NODE_ENV === 'production') {
			require('dotenv').config({ path: '.env.prod' });
		}

		return [
			{
				source: `${process.env.NEXT_PUBLIC_ROOT_ROUTE}/:path*`,
				destination: `${process.env.REACT_APP_PROXY_HOST}${process.env.NEXT_PUBLIC_ROOT_ROUTE}/:path*`,
			},
		];
	},
};
const withTM = require('next-transpile-modules')([
	'@leanoncompany/supporti-react-ui',
	'@leanoncompany/supporti-utility',
	'@mui/material',
]); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig);
