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
import { Aggregations, QuickSearch, useArrangerTheme } from '@overture-stack/arranger-components';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/types';
import { css, useTheme } from '@emotion/react';

import { ThemeInterface } from '@/components/theme';
import { getConfig } from '@/global/config';

const getAggregationsStyles = (theme: ThemeInterface): UseThemeContextProps => ({
	callerName: 'Wastewater-Facets',
	components: {
		Aggregations: {
			ActionIcon: {
				fill: theme.colors.secondary,
			},
			AggsGroup: {
				collapsedBackground: theme.colors.grey_2,
				css: css`
					.title {
						${theme.typography.subheading2}
						line-height: 20px;
					}

					// Leaving these toggle-button styles untouch as I haven't been able to test making changes
					.toggle-button {
						${theme.typography.data};
						padding: 2px 5px 8px 5px;
						margin-left: 5px;
						.toggle-button-option {
							border: 1px solid ${theme.colors.grey_5};
							&:nth-of-type(2) {
								border-left: 0px;
								border-right: 0px;
							}
						}
						.toggle-button-option .bucket-count {
							${theme.typography.label2}
							display: inline-block;
							background-color: ${theme.colors.grey_3};
							padding: 0 3px;
							border-radius: 3px;
						}
						.toggle-button-option.active {
							background-color: ${theme.colors.secondary_light};
							.bucket-count {
								background-color: ${theme.colors.secondary_2};
							}
						}
						.toggle-button-option.disabled {
							background-color: ${theme.colors.grey_2};
							color: ${theme.colors.grey_6};
						}
					}
				`,
				groupDividerColor: theme.colors.grey_3,
				headerBackground: theme.colors.white,
				headerDividerColor: theme.colors.grey_2,
				headerFontColor: theme.colors.accent_dark,
			},
			BucketCount: {
				background: `rgba(${theme.colors.accent_light_rgb}, 0.45)`,
				fontSize: '0.75rem',
			},
			FilterInput: {
				css: css`
					border-radius: 5px;
					border: 1px solid ${theme.colors.secondary};
					margin: 6px 5px 7px 0;

					&.focused {
						box-shadow: inset 0 0 2px 1px ${theme.colors.accent};
					}

					& input {
						${theme.typography.data}
						&::placeholder {
							color: ${theme.colors.black};
						}
					}

					input[type='text' i] {
						margin-left: 5px;
						margin-top: 2px;
					}
				`,
			},
			MoreOrLessButton: {
				css: css`
					${theme.typography.label2};

					&::before {
						padding-top: 3px;
						margin-right: 3px;
					}

					&.more::before {
						content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3E%3Cpath fill='%2304518C' fill-rule='evenodd' d='M7.637 6.029H6.034v1.613c0 .291-.24.53-.534.53-.294 0-.534-.239-.534-.53V6.03H3.363c-.294 0-.534-.238-.534-.529 0-.29.24-.529.534-.529h1.603V3.358c0-.291.24-.53.534-.53.294 0 .534.239.534.53V4.97h1.603c.294 0 .534.238.534.529 0 .29-.24.529-.534.529M5.5 0C2.462 0 0 2.462 0 5.5S2.462 11 5.5 11 11 8.538 11 5.5 8.538 0 5.5 0'/%3E%3C/svg%3E%0A");
					}

					&.less::before {
						content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 20 20'%3E%3Cpath fill='%2304518c' fill-rule='evenodd' d='M13.81 10.952H6.19c-.523 0-.952-.428-.952-.952s.429-.952.952-.952h7.62c.523 0 .952.428.952.952s-.429.952-.952.952M10 0C4.476 0 0 4.476 0 10s4.476 10 10 10 10-4.476 10-10S15.524 0 10 0'/%3E%3C/svg%3E%0A");
					}
				`,
				fontColor: theme.colors.primary,
			},
			RangeAgg: {
				css: css`
					&[data-fieldName='analysis.host.host_age'] .unit-wrapper {
						display: none;
					}
				`,
				RangeLabel: {
					borderRadius: '0.2rem',
					fontWeight: 'bold !important',
					css: css`
						${theme.typography.label2}
						background-color: ${theme.colors.grey_3};

						&:last-of-type,
						&:nth-of-type(4) {
							background-color: ${theme.colors.white};
							color: ${theme.colors.grey_6};
						}
					`,
					padding: '0 0.2rem',
				},
				// slider is the button that you drag to select values
				RangeSlider: {
					borderColor: theme.colors.grey_5,
					css: theme.shadow.default,
					disabledBackground: theme.colors.grey_3,
				},
				// the band upon which the sliders move
				RangeTrack: {
					disabledInBackground: theme.colors.grey_4,
					disabledOutBackground: theme.colors.grey_3,
					inBackground: theme.colors.secondary,
					outBackground: theme.colors.grey_4,
				},
			},
			TreeJointIcon: {
				fill: theme.colors.canada,
				size: 8,
				transition: 'all 0s',
			},
		},
		QuickSearch: {
			fieldNames: 'donors.specimens.submitter_specimen_id',
			headerTitle: 'Specimen Collector Sample ID',
			placeholder: 'e.g. AB-12345',

			// components
			DropDownItems: {
				css: css`
					border: 1px solid ${theme.colors.secondary};
					border-radius: 5px;
				`,
				entityLogo: {
					enabled: false,
				},
				resultKeyText: {
					css: css`
						margin-left: 20px;
						font-weight: bold;
					`,
				},
				resultValue: {
					css: css`
						margin-left: 20px;
					`,
				},
			},
			QuickSearchWrapper: {
				css: css`
					.title {
						${theme.typography.subheading2}
						line-height: 20px;
					}
				`,
			},
			TreeJointIcon: {
				fill: theme.colors.canada,
				size: 8,
				transition: 'all 0s',
			},
			PinnedValues: {
				background: theme.colors.primary_dark,
				css: css`
					${theme.typography.label}

					&::after {
						content: url(data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%228%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%228%22%20y2%3D%228%22%20/%3E%0A%20%20%3Cline%20x1%3D%228%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%228%22%20/%3E%0A%3C/svg%3E);
						margin: 0 0 0 0.5rem;
					}
				`,
				fontColor: theme.colors.white,
				hoverBackground: theme.colors.primary,
				margin: '0.1rem',
				padding: '0 0.5rem',
			},
		},
	},
});

const Facets = (): ReactElement => {
	const { NEXT_PUBLIC_ENABLE_WASTEWATER_QUICKSEARCH } = getConfig();
	const theme = useTheme();
	useArrangerTheme(getAggregationsStyles(theme));

	return (
		<article
			css={css`
				display: flex;
				flex-direction: column;
				height: 100%;
			`}
		>
			<h2
				css={css`
					${theme.typography.subheading}
					padding: 6px 0 2px 8px;
					margin: 0;
					border-bottom: 1px solid ${theme.colors.grey_3};
				`}
			>
				Filters
			</h2>

			{NEXT_PUBLIC_ENABLE_WASTEWATER_QUICKSEARCH && <QuickSearch />}

			<Aggregations />
		</article>
	);
};

export default Facets;
