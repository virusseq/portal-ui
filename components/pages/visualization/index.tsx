/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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
import { ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import defaultTheme from '../../theme';
import { getConfig } from '../../../global/config';

import PageLayout from '../../PageLayout';

const VisualizationPage = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { NEXT_PUBLIC_COVIZU_DATA_VERSION } = getConfig();

  const [showCovizu, setShowCovizu] = useState(false);
  useEffect(() => {
    const nextShowCovizu = localStorage.getItem('SHOW_COVIZU') === 'true';
    setShowCovizu(nextShowCovizu);
  }, []);

  return (
    <PageLayout subtitle="Visualize Data">
      {showCovizu ? (
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
              href=""
              css={css`
                color: ${theme.colors.primary_dark};
              `}
            >
              <strong>Covizu</strong>
            </a>{' '}
            (an open source SARS-CoV-2 genome analysis and visualization system) has been used to
            visualize{' '}
            <a
              href=""
              css={css`
                color: ${theme.colors.primary_dark};
              `}
            >
              Canadian VirusSeq data
            </a>{' '}
            colocalized with International GenBank data in a time-scaled phylogenetic tree to
            highlight potential cases of importation from other countries or ongoing community
            transmission.
          </div>
          <iframe
            css={css`
              flex: 1;
              border: 0;
            `}
            src={`/static/covizu/index.html?dataVersion=${NEXT_PUBLIC_COVIZU_DATA_VERSION}`}
            width="99%"
          />
        </div>
      ) : (
        <p>Coming Soon</p>
      )}
    </PageLayout>
  );
};

export default VisualizationPage;
