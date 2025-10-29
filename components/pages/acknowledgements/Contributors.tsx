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

import { css, useTheme } from '@emotion/react';
import { format } from 'date-fns';
import { ReactElement } from 'react';

import defaultTheme from '#components/theme';
import StyledLink from '#components/Link';

const Contributors = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const currentDatetime = new Date();

	return (
		<section
			css={css`
				margin: 0 0 10px;
			`}
		>
			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				The following members have contributed data to the Canadian VirusSeq Data Portal:
			</h2>
			<p
				css={css`
					font-style: italic;
					margin-top: 10px 0 0;
				`}
			>
				Viewed at {format(currentDatetime, 'MM/dd/yyyy, h:mm:ss aa')}
			</p>
			<ul>
				<li>
					Alberta:
					<ul>
						<li>
							Wastewater surveillance is conducted by Alberta Precision Laboratories’ Provincial
							Laboratory for Public health in partnership with the University of Calgary and University of
							Alberta. Michael Parkins, Lilly Pang, Sudha Bhavanam, Nicole Acosta.
						</li>
						<li>
							Peterson, Shelley W., Ravinder Lidder, Jade Daigle, Quinn Wonitowy, Codey Dueck, Audra
							Nagasawa, Michael R. Mulvey, and Chand S. Mangat. 2022. “RT-qPCR Detection of SARS-CoV-2
							Mutations S 69–70 Del, S N501Y and N D3L Associated with Variants of Concern in Canadian
							Wastewater Samples.” Science of The Total Environment 810 (March):151283.
							<StyledLink
								href="https://doi.org/10.1016/j.scitotenv.2021.151283"
								rel="noopener noreferrer"
								target="_blank"
							>
								https://doi.org/10.1016/j.scitotenv.2021.151283.
							</StyledLink>
						</li>
					</ul>
				</li>
				<li>
					British Columbia:
					<ul>
						<li>
							Lin X, Glier M, Kuchinski K,Ross-Van Mierlo T, McVea D, Tyson JR, Prystajecky N, Ziels
							RM.2021.Assessing Multiplex Tiling PCR Sequencing Approaches for Detecting Genomic Variants
							of SARS-CoV-2 in Municipal Wastewater. mSystems6:10.1128/msystems.01068-21.
							<StyledLink
								href="https://doi.org/10.1128/msystems.01068-21"
								rel="noopener noreferrer"
								target="_blank"
							>
								https://doi.org/10.1128/msystems.01068-21
							</StyledLink>
						</li>
						<li>
							Peterson, Shelley W., Ravinder Lidder, Jade Daigle, Quinn Wonitowy, Codey Dueck, Audra
							Nagasawa, Michael R. Mulvey, and Chand S. Mangat. 2022. “RT-qPCR Detection of SARS-CoV-2
							Mutations S 69–70 Del, S N501Y and N D3L Associated with Variants of Concern in Canadian
							Wastewater Samples.” Science of The Total Environment 810 (March):151283.
							<StyledLink
								href="https://doi.org/10.1016/j.scitotenv.2021.151283."
								rel="noopener noreferrer"
								target="_blank"
							>
								https://doi.org/10.1016/j.scitotenv.2021.151283.
							</StyledLink>
						</li>
					</ul>
					<li>
						Manitoba:
						<ul>
							<li>
								Yanaç, Kadir, Adeola Adegoke, Liqun Wang, Miguel Uyaguari, and Qiuyan Yuan. 2022.
								“Detection of SARS-CoV-2 RNA throughout Wastewater Treatment Plants and a Modeling
								Approach to Understand COVID-19 Infection Dynamics in Winnipeg, Canada.” Science of The
								Total Environment 825 (June):153906.
								<StyledLink
									href="https://doi.org/10.1016/j.scitotenv.2022.153906"
									rel="noopener noreferrer"
									target="_blank"
								>
									https://doi.org/10.1016/j.scitotenv.2022.153906.
								</StyledLink>
							</li>
						</ul>
					</li>
					<li>
						New Brunswick:
						<ul>
							<li>NA</li>
						</ul>
					</li>
					<li>
						Newfoundland and Labrador:
						<ul>
							<li>NA</li>
						</ul>
					</li>
					<li>
						Nova Scotia:
						<ul>
							<li>NA</li>
						</ul>
					</li>
					<li>
						Ontario:
						<ul>
							<li>The Ontario Wastewater Surveillance Consortium.</li>
							<li>
								Lawal OU, Zhang L, Parreira VR, Brown RS, Chettleburgh C, Dannah N, Delatolla R,
								Gilbride KA,Graber TE, Islam G, Knockleby J, Ma S, McDougall H, McKay RM, Mloszewska A,
								Oswald C,Servos M, Swinwood-Sky M, Ybazeta G, Habash M, Goodridge L.2022.Metagenomics of
								Wastewater Influent from Wastewater Treatment Facilities across Ontario in the Era of
								Emerging SARS-CoV-2 Variants of Concern. Microbiol Resour Announc11:e00362-22.
								<StyledLink
									href="https://doi.org/10.1128/mra.00362-22"
									rel="noopener noreferrer"
									target="_blank"
								>
									https://doi.org/10.1128/mra.00362-22
								</StyledLink>
							</li>
							<li>
								Peterson, Shelley W., Ravinder Lidder, Jade Daigle, Quinn Wonitowy, Codey Dueck, Audra
								Nagasawa, Michael R. Mulvey, and Chand S. Mangat. 2022. “RT-qPCR Detection of SARS-CoV-2
								Mutations S 69–70 Del, S N501Y and N D3L Associated with Variants of Concern in Canadian
								Wastewater Samples.” Science of The Total Environment 810 (March):151283.
								<StyledLink
									href="https://doi.org/10.1016/j.scitotenv.2021.151283."
									rel="noopener noreferrer"
									target="_blank"
								>
									https://doi.org/10.1016/j.scitotenv.2021.151283.
								</StyledLink>
							</li>
						</ul>
					</li>
					<li>
						Quebec:
						<ul>
							<li>
								N’Guessan, Arnaud, Alexandra Tsitouras, Fernando Sanchez-Quete, Eyerusalem Goitom, Sarah
								J. Reiling, Jose Hector Galvez, Thanh Luan Nguyen, et al. 2022. “Detection of Prevalent
								SARS-CoV-2 Variant Lineages in Wastewater and Clinical Sequences from Cities in Québec,
								Canada.” medRxiv.
								<StyledLink
									href="https://doi.org/10.1101/2022.02.01.22270170"
									rel="noopener noreferrer"
									target="_blank"
								>
									https://doi.org/10.1101/2022.02.01.22270170.
								</StyledLink>
							</li>
						</ul>
					</li>
					<li>
						Saskatchewan:
						<ul>
							<li>NA</li>
						</ul>
					</li>
					<li>
						Territories:
						<ul>
							<li>
								Peterson, Shelley W., Ravinder Lidder, Jade Daigle, Quinn Wonitowy, Codey Dueck, Audra
								Nagasawa, Michael R. Mulvey, and Chand S. Mangat. 2022. “RT-qPCR Detection of SARS-CoV-2
								Mutations S 69–70 Del, S N501Y and N D3L Associated with Variants of Concern in Canadian
								Wastewater Samples.” Science of The Total Environment 810 (March):151283.
								<StyledLink
									href="https://doi.org/10.1016/j.scitotenv.2021.151283"
									rel="noopener noreferrer"
									target="_blank"
								>
									https://doi.org/10.1016/j.scitotenv.2021.151283.
								</StyledLink>
							</li>
						</ul>
					</li>
				</li>
			</ul>
		</section>
	);
};

export default Contributors;
