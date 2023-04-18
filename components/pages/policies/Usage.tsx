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

import StyledLink from '../../Link';

const Usage = (): ReactElement => (
	<section>
		<h1>Website and Data Usage Policies</h1>

		<h2>General</h2>

		<p>
			The Canadian VirusSeq Data Portal (CVDP, also referred to as "the Portal") is an open-access
			data portal intended to facilitate access to Canadian SARS-CoV-2 sequences and associated
			non-sensitive metadata adhering to the{' '}
			<StyledLink
				href="https://www.go-fair.org/fair-principles/"
				rel="noopener noreferrer"
				target="_blank"
			>
				FAIR Data principles
			</StyledLink>
			. The Portal will manage and share limited contextual metadata and viral genome sequences
			among Canadian public health labs, researchers and other groups interested in accessing the
			data for surveillance, research, and innovation purposes. In doing so, it will complement the
			controlled-access platform developed by the National Microbiology Laboratory (NML).
		</p>

		<p>
			The Portal will harmonize, validate, and automate submission to international databases and
			enable the creation of real-time dashboards that summarize the Canadian data contributions
			while facilitating exploration and access. The Data Portal is funded by Genome Canada.
		</p>

		<p>
			The CVDP is not providing access to any personal data at the current time. If you are
			submitting sequences or metadata to the CVDP, do not include any data that could reveal the
			personal identity of the source.
		</p>

		<h2>Disclaimer</h2>

		<p>
			COVID-19 is an emerging and rapidly evolving situation. To promote responsive, collaborative,
			research and public health surveillance, virus sequences and minimal metadata are released on
			the CVDP rapidly and should be considered draft and subject to change.
		</p>

		<p>
			Beyond limited editorial and quality controls and some internal integrity checks, the quality
			and accuracy of the record are the responsibility of submitters, not of the CVDP. It is also
			the responsibility of submitters to ascertain that they have the right to submit the data. The
			CVDP team will work with submitters to provide feedback on metadata and sequence data to
			improve the overall quality and consistency of the data submitted.
		</p>

		<h2>Data available</h2>

		<p>
			Currently, the CVDP exclusively focuses on providing access to data types that do not
			constitute "personal data/information". These include:
		</p>

		<ul>
			<li>Consensus viral sequence</li>
			<li>Raw de-hosted viral sequences</li>
			<li>
				Contextual Metadata:
				<ol>
					<li>Study id - a unique identifier for each data provider</li>
					<li>Specimen collector sample ID - a unique identifier for each sequenced specimen</li>
					<li>GISAID accession - the GISAID accession number assigned to the sequence</li>
					<li>Sample collected by - the name of the agency that collected the original sample</li>
					<li>Sequence submitted by - the name of the agency that generated the sequence</li>
					<li>Sample collection date - the date on which the sample was collected</li>
					<li>Geo_loc_name (country) - the country where the sample was collected</li>
					<li>
						Geo_loc_name (state/province/territory) - the province/territory where the sample was
						collected
					</li>
					<li>Organism - Taxonomic name of the organism</li>
					<li>Isolate - Identifier of the specific isolate</li>
					<li>Fasta header name - fasta file identifier of the isolate</li>
					<li>Purpose of sampling - the reason that the sample was collected</li>
					<li>
						Purpose of sampling details - the description of why the sample was collected, providing
						specific details
					</li>
					<li>
						Anatomical material - A substance obtained from an anatomical part of an organism e.g.
						tissue, blood
					</li>
					<li>Anatomical part - An anatomical part of an organism e.g. oropharynx</li>
					<li>
						Body product - A substance excreted/secreted from an organism e.g. feces, urine, sweat
					</li>
					<li>
						Environmental material - A substance obtained from the natural or man-made environment
						e.g. soil, water, sewage
					</li>
					<li>
						Environmental site - An environmental location may describe a site in the natural or
						built environment e.g. metal can, hospital
					</li>
					<li>
						Collection device - The instrument or container used to collect the sample e.g. swab
					</li>
					<li>
						Collection method - The process used to collect the sample e.g. phlebotamy, necropsy
					</li>
					<li>Host (scientific name) - The taxonomic, or scientific name of the host</li>
					<li>Host disease - The name of the disease experienced by the host</li>
					<li>Host age - Age of host at the time of sampling</li>
					<li>Host age unit - The unit used to measure the host age, in either months or years</li>
					<li>Host age bin - Age of host at the time of sampling, expressed as an age group</li>
					<li>Host gender - The gender of the host at the time of sample collection</li>
					<li>Purpose of sequencing - The reason that the sample was sequenced</li>
					<li>
						Purpose of sequencing details - The description of why the sample was sequenced
						providing specific details
					</li>
					<li>Sequencing instrument - The model of the sequencing instrument used</li>
					<li>Sequencing protocol - The protocol used to generate the sequence</li>
					<li>
						Raw sequence data processing method - The names of the software and version number used
						for raw data processing e.g. removing barcodes, filtering etc
					</li>
					<li>
						Dehosting method - The method used to remove host reads from the pathogen sequence
					</li>
					<li>
						Consensus sequence software name - The name of software used to generate the consensus
						sequence
					</li>
					<li>
						Consensus sequence software version - The version of the software used to generate the
						consensus sequence
					</li>
					<li>
						Breadth of coverage value - The percentage of the reference genome covered by the
						sequenced data, to a prescribed depth
					</li>
					<li>
						Depth of coverage value - The average number of reads representing a given nucleotide in
						the reconstructed sequence
					</li>
					<li>
						Reference genome accession - A persistent, unique identifier of a genome database entry
					</li>
					<li>
						Bioinformatics protocol - A description of the overall bioinformatics strategy used
					</li>
					<li>Gene name - The name of the gene used in the diagnostic RT-PCR test</li>
					<li>
						Diagnostic_pcr_ct_value - The Ct value result from a diagnostic SARS-CoV-2 RT-PCR test
					</li>
					<li>Lineage name - The name of the lineage assigned to a squenced sample</li>
					<li>
						Lineage analysis software name - The name of the software used to determine the lineage
					</li>
					<li>
						Lineage analysis software version - The version of the software used to determine the
						lineage
					</li>
					<li>
						Lineage analysis software data version - A version number that represents both
						pangolin-data version number
					</li>
					<li>
						Scorpio call - A software that performs snp-based calling of VOCs, mainly serious
						constellations of reoccurring phylogenetically-independent origin
					</li>
					<li>Scorpio version - The version of scorpio software to determine the lineage</li>
				</ol>
			</li>
		</ul>

		<h2>Data users guidelines</h2>

		<p>
			Access to the data provided within the CVDP is provided in a completely open manner, and at no
			cost to members of the scientific community and other interested parties. Nevertheless, users
			are expected to follow the CVDP policy on Recognition of the work of data submitters. Users
			should not attempt to make use of the portal data to attempt to re-identify specific
			individuals. In the unlikely case you come across identifying data, please swiftly report the
			event, indicating the problematic dataset, at{' '}
			<StyledLink
				href="mailto:info@virusseq-dataportal.ca"
				rel="noopener noreferrer"
				target="_blank"
			>
				info@virusseq-dataportal.ca
			</StyledLink>
			.
		</p>

		<h2>Data standards guidelines</h2>

		<p>
			As data needs change over time, the data standard implemented by the Data Portal evolves
			(additional fields and terms may be added, requirements may be updated, etc). This may alter
			the database schema as well as the types of information provided by data stewards. For more
			information, please contact Dr. Emma Griffiths at{' '}
			<StyledLink href="mailto:ega12@sfu.ca" rel="noopener noreferrer" target="_blank">
				ega12@sfu.ca
			</StyledLink>
			.
		</p>

		<h2>Recognition of the work of the data submitters</h2>

		<p>
			You may use the data from the CVDP to author results obtained from your analyses of relevant
			data, provided that{' '}
			<span className="bold">
				your published results acknowledge, as the original source of the data, CanCOGeN-VirusSeq,
				CPLHN and its members
			</span>
			.
		</p>

		<p>
			Proposed sentence: “The authors of the manuscript would like to acknowledge the original
			source of the data CanCOGeN-VirusSeq, CPLHN and its members.”
		</p>

		<p>
			Please note that the data that is being shared is the work of many individuals and should be
			treated as unpublished data. If you wish to publish research using the data, contact us at{' '}
			<StyledLink
				href="mailto:info@virusseq-dataportal.ca"
				rel="noopener noreferrer"
				target="_blank"
			>
				info@virusseq-dataportal.ca
			</StyledLink>{' '}
			first to ensure that those who have generated the data can be involved in its analysis. You
			are responsible for making the best efforts to collaborate with representatives of the
			Originating Laboratory responsible for obtaining the specimen(s) and involve them in such
			analyses and further research using such Data.
		</p>

		<h2>Intellectual Property</h2>

		<p>
			The CVDP is designed to provide and encourage access within the scientific community to the
			most up-to-date and comprehensive COVID-19 viral sequencing data. Therefore, there are no
			restrictions on the use or distribution of the CVDP data. While we do not encourage this
			practice, some submitters may claim patent, copyright, or other intellectual property rights
			in all or a portion of the data they have submitted. The CVDP is not in a position to assess
			the validity of such claims and therefore cannot provide comment or unrestricted permission
			concerning the use, copying, or distribution of the information it contains.
		</p>
	</section>
);

export default Usage;
