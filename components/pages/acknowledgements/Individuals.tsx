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

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';

const Partners = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <section
      css={css`
        margin: 5px 0 0;
      `}
    >
      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
        Canadian Public Health Laboratory Network (CPHLN) members and staffs having contributed data to the portal
      </h2>

      <h3>
        British Columbia
      </h3>

      <p>
        <em>BCCDC Public Health Laboratory:</em></br>
        Prystajecky Natalie, Linda Hoang, John R. Tyson, Dan Fornika, Shannon Russell, Kim MacDonald, Kimia Kamelian, Ana Pacagnella, Corrinne Ng, Loretta Janz, Richard Harrigan, Robert Azana, Mel Krajden
      </p>

      <h3>
        Manitoba
      </h3>

      <p>
        <em>Cadham Provincial Laboratory collected specimens sequenced at the National Microbiology Lab (NML):</em></br> Paul Van Caeseele, Jared Bullard, David Alexander, Kerry Dust.</br>
        <em>NML:</em> Anna Majer, Shari Tyson, Grace Seo, Philip Mabon, Elsie Grudeski, Rhiannon Huzarewich, Russell Mandes, Anneliese Landgraff, Jennifer Tanner, Natalie Knox, Morag Graham, Gary Van Domselaar, Nathalie Bastien, Yan Li, Timothy Booth, Darian Hole, Madison Chapel, Kirsten Biggar
      </p>

      <p>
        <em>Cadham Provincial Laboratory sequenced specimens:</em></br>
        David Alexander, Lori Johnson, Janna Holowick, Joanne Sanders, Adam Hedley, Kerry Dust 
      </p>

      <p>
        <em>Dynacare sequenced specimens:</em></br>
        Hilary Racher, Melissa Desaulnier, Tintu Abraham, Hongbin Li (Impact Genetics, Brampton Ontario)
      </p>

      <h3>
        New Brunswick
      </h3>

      <p>
        <em>Centre Hospitalier Universitaire Georges L. Dumont; National Microbiology Laboratory</em></br>
        Richard Garceau, Guillaume Desnoyers, Nicolas Crapoulet, Pierre Lyons, Woodson Shaw and Simi Chacko, Anna Majer, Shari Tyson, Grace Seo, Philip Mabon, Elsie Grudeski, Rhiannon Huzarewich, Russell Mandes, Anneliese Landgraff, Jennifer Tanner, Natalie Knox, Morag Graham, Gary Van Domselaar, Nathalie Bastien, Yan Li, Timothy Booth, Darian Hole, Madison Chapel, Kirsten Biggar.
      </p>

      <h3>
        Alberta
      </h3>

      <h3>
        Québec
      </h3>

      <h3>
        Ontario
      </h3>

      <h3>
        Newfoundland and Labrador
      </h3>

      <h3>
        Nova Scotia
      </h3>

      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
         Academic, Health Network and Research Institutions staffs having contributed data to the portal
      </h2>


      <h2
        css={css`
          ${theme.typography.subheading};
        `}
      >
         CanCOGeN VirusSeq committees and working groups’ members
      </h2>

      
    </section>
  );
};

export default Partners;
