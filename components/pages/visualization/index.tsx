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
import { css, useTheme } from '@emotion/react';
import defaultTheme from '../../theme';
import { getConfig } from '../../../global/config';
import { covizuGithubUrl, INTERNAL_PATHS } from '../../../global/utils/constants';
import { InternalLink as Link } from '../../Link';
import PageLayout from '../../PageLayout';

const VisualizationPage = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { NEXT_PUBLIC_VIRUSSEQ_API_ROOT } = getConfig();

  return (
    <PageLayout subtitle="Visualize Data">
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            background: ${theme.colors.grey_2};
            border: ${theme.colors.grey_3} 1px solid;
            padding: 15px 20px;
            margin: 15px;
            border-radius: 10px;
          `}
        >
          <a
            css={css`
              color: ${theme.colors.primary_dark};
              font-weight: bold;
            `}
            href={covizuGithubUrl}
            target="_blank"
          >
            Covizu
          </a>{' '}
          (an open source SARS-CoV-2 genome analysis and visualization system) has been used to
          visualize{' '}
          <Link path={INTERNAL_PATHS.EXPLORER}>
            <a
              css={css`
                color: ${theme.colors.primary_dark};
                font-weight: bold;
              `}
            >
              Canadian VirusSeq data
            </a>
          </Link>{' '}
          colocalized with International GenBank data in a time-scaled phylogenetic tree to
          highlight potential cases of importation from other countries or ongoing community
          transmission.
        </div>
        <iframe
          css={css`
            flex: 1;
            border: 0;
          `}
          src={`/static/covizu/index.html?apiUrl=${NEXT_PUBLIC_VIRUSSEQ_API_ROOT}`}
          width="99%"
        />
      </div>
    </PageLayout>
  );
};

export default VisualizationPage;
