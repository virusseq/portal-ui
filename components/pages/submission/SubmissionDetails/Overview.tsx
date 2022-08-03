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

import { ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { format } from 'date-fns';

import useAuthContext from '../../../../global/hooks/useAuthContext';
import useMuseData, { SubmissionDataType } from '../../../../global/hooks/useMuseData';
import StyledLink, { InternalLink } from '../../../Link';
import { LoaderMessage } from '../../../Loader';
import { Calendar, ChevronDown, CoronaVirus, File } from '../../../theme/icons';
import defaultTheme from '../../../theme';
import { SubmissionDetailsProps } from './types';

const Overview = ({ ID, setTotalUploads }: SubmissionDetailsProps): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { token } = useAuthContext();
  const [
    { createdAt, originalFileNames, totalRecords, ...submissionData },
    setSubmissionData,
  ] = useState<SubmissionDataType>({} as SubmissionDataType);

  const { awaitingResponse, fetchMuseData } = useMuseData('SubmissionsDetails');

  useEffect(() => {
    if (token) {
      !submissionData?.submissionId &&
        fetchMuseData(`submissions/${ID}`).then((thisSubmission) => {
          thisSubmission?.submissionId === ID
            ? (setSubmissionData({
                ...thisSubmission,
                originalFileNames: [...thisSubmission.originalFileNames].sort((A, B) =>
                  A.slice(-3).toLowerCase() === 'tsv'
                    ? -1
                    : B.slice(-3).toLowerCase() === 'tsv'
                    ? 1
                    : 0,
                ),
              }),
              setTotalUploads?.(thisSubmission.totalRecords))
            : console.error('Unhandled error fetching submission overview', thisSubmission);
        });
    }
  }, [token]);

  return (
    <header
      css={css`
        border-bottom: 1px solid ${theme.colors.grey_3};
        padding-bottom: 10px;
      `}
    >
      <InternalLink path="/submission">
        <StyledLink
          css={css`
            font-size: 14px;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
          `}
        >
          <ChevronDown
            fill={theme.colors.canada}
            height={9}
            width={8}
            style={css`
              margin-right: 3px;
              transform: rotate(90deg);
            `}
          />
          All Submissions
        </StyledLink>
      </InternalLink>

      <section
        css={css`
          align-items: flex-start;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <h1
          className="view-title"
          css={css`
            font-size: 26px;
            margin: 0 60px 15px 0 !important;
            white-space: nowrap;
          `}
        >
          Data Submission: {ID}
        </h1>

        {awaitingResponse || (
          <div
            css={css`
              display: flex;
              font-weight: bold;
              margin-top: 9px;

              p {
                align-items: center;
                display: flex;
                margin: 0 60px 0 0;
              }

              svg {
                margin-right: 5px;
              }
            `}
          >
            {createdAt && (
              <p>
                <Calendar size={16} />
                {`Submitted on: ${format(new Date(createdAt), 'yyyy-MM-dd')}`}
              </p>
            )}
            {totalRecords && (
              <p>
                <CoronaVirus size={16} />
                {`Viral Genomes: ${totalRecords}`}
              </p>
            )}
          </div>
        )}
      </section>

      {awaitingResponse ? (
        <LoaderMessage inline message="Loading data..." size="20px" />
      ) : (
        originalFileNames?.length > 0 && (
          <ul
            css={css`
              font-size: 13px;
              list-style: none;
              margin: 0;
              padding: 0;

              li {
                align-items: center;
                display: flex;
                margin-bottom: 10px;
              }

              svg {
                margin-right: 5px;
              }
            `}
          >
            <li>
              <File fill={theme.colors.secondary_dark} />
              {`${originalFileNames[0]}`}
            </li>
            <li>
              <File fill={theme.colors.accent3_dark} />
              {`${originalFileNames.slice(1).join(', ')}`}
            </li>
          </ul>
        )
      )}
    </header>
  );
};

export default Overview;
