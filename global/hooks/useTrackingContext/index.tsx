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

import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

import useAuthContext from '../useAuthContext';
import { getConfig } from '../../config';
import { LogEventFunctionType, TrackingContextType, TrackingStateType } from './types';

const TrackingContext = createContext<TrackingContextType>({
  addTracker: () => null,
  logEvent: () => null,
  removeTracker: () => null,
});

export const TrackingProvider = (props: { children: ReactElement }): ReactElement => {
  const { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } = getConfig();
  const { user } = useAuthContext();
  const router = useRouter();

  const [analytics, setAnalytics] = useState<TrackingStateType>({
    isInitialized: false,
    hasUser: false,
    trackers: [],
  });

  const handleRouteChange = (url: string) => {
    ReactGA.set({ page: url }, analytics.trackers);
    ReactGA.pageview(url, analytics.trackers);
  };

  const logEvent: LogEventFunctionType = ({ category, action, label, value }) => {
    if (analytics.isInitialized) {
      ReactGA.event(
        {
          category,
          action,
          ...(label && { label }),
          ...(value && { value }),
        },
        analytics.trackers,
      );
    }
  };

  const addTracker = (trackerId: string, trackerName: string) => {
    if (analytics.isInitialized) {
      ReactGA.addTrackers([
        {
          trackingId: trackerId,
          gaOptions: {
            name: trackerName,
          },
        },
      ]);

      setAnalytics((prev) => ({
        ...prev,
        trackers: [...prev.trackers, trackerName],
      }));
    }
  };

  const removeTracker = (trackerName: string) => {
    if (analytics.isInitialized) {
      setAnalytics((prev) => ({
        ...prev,
        trackers: prev.trackers.filter((tracker) => tracker !== trackerName),
      }));
    }
  };

  useEffect(() => {
    const { isInitialized, hasUser, trackers } = analytics;

    if (!isInitialized) {
      ReactGA.initialize(NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
        debug: true,
        gaOptions: {
          ...(user?.id && { userId: user?.id }),
        },
      });

      console.log('setting up event listener');
      router.events.on('routeChangeComplete', handleRouteChange);

      setAnalytics((prev) => ({
        ...prev,
        isInitialized: true,
        hasUser: Boolean(user),
      }));
    } else if (isInitialized && !hasUser && user) {
      ReactGA.set({ userId: user.id }, trackers);

      setAnalytics((prev) => ({
        ...prev,
        hasUser: Boolean(user),
      }));
    }

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events, user]);

  return <TrackingContext.Provider value={{ addTracker, logEvent, removeTracker }} {...props} />;
};

const useTrackingContext = (): TrackingContextType => useContext(TrackingContext);

export default useTrackingContext;
export * from './types';
