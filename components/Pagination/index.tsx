/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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
import type { ReactElement } from 'react';

import { UnStyledButton } from '#components/Button';
import defaultTheme from '#components/theme';

// utility function
export const getPaginationRange = (page: number, pageSize: number, dataLength: number) => {
	const start = (page - 1) * pageSize;
	return {
		first: start + 1,
		last: start + dataLength,
	};
};

export const PaginationToolBar = ({
	goToFirstPage,
	goToPrevPage,
	goToNextPage,
	goToLastPage,
	isFirst,
	isLast,
	page,
	align = 'right',
}: {
	goToFirstPage: () => void;
	goToPrevPage: () => void;
	goToNextPage: () => void;
	goToLastPage: () => void;
	isFirst: boolean;
	isLast: boolean;
	page: number;
	align?: 'left' | 'right';
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	const PageButton = ({
		direction,
		onClick,
		disabled,
	}: {
		direction: 'LEFT' | 'DOUBLE_LEFT' | 'RIGHT' | 'DOUBLE_RIGHT';
		onClick: any;
		disabled: boolean | undefined;
	}) => {
		return (
			<UnStyledButton
				onClick={onClick}
				disabled={disabled}
				css={css`
					cursor: ${disabled ? 'default' : undefined};
					color: ${disabled ? theme.colors.grey_6 : theme.colors.primary};
					font-size: 18px;
					${theme.typography.baseFont}
				`}
			>
				{direction === 'LEFT' && '‹'}
				{direction === 'DOUBLE_LEFT' && '«'}
				{direction === 'RIGHT' && '›'}
				{direction === 'DOUBLE_RIGHT' && '»'}
			</UnStyledButton>
		);
	};

	const PageNumber = ({ num }: { num: number }) => {
		return (
			<span
				css={css`
					font-size: 14px;
					text-align: center;
					width: 14px;
					height: 14px;
					border-radius: 50%;
					padding: 3px 4px 5px 4px;
					background-color: ${theme.colors.grey_1};
					${theme.typography.baseFont};
				`}
			>
				{num}
			</span>
		);
	};

	return (
		<div
			css={css`
				display: inline-flex;
				align-items: center;
				column-gap: 10px;
				float: ${align};
			`}
		>
			<PageButton direction={'DOUBLE_LEFT'} onClick={goToFirstPage} disabled={isFirst} />
			<PageButton direction={'LEFT'} onClick={goToPrevPage} disabled={isFirst} />
			<PageNumber num={page ? page : 1} />
			<PageButton direction={'RIGHT'} onClick={goToNextPage} disabled={isLast} />
			<PageButton direction={'DOUBLE_RIGHT'} onClick={goToLastPage} disabled={isLast} />
		</div>
	);
};
