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

import dynamic from 'next/dynamic';
import urlJoin from 'url-join';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';
import { getConfig } from '../../../global/config';
import createArrangerFetcher from '../../utils/arrangerFetcher';
import { useEffect, useState } from 'react';
import ErrorNotification from '../../ErrorNotification';
import getConfigError from './getConfigError';
import Loader from '../../Loader';
import { css } from '@emotion/core';
import sleep from '../../utils/sleep';

const Arranger = dynamic(
  () => import('@arranger/components/dist/Arranger').then((comp) => comp.Arranger),
  { ssr: false },
) as any;

export interface PageContentProps {
  sqon: RepoFiltersType;
  selectedTableRows: string[];
  setSelectedTableRows: (id: string) => void;
  projectId: string;
  index: string;
  api: ({
    endpoint,
    body,
    headers,
    method,
  }: {
    endpoint: string;
    body: string;
    headers: any;
    method: string;
  }) => Promise<any>;
  setSQON: (sqon: RepoFiltersType) => void;
  fetchData?: (projectId: string) => Promise<any>;
}

export type Project = {
  id: string;
  active: boolean;
  indices: [{ id: string; esIndex: string; graphqlField: string }];
};

const arrangerFetcher = createArrangerFetcher({});

const projectsQuery = `
  query {
    projects {
      id
      active
      indices {
        id
        esIndex
        graphqlField
      }
    }
  }
`;

const RepositoryPage = () => {
  const {
    NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX,
  } = getConfig();

  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  useEffect(() => {
    const { NEXT_PUBLIC_ARRANGER_API } = getConfig();
    fetch(urlJoin(NEXT_PUBLIC_ARRANGER_API, 'admin/graphql'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {},
        query: projectsQuery,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Could not retrieve available projects from Arranger server!');
        }
        return res.json();
      })
      .then(async ({ data: { projects } }: { data: { projects: Project[] } }) => {
        await setAvailableProjects(projects);
        // 1s delay so loader doesn't flicker on and off too quickly
        await sleep(1000);
        setLoadingProjects(false);
      })
      .catch(async (err) => {
        console.warn(err);
        // same as above comment
        await sleep(1000);
        setLoadingProjects(false);
      });
  }, []);

  const ConfigError = getConfigError({
    availableProjects,
    projectId: NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    index: NEXT_PUBLIC_ARRANGER_INDEX,
    graphqlField: NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
  });

  return (
    <PageLayout subtitle="Data Explorer">
      {loadingProjects ? (
        <div
          css={(theme) =>
            css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: ${theme.colors.grey_2};
            `
          }
        >
          <Loader />
        </div>
      ) : ConfigError ? (
        <ErrorNotification
          title={'DMS Configuration Error'}
          size="lg"
          styles={`
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          {ConfigError}
        </ErrorNotification>
      ) : (
        <Arranger
          api={arrangerFetcher}
          projectId={NEXT_PUBLIC_ARRANGER_PROJECT_ID}
          graphqlField={NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD}
          index={NEXT_PUBLIC_ARRANGER_INDEX}
          render={(props: PageContentProps) => {
            return <PageContent {...props} />;
          }}
        />
      )}
    </PageLayout>
  );
};

export default RepositoryPage;
