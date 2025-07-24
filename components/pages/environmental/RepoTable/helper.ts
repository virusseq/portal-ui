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
import { type SQON } from '@overture-stack/sqon-builder';

import createArrangerFetcher from '#components/utils/arrangerFetcher';
import { getConfig } from '#global/config';
import type { SubmissionManifest } from '#global/utils/fileManifest';

const { NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API } = getConfig();

export const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
});

function extractFilesFromResponse(response: any): SubmissionManifest[] {
	const result: SubmissionManifest[] = [];

	const analysisEdges = response?.data?.analysis?.hits?.edges;

	if (!Array.isArray(analysisEdges)) {
		return result;
	}

	for (const edge of analysisEdges) {
		const files = edge?.node?.files?.hits?.edges;

		if (!Array.isArray(files)) {
			continue;
		}

		for (const fileEdge of files) {
			result.push({
				fileName: fileEdge?.node?.fileName,
				md5Sum: fileEdge?.node?.md5Sum,
				objectId: fileEdge?.node?.objectId,
			});
		}
	}

	return result;
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

export const getManifestDataAsync = async (sqon: SQON): Promise<SubmissionManifest[]> => {
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
	sqon: SQON;
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
