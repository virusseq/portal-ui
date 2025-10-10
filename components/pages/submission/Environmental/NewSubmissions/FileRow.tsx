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

import { useTheme } from '@emotion/react';
import { MouseEventHandler, ReactElement } from 'react';

import { UnStyledButton } from '#components/Button';
import defaultTheme from '#components/theme';
import { Bin, File } from '#components/theme/icons';

import { getFileExtension } from './validationHelpers';

const FileRow = ({
	active = false,
	file: { name = '', type = '' },
	handleRemove = () => {
		// console.log('clicked');
	},
}: {
	active: boolean;
	file: File;
	handleRemove?: MouseEventHandler<HTMLButtonElement>;
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	const iconFill =
		getFileExtension(name) === 'tsv' ? theme.colors.secondary_dark : theme.colors.accent3_dark;

	return (
		<tr data-type={getFileExtension(name)} data-upload={active}>
			<td>
				<File fill={iconFill} />
				{` ${name}`}
			</td>
			<td>
				<UnStyledButton onClick={handleRemove}>
					<Bin />
				</UnStyledButton>
			</td>
		</tr>
	);
};

export default FileRow;
