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
import SystemAlert, { Alert } from './helper';
import { getConfig } from '../../global/config';


type SystemAlert = {
  dismissable: boolean;
  id: string;
  level: 'error' | 'info' | 'warning';
  message?: string;
  title: string;
}

// TODO - error hanlding for JSON.parse
 
const getLocalStorage = () => JSON.parse(localStorage.getItem('SYSTEM_ALERTS_DISMISSED_IDS') || "[]");
const setLocalStorage = (ids: string[]) => {
  localStorage.setItem('SYSTEM_ALERTS_DISMISSED_IDS', JSON.stringify(ids));
}
const { NEXT_PUBLIC_SYSTEM_ALERT } = getConfig();
const alerts = JSON.parse(NEXT_PUBLIC_SYSTEM_ALERT) as Alert[];
const alertIds = alerts.map(alert => alert.id);

const SystemAlerts = () => {  

  const [dismissedAlerts, setDismissedAlerts] = useState<Array<string>>([]);

  useEffect(() => {
    const ids = getLocalStorage();
    setDismissedAlerts(ids);
  }, []);

  const handleClose = (id: string) => {
    console.log(id)
    // add id to dismissed ones and filter out stale ids
    const ids = dismissedAlerts.concat(id).filter(id => alertIds.includes(id));
    setDismissedAlerts(ids);
    setLocalStorage(ids);
  };

  // const alertsDisplay = alerts.filter(({ id }) => !dismissedAlerts.includes(id));

  return (<> {alerts.filter(alert => !dismissedAlerts.includes(alert.id)).map((alert) => (
          <SystemAlert
            alert={alert}
            key={alert.id}
            onClose={() => handleClose(alert.id)}
          />
        ))}
        </>);
}

export default SystemAlerts;
