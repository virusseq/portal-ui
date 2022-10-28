export type Archive = {
	hash: string;
	hashInfo: string;
	id: string;
	numOfDownloads: number;
	numOfSamples: number;
	objectId: string;
	releaseTimeFrom: number;
	releaseTimeUntil: number;
	status: 'CANCELLED' | 'COMPLETE' | 'BUILDING' | 'FAILED';
	totalSubmitted: number;
	totalSupressed: number;
	totalUpdated: number;
	type: 'SET_QUERY' | 'ALL';
};

export type ArchivesFetchRes = PagedResponse<Archive>;

export type ArchivesFetchReq = {
	createdAfter?: number;
	createdBefore?: number;
	size?: number;
	page?: number;
	sortDirection?: 'ASC' | 'DESC';
	sortFieldName?: ArchivesSortFields;
};
export type ArchivesFetchReqSort = Pick<ArchivesFetchReq, 'sortDirection' | 'sortFieldName'>;

export type ArchivesSortFields =
	| 'numOfSamples'
	| 'releaseTimeUntil'
	| 'totalSubmitted'
	| 'totalSupressed'
	| 'totalUpdated';

export type PagedResponse<T> = {
	first: boolean;
	last: boolean;
	page: number; // current page number (zero indexed)
	releases: Array<T>;
	size: number; // number of elements in current page
	totalPages: number;
	totalReleases: number;
};
