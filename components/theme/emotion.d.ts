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

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      accent2: string;
      accent2_dark: string;
      accent2_light: string;
      accent3: string;
      accent3_alternate: string;
      accent3_dark: string;
      accent: string;
      accent_dark: string;
      accent_light: string;
      accent_light_rgb: string;
      black: string;
      canada: string;
      error: string;
      error_1: string;
      error_dark: string;
      grey_1: string;
      grey_2: string;
      grey_3: string;
      grey_4: string;
      grey_5: string;
      grey_6: string;
      grey_highlight: string;
      primary: string;
      primary_dark: string;
      primary_light: string;
      secondary: string;
      secondary_1: string;
      secondary_2: string;
      secondary_accessible: string;
      secondary_dark: string;
      secondary_light: string;
      success: string;
      success_dark: string;
      success_light: string;
      warning: string;
      warning_dark: string;
      warning_1: string;
      white: string;
    };

    dimensions: {
      navbar: {
        height: number;
      };
      footer: {
        height: number;
      };
      facets: {
        width: number;
      };
    };

    shadow: {
      default: string;
      right: string;
    };

    typography: {
      baseFont: SerializedStyles;
      button: SerializedStyles;
      data: SerializedStyles;
      heading: SerializedStyles;
      label: SerializedStyles;
      label2: SerializedStyles;
      regular: SerializedStyles;
      subheading: SerializedStyles;
      subheading2: SerializedStyles;
    };
  }
}
