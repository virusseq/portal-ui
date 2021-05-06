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

import useAuthContext from '../../../../global/hooks/useAuthContext';
import useMuseData from '../../../../global/hooks/useMuseData';
import GenericTable from '../../../GenericTable';
import { LoaderWrapper } from '../../../Loader';
import { CoronaVirus } from '../../../theme/icons';
import defaultTheme from '../../../theme';
import NoScopes from '../../../NoScopes';
import columns from './columns';

const PreviousSubmissions = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { token, userHasWriteScopes } = useAuthContext();
  const { awaitingResponse, fetchMuseData } = useMuseData('PreviousSubmissions');
  const [previousSubmissions, setPreviousSubmissions] = useState([]);

  useEffect(() => {
    token &&
      userHasWriteScopes &&
      fetchMuseData(
        `submissions?${new URLSearchParams({
          page: '0',
          size: '100000',
        })}`,
      ).then((response) => {
        response.data && setPreviousSubmissions(response.data);
      });
  }, [token]);

  return (
    <article>
      <h1 className="view-title">Your Data Submissions</h1>

      {userHasWriteScopes ? (
        <LoaderWrapper loading={awaitingResponse} message="Retrieving your submissions.">
          {previousSubmissions.length > 0 ? (
            <GenericTable
              caption="Submissions made by you in the past"
              columns={columns}
              data={previousSubmissions}
              sortable={{
                defaultSortBy: [
                  {
                    id: 'createdAt',
                  },
                ],
              }}
              style={css`
                margin-top: 35px;
                max-height: 315px;

                &.sortable {
                  th.asc {
                    border-top-color: ${theme.colors.accent};
                  }

                  th.desc {
                    border-bottom-color: ${theme.colors.accent};
                  }
                }

                td {
                  vertical-align: top;
                }

                .tableColumnHeader-submissionId {
                  width: 242px;
                }

                .tableColumnHeader-createdAt,
                .tableColumnHeader-totalRecords {
                  width: 60px;
                }
              `}
            />
          ) : (
            <figure
              css={css`
                align-items: center;
                border: 1px solid ${theme.colors.grey_4};
                display: flex;
                flex-direction: column;
                font-size: 14px;
                height: 315px;
                justify-content: center;
                margin: 40px 0 0;
                text-align: center;
              `}
            >
              <CoronaVirus
                fill={theme.colors.grey_6}
                size={25}
                style={css`
                  margin-bottom: 10px;
                `}
              />
              <figcaption>
                You have not submitted any data yet.
                <br />
                Get started by starting a new submission.
              </figcaption>
            </figure>
          )}
        </LoaderWrapper>
      ) : (
        <NoScopes />
      )}
    </article>
  );
};

export default PreviousSubmissions;
