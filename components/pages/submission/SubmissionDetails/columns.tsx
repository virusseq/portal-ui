import { css } from "@emotion/core";
import theme from "../../../theme";
import { Column, Row } from "react-table";

import { UploadDataType } from '../../../../global/hooks/useMuseData';
import { Checkmark, Ellipsis, Warning } from '../../../theme/icons';
import { UploadStatusType } from './types';

const StatusIcon = ({ status }: { status: UploadStatusType }) => {
  switch(status) {
    case 'COMPLETE': 
      return <Checkmark size={12} />;

    case 'ERROR': 
      return <Warning size={13} />;

    case 'PROCESSING': 
      return <Ellipsis size={12} />;

    case 'QUEUED': 
      return <Ellipsis size={12} fill={theme.colors.grey_6} />;

    default: 
      return <Ellipsis size={12} fill={theme.colors.grey_6} />;
  }
};

const columnData: Column<{}>[] = [
  {
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'submitterSampleId',
    Header: 'Sample ID',
  },
  {
    accessor: 'analysisId',
    Header: 'Analysis ID',
  },
  {
    accessor: 'status',
    Cell: ({ row: { original }, value }: {row: Row, value: UploadStatusType}) => {
      const { error } = original as UploadDataType;
      
      return (
        <>
          <StatusIcon status={value} />

          <span
            css={theme => css`
              display: inline-block;
              margin-left: 15px;
              position: absolute;
              ${value === 'ERROR' && `color: ${theme.colors.error_dark}`}
            `}
          >
            {`${value}${error ? ':' : ''}`}
          </span>

          {error && (
            <span
              css={theme => css`
                display: inline-block;
                margin-left: 60px;
                white-space: normal;

                ${value === 'ERROR' && `color: ${theme.colors.error_dark}`}
              `}
            >
              {error}
            </span>)}
        </>
      );
    },
    Header: 'Submission Status',
  },
];

export default columnData;