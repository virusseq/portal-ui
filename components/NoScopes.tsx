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
import { css } from '@emotion/react';

import ErrorNotification from './ErrorNotification';

const NoScopes = (): ReactElement => (
	<ErrorNotification
		size="md"
		title="Invalid Permissions"
		styles={`
      align-items: center;
      box-sizing: border-box;
      flex-direction: column;
      font-size: 14px;
      justify-content: center;
      max-width: 100%;
      width: 100%;

      p {
        margin-top: 5px;
      }
    `}
	>
		<p>
			{'You are not authorized to submit data into the Canadian VirusSeq Data Portal. '}
			{'In order to obtain the correct permissions, please contact '}
			<a href="mailto:info@virusseq-dataportal.ca">info@virusseq-dataportal.ca</a>
			{' with the following information. Permission should be granted within 2 business days.'}
		</p>
		<ol
			css={css`
				font-weight: 600;
				margin: 10px 0 0;
				padding-left: 0;
			`}
		>
			<li>The name of your institution.</li>
			<li>The name of the lead investigator for your study.</li>
			<li>The study ID (if known).</li>
			<li>The email address you used to log in to the VirusSeq Data Portal.</li>
		</ol>
	</ErrorNotification>
);

export default NoScopes;
