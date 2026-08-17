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

import ReactGA from 'react-ga4';

import { useRouter } from 'next/router';
import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react';

import { getConfig } from '#global/config';
import useAuthContext from '#global/hooks/useAuthContext';

import { LogEventFunctionType, TrackEventFunctionType, TrackingContextType, TrackingStateType } from './types';

const TrackingContext = createContext<TrackingContextType>({
	logEvent: () => null,
	trackEvent: () => null,
});

export const TrackingProvider = (props: { children: ReactElement }): ReactElement => {
	const { NEXT_PUBLIC_DEBUG, NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } = getConfig();
	const { user } = useAuthContext();
	const router = useRouter();

	const [analytics, setAnalytics] = useState<TrackingStateType>({
		isInitialized: false,
		hasUser: false,
	});

	const logEvent: LogEventFunctionType = useCallback(({ category, action, label, value }) => {
		setAnalytics((prev) => {
			if (prev.isInitialized) {
				ReactGA.event({
					category,
					action,
					...(label && { label }),
					...(value && { value }),
				});
			}
			return prev;
		});
	}, []);

	const trackEvent: TrackEventFunctionType = useCallback((name, params) => {
		setAnalytics((prev) => {
			if (prev.isInitialized) {
				ReactGA.event(name, params);
			}
			return prev;
		});
	}, []);

	useEffect(() => {
		if (!NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
			return;
		}

		const { isInitialized, hasUser } = analytics;

		const handleRouteChange = (url: string) => {
			ReactGA.set({ page: url });
			ReactGA.send({ hitType: 'pageview', page: url });
		};

		if (!isInitialized) {
			NEXT_PUBLIC_DEBUG && console.log('Initializing Google Analytics');

			ReactGA.initialize(NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
				gaOptions: {
					...(user?.id && { userId: user?.id }),
				},
			});

			NEXT_PUBLIC_DEBUG && console.log('Setting up event listener');

			router.events.on('routeChangeComplete', handleRouteChange);

			setAnalytics((prev) => ({
				...prev,
				isInitialized: true,
				hasUser: Boolean(user),
			}));
		} else if (isInitialized && !hasUser && user) {
			ReactGA.set({ userId: user.id });

			setAnalytics((prev) => ({
				...prev,
				hasUser: Boolean(user),
			}));
		}

		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [NEXT_PUBLIC_DEBUG, NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, analytics, router.events, user]);

	return (
		<TrackingContext.Provider
			value={{ logEvent, trackEvent }}
			{...props}
		/>
	);
};

const useTrackingContext = (): TrackingContextType => useContext(TrackingContext);

export default useTrackingContext;
export * from './types';
