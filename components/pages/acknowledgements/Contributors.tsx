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

import React, { ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';

import defaultTheme from '../../theme';
import useSingularityData from '../../../global/hooks/useSingularityData';
import { LoaderWrapper } from '../../Loader';

const Contributors = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const currentDatetime = new Date();

  const { awaitingResponse, fetchContributors } = useSingularityData();
  const [contributorsList, setContributorsList] = useState([]);

  useEffect(() => {
    fetchContributors().then((response) => {
      response.data && setContributorsList(response.data);
    });
  }, []);

  return (
    <section
      css={css`
        margin: 0 0 10px;
      `}
    >
      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
        The following members have contributed data to the Canadian VirusSeq Data Portal:
      </h2>

      <p
        css={css`
          font-style: italic;
          margin-top: 10px 0 0;
        `}
      >
        Viewed at {currentDatetime.toLocaleString()}
      </p>

      <LoaderWrapper loading={awaitingResponse} size="10px">
        <p>
          {contributorsList.map((contributor) => (
            <React.Fragment key={contributor}>
              {contributor}
              <br />
            </React.Fragment>
          ))}
        </p>
      </LoaderWrapper>
    </section>
  );
};

export default Contributors;
