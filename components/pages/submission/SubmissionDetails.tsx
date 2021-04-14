import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import { css } from '@emotion/core';
import { useTheme } from "emotion-theming";

import useAuthContext from "../../../global/hooks/useAuthContext";
import useMuseData from '../../../global/hooks/useMuseData';
import GenericTable from '../../GenericTable';
import StyledLink, { InternalLink } from '../../Link';
import { LoaderWrapper } from '../../Loader';
import ChevronDown from '../../theme/icons/chevron_down';
import defaultTheme from '../../theme';

const columnData = [
  {
    Header: 'Study ID',
    accessor: 'studyId',
  },
  {
    Header: 'Sample ID',
    accessor: 'sampleId',
  },
  {
    Header: 'Analysis ID',
    accessor: 'analysisId',
  },
  {
    Header: 'Submission Status',
    accessor: 'status',
  },
];

const SubmissionDetails = ({ ID } : { ID: string }) => {
  const columns = useMemo((): Column<{}>[] => columnData, []);
  const [submissionData, setSubmissionData] = useState([]);

  const theme: typeof defaultTheme = useTheme();
  const { token } = useAuthContext();
  const {
    awaitingResponse,
    fetchMuseData,
    fetchEventStream,
  } = useMuseData('SubmissionsDetails');

  console.log('there token', token)
  useEffect(()=> {
    if (token) {
      let eStream = fetchEventStream(
        'uploads-stream', 
        ID, 
        (data: any) => {
          console.log('be data', data)
        });

      return () => eStream?.close();
    }
  }, [token])

  return (
    <article
      css={css`
        width: 100%;
      `}    
    >
      <header>
        <InternalLink
          path="/submission"
        >
          <StyledLink
            css={css`
              font-size: 14px;
              font-weight: bold;
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

        <h1
          className="view-title"
          css={theme => css`
            font-size: 26px;
          `}
        >
          Data Submission: {ID}
        </h1>
      </header>

      <LoaderWrapper
        loading={awaitingResponse}
        message="Retrieving your submissions."
        style={css`
          width: 100%;
        `}
      >
        <GenericTable
          columns={columns}
          data={submissionData}
        />
      </LoaderWrapper>
    </article>
  );
}

export default SubmissionDetails;
