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

import { css } from '@emotion/react';
import { ReactElement } from 'react';

import StyledLink from '#components/Link';
import OicrLogo from '#components/theme/icons/oicr';
import OvertureLogoWithText from '#components/theme/icons/overture_logo_with_text';

const IMicroSeqContent = (): ReactElement => (
	<section>
		<div
			css={css`
				display: flex;
			`}
		>
			<p>
				<span
					css={css`
						font-weight: bold;
					`}
				>
					iMicroSeq Data Portal:{' '}
				</span>
				The Canadian iMicroSeq Data Portal manages and facilitates data sharing of microbial data among
				researchers, Canadian public health laboratories, and other groups interested in One Health and
				accessing the data for research and innovation purposes. Development of this portal is a national,
				team-based effort, led by researchers at Simon Fraser University and the Ontario Institute for Cancer
				Research, with the support of McGill University, and in partnership with Indigenous community
				participants in the iMicroSeq Consortium. A full list of members can be found here:{' '}
				<StyledLink
					href="https://ednasurveillance.ca/projects/surveillance-program-projects/imicroseq/imicroseq-team/"
					rel="noopener noreferrer"
					target="_blank"
				>
					https://ednasurveillance.ca/projects/surveillance-program-projects/imicroseq/imicroseq-team/
				</StyledLink>
				.
			</p>

			<span
				css={css`
					width: 190px;
					margin: 0px 0 0 35px;
					padding: 25px 20px;
					border-radius: 10px;
					border: solid 1px #dfdfe1;
				`}
			>
				<StyledLink
					href="https://overture.bio/"
					rel="noopener noreferrer"
					target="_blank"
				>
					<OvertureLogoWithText
						width={123}
						style={css`
							margin: -12px 0px 0px 4px;
							object-fit: contain;
						`}
					/>
				</StyledLink>
				<StyledLink
					href="https://oicr.on.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					<OicrLogo
						style={css`
							margin: 10px 0 0 10px;
						`}
					/>
				</StyledLink>
			</span>
		</div>
		<div
			css={css`
				display: flex;
			`}
		>
			<p style={{ marginBottom: 0 }}>
				<span
					css={css`
						font-weight: bold;
					`}
				>
					Lead Development Team:{' '}
				</span>
				<ul>
					<li>Fiona Brinkman</li>
					<li>Emma Griffiths</li>
					<li>Melanie Courtot</li>

					<li>Charlie Barclay</li>
					<li>Bhavik Bhagat</li>
					<li>Guillaume Bourque José</li>
					<li>Héctor Gálvez López</li>
					<li>Erin Gill</li>
					<li>Justin Jia</li>
					<li>Justin Richardsson</li>
					<li>Edmund Su</li>
					<li>Leonardo Rivera</li>
					<li>Dan DeMaria</li>
					<li>Nima Tehrani</li>
				</ul>
			</p>
		</div>
		<div
			css={css`
				display: flex;
			`}
		>
			<p>
				Support for this database development is led by{' '}
				<StyledLink
					href="https://www.genomecanada.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					Genome Canada
				</StyledLink>
				, and Genome British Columbia, in partnership with the{' '}
				<StyledLink
					href="https://www.canada.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					Government of Canada
				</StyledLink>
				. We are additionally grateful for the support of our project partners including the Public Health
				Agency of Canada, Simon Fraser University, DNAstack, Koonkie, CANUE, CARD, OICR, and SD4Health. The
				Portal team also gratefully acknowledges earlier funding from the Canadian Institutes of Health Research
				(
				<StyledLink
					href="https://cihr-irsc.gc.ca/e/193.html"
					rel="noopener noreferrer"
					target="_blank"
				>
					CIHR
				</StyledLink>
				) - Coronavirus Variants Rapid Response Network (
				<StyledLink
					href="https://covarrnet.ca/"
					rel="noopener noreferrer"
					target="_blank"
				>
					CoVaRR-Net
				</StyledLink>
				), and the Public Health Agency of Canada.
			</p>
		</div>
	</section>
);

export default IMicroSeqContent;
