export type NoUploadErrorType = { 
  errorInfo?: {},
  message?: string,
  status?: string,
};

export type ReaderCallbackType = (result: string | ArrayBuffer | null) => void;

export type ValidationActionType =
  | {
    type: 'add fasta' | 'add tsv', 
    file: File,
  }
  | {
    type: 'remove fasta' | 'remove tsv', 
    file: string
  }
  | {
    type: 'clear all' | 'is ready' | 'not ready'
  };

export type ValidationParametersType = {
  oneTSV: File[],
  oneOrMoreFasta: File[],
  readyToUpload: boolean,
};
