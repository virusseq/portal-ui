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

const base = {
  white: '#fff',
  black: '#282a35',
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
  primary: '#00ddbe',
  primary_dark: '#00c4a7',
};

// dark blues
const accent = {
  accent: '#04518c',
  accent_light: '#4f85ae',
  accent_dark: '#003055',
  accent_1: '#e5edf3',
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
  accent3: '#d9de3a',
};

const error = {
  error: '#c86370',
  error_dark: '#ad404e',
  error_1: '#f9eff0',
  error_2: '#e9c1c6',
};

const warning = {
  warning: '#f2d021',
  warning_dark: '#e6c104',
};

export default {
  ...base,
  ...grey,
  ...accent,
  ...accent2,
  ...accent3,
  ...primary,
  ...secondary,
  ...error,
  ...warning,
};
