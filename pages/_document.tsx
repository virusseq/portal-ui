import { Html, Head, Main, NextScript } from 'next/document';
import urlJoin from 'url-join';

import { getConfig } from '../global/config';

const Document = () => {
	const { NEXT_PUBLIC_BASE_PATH } = getConfig();

	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href={urlJoin(NEXT_PUBLIC_BASE_PATH, '/images/favicon.ico')} />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
