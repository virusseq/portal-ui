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

import {
	MouseEventHandler,
	ReactElement,
	ReactNode,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { css, useTheme } from '@emotion/react';
import cx from 'classnames';
import { useRouter } from 'next/router';

import defaultTheme from '../theme';
import { ChevronDown } from '../theme/icons';
import { TransparentButton } from '../Button';
import { INTERNAL_PATHS } from '../../global/utils/constants';

const Dropdown = ({
	children,
	className,
	data,
	disabled,
	label = '',
	onClick,
	title,
	urls = [],
}: {
	children?: ReactNode | ReactNode[];
	className?: string;
	data: any[];
	disabled?: boolean;
	label?: string;
	onClick?: (event?: SyntheticEvent<HTMLButtonElement, Event>) => any;
	title?: string;
	urls?: INTERNAL_PATHS[];
}): ReactElement => {
	const [open, setOpen] = useState(false);
	const theme: typeof defaultTheme = useTheme();
	const node: any = useRef();
	const router = useRouter();

	const hasData = data?.length > 0;
	const internalUrlIsActive = urls.includes(router.asPath as INTERNAL_PATHS);

	const handleClickOnButton = async (event?: SyntheticEvent<HTMLButtonElement, Event>) => {
		await new Promise((resolve) => resolve(open || onClick?.(event)));
		setOpen(!open);
	};

	const handleClickOnItem: MouseEventHandler<HTMLLIElement> = (event) => {
		event.stopPropagation();
		handleClickOnButton();
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (node?.current?.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	useEffect(() => {
		(disabled || !hasData) && setOpen(false);
	}, [disabled, hasData]);

	return (
		<TransparentButton
			className={cx(className, { active: open || internalUrlIsActive })}
			css={css`
				> span {
					display: flex;
					position: relative;
				}
			`}
			disabled={disabled || !hasData}
			onClick={handleClickOnButton}
			ref={node}
			title={title}
		>
			{children || label}

			<ChevronDown
				fill={theme.colors.white}
				size={11}
				style={css`
					margin-left: 10px;
					${open
						? css`
								transform: rotate(180deg) translateY(-2px);
						  `
						: css`
								transform: translateY(1px);
						  `}
				`}
			/>

			{open && (
				<ul
					css={css`
						background: ${theme.colors.white};
						box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
						color: ${theme.colors.grey_6};
						list-style: none;
						margin: 0;
						max-width: 300px;
						min-width: 100%;
						padding: 0;
						position: absolute;
						right: 0;
						top: calc(100% + 5px);
						z-index: 666;

						li {
							box-sizing: border-box;
							height: fit-content;
							padding: 0;
							width: 100%;

							&:focus,
							&:hover {
								background: ${theme.colors.grey_3};
							}
						}
					`}
				>
					{data
						.filter((x) => x)
						.map((dataItem: ReactNode, index) => (
							<li key={index} onClick={handleClickOnItem}>
								{dataItem}
							</li>
						))}
				</ul>
			)}
		</TransparentButton>
	);
};

export default Dropdown;
