import { NotificationInfo, SuccessStateReason } from './useNotifier';

function createNotificationData(ni: NotificationInfo) {
  let message = <div>Unexpected behavior has occured.</div>;
  let title: string = 'Unexpected behavior has occured.';

  const BoldedStudy = <b>{ni.studyId}</b>;
  const Submitters = ni.submitters ? ni.submitters.join(', ') : '';

  if (ni.successStateReason === SuccessStateReason.STUDY_CREATED) {
    message = <div>You can now add submitters to {BoldedStudy}</div>;
    title = 'Study was successfully created';
  } else if (ni.successStateReason === SuccessStateReason.SUBMITTERS_ADDED) {
    message = (
      <div>
        Added to {BoldedStudy}: {Submitters}
      </div>
    );
    title = 'Data submitter(s) successfully added';
  } else if (ni.successStateReason === SuccessStateReason.SUBMITTERS_REMOVED) {
    message = (
      <div>
        Removed from {BoldedStudy}: {Submitters}
      </div>
    );
    title = 'Data submitter(s) successfully removed';
  } else if (ni.successStateReason === SuccessStateReason.SUBMITTERS_NOT_FOUND) {
    message = (
      <div>
        Removed from {BoldedStudy}: {Submitters}
      </div>
    );
    title = 'Data submitter(s) successfully removed';
  }

  return { message, title, success: ni.success };
}

export default createNotificationData;
