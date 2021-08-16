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

export type ContributorsResponse = {
  data: string[];
};

export type SingularityErrorResponse = {
  errorInfo: Record<string, unknown>;
  message: string;
  status: string;
};

export type Archive = {
  id: string;
  status: 'COMPLETE' | 'BUILDING' | 'FAILED';
  type: 'SET_QUERY' | 'ALL';
  hash_info: string;
  hash: string;
  object_id: string;
  created_at: number;
  num_of_samples: number;
  num_of_downloads: number;
};

export type Pageable = {
  totalPages: number;
  totalElements: number;
};

export type ArchivesFetchRes = PagedResponse<Archive>;

export type ArchviesFetchReq = {
  createdAfterEpochSec?: number;
  createdBeforeEpochSec?: number;
  size?: number;
  page?: number;
  sortDirection?: 'ASC' | 'DESC';
  sortField?: ArchivesSortFields;
};

export type ArchivesSortFields = 'createdAt' | 'numOfSamples';

export type PagedResponse<T> = {
  content: Array<T>;
  totalPages: number;
  totalElements: number;
  first: boolean; // is this the first page
  last: boolean; // is this the last page
  size: number;
  number: number; // current page number (zero indexed)
  numberOfElements: number; // number of elements in current page
};
