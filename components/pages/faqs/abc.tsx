/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import { EmailLink, InternalLink } from '#components/Link';
import { INTERNAL_PATHS } from '#global/utils/constants.ts';

const ABC = (): ReactElement => (
	<section>
		{/* <h2>Placeholder Questions About the ABC (Category)</h2> */}

		<h3>Why are options in the filters showing up in the order they are?</h3>

		<p>Filter options are ordered by the total number of samples per option, from highest to lowest.</p>

		<h3>Is this data free to use?</h3>

		<p>
			This data portal currently focuses on open and reusable data that meets FAIR policies, with best practices
			for data security and privacy. Please see the iMicroSeq{' '}
			<InternalLink path={INTERNAL_PATHS.POLICIES}>Policies</InternalLink> page for details.
		</p>

		<h3>If I have any concerns, who should I contact?</h3>

		<p>
			Please contact us at{' '}
			<EmailLink email="info@imicroseq-dataportal.ca">info@imicroseq-dataportal.ca</EmailLink>.
		</p>
	</section>
);

export default ABC;
