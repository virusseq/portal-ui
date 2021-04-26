import { ReactElement, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import useAuthContext from '../../../../global/hooks/useAuthContext';
import useMuseData from '../../../../global/hooks/useMuseData';
import GenericTable from '../../../GenericTable';
import { LoaderWrapper } from '../../../Loader';
import { CoronaVirus } from '../../../theme/icons';
import defaultTheme from '../../../theme';
import NoScopes from '../../NoScopes';
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

                td:last-of-type {
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
