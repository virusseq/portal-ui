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
          <li>Sample name — a unique identifier for each sequenced specimen</li>
          <li>
            Sample collected by — the name of the health authority that collected the original
            sample
          </li>
          <li>
            Sequence submitted by — the name of the health authority that generated the sequence
          </li>
          <li>Sample collection date — the date on which the sample was collected</li>
          <li>Country of origin — the country where the sample was collected.</li>
          <li>
            Province/Territory of origin — the province or territory where the sample was collected
            from
          </li>
          <li>Organism — the taxonomic name of the organism.</li>
          <li>Isolate — the identifier for the specific isolate (if an isolate was sequenced)</li>
          <li>Isolation source — the material sampled</li>
          <li>Host — the taxonomic name of the host</li>
          <li>Host disease — the name of the disease experienced by the host</li>
          <li>Host age — the age of the host at the time of sampling</li>
          <li>Host gender — the gender of the host at the time of sample collection</li>
          <li>Sequencing instrument — the make and model of the sequencing instrument used</li>
          <li>
            Assembly method — the name software method used to generate the consensus sequence.
          </li>
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
      (additional fields and terms may be added, requirements may be updated, etc). This may alter the 
      database schema as well as the types of information provided by data stewards. For more information, 
      please contact Dr. Emma Griffiths at{' '}
      <StyledLink
        href="mailto:ega12@sfu.ca"
        rel="noopener noreferrer"
        target="_blank"
      >
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
