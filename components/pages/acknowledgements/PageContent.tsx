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

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import defaultTheme from '../../theme';
import Policy from './Policy';
import Contributors from './Contributors';

const PageContent = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <main
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-bottom: ${theme.dimensions.footer.height}px;
      `}
    >
      <article
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin: 30px 0;
          max-width: 800px;
          padding: 40px;
          width: 100%;
          ${theme.shadow.default};
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.primary};
            font-size: 26px;
            font-weight: normal;
            margin: 0;
          `}
        >
          Acknowledgement of Contributions
        </h1>

        <p
          css={css`
            font-style: italic;
            margin-top: 10px 0 0;
          `}
        >
          Updated at 09/16/2021, 3:06:59 PM
        </p>

        <Policy />
        <Contributors />
      </article>
    </main>
  );
};

export default PageContent;
