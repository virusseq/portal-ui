module.exports = {
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'^#public': './public',
					'^#virusseq': './components/pages/virusseq',
					'^#(.+)': './\\1', // keep this as last alias, to allow others first
				},
				cwd: 'packagejson',
				extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
			},
		],
		'@emotion/babel-plugin',
	],
	presets: [
		[
			'next/babel',
			{
				'preset-react': {
					development: process.env.BABEL_ENV === 'development',
					runtime: 'automatic',
					importSource: '@emotion/react',
				},
			},
		],
		'@babel/preset-typescript',
	],
};
