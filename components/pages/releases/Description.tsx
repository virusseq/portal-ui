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

import { INTERNAL_PATHS } from '../../../global/utils/constants';
import StyledLink from '../../Link';

const Description = () => {
	return (
		<>
			<p>
				The African Pathogen Archive and Data Sharing Portal regularly releases submitted data Each
				release bundle contains 2 files: a <b>TSV file containing all submitted metadata</b>
				as of that release date-time, as well as a{' '}
				<b>FASTA file containing all the corresponding sequences</b>. The latest release is
				available in the <StyledLink href={INTERNAL_PATHS.EXPLORER}>data explorer</StyledLink>.
			</p>
			<p>
				The counts for changes (e.g. "# Updated") are dynamically calculated to indicate how the
				data evolves over time. While they're are generally accurate, they may be slightly off in
				rare scenarios, such as when changes happen while a new release archive is being created.
				Furthermore, in the event of a data schema update, these numbers will reflect the total
				sample count (or most of it).
			</p>
		</>
	);
};

export default Description;
