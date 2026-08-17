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

import { createTrackedMetadataOnlyExporter, resolveExportColumns } from './arrangerExport';

describe('resolveExportColumns', () => {
	it('filters plain columns down to the ones marked show, when no exporterColumns is given', () => {
		const columns = [
			{ fieldName: 'a', show: true },
			{ fieldName: 'b', show: false },
			'a-string-column-is-ignored-here',
		];
		expect(resolveExportColumns({}, columns as any, undefined)).toEqual([{ fieldName: 'a', show: true }]);
	});

	it('returns every column in allColumnsDict when exporterColumns is an empty array', () => {
		const allColumnsDict = { a: { fieldName: 'a' }, b: { fieldName: 'b' } };
		expect(resolveExportColumns(allColumnsDict as any, null, [])).toEqual(Object.values(allColumnsDict));
	});

	it('looks up a string exporterColumns entry directly from allColumnsDict', () => {
		const allColumnsDict = { a: { fieldName: 'a', Header: 'A' } };
		expect(resolveExportColumns(allColumnsDict as any, null, ['a'])).toEqual([{ fieldName: 'a', Header: 'A' }]);
	});

	it('merges a plain (non-function) override from an object exporterColumns entry', () => {
		const allColumnsDict = { a: { fieldName: 'a', Header: 'A' } };
		const result = resolveExportColumns(allColumnsDict as any, null, [
			{ fieldName: 'a', displayName: 'Overridden' },
		] as any);
		expect(result).toEqual([{ fieldName: 'a', Header: 'A', displayName: 'Overridden' }]);
	});

	it('resolves a function-valued override by calling it with the real column definition', () => {
		const allColumnsDict = { study_id: { fieldName: 'study_id', Header: 'Study ID' } };
		const result = resolveExportColumns(allColumnsDict as any, null, [
			{
				fieldName: 'study_id',
				displayName: ({ Header }: { Header: string }) => Header.toLowerCase(),
			},
		] as any);
		expect(result).toEqual([{ fieldName: 'study_id', Header: 'Study ID', displayName: 'study id' }]);
	});

	it('keeps a resolved empty-string override, since the check is on the configured override (always truthy for a function), not its resolved output', () => {
		const allColumnsDict = { a: { fieldName: 'a' } };
		const result = resolveExportColumns(allColumnsDict as any, null, [
			{ fieldName: 'a', displayName: () => '' },
		] as any);
		expect(result).toEqual([{ fieldName: 'a', displayName: '' }]);
	});
});

describe('createTrackedMetadataOnlyExporter', () => {
	it('fires file_download before invoking the download function', () => {
		const trackEvent = jest.fn();
		const downloadFunction = jest.fn().mockReturnValue(jest.fn());
		const exporter = {
			fileName: 'export.tsv',
			url: 'https://example.com/download',
			selectedRows: ['a', 'b'],
			sqon: { op: 'and', content: [{ op: 'in', content: { fieldName: 'x', value: ['1'] } }] },
			files: [
				{
					allColumnsDict: {},
					columns: null,
					exporterColumns: [],
				},
			],
		};

		createTrackedMetadataOnlyExporter(trackEvent)(exporter as any, downloadFunction);

		expect(trackEvent).toHaveBeenCalledWith('file_download', {
			download_type: 'metadata_only',
			result_count: 2,
			selected_rows: 2,
			active_filter_count: 1,
		});
		expect(downloadFunction).toHaveBeenCalledWith(
			expect.objectContaining({ url: 'https://example.com/download', method: 'POST' }),
		);
	});
});
