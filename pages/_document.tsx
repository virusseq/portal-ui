import { css, Global } from '@emotion/react';
import { Head, Html, Main, NextScript } from 'next/document';
import urlJoin from 'url-join';

import { getConfig } from '#global/config';

const Document = () => {
	const { NEXT_PUBLIC_BASE_PATH } = getConfig();

	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href={urlJoin(NEXT_PUBLIC_BASE_PATH, '/images/favicon.ico')} />

				<Global
					styles={css`
						body,
						html {
							font-size: 16px;
							margin: 0;
							padding: 0;
						}
					`}
				/>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
