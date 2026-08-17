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

import type { SqonNode } from '@overture-stack/sqon';

import {
	countActiveFilters,
	getFacetActionType,
	isFacetValueActive,
	trackExplorerView,
	trackFacetFilter,
	trackFileDownload,
} from './events';

describe('trackExplorerView', () => {
	it('fires explorer_view with the explorer name', () => {
		const trackEvent = jest.fn();
		trackExplorerView(trackEvent, { explorerName: 'clinical' });
		expect(trackEvent).toHaveBeenCalledWith('explorer_view', { explorer_name: 'clinical' });
	});
});

describe('trackFileDownload', () => {
	it('fires file_download with all four parameters mapped to snake_case', () => {
		const trackEvent = jest.fn();
		trackFileDownload(trackEvent, {
			downloadType: 'metadata_only',
			resultCount: 12,
			selectedRows: 3,
			activeFilterCount: 2,
		});
		expect(trackEvent).toHaveBeenCalledWith('file_download', {
			download_type: 'metadata_only',
			result_count: 12,
			selected_rows: 3,
			active_filter_count: 2,
		});
	});
});

describe('trackFacetFilter', () => {
	it('fires facet_filter with field, action, and result count', () => {
		const trackEvent = jest.fn();
		trackFacetFilter(trackEvent, { field: 'analysis.host.host_age', action: 'add', resultCount: 42 });
		expect(trackEvent).toHaveBeenCalledWith('facet_filter', {
			field: 'analysis.host.host_age',
			action: 'add',
			result_count: 42,
		});
	});
});

const leaf = (fieldName: string, value: string | string[]): SqonNode =>
	({ op: 'in', content: { fieldName, value } }) as SqonNode;

describe('isFacetValueActive', () => {
	it('is false when there is no sqon', () => {
		expect(isFacetValueActive(undefined, 'study_id', 'ABC')).toBe(false);
		expect(isFacetValueActive(null, 'study_id', 'ABC')).toBe(false);
	});

	it("is true when the value is present in a matching field's array filter", () => {
		const sqon = leaf('study_id', ['ABC', 'DEF']);
		expect(isFacetValueActive(sqon, 'study_id', 'ABC')).toBe(true);
	});

	it('is false when the field matches but the value does not', () => {
		const sqon = leaf('study_id', ['ABC', 'DEF']);
		expect(isFacetValueActive(sqon, 'study_id', 'ZZZ')).toBe(false);
	});

	it('is false when the value matches but the field does not', () => {
		const sqon = leaf('study_id', ['ABC']);
		expect(isFacetValueActive(sqon, 'other_field', 'ABC')).toBe(false);
	});

	it('is true for a scalar (non-array) filter value that matches', () => {
		const sqon = leaf('study_id', 'ABC');
		expect(isFacetValueActive(sqon, 'study_id', 'ABC')).toBe(true);
	});

	it('recurses into a combination node to find a matching nested leaf', () => {
		const sqon: SqonNode = {
			op: 'and',
			content: [leaf('sample_type', ['wastewater']), leaf('study_id', ['ABC', 'DEF'])],
		} as SqonNode;
		expect(isFacetValueActive(sqon, 'study_id', 'DEF')).toBe(true);
		expect(isFacetValueActive(sqon, 'study_id', 'ZZZ')).toBe(false);
	});
});

describe('getFacetActionType', () => {
	it('is remove when the value is already active in the previous sqon', () => {
		const sqon = leaf('study_id', ['ABC']);
		expect(getFacetActionType(sqon, 'study_id', 'ABC')).toBe('remove');
	});

	it('is add when the value is not active in the previous sqon', () => {
		const sqon = leaf('study_id', ['ABC']);
		expect(getFacetActionType(sqon, 'study_id', 'DEF')).toBe('add');
	});

	it('is add when there is no previous sqon at all', () => {
		expect(getFacetActionType(undefined, 'study_id', 'ABC')).toBe('add');
	});
});

describe('countActiveFilters', () => {
	it('is 0 when there is no sqon', () => {
		expect(countActiveFilters(undefined)).toBe(0);
		expect(countActiveFilters(null)).toBe(0);
	});

	it('is the number of children for a combination node', () => {
		const sqon: SqonNode = {
			op: 'and',
			content: [leaf('sample_type', ['wastewater']), leaf('study_id', ['ABC'])],
		} as SqonNode;
		expect(countActiveFilters(sqon)).toBe(2);
	});

	it('is 1 for a single leaf filter', () => {
		expect(countActiveFilters(leaf('study_id', ['ABC']))).toBe(1);
	});
});
