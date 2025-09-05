import { DataRecord } from '#global/hooks/useEnvironmentalData';

export type SubmissionPaginatedResponse = {
	data: DataRecord[];
	first: boolean;
	last: boolean;
	page: number;
	size: number;
	totalPages: number;
	totalRecords: number;
};
