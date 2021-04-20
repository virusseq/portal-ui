import { UploadDataType } from '../../../../global/hooks/useMuseData';
import { UploadsStatusDictionaryType, UploadStatusActionType } from './types';

export const uploadsStatusDictionary = {
  ERROR: [],
  PROCESSING: [],
  COMPLETE: [],
  QUEUED: [],
};

export const sortUploadsByStatus = (uploads: UploadDataType[]): UploadsStatusDictionaryType => (
  uploads.reduce( // start with a dictionary, end with an array
    (sortedUploads: UploadsStatusDictionaryType, upload: UploadDataType, index: number) => ({
      ...sortedUploads,
      [upload.status]: sortedUploads[upload.status].concat(upload).sort()
    }),
    uploadsStatusDictionary
  )
);

export const uploadsStatusReducer = (state: UploadsStatusDictionaryType, action: UploadStatusActionType) => {
  switch (action.type) {
    case 'initial details': {
      return sortUploadsByStatus(action.uploads);
    }

    case 'new details': {
      // remove the upload from its previous status group
      const newSubmissionDetails = Object.entries(state)
        .reduce((acc, [status, uploads]): UploadsStatusDictionaryType => ({
          ...acc,
          [status]: uploads.filter(upload => action.upload.submitterSampleId !== upload.submitterSampleId)
        }), state);

      // replace it in its new status group
      return ({
        ...newSubmissionDetails,
        [action.upload.status]: newSubmissionDetails[action.upload.status].concat(action.upload).sort()
      });
    }

    default: {
      return state;
    }
  }
}