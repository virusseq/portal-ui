/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

export type SubmissionManifest = {
	objectId: string;
	fileName: string;
	md5Sum: string;
};

/**
 * Converts an array of data to a upload manifest format
 * @param submissionId
 * @param manifests
 * @returns
 */
export const convertToUploadManifest = (submissionId: string, manifests: SubmissionManifest[]) => {
	const header = `${submissionId}\t\t\n`;
	const dataRows = manifests
		.map(({ objectId, fileName, md5Sum }) => `${objectId}\t/output/${fileName}\t${md5Sum}`)
		.join('\n');
	return header + dataRows;
};

/**
 * Converts an array of SubmissionManifest objects to a download manifest format.
 * Download manifest format is a tsv files with each line containing columns:
 * - repoCode
 * - fileId
 * - fileUuid
 * - fileFormat
 * - fileName
 * - fileSize
 * - fileMd5sum
 * - indexFileUuid
 * - donorId
 * - projectId
 * - study
 * @param manifests
 * @returns
 */
export const convertToDownloadManifest = (manifests: SubmissionManifest[]) => {
	const header = `\t\t\t\t\t\t\t\t\t\t\n`;
	const dataRows = manifests
		.map(({ objectId, fileName, md5Sum }) => `\t\t${objectId}\t\t${fileName}\t\t${md5Sum}\t\t\t\t`)
		.join('\n');
	return header + dataRows;
};

/**
 * Downloads a file with the provided blob and filename.
 * @param blob
 * @param filename
 */
export const downloadFile = (blob: Blob, filename: string) => {
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
