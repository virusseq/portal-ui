/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { isFieldFilter, isGroupNode, type SqonNode } from '@overture-stack/sqon';

import type { TrackEventFunctionType } from './types';

/**
 * Named GA4 events this app fires, one small typed function per event. `trackEvent` (the
 * generic dispatch primitive) stays the only thing that actually calls the analytics package;
 * adding a new event elsewhere means adding one function here in the same shape, not touching
 * the dispatch mechanism itself.
 */

export const trackExplorerView = (
	trackEvent: TrackEventFunctionType,
	{ explorerName }: { explorerName: string },
): void => trackEvent('explorer_view', { explorer_name: explorerName });

export type FileDownloadType = 'metadata_only' | 'metadata_and_files';

export const trackFileDownload = (
	trackEvent: TrackEventFunctionType,
	{
		downloadType,
		resultCount,
		selectedRows,
		activeFilterCount,
	}: {
		downloadType: FileDownloadType;
		resultCount: number;
		selectedRows: number;
		activeFilterCount: number;
	},
): void =>
	trackEvent('file_download', {
		download_type: downloadType,
		result_count: resultCount,
		selected_rows: selectedRows,
		active_filter_count: activeFilterCount,
	});

export type FacetFilterAction = 'add' | 'remove';

export const trackFacetFilter = (
	trackEvent: TrackEventFunctionType,
	{ field, action, resultCount }: { field: string; action: FacetFilterAction; resultCount: number },
): void => trackEvent('facet_filter', { field, action, result_count: resultCount });

/**
 * Whether `value` is currently one of the active filter values for `fieldName` in `sqon`. Walks
 * combination nodes recursively; assumes the common flat shape this app's own SQON construction
 * already uses (see `excludeRecordsWithoutFiles`), not an exhaustive arbitrary-nesting guarantee.
 */
export const isFacetValueActive = (sqon: SqonNode | null | undefined, fieldName: string, value: string): boolean => {
	if (!sqon) {
		return false;
	}

	if (isGroupNode(sqon)) {
		return sqon.content.some((child) => isFacetValueActive(child, fieldName, value));
	}

	if (isFieldFilter(sqon) && sqon.content.fieldName === fieldName) {
		const filterValue = sqon.content.value;
		return Array.isArray(filterValue) ? filterValue.includes(value) : filterValue === value;
	}

	return false;
};

/**
 * Arranger's `<Aggregations>` `onValueChange` callback reports `isActive` for the *field*, not
 * specifically whether this *value* was just added or removed, so for a multi-select facet
 * (this app's, all of them) it can't be trusted directly: deselecting one value while others
 * stay checked still reports the field as active. Diffing against the pre-click sqon instead.
 */
export const getFacetActionType = (
	previousSqon: SqonNode | null | undefined,
	fieldName: string,
	value: string,
): FacetFilterAction => (isFacetValueActive(previousSqon, fieldName, value) ? 'remove' : 'add');

/** How many facet fields currently have an active filter applied. */
export const countActiveFilters = (sqon: SqonNode | null | undefined): number => {
	if (!sqon) {
		return 0;
	}

	return isGroupNode(sqon) ? sqon.content.length : 1;
};
