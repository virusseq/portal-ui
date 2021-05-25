import DismissIcon from '../../theme/icons/dismiss';
import defaultTheme from '../../theme/index';
import { css } from '@emotion/react';
import { Checkmark, Error } from '../../theme/icons';

const CircularCheckmark = () => {
  return (
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
};

const ErrorMark = () => {
  return <Error size={40} />;
};

const NotifactionDiv = ({ notification, onDismiss }: any) => {
  return notification ? (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;  
        padding: 15px 15px 20px 15px;
        border-radius: 8px;
        background-color: ${
          notification.success ? defaultTheme.colors.success_light : defaultTheme.colors.error_1
        }};
      `}
    >
      {notification.success ? <CircularCheckmark /> : <ErrorMark />}
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
          {notification.title}
        </div>
        <div
          css={css`
            ${defaultTheme.typography.regular}
            margin-top: 3px;
          `}
        >
          {notification.message}
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
  ) : null;
};

export default NotifactionDiv;
