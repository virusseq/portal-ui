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

const base = {
	white: '#fff',
	black: '#282a35',
	canada: '#D93738',
};

const grey = {
	grey_1: '#f2f5f8',
	grey_2: '#f2f3f5',
	grey_3: '#dfdfe1',
	grey_4: '#cecfd3',
	grey_5: '#aeafb3',
	grey_6: '#5e6068',
	grey_highlight: '#eceff2',
};

const primary = {
	primary: '#28519d',
	primary_dark: '#113877',
	primary_light: '#6885ba',
};

const accent = {
	accent: '#60b3e0',
	accent_light: '#afd9ef',
	accent_dark: '#151c3d',
	accent_light_rgb: '175, 217, 239',
};

// light blues
const secondary = {
	secondary: '#4bc6f0',
	secondary_light: '#edf9fd',
	secondary_dark: '#109ed9',
	secondary_accessible: '#0c7cac',
	secondary_1: '#d2f1fb',
	secondary_2: '#aee5f8',
};

const accent2 = {
	accent2_dark: '#9e005d',
	accent2: '#b74a89',
	accent2_light: '#f7ecf3',
};

const accent3 = {
	accent3: '#33aabb',
	accent3_dark: '#1c8292',
	accent3_alternate: '#4da3ab',
};

const success = {
	success: '#00ddbe',
	success_dark: '#009984',
	success_light: '#e6f2f4',
};

const error = {
	error: '#c86370',
	error_dark: '#ad404e',
	error_1: '#f7d7d7',
};

const warning = {
	warning: '#f2d021',
	warning_dark: '#e6c104',
	warning_1: '#ffff758c',
};

export default {
	...base,
	...grey,
	...accent,
	...accent2,
	...accent3,
	...primary,
	...secondary,
	...success,
	...error,
	...warning,
};
