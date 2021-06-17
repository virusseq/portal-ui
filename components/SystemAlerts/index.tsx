/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useEffect, useState } from 'react';
import { SystemAlert, isAlertDefs, AlertDef } from './helper';
import { getConfig } from '../../global/config';

const SYSTEM_ALERTS_LOCAL_SOTRAGE_KEY = 'SYSTEM_ALERTS_DISMISSED_IDS';

const SystemAlerts = () => {
  const getParsedSystemAlerts = () => {
    try {
      const { NEXT_PUBLIC_SYSTEM_ALERTS } = getConfig();
      const systemAlerts = JSON.parse(NEXT_PUBLIC_SYSTEM_ALERTS);
      if (!isAlertDefs(systemAlerts)) {
        throw new Error('System Alert types are invalid!');
      }
      return systemAlerts;
    } catch (e) {
      console.error('Failed to parse systems alerts! Using empty array!', e);
      return [];
    }
  };
  const systemAlerts = getParsedSystemAlerts();
  const systemAlertIds = systemAlerts.map((sa) => sa.id);

  const [displayAlerts, setDisplayAlerts] = useState<Array<AlertDef>>([]);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<Array<string>>([]);

  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem(SYSTEM_ALERTS_LOCAL_SOTRAGE_KEY) || '[]');
  };
  const setLocalStorage = (ids: string[]) => {
    localStorage.setItem(SYSTEM_ALERTS_LOCAL_SOTRAGE_KEY, JSON.stringify(ids));
  };

  useEffect(() => {
    const ids = getLocalStorage();

    setDisplayAlerts(systemAlerts.filter((alert) => !ids.includes(alert.id)));
    setDismissedAlertIds(ids);
  }, []);

  const handleClose = (id: string) => {
    // add id to dismissed ones and filter out stale ids
    const ids = dismissedAlertIds.concat(id).filter((id) => systemAlertIds.includes(id));

    setDisplayAlerts(systemAlerts.filter((alert) => !ids.includes(alert.id)));
    setDismissedAlertIds(ids);
    setLocalStorage(ids);
  };

  return (
    <>
      {displayAlerts.map((sa) => (
        <SystemAlert alert={sa} key={sa.id} onClose={() => handleClose(sa.id)} />
      ))}
    </>
  );
};

export default SystemAlerts;
