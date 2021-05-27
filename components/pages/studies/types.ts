export type DeleteRow = { studyId: string; submitter: string };

export type Study = {
  name: string;
  studyId: string;
  organization: string;
  description: string;
  submitters: string[];
};
