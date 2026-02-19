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

import { EmailLink } from '#components/Link';

const Usage = (): ReactElement => (
	<>
		{/* <h2>Usage policy</h2> */}
		<h3>Data use guidelines</h3>
		<p>
			Access to the data is provided in a completely open manner, and at no cost to members of the scientific
			community and other interested parties. Nevertheless, users are expected to follow the Canadian VirusSeq
			Data Portal policy on Recognition of the work of data submitters. Users should not attempt to make use of
			the portal data to attempt to re-identify specific individuals. In the unlikely case you come across
			identifying data, please swiftly report the event, indicating the problematic dataset, at{' '}
			<EmailLink email="info@imicroseq-dataportal.ca">info@imicroseq-dataportal.ca</EmailLink>.
		</p>

		<h3>Data standards guidelines</h3>
		<p>
			As data needs change over time, the data standard implemented by the Data Portal evolves (additional fields
			and terms may be added, requirements may be updated, etc). This may alter the database schema as well as the
			types of information provided by data stewards. For more information, please contact Dr. Emma Griffiths at
			<EmailLink email="ega12@sfu.ca">ega12@sfu.ca</EmailLink>.
		</p>

		<h3>Recognition of the work of the data submitters</h3>
		<p>
			You may use the data from the Canadian VirusSeq Data Portal to author results obtained from your analyses of
			relevant data, provided that your published results acknowledge, as the original source of the data,
			VirusSeq, CPLHN and its members.
		</p>
	</>
);

export default Usage;
