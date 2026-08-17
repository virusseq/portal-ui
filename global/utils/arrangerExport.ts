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

import type { ColumnMappingInterface } from '@overture-stack/arranger-components/dist/DataContext/types';
import type {
	ExporterFileInterface,
	ExporterFunction,
	ExporterFunctionProps,
} from '@overture-stack/arranger-components/dist/Table/DownloadButton/types';

import { countActiveFilters, trackFileDownload } from '#global/hooks/useTrackingContext/events';
import type { TrackEventFunctionType } from '#global/hooks/useTrackingContext/types';

/**
 * Faithful reproduction of `@overture-stack/arranger-components`'s own internal
 * `saveTSV`/`useCustomisers` column-resolution logic (`Table/DownloadButton/helpers.ts`, not
 * exported from the package's public API). Needed because the "Metadata only" exporter can't use
 * the `'saveTSV'` shorthand once it also needs to fire a tracking event first: `function` only
 * accepts one callback, so replacing it means reimplementing what that shorthand actually does.
 * Keep in sync with Arranger's own `saveTSV` if it ever changes; see the tech-debt entry for why
 * a public `onExport` hook (or exporting `saveTSV` itself) would remove the need for this at all.
 */
const useCustomisers =
	(extendedColumn?: ColumnMappingInterface) =>
	([key, value]: [string, unknown]): Record<string, unknown> | false =>
		Boolean(value) && {
			[key]: typeof value === 'function' ? (value as (c: unknown) => unknown)(extendedColumn) : value,
		};

export const resolveExportColumns = (
	allColumnsDict: ExporterFileInterface['allColumnsDict'],
	columns: ExporterFileInterface['columns'],
	exporterColumns: ExporterFileInterface['exporterColumns'],
) => {
	if (!exporterColumns) {
		return columns?.filter((column) => typeof column === 'object' && column.show);
	}

	if (exporterColumns.length === 0) {
		return Object.values(allColumnsDict);
	}

	return Object.values(
		exporterColumns.map((column) => {
			if (typeof column !== 'object') {
				return allColumnsDict[column];
			}

			const fieldName = typeof column.fieldName === 'function' ? column.fieldName(column) : column.fieldName;
			const extendedColumn = allColumnsDict[fieldName];
			const resolve = useCustomisers(extendedColumn);

			return {
				...extendedColumn,
				...Object.entries(column).reduce((acc, entry) => ({ ...acc, ...resolve(entry) }), {}),
			};
		}),
	);
};

/**
 * Number of rows this specific export covers: the user's selection if they made one, otherwise
 * the whole matching result set. `resultCount` in the fired event uses the same number; getting
 * the true total-matching-result count for an unfiltered "download everything" export would need
 * a separate Arranger count query this function doesn't have access to, so that case falls back
 * to the selection size (0 when nothing's selected), a known simplification, not a precise total.
 */
const getExportSize = ({ selectedRows }: ExporterFunctionProps): number => selectedRows.length;

/**
 * Replaces the `{ function: 'saveTSV' }` shorthand for a "Metadata only" exporter with a version
 * that fires `file_download` first, then reproduces `saveTSV`'s own behaviour exactly (including
 * custom column overrides), so nothing about the actual export changes from the user's side.
 */
export const createTrackedMetadataOnlyExporter =
	(trackEvent: TrackEventFunctionType): ExporterFunction =>
	(exporter, downloadFunction) => {
		trackFileDownload(trackEvent, {
			downloadType: 'metadata_only',
			resultCount: getExportSize(exporter),
			selectedRows: exporter.selectedRows.length,
			activeFilterCount: countActiveFilters(exporter.sqon),
		});

		downloadFunction?.({
			url: exporter.url,
			method: 'POST',
			params: {
				fileName: exporter.fileName,
				files: exporter.files.map(({ allColumnsDict, columns, exporterColumns, ...file }) => ({
					...file,
					columns: resolveExportColumns(allColumnsDict, columns, exporterColumns),
				})),
			},
		})?.();
	};
