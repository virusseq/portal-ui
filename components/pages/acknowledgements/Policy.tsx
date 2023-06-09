/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
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

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';

const Partners = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	return (
		<section
			css={css`
				margin: 5px 0 0;
			`}
		>
			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				Policy on recognition of the work of data providers
			</h2>

			<p>
				You may use the data from the Canadian VirusSeq Data Portal to author results obtained from
				your analyses of relevant data, provided that your published results acknowledge the
				contribution of VirusSeq and its partners. We suggest using the following acknowledgement
				sentence:{' '}
				<strong>
					"The results here are in whole, or in part based upon data hosted at the Canadian VirusSeq
					Data Portal:{' '}
					<StyledLink
						href="https://virusseq-dataportal.ca/"
						rel="noopener noreferrer"
						target="_blank"
					>
						https://virusseq-dataportal.ca/
					</StyledLink>
					. We wish to acknowledge the Canadian Public Health Laboratory Network (CPHLN), Genome
					Canada and the CanCOGeN VirusSeq Consortium for their contribution to the Portal, see
					supplementary file for detailed information"
				</strong>{' '}
				(supplementary file must be submitted as an addendum to your publication). You may
				redistribute the data available on the African Pathogen Archive Portal under the same terms
				and conditions as specified in this policy. You should not impose any additional or
				different terms or conditions on, or apply any effective technological measures to the data,
				if doing so restricts the use of the data by others.
			</p>

			<p>
				Please note that the data that is being shared is the work of many individuals and should be
				treated as unpublished data. If you wish to publish research using these data, you are
				encouraged to contact us at{' '}
				<StyledLink
					href="mailto:info@virusseq-dataportal.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					info@virusseq-dataportal.ca
				</StyledLink>{' '}
				before analyzing the data to ensure that those who have generated the data may be involved
				in its analysis. You are responsible for making the best efforts to collaborate with
				representatives of the data providers responsible for obtaining the specimens and to involve
				them in your analyses and research. The metadata available on the Canadian VirusSeq Data
				Portal comprises a subset of the Canadian COVID-19 related datasets. You may potentially
				have access to more data through formal collaborations with the CPHLN and CanCOGeN VirusSeq
				members. You are encouraged to contact us at{' '}
				<StyledLink
					href="mailto:info@virusseq-dataportal.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					info@virusseq-dataportal.ca
				</StyledLink>{' '}
				to obtain additional information for this purpose.
			</p>
		</section>
	);
};

export default Partners;
