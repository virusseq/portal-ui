import { css } from '@emotion/react';

import { Modal } from '#components/Modal';
import defaultTheme from '#components/theme/index';

type ConfirmSubmissionModalProps = {
	onClose: () => void;
	onSubmit: () => Promise<void>;
};

const ConfirmSubmissionModal = ({ onClose, onSubmit }: ConfirmSubmissionModalProps) => {
	return (
		<Modal
			showActionButton={true}
			disableActionButton={false}
			onCloseClick={onClose}
			onActionClick={onSubmit}
			actionText="Confirm"
			closeText="Cancel"
			title={'Submit Confirmation'}
		>
			<p
				css={css`
					padding-right: 7px;
					padding-left: 7px;
					${defaultTheme.typography.baseFont}
				`}
			>
				Please confirm that your selection is complete and ready for submission.
			</p>
		</Modal>
	);
};

export default ConfirmSubmissionModal;
