export type SubmissionDataType = {
  createdAt: number,
  originalFileNames: string[],
  submissionId: string,
  totalRecords: number,
};

export type UploadDataType = {
  analysisId: string | null,
  error: string | null,
  originalFilePair: string[],
  status: 
    | 'COMPLETE'
    | 'ERROR'
    | 'PROCESSING'
    | 'QUEUED',
  studyId: string,
  submissionId: string,
  submitterSampleId: string,
};