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
// import { LOCAL_STORAGE_SYSTEM_ALERTS_KEY } from 'global/constants';
import SystemAlert, { AlertLevel } from './helper';

type SystemAlert = {
  dismissable: boolean;
  id: string;
  level: 'error' | 'info' | 'warning';
  message?: string;
  title: string;
}

// const getLocalStorage = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_SYSTEM_ALERTS_KEY)) || [];

// const setLocalStorage = (ids: string[]) => {
//   localStorage.setItem(LOCAL_STORAGE_SYSTEM_ALERTS_KEY, JSON.stringify(ids));
// }

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([{
    id: "1",
    level: "error" as AlertLevel,
    title: "I'm an alert for error",
    message: "This is my message",
    dismissible: true
  },{
    id: "1",
    level: "warning" as AlertLevel,
    title: "I'm an alert for warning",
    message: "This is my message. Its a looooooooooooooooooooooot longer then the other one! :)",
    dismissible: false
  }]);
  // const [dismissedAlerts, setDismissedAlerts] = useState([]);

  // useEffect(() => {
  //   const ids = getLocalStorage();
  //   setDismissedAlerts(ids);
  // }, []);

  const handleClose = (id: string) => {
    console.log(id)
    // const ids = dismissedAlerts.concat(id);
    // setDismissedAlerts(ids);
    // setLocalStorage(ids);
  };

  // const alertsDisplay = alerts.filter(({ id }) => !dismissedAlerts.includes(id));

  return (<> {alerts.map((alert) => (
          <SystemAlert
            alert={alert}
            key={alert.id}
            onClose={() => handleClose(alert.id)}
          />
        ))}
        </>);
}

export default SystemAlerts;
