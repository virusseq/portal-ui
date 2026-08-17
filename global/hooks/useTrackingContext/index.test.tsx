/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import ReactGA from 'react-ga4';

import { act, render } from '@testing-library/react';
import { useRouter } from 'next/router';

import { getConfig } from '#global/config';
import useAuthContext from '#global/hooks/useAuthContext';

import useTrackingContext, { TrackingContextType, TrackingProvider } from './index';

jest.mock('react-ga4', () => ({
	__esModule: true,
	default: {
		initialize: jest.fn(),
		event: jest.fn(),
		set: jest.fn(),
		send: jest.fn(),
	},
}));
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
jest.mock('#global/config', () => ({
	getConfig: jest.fn(),
}));
jest.mock('#global/hooks/useAuthContext', () => jest.fn());

const mockUseRouter = useRouter as jest.Mock;
const mockGetConfig = getConfig as jest.Mock;
const mockUseAuthContext = useAuthContext as unknown as jest.Mock;

const Consumer = () => {
	useTrackingContext();
	return null;
};

const ContextCapture = ({ onReady }: { onReady: (context: TrackingContextType) => void }) => {
	onReady(useTrackingContext());
	return null;
};

describe('TrackingProvider', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseRouter.mockReturnValue({ events: { on: jest.fn(), off: jest.fn() } });
		mockUseAuthContext.mockReturnValue({ user: undefined });
	});

	it('does not initialize Google Analytics when no measurement ID is configured', () => {
		mockGetConfig.mockReturnValue({ NEXT_PUBLIC_DEBUG: false, NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: '' });

		render(
			<TrackingProvider>
				<Consumer />
			</TrackingProvider>,
		);

		expect(ReactGA.initialize).not.toHaveBeenCalled();
	});

	it('initializes Google Analytics when a measurement ID is configured', () => {
		mockGetConfig.mockReturnValue({ NEXT_PUBLIC_DEBUG: false, NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'G-TEST12345' });

		render(
			<TrackingProvider>
				<Consumer />
			</TrackingProvider>,
		);

		expect(ReactGA.initialize).toHaveBeenCalledWith('G-TEST12345', expect.any(Object));
	});

	it('does not fire tracked events while Google Analytics has not initialized', () => {
		mockGetConfig.mockReturnValue({ NEXT_PUBLIC_DEBUG: false, NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: '' });

		let context: TrackingContextType | undefined;
		render(
			<TrackingProvider>
				<ContextCapture
					onReady={(readyContext) => {
						context = readyContext;
					}}
				/>
			</TrackingProvider>,
		);

		act(() => {
			context?.trackEvent('facet_filter', { field: 'test' });
			context?.logEvent({ category: 'Test', action: 'test' });
		});

		expect(ReactGA.event).not.toHaveBeenCalled();
	});
});
