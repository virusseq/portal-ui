/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

const BYTES_PB = 10e14;
const BYTES_TB_LIMIT = 9999995e8;
const BYTES_TB = 10e11;
const BYTES_GB_LIMIT = 9999995e5;
const BYTES_GB = 10e8;
const BYTES_MB_LIMIT = 9995e5;
const BYTES_MB = 10e5;
const BYTES_KB_LIMIT = 999500;
const BYTES_KB = 1000;

const formatFileSize = (value = 0): string => {
	switch (true) {
		case value >= BYTES_TB_LIMIT:
			return `${(value / BYTES_PB).toFixed(2)} PB`;
		case value >= BYTES_GB_LIMIT:
			return `${(value / BYTES_TB).toFixed(2)} TB`;
		case value >= BYTES_MB_LIMIT:
			return `${(value / BYTES_GB).toFixed(2)} GB`;
		case value >= BYTES_KB_LIMIT:
			return `${(value / BYTES_MB).toFixed(0)} MB`;
		case value >= BYTES_KB:
			return `${(value / BYTES_KB).toFixed(0)} KB`;
		default:
			return `${value} B`;
	}
};

export default formatFileSize;
