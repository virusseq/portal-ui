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

export type ErrorSize = 'lg' | 'md' | 'sm';

const ERROR_SIZES = {
	LG: 'lg' as ErrorSize,
	MD: 'md' as ErrorSize,
	SM: 'sm' as ErrorSize,
};
export const getContainerStyles = (size: ErrorSize): string =>
	({
		[ERROR_SIZES.LG]: `
      padding: 1rem 2rem;
      line-height: 26px;
    `,
		[ERROR_SIZES.MD]: `
      padding: 1rem;
      line-height: 24px;
    `,
		[ERROR_SIZES.SM]: `
      padding: 0.5rem;
      line-height: 20px;
      display: flex;
      align-items: center;
    `,
	}[size]);

export const getIconSize = (size: ErrorSize): number =>
	({
		[ERROR_SIZES.LG]: 26,
		[ERROR_SIZES.MD]: 21,
		[ERROR_SIZES.SM]: 18,
	}[size]);

export const getIconStyle = (size: ErrorSize): string =>
	({
		[ERROR_SIZES.LG]: 'padding-right: 15px',
		[ERROR_SIZES.MD]: 'padding-right: 15px',
		[ERROR_SIZES.SM]: '',
	}[size]);

export const getTitleStyle = (size: ErrorSize): string =>
	({
		[ERROR_SIZES.LG]: `
      margin: 0.5rem 0 1rem;
      font-size: 24px;
      line-height: 38px;
    `,
		[ERROR_SIZES.MD]: `
      margin: 0rem;
      padding-bottom: 0.4rem;
      font-size: 16px;
      line-height: 20px;
    `,
		[ERROR_SIZES.SM]: `
      margin: 0rem,
      line-height: 16px;
    `,
	}[size]);
