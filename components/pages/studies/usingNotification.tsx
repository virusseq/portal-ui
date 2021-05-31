import DismissIcon from '../../theme/icons/dismiss';
import defaultTheme from '../../theme/index';
import { css } from '@emotion/react';
import { Checkmark, Error } from '../../theme/icons';
import { useState } from 'react';

const CircularCheckmark = (
  <div
    css={css`
      padding: 6px 6px 2px 6px;
      border-radius: 50%;
      background-color: ${defaultTheme.colors.success_dark};
    `}
  >
    <Checkmark size={20} fill={defaultTheme.colors.white} />
  </div>
);

const ErrorMark = <Error size={40} />;

type NotifactionDivInfo = {
  success: boolean;
  message: string;
  title: string;
};

const NotifactionDiv = ({
  success,
  message,
  title,
  onDismiss,
}: NotifactionDivInfo & {
  onDismiss: () => void;
}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;  
        padding: 15px 15px 20px 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: ${
          success ? defaultTheme.colors.success_light : defaultTheme.colors.error_1
        }};
      `}
    >
      {success ? CircularCheckmark : ErrorMark}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 100%;
          margin-left: 15px;
        `}
      >
        <div
          css={css`
            ${defaultTheme.typography.heading}
          `}
        >
          {title || 'I NEED TO COME FROM SOME WHERE'}
        </div>
        <div
          css={css`
            ${defaultTheme.typography.regular}
            margin-top: 3px;
          `}
        >
          {message}
        </div>
      </div>
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={onDismiss}
      >
        <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
      </div>
    </div>
  );
};

export enum ErrorReasons {
  STUDY_NOT_FOUND = 'STUDY_NOT_FOUND',
  SUBMITTERS_NOT_FOUND = 'STUDY_NOT_FOUND',
  FAILED_TO_CREATE_STUDY_IN_METADATA_SVC = 'FAILED_TO_CREATE_STUDY_IN_METADATA_SVC',
  FAILED_TO_CREATE_STUDY_IN_AUTH_SVC = 'FAILED_TO_CREATE_STUDY_IN_AUTH_SVC',
  FAILED_TO_REMOVE_SUBMITTERS_FROM_STUDY_GROUP = 'FAILED_TO_REMOVE_SUBMITTERS_FROM_STUDY_GROUP',
  FAILED_TO_ADD_SUBMITTERS_TO_STUDY_GROUP = 'FAILED_TO_ADD_SUBMITTERS_TO_STUDY_GROUP',
}

type NotificationInfo = {
  success: boolean;
  message: string;
  reason?: string; // TODO - restrict with enum and rename to error code/type
  errorStudyId?: string;
  errorSubmitters?: string[];
};

function createNotificationData(ni: NotificationInfo): NotifactionDivInfo {
  let message: string = '';
  let title: string = '';

  if (ni.reason === ErrorReasons.STUDY_NOT_FOUND) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'STUDY_NOT_FOUND';
  }
  if (ni.reason === ErrorReasons.SUBMITTERS_NOT_FOUND) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'SUBMITTERS_NOT_FOUND';
  }
  if (ni.reason === ErrorReasons.FAILED_TO_CREATE_STUDY_IN_METADATA_SVC) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'FAILED_TO_CREATE_STUDY_IN_METADATA_SVC';
  }
  if (ni.reason === ErrorReasons.FAILED_TO_CREATE_STUDY_IN_AUTH_SVC) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'FAILED_TO_CREATE_STUDY_IN_AUTH_SVC';
  }
  if (ni.reason === ErrorReasons.FAILED_TO_REMOVE_SUBMITTERS_FROM_STUDY_GROUP) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'FAILED_TO_REMOVE_SUBMITTERS_FROM_STUDY_GROUP';
  }
  if (ni.reason === ErrorReasons.FAILED_TO_ADD_SUBMITTERS_TO_STUDY_GROUP) {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'FAILED_TO_ADD_SUBMITTERS_TO_STUDY_GROUP';
  } else {
    message = 'Unexpected error has occured. Try refreshing your page.';
    title = 'Unexpected error has occured!';
  }

  return { message, title, success: ni.success };
}

const dummy: NotificationInfo[] = [
  { success: false, message: 'BOoohoo' },
  { success: false, message: 'BOoohoo' },
];

const usingNotification = () => {
  const [notifications, setNotifications] = useState<NotificationInfo[]>(dummy);

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

export default usingNotification;
