import { NotificationInfo, SuccessStateReason } from './useNotifier';

function createNotificationData(ni: NotificationInfo) {
  let message = <div>Unexpected behavior has occured.</div>;
  let title: string = 'Unexpected behavior has occured.';

  const BoldedStudy = <b>{ni.studyId}</b>;
  const Submitters = ni.submitters ? ni.submitters.join(', ') : '';

  // HAPPY PATHS
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
  }

  // SAD PATHS
  else if (ni.successStateReason === SuccessStateReason.SUBMITTERS_NOT_FOUND) {
    message = (
      <div>
        Submtters need to be registered before adding them to a study. Thse submitters could not be
        found: {Submitters}
      </div>
    );
    title = 'Submtter(s) not found';
  } else if (ni.successStateReason === SuccessStateReason.STUDY_NOT_FOUND) {
    message = <div>Study {BoldedStudy} could not be found. Has it been created?</div>;
    title = 'Study not found';
  } else if (ni.successStateReason === SuccessStateReason.STUDY_ALREADY_EXISTS) {
    message = (
      <div>{BoldedStudy} already exists as a study ID. All studies require a unique study ID.</div>
    );
    title = 'Your study could not be created';
  } else if (ni.successStateReason === SuccessStateReason.SUBMITTERS_ALREADY_IN_STUDY) {
    message = (
      <div>
        These submitters are already in {BoldedStudy}: {Submitters}
      </div>
    );
    title = 'Submitter(s) could not be added';
  } else if (ni.successStateReason === SuccessStateReason.SUBMITTER_NOT_IN_STUDY) {
    message = (
      <div>
        Submitter {Submitters} is not a part of {BoldedStudy}. Can only remove submitters from study
        they are a part of.
      </div>
    );
    title = 'Submitter could not be removed';
  } else if (ni.successStateReason === SuccessStateReason.FAILED_TO_CREATE_STUDY) {
    message = <div>{BoldedStudy} could not be created due to an unknown error.</div>;
    title = 'Your study could not be created';
  } else if (ni.successStateReason === SuccessStateReason.FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY) {
    message = (
      <div>
        {Submitters} could not be removed from {BoldedStudy} due to an unknown error.
      </div>
    );
    title = 'Submitter(s) could not be removed';
  } else if (ni.successStateReason === SuccessStateReason.FAILED_TO_ADD_SUBMITTERS_TO_STUDY) {
    message = (
      <div>
        {Submitters} could not be added to {BoldedStudy} due to an unknown error.
      </div>
    );
    title = 'Submitter(s) could not be added';
  }

  return { message, title, success: ni.success };
}

export default createNotificationData;
