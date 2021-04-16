import { useEffect, useMemo, useState } from "react";
import { css } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Column } from "react-table";

import useAuthContext from "../../../global/hooks/useAuthContext";
import useMuseData from "../../../global/hooks/useMuseData";
import getInternalLink from "../../../global/utils/getInternalLink";
import GenericTable from '../../GenericTable';
import StyledLink from '../../Link';
import { LoaderWrapper } from '../../Loader';
import { CoronaVirus } from "../../theme/icons";
import defaultTheme from '../../theme';

const columnData = [
  {
    accessor: 'submissionId',
    Cell: ({ value }: { value: string }) => (
      <StyledLink href={getInternalLink({ path: `/submission/${value}`})}>
        {value}
      </StyledLink>
    ),
    Header: 'Submission ID',
  },
  {
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'createdAt',
    Cell: ({ value }: { value: number}) => (
      value && new Date(
        new Date(value * 1000).toUTCString()
      ).toISOString().slice(0, 10)
    ),
    Header: 'Submission Date',
  },
  {
    accessor: 'genomes',
    Header: '# Viral Genomes',
  },
];

const PreviousSubmissions = () => {
  const { token } = useAuthContext();
  const columns = useMemo((): Column<{}>[] => columnData, []);
  const [previousSubmissions, setPreviousSubmissions] = useState([]);

  const theme: typeof defaultTheme = useTheme();
  const {
    awaitingResponse,
    fetchMuseData,
  } = useMuseData('PreviousSubmissions');
  
  useEffect(() => {
    token && fetchMuseData('submissions')
      .then((response) => {
        console.log(response);
        response.data && setPreviousSubmissions(response.data);
      });
  }, [token]);

  return (
    <article>
      <h1 className="view-title">
        Your Data Submissions
      </h1>

      <LoaderWrapper
        loading={awaitingResponse}
        message="Retrieving your submissions."
      >
        {previousSubmissions.length > 0
          ? (
            <GenericTable
              caption="Submissions made by you in the past"
              columns={columns}
              data={previousSubmissions}
            />
          )
          : (
            <figure
              css={theme => css`
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
              <CoronaVirus fill={theme.colors.grey_6} size={25} style={css`margin-bottom: 10px;`} />
              <figcaption>
                You have not submitted any data yet. 
                <br/>
                Get started by starting a new submission.
              </figcaption>
            </figure>
          )}
      </LoaderWrapper>

    </article>
  );
};

export default PreviousSubmissions;
