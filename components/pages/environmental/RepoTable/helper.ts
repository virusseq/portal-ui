/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import type { CustomColumnMappingInterface } from '@overture-stack/arranger-components';
import { type CombinationKey, type FilterKey, type SQON } from '@overture-stack/sqon-builder';
import JSZip from 'jszip';

import createArrangerFetcher from '#components/utils/arrangerFetcher';
import { getConfig } from '#global/config';
import type { SubmissionManifest } from '#global/utils/fileManifest';

const { NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API } = getConfig();

export const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
});

export const createZipFile = async (
	files: { content: Blob; fileName: string }[],
): Promise<Blob> => {
	const zip = new JSZip();
	files.forEach(({ content, fileName }) => {
		zip.file(fileName, content);
	});
	return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
};

type ExtendedFilterKey = FilterKey | 'not-in';

type ExtendedFilterOperator = {
	op: ExtendedFilterKey;
	content: {
		fieldName: string;
		value: string[];
	};
};

export type ExtendedCombinationOperator = {
	op: CombinationKey;
	content: ExtendedSQON[];
	pivot?: string;
};

export type ExtendedSQON = ExtendedFilterOperator | ExtendedCombinationOperator | SQON;

export const excludeRecordsWithoutFiles = (sqon: SQON | null): ExtendedSQON => {
	return {
		op: 'and',
		content: [
			...(sqon ? [sqon] : []),
			{
				op: 'not-in',
				content: { fieldName: 'files.fileName', value: [] },
			},
		],
	};
};

function extractFilesFromResponse(response: any): SubmissionManifest[] {
	const analysisEdges = response?.data?.analysis?.hits?.edges;

	if (!Array.isArray(analysisEdges)) {
		return [];
	}

	return analysisEdges.flatMap((edge) => {
		const fileEdges = edge?.node?.files?.hits?.edges;
		if (!Array.isArray(fileEdges)) {
			return [];
		}

		return fileEdges
			.filter(({ node }) => node)
			.map<SubmissionManifest>(({ node: { fileName, md5Sum, objectId } }) => ({
				fileName,
				md5Sum,
				objectId,
			}));
	});
}

const getFilesQuery = `query ($sqon: JSON!)  {
	analysis {
		hits(filters: $sqon) {
			edges {
				node {
					systemId
					files {
						hits {
							edges {
								node {
									fileName
									md5Sum
									objectId
								}
							}
						}
					}
				}
			}
		}
	}
}`;

export const getManifestDataAsync = async (sqon: ExtendedSQON): Promise<SubmissionManifest[]> => {
	const result = await arrangerFetcher({
		body: {
			query: getFilesQuery,
			variables: { sqon },
		},
	});
	return extractFilesFromResponse(result);
};

export const getMetadataBlobAsync = async ({
	sqon,
	columns,
	documentType,
	fileType,
	maxRows,
	url,
}: {
	columns: (string | CustomColumnMappingInterface)[] | null;
	documentType: string;
	fileType: 'tsv' | string;
	maxRows: number;
	sqon: SQON | null;
	url: string;
}): Promise<Blob> => {
	// Arranger Request in url form params
	const formData = new URLSearchParams();
	formData.append(
		'params',
		JSON.stringify({
			files: [
				{
					documentType,
					fileType,
					maxRows,
					sqon,
					columns,
				},
			],
		}),
	);

	// Use the provided Arranger url to fetch the metadata blob
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formData.toString(),
	});
	return await response.blob();
};
