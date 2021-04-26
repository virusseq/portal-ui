import { Dispatch, SetStateAction } from 'react';
import { UploadDataType } from '../../../../global/hooks/useMuseData';

export type SubmissionDetailsProps = {
  ID: string;
  setTotalUploads?: Dispatch<SetStateAction<number>>;
};

export type UploadStatusType = 'COMPLETE' | 'ERROR' | 'PROCESSING' | 'QUEUED';

export type UploadsStatusDictionaryType = {
  ERROR: UploadDataType[];
  PROCESSING: UploadDataType[];
  COMPLETE: UploadDataType[];
  QUEUED: UploadDataType[];
};

export type UploadStatusActionType =
  | {
      type: 'initial details';
      uploads: UploadDataType[];
    }
  | {
      type: 'new details';
      upload: UploadDataType;
    };
