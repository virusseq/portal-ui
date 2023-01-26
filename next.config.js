// @ts-check

const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const { patchWebpackConfig: patchForGlobalCSS } = require('next-global-css');
const withTranspileModules = require('next-transpile-modules')([]);
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withPlugins([withTranspileModules], {
	webpack: (config, options) => {
		// These 'react' related configs are added to enable linking packages in development
		// (e.g. Arranger), and not get the "broken Hooks" warning.
		// https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
		if (options.isServer) {
			config.externals = ['react', ...config.externals];
		} else {
			options.dev &&
				config.plugins.push(new ForkTsCheckerWebpackPlugin()) &&
				config.plugins.push(
					new ExtraWatchWebpackPlugin({
						dirs: [path.resolve(__dirname, '.', 'node_modules', 'react')],
					}),
				);
		}

		config.resolve.alias['@emotion/react'] = path.resolve(
			__dirname,
			'.',
			'node_modules',
			'@emotion/react',
		);
		config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

		process.env.NODE_ENV === 'development' && (config.optimization.minimize = false);

		return patchForGlobalCSS(config, options);
	},
	publicRuntimeConfig: {
		NEXT_PUBLIC_VIRUSSEQ_API_URL: process.env.NEXT_PUBLIC_VIRUSSEQ_API_URL,
		NEXT_PUBLIC_CHANGELOG_START_SECONDS: process.env.NEXT_PUBLIC_CHANGELOG_START_SECONDS,
		NEXT_PUBLIC_EGO_API_ROOT: process.env.NEXT_PUBLIC_EGO_API_ROOT,
		NEXT_PUBLIC_EGO_CLIENT_ID: process.env.NEXT_PUBLIC_EGO_CLIENT_ID,
		EGO_PUBLIC_KEY: (process.env.EGO_PUBLIC_KEY || '').replace(/\\n/g, '\n'),
		NEXT_PUBLIC_KEYCLOAK: process.env.NEXT_PUBLIC_KEYCLOAK_API_URL,
		NEXT_PUBLIC_ARRANGER_ADMIN_UI: process.env.NEXT_PUBLIC_ARRANGER_ADMIN_UI_URL,
		NEXT_PUBLIC_ARRANGER_API: process.env.NEXT_PUBLIC_ARRANGER_API_URL,
		NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE: process.env.NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE,
		NEXT_PUBLIC_ARRANGER_INDEX: process.env.NEXT_PUBLIC_ARRANGER_INDEX,
		NEXT_PUBLIC_ARRANGER_CARDINALITY_PRECISION_THRESHOLD:
			process.env.NEXT_PUBLIC_ARRANGER_CARDINALITY_PRECISION_THRESHOLD || 3000,
		NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: process.env.NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS || '',
		NEXT_PUBLIC_ARRANGER_MAX_BUCKET_COUNTS:
			process.env.NEXT_PUBLIC_ARRANGER_MAX_BUCKET_COUNTS || 1000,
		// using ASSET_PREFIX for the public runtime BASE_PATH because basePath in the top level config was not working
		// with the dms reverse proxy setup
		NEXT_PUBLIC_DOWNLOAD_ALL_URL: process.env.NEXT_PUBLIC_DOWNLOAD_ALL_URL,
		NEXT_PUBLIC_BASE_PATH: process.env.ASSET_PREFIX || '/',
		NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
		NEXT_PUBLIC_LAB_NAME: process.env.NEXT_PUBLIC_LAB_NAME,
		NEXT_PUBLIC_LOGO_FILENAME: process.env.NEXT_PUBLIC_LOGO_FILENAME,
		NEXT_PUBLIC_MUSE_API: process.env.NEXT_PUBLIC_MUSE_API_URL,
		NEXT_PUBLIC_SINGULARITY_API_URL: process.env.NEXT_PUBLIC_SINGULARITY_API_URL,
		NEXT_PUBLIC_SSO_PROVIDERS: process.env.NEXT_PUBLIC_SSO_PROVIDERS,
		NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
		NEXT_PUBLIC_RELEASE_DATE: process.env.NEXT_PUBLIC_RELEASE_DATE,
		NEXT_PUBLIC_SYSTEM_ALERTS: process.env.NEXT_PUBLIC_SYSTEM_ALERTS,
		NEXT_PUBLIC_STUDIES_SVC_URL: process.env.NEXT_PUBLIC_STUDIES_SVC_URL,
		NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE: process.env.NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE,
		NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE:
			process.env.NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE,
		NEXT_PUBLIC_APP_VERSION: process.env.APP_VERSION,
		NEXT_PUBLIC_APP_COMMIT: process.env.APP_COMMIT,
		// Optional features/functionalities
		NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
		NEXT_PUBLIC_ENABLE_DOWNLOADS: process.env.NEXT_PUBLIC_ENABLE_DOWNLOADS,
		NEXT_PUBLIC_ENABLE_LOGIN: process.env.NEXT_PUBLIC_ENABLE_LOGIN,
		NEXT_PUBLIC_ENABLE_REGISTRATION: process.env.NEXT_PUBLIC_ENABLE_REGISTRATION,
	},
	assetPrefix: process.env.ASSET_PREFIX || '',
	redirects: async () => [
		// {
		//   source: '/about',
		//   destination: '/',
		//   permanent: true,
		// },
	],
});
