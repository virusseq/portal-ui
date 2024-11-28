/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { css } from '@emotion/react';

import StyledLink from '@/components/Link';
import Loader from '@/components/Loader';
import { Modal } from '@/components/Modal';
import defaultTheme from '@/components/theme';
import { Checkmark, CoronaVirus, File } from '@/components/theme/icons';
import Error from '@/components/theme/icons/error';
import { Archive } from '@/global/hooks/useSingularityData/types';
import { INTERNAL_PATHS } from '@/global/utils/constants';

type Props = { onClose: () => void; archive?: Archive };
const CompleteCheckmark = () => (
	<div
		css={css`
			display: flex;
			align-items: center;
			padding: 8px;
			background-color: ${defaultTheme.colors.success_dark};
			border-radius: 50%;
		`}
	>
		<Checkmark size={17} fill={defaultTheme.colors.white} />
	</div>
);

const ArchiveStatDisplay = ({
	numOfSamples = 0,
	id = '',
}: {
	numOfSamples?: number;
	id?: string;
}) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: 20px;
				align-items: center;
				border: solid 1px ${defaultTheme.colors.grey_3};
				padding: 15px 20px 15px 20px;
				column-gap: 40px;
			`}
		>
			<div
				css={css`
					display: flex;
					align-items: center;
					column-gap: 10px;
				`}
			>
				<CoronaVirus />
				<span>{numOfSamples} Viral Genomes</span>
			</div>
			<div
				css={css`
					display: flex;
					align-items: center;
					column-gap: 10px;
				`}
			>
				<File />
				<span> ID: {id}</span>
			</div>
		</div>
	);
};

const DownloadInfoModal = ({ onClose, archive }: Props) => {
	const showDownloading = !archive || archive?.status === 'BUILDING';

	const DownloadTitle = (
		<div
			css={css`
				display: flex;
				align-items: center;
				column-gap: 10px;
				margin-left: 10px;
				margin-top: 10px;
				color: ${defaultTheme.colors.primary};
				${defaultTheme.typography.heading};
				span {
					font-size: 22px;
				}
			`}
		>
			{showDownloading && (
				<>
					<Loader size={'20px'} margin={'0px'} /> <span>Preparing Download...</span>
				</>
			)}
			{archive?.status === 'COMPLETE' && (
				<>
					<CompleteCheckmark /> <span>Download Initiated</span>
				</>
			)}
			{archive?.status === 'FAILED' && (
				<>
					<Error /> <span>Download Failed</span>
				</>
			)}
		</div>
	);

	return (
		<Modal onCloseClick={onClose} title={DownloadTitle}>
			<div
				css={css`
					width: 700px;
					margin: 0px;
					${defaultTheme.typography.regular}
				`}
			>
				{!archive ? (
					<Loader size={'25px'} />
				) : (
					archive.status !== 'FAILED' && (
						<ArchiveStatDisplay numOfSamples={archive?.numOfSamples} id={archive?.id} />
					)
				)}
				<p
					css={css`
						margin-top: 25px;
					`}
				>
					Your download has started. By downloading this data, you agree to{' '}
					<StyledLink href={INTERNAL_PATHS.ACKNOWLEDGEMENTS}>acknowledge</StyledLink> the Canadian
					Public Health Laboratory Network (CPHLN), CanCOGeN VirusSeq, all laboratories having
					contributed data and follow all{' '}
					<StyledLink href={INTERNAL_PATHS.POLICIES}>CVDP policies</StyledLink>.
				</p>
				<p>
					Data that is being shared is the work of many individuals and should be treated as
					unpublished data. If you wish to publish research using the data, contact us at{' '}
					<StyledLink
						href="mailto:info@virusseq-dataportal.ca"
						rel="noopener noreferrer"
						target="_blank"
					>
						info@virusseq-dataportal.ca
					</StyledLink>{' '}
					first to ensure that those who have generated the data can be involved in its analysis.
				</p>
			</div>
		</Modal>
	);
};

export default DownloadInfoModal;
