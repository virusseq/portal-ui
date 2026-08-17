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

/**
 * `react-ga4`'s own `event()` accepts `UaEventOptions | string`, but that `UaEventOptions` type
 * isn't actually exported from the package (declared internally, not in its public `export`
 * statement), and this app only ever calls it with the object form. Defined locally to match that.
 */
export type LogEventFunctionType = (options: {
	category: string;
	action: string;
	label?: string;
	value?: number;
}) => void;

/**
 * GA4-native named event with structured parameters, the shape new events should use going
 * forward (see `./events.ts`), as opposed to `LogEventFunctionType`'s older category/action shape.
 */
export type TrackEventParams = Record<string, string | number | boolean>;
export type TrackEventFunctionType = (name: string, params?: TrackEventParams) => void;

export type TrackingContextType = {
	logEvent: LogEventFunctionType;
	trackEvent: TrackEventFunctionType;
};

export type TrackingStateType = {
	isInitialized: boolean;
	hasUser: boolean;
};
