import styled from '@emotion/styled';
import React, { ReactNode, ReactNodeArray } from 'react';
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

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${defaultTheme.colors.white};
  border-radius: 15px;
  padding: 15px;
`;

type ModalHeaderProps = { title: string; onCancelClick: () => void };

const ModalHeader = ({ title, onCancelClick }: ModalHeaderProps) => {
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
      <StyledTitle>{title}</StyledTitle>
      <div
        css={css`
          font-size: 25px;
          cursor: pointer;
        `}
        onClick={onCancelClick}
      >
        <DismissIcon height={15} width={15} fill={defaultTheme.colors.black} />
      </div>
    </div>
  );
};

const ModalBody = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

type ModalFooterProps = {
  showActionButton?: boolean;
  disableActionButton?: boolean;
  actionText?: string;
  cancelText?: string;
  onActionClick?: () => void;
  onCancelClick?: () => void;
};

const ModalFooter = ({
  showActionButton = false,
  disableActionButton = true,
  actionText = 'Action',
  cancelText = 'Cancel',
  onActionClick = () => {},
  onCancelClick = () => {},
}: ModalFooterProps) => {
  return (
    <div
      css={css`
        padding: 8px 0px;
        border-top: solid 1px ${defaultTheme.colors.grey_4};
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      `}
    >
      {showActionButton && (
        <Button onClick={onActionClick} disabled={disableActionButton}>
          {actionText}
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
        onClick={onCancelClick}
      >
        {cancelText}
      </UnStyledButton>
    </div>
  );
};

type ModalProps = ModalHeaderProps & ModalFooterProps & { children: ReactNode | ReactNodeArray };

export const Modal = ({ children, title, onCancelClick, ...restFooterProps }: ModalProps) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();

  const ModalContent = (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader title={title} onCancelClick={onCancelClick} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter onCancelClick={onCancelClick} {...restFooterProps} />
      </ModalContainer>
    </ModalOverlay>
  );

  return ref && mounted ? ReactDOM.createPortal(ModalContent, ref) : null;
};
