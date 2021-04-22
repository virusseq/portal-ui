export type ErrorTypes =
  | 'sampleIdInFileMissingInTsv'
  | 'sampleIdInRecordMissingInFile'
  | 'missingHeaders'
  | 'unknownHeaders'
  | string; // in case new error types are added, the app won't just crash

export type NoUploadErrorType = {
  errorInfo?: {
    sampleIdInFileMissingInTsv?: string[];
    sampleIdInRecordMissingInFile?: string[];
    missingHeaders?: string[];
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
