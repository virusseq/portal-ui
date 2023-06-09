import styled from '@emotion/styled';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/react';

import DismissIcon from './theme/icons/dismiss';
import defaultTheme from './theme';
import { modalPortalRef } from './Root';
import Button, { UnStyledButton } from './Button';
import { navBarRef } from './NavBar';

const useMounted = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return mounted;
};

const ModalOverlay = ({
	children,
	width,
	height,
}: {
	children: ReactElement;
	width: string;
	height: string;
}): ReactElement => {
	return (
		<div
			css={css`
				position: absolute;
				top: 0;
				left: 0;
				width: ${width};
				height: ${height};
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

type ModalHeaderProps = { title: string | ReactElement; onCloseClick: () => void };

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
				align-items: flex-start;
				margin-bottom: 10px;
			`}
		>
			{typeof props.title === 'string' ? <StyledTitle>{props.title}</StyledTitle> : props.title}
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

const DEFAULT_WIDTH = '110vw';

export const Modal = ({
	children = null,
	title = '',
	showActionButton = false,
	disableActionButton = true,
	actionText = 'Action',
	closeText = 'Close',
	onActionClick = () => {
		// console.log('nada');
	},
	onCloseClick = () => {
		// console.log('nada');
	},
}: ModalProps) => {
	const navBar = navBarRef.current;
	const [width, setWidth] = useState(navBar ? `${navBar.clientWidth}px` : DEFAULT_WIDTH);
	const [height, setHeight] = useState(`${window.innerHeight}px`);

	const ref = modalPortalRef.current;
	const mounted = useMounted();

	useEffect(() => {
		// This ui is currently not responsize, so there are pages and components (navBar) that overflow
		// if window size changes causing it becaome scrollable. When this happens ModalOverlay
		// with width and height 100% doesn't cover the entire UI. This event listener will resize the
		// window so that the overlay is always covering the entire UI. This solutions works for now,
		// but ideally we should make the UI responsive so this doesn't need to be done.
		window.addEventListener('resize', () => {
			setWidth(navBar ? `${navBar.clientWidth}px` : DEFAULT_WIDTH);
			setHeight(`${window.innerHeight}px`);
		});
	}, []);

	const ModalContent = (
		<ModalOverlay width={width} height={height}>
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
