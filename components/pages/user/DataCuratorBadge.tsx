import { css } from '@emotion/react';

import defaultTheme from '../../theme';

const DataCuratorBadge = () => {
	return (
		<div
			css={css`
				${defaultTheme.typography.regular}
				font-size: 13px;
				color: ${defaultTheme.colors.white};
				display: flex;
				align-items: center;
				border-radius: 6px;
				background-color: ${defaultTheme.colors.accent3_alternate};
				margin: 9px 0px 9px 15px;
				padding: 0px 8px 0px 8px;
			`}
		>
			<span>Data Curator</span>
		</div>
	);
};

export default DataCuratorBadge;
