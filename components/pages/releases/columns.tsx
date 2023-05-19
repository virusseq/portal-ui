import { css } from '@emotion/react';
import { format } from 'date-fns';
import urlJoin from 'url-join';

import StyledLink from '@/components/Link';
import { Download } from '@/components/theme/icons';
import { getConfig } from '@/global/config';

import { Archive } from './types';

const {
	NEXT_PUBLIC_CHANGELOG_START_SECONDS,
	NEXT_PUBLIC_ENABLE_DOWNLOADS,
	NEXT_PUBLIC_SINGULARITY_API_URL,
} = getConfig();

const ChangeCell = ({ value, row = {} }: { value: number; row: { original?: Archive } }) => {
	const { original } = row;

	return (original?.releaseTimeUntil ?? 0) > NEXT_PUBLIC_CHANGELOG_START_SECONDS ? value : '--';
};

const columns = [
	{
		accessor: 'releaseTimeUntil',
		Header: 'Release Date',
		Cell: ({ value }: { value: number }) => {
			const date = new Date(0);
			date.setUTCSeconds(value);

			return <b>{format(date, 'LLL dd, yyyy h:mm aaaa')}</b>;
		},
	},
	{
		accessor: 'id',
		Header: 'Metadata & Consensus Seq Files',
		Cell: ({ value }: { value: string }) => {
			return (
				<StyledLink
					disabled={!NEXT_PUBLIC_ENABLE_DOWNLOADS}
					onClick={() => {
						if (NEXT_PUBLIC_ENABLE_DOWNLOADS && NEXT_PUBLIC_SINGULARITY_API_URL && value) {
							window.location.assign(
								urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, 'download', 'archive', value),
							);
						}
					}}
				>
					<div
						css={css`
							display: flex;
							column-gap: 5px;
							align-items: center;
						`}
					>
						<Download />
						<b>Download Dataset</b>
					</div>
				</StyledLink>
			);
		},
		disableSortBy: true,
	},
	{
		accessor: 'totalSubmitted',
		Header: '# Submitted',
		Cell: ChangeCell,
	},
	{
		accessor: 'totalSupressed',
		Header: '# Suppressed',
		Cell: ChangeCell,
	},
	{
		accessor: 'totalUpdated',
		Header: '# Updated',
		Cell: ChangeCell,
	},
	// {
	// 	accessor: 'changeLog',
	// 	Header: 'Change Log Files',
	// 	Cell: ({ row }: { row: { id: string } }) => {
	// 		return (
	// 			<StyledLink
	// 				disabled={!NEXT_PUBLIC_ENABLE_DOWNLOADS}
	// 				onClick={() => {
	// 					console.log('meep', NEXT_PUBLIC_ENABLE_DOWNLOADS, NEXT_PUBLIC_VIRUSSEQ_API_URL);
	// 					if (NEXT_PUBLIC_ENABLE_DOWNLOADS && NEXT_PUBLIC_VIRUSSEQ_API_URL) {
	// 						download();
	// 						window.location.assign(
	// 							urlJoin(NEXT_PUBLIC_VIRUSSEQ_API_URL, 'changelog', 'download', row.id),
	// 						);
	// 					}
	// 				}}
	// 			>
	// 				<div
	// 					css={css`
	// 						display: flex;
	// 						column-gap: 5px;
	// 						align-items: center;
	// 					`}
	// 				>
	// 					<Download />
	// 					<b>Download Log</b>
	// 				</div>
	// 			</StyledLink>
	// 		);
	// 	},
	// 	disableSortBy: true,
	// },
	{
		accessor: 'numOfSamples',
		Header: '# of samples',
	},
];

export default columns;
