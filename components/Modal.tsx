import styled from '@emotion/styled';
import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import DismissIcon from './theme/icons/dismiss';
import defaultTheme from './theme';
import { modalPortalRef } from './Root';
import { css } from '@emotion/react';
import Button, { UnStyledButton } from './Button';

const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

const ModalOverlay = ({
  children,
  widthPx,
}: {
  children: ReactElement;
  widthPx: number;
}): ReactElement => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: ${widthPx}px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      `}
    >
      {children}
    </div>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${defaultTheme.colors.white};
  border-radius: 15px;
  padding: 15px;
`;

type ModalHeaderProps = { title: string; onCloseClick: () => void };

const ModalHeader = (props: ModalHeaderProps) => {
  const StyledTitle = styled('div')`
    margin-top: 10px;
    margin-left: 5px;
    ${defaultTheme.typography.heading}
  `;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      `}
    >
      <StyledTitle>{props.title}</StyledTitle>
      <div
        css={css`
          font-size: 25px;
          cursor: pointer;
        `}
        onClick={props.onCloseClick}
      >
        <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
      </div>
    </div>
  );
};

const ModalBody = styled.div`
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
`;

type ModalFooterProps = {
  showActionButton: boolean;
  disableActionButton: boolean;
  actionText: string;
  closeText: string;
  onActionClick: () => void;
  onCloseClick: () => void;
};

const ModalFooter = (props: ModalFooterProps) => {
  return (
    <div
      css={css`
        margin-top: 15px;
        padding: 8px 0px;
        border-top: solid 1px ${defaultTheme.colors.grey_4};
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      `}
    >
      {props.showActionButton && (
        <Button onClick={props.onActionClick} disabled={props.disableActionButton}>
          {props.actionText}
        </Button>
      )}
      <UnStyledButton
        css={css`
          ${defaultTheme?.typography.subheading2};
          background-color: ${defaultTheme.colors.white};
          color: ${defaultTheme.colors.primary};
          border: none;
          padding: 6px 15px;
        `}
        onClick={props.onCloseClick}
      >
        {props.closeText}
      </UnStyledButton>
    </div>
  );
};

type ModalProps = Partial<ModalHeaderProps> &
  Partial<ModalFooterProps> &
  Partial<{ children: ReactNode }>;

export const Modal = ({
  children = null,
  title = '',
  showActionButton = false,
  disableActionButton = true,
  actionText = 'Action',
  closeText = 'Close',
  onActionClick = () => {},
  onCloseClick = () => {},
}: ModalProps) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();

  const ModalContent = (
    <ModalOverlay widthPx={window.outerWidth}>
      <ModalContainer>
        <ModalHeader title={title} onCloseClick={onCloseClick} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter
          showActionButton={showActionButton}
          disableActionButton={disableActionButton}
          closeText={closeText}
          actionText={actionText}
          onCloseClick={onCloseClick}
          onActionClick={onActionClick}
        />
      </ModalContainer>
    </ModalOverlay>
  );

  return ref && mounted ? ReactDOM.createPortal(ModalContent, ref) : null;
};
