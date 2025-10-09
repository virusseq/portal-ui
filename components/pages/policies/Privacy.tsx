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

import StyledLink from '#components/Link';

const Usage = (): ReactElement => (
	<section>
		<h1>Privacy Policy</h1>

		<p>
			The CVDP is committed to protecting the privacy and security of the personal information and
			data of its users to the greatest extent possible subject to Canada’s provincial/territorial
			and federal laws. Personal information is defined as information that can reasonably be used
			to identify an individual either alone or in combination with other available information. The
			CVDP will only use your personal information for specific and consented purposes. This policy
			will be maintained except in circumstances required by law to provide access, or in response
			to subpoenas or other legal instruments to authorize access to personal information. Except
			for these scenarios, personal information will not be shared outside of the CVDP and its
			associated personnel or contractors without your explicit consent. When collected, personal
			information will only be retained for as long as necessary to fulfil its purposes subject to
			the applicable Canadian legal requirements.
		</p>

		<h2>Purpose, use, and collection of information</h2>

		<p>
			The central purpose of this website and the CVDP is to facilitate scientific research by
			providing researchers and other interested parties a central access point to Canada-based
			COVID-19-related genomic data and certain associated contextual metadata.
		</p>

		<p>
			Personal information is not required to view this website, although certain key features will
			require some personal information to function optimally. We may collect this personal
			information in the form of webforms in connection with your account and services provided to
			you. The level of information collected will also be subject to the type of services and
			account used. Providing us with your information where required is strictly voluntary. Any
			personal information collected will be appropriately protected through physical and electronic
			means such as password protection, and encryption.
		</p>

		<p>
			By providing your personal information, you are consenting to its use for the purposes listed
			below:
		</p>

		<ul>
			<li>
				Communicate with you regarding our services such as a newsletter, event notification, or a
				change of policy,
			</li>
			<li>Provide you with a service (e.g., help data submission, data access),</li>
			<li>
				Communicate and troubleshoot with you regarding any CVDP website functionalities and or
				services.
			</li>
		</ul>

		<p>
			The CVDP website and its associated servers also collect the following analytics for the
			purposes of web presentation, troubleshooting, and web functionality. This information will
			not be associated with individual user identities, and will not be used to re-identify any
			users as subject to this privacy policy:
		</p>

		<ul>
			<li>Internet Protocol (IP) address of the computer being used,</li>
			<li>Web pages requested,</li>
			<li>Referring web page,</li>
			<li>Browser used,</li>
			<li>Date and time of activities.</li>
		</ul>

		<h2>Distribution of information to third parties</h2>

		<p>
			Third-party contractors and or agents may be involved in maintaining and improving the
			functions (e.g., IT services) of the CVDP Website. In these scenarios, if any associated third
			party should be provided access to any personal information, personal information will be kept
			secure, private, and confidential in accordance with Canadian Provincial/territorial and
			Federal legislation, and that of the CVDP Privacy Policy. Such parties are only permitted to
			use such personal information for lawful purposes authorized by the CVDP.
		</p>

		<h2>Cookies</h2>

		<p>
			This website uses ‘Cookies’. Cookies may collect information such as your email address,
			username, or keep track of pages visited and documents downloaded. The CVDP may use ‘cookies’
			to deliver web content specific to a user’s interests or to keep users logged in when such a
			feature is enabled. You may choose to enable or disable cookies on this website, and such
			information will not be collected. Disabling cookies will not restrict your access to the CVDP
			website but may affect the normal functioning of various features.
		</p>

		<h2>Hyperlinks and other privacy policies</h2>

		<p>
			If you follow a hyperlink from the CVDP website onto the website(s) of another entity, that
			entity may have/uphold a different privacy policy. The CVDP bears no responsibility for the
			privacy of the user in such a scenario, and we advise you to appropriately consult the privacy
			policies of these other entities.
		</p>

		<h2>Right to be “forgotten”</h2>

		<p>
			Users may request the erasure/deletion of any personal information they have provided to the
			CVDP website. If possible, the CVDP website will work to promptly erase/delete this personal
			information, except for where required by law (e.g. for records for auditing records). To
			request the erasure/deletion of your personal information, you may contact us at{' '}
			<StyledLink
				href="mailto:info@virusseq-dataportal.ca"
				rel="noopener noreferrer"
				target="_blank"
			>
				info@virusseq-dataportal.ca
			</StyledLink>
			.
		</p>

		<h2>Privacy policy revisions</h2>

		<p>
			This privacy policy was last revised on May 31, 2021. These policies are subject to change and
			we encourage you to review this Privacy Policy each time you visit the portal. If any
			significant changes are made to this policy, a notice will be posted on the homepage for a
			reasonable period of time after the change is implemented, so that the user may be fully aware
			of any changes before using the CVDP website.
		</p>

		<h2>Contact us</h2>

		<p>
			Your privacy and concerns are important to us. We welcome you to contact us with your
			comments, questions, complaints, and or suggestions about our policy or a privacy-related
			issue. Please contact us at{' '}
			<StyledLink
				href="mailto:info@virusseq-dataportal.ca"
				rel="noopener noreferrer"
				target="_blank"
			>
				info@virusseq-dataportal.ca
			</StyledLink>
			.
		</p>
	</section>
);

export default Usage;
