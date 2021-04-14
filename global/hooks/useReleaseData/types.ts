type FilesByVariantType = {
  abbreviation: string;
  count: number;
  name: string;
};

type AggBuckets = {
  doc_count?: number;
  key?: number;
}

export type ReleaseDataProps = {
  fileCount?: number;
  filesByVariant?: [FilesByVariantType | undefined];
  fileSize?: {
    unit: string;
    value: string;
  };
  hostAges?: AggBuckets[] | undefined;
  hostGenders?: AggBuckets[] | undefined;
  studyCount?: number;
  genomes?: number;
};