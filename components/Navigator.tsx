import { css, useTheme } from '@emotion/react';
import { ReactElement } from 'react';

import StyledLink, { InternalLink } from '#components/Link';
import defaultTheme from '#components/theme';
import { ChevronDown } from '#components/theme/icons';

const Navigator = ({ path = '/', text = 'home' }: { path: string; text: string }): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	return (
		<InternalLink path={path}>
			<StyledLink
				css={css`
					font-size: 14px;
					font-weight: bold;
					display: block;
					margin-bottom: 10px;
				`}
			>
				<ChevronDown
					fill={theme.colors.canada}
					height={9}
					width={8}
					style={css`
						margin-right: 3px;
						transform: rotate(90deg);
					`}
				/>
				{text}
			</StyledLink>
		</InternalLink>
	);
};

export default Navigator;
