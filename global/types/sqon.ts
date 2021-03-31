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

export type ArrayFieldKeys = 'in' | 'is' | 'filter';

export type ScalarFieldKeys = '>=' | '<=' | '>' | '<';

export type CombinationKeys = 'and' | 'or' | 'not';

export type ArrayFieldValue = Array<string | number> | string;
export type ScalarFieldValue = number;

export interface FilterField {
  fields: string[];
  value: ArrayFieldValue;
}

export interface FilterFieldOperator {
  op: ArrayFieldKeys;
  content: FilterField;
}

export interface ArrayField {
  field: string;
  value: ArrayFieldValue;
}

export interface ScalarField {
  field: string;
  value: ScalarFieldValue;
}

export interface ArrayFieldOperator {
  op: ArrayFieldKeys;
  content: ArrayField;
}

export interface ScalarFieldOperator {
  op: ScalarFieldKeys;
  content: ScalarField;
}

export type FieldOperator = ArrayFieldOperator | ScalarFieldOperator;

export type RepoFiltersType = {
  op: 'and';
  content: FieldOperator[];
};
