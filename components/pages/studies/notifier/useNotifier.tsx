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

import { useState } from 'react';
import createNotificationData from './createNotificationData';
import NotifactionDiv from './NotificationDiv';

export enum SuccessStateReason {
  STUDY_CREATED = 'STUDY_CREATED',
  SUBMITTERS_ADDED = 'SUBMITTERS_ADDED',
  SUBMITTERS_REMOVED = 'SUBMITTERS_REMOVED',
  STUDY_NOT_FOUND = 'STUDY_NOT_FOUND',
  SUBMITTERS_NOT_FOUND = 'SUBMITTERS_NOT_FOUND',
  STUDY_ALREADY_EXISTS = 'STUDY_ALREADY_EXISTS',
  SUBMITTERS_ALREADY_IN_STUDY = 'SUBMITTER_ALREADY_IN_STUDY',
  SUBMITTER_NOT_IN_STUDY = 'SUBMITTER_NOT_IN_STUDY',
  FAILED_TO_CREATE_STUDY = 'FAILED_TO_CREATE_STUDY',
  FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY = 'FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY',
  FAILED_TO_ADD_SUBMITTERS_TO_STUDY = 'FAILED_TO_ADD_SUBMITTERS_TO_STUDY',
}

export type NotificationInfo = {
  success: boolean;
  successStateReason: SuccessStateReason;
  studyId?: string;
  submitters?: string[];
};

const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationInfo[]>([]);

  const addNotification = (n: NotificationInfo) => {
    setNotifications(notifications.concat(n));
  };

  const buildDismissFunc = (i: number) => () => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(i, 1);
    setNotifications(updatedNotifications);
  };

  const NotificationsDiv = (
    <div>
      {notifications.map((n, i) => {
        const { message, success, title } = createNotificationData(n);

        return (
          <NotifactionDiv
            key={i}
            message={message}
            title={title}
            success={success}
            onDismiss={buildDismissFunc(i)}
          />
        );
      })}
    </div>
  );

  return { addNotification, NotificationsDiv };
};

export default useNotification;
