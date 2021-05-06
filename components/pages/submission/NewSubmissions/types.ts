export type ErrorTypes =
  | 'invalidFields'
  | 'missingHeaders'
  | 'sampleIdInFileMissingInTsv'
  | 'sampleIdInRecordMissingInFile'
  | 'unknownHeaders'
  | string; // in case new error types are added, the app won't just crash

export type InvalidFieldsType = {
  fieldName: string;
  index: number;
  reason: 'EXPECTING_NUMBER_TYPE' | 'NOT_ALLOWED_TO_BE_EMPTY' | 'UNAUTHORIZED_FOR_STUDY_UPLOAD';
  value: string;
};

export type NoUploadErrorType = {
  errorInfo?: {
    invalidFields?: InvalidFieldsType[];
    missingHeaders?: string[];
    sampleIdInFileMissingInTsv?: string[];
    sampleIdInRecordMissingInFile?: string[];
    unknownHeaders?: string[];
  };
  message?: string;
  status?: string;
};

export type ReaderCallbackType = (result: string | ArrayBuffer | null) => void;

export type ValidationActionType =
  | {
      type: 'add fasta' | 'add tsv';
      file: File;
    }
  | {
      type: 'remove fasta' | 'remove tsv';
      file: string;
    }
  | {
      type: 'clear all' | 'is ready' | 'not ready';
    };

export type ValidationParametersType = {
  oneTSV: File[];
  oneOrMoreFasta: File[];
  readyToUpload: boolean;
};
