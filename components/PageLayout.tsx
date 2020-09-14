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

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

import NavBar from './NavBar';
import Footer from './Footer';
import { PageHead } from './Head';
import ErrorNotification from './ErrorNotification';

const PageLayout = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => {
  return (
    <>
      <PageHead subtitle={subtitle}></PageHead>
      <div
        css={(theme) => css`
          display: grid;
          grid-template-rows: 50px 1fr;
          min-height: 100vh;
          ${theme.typography.regular}
          color: ${theme.colors.black};
        `}
      >
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export const ErrorPageLayout = ({
  children,
  subtitle,
  errorTitle,
}: {
  children: ReactNode;
  subtitle: string;
  errorTitle: string;
}) => {
  return (
    <PageLayout subtitle={subtitle}>
      <ErrorNotification
        size="lg"
        title={errorTitle}
        styles={`
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        {children}
      </ErrorNotification>
    </PageLayout>
  );
};
export default PageLayout;
