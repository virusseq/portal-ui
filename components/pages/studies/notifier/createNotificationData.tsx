import { NotificationInfo, NotificationType } from './useNotifier';

function createNotificationDivData(ni: NotificationInfo) {
  const BoldedStudy = <b>{ni.studyId}</b>;
  const Submitters = ni.submitters ? ni.submitters.join(', ') : '';

  // HAPPY PATHS
  if (ni.notifierReason === NotificationType.STUDY_CREATED) {
    return {
      message: <div>You can now add submitters to {BoldedStudy}</div>,
      title: 'Study was successfully created',
      success: true,
    };
  } else if (ni.notifierReason === NotificationType.SUBMITTERS_ADDED) {
    return {
      message: (
        <div>
          Added to {BoldedStudy}: {Submitters}
        </div>
      ),
      title: 'Data submitter(s) successfully added',
      success: true,
    };
  } else if (ni.notifierReason === NotificationType.SUBMITTERS_REMOVED) {
    return {
      message: (
        <div>
          Removed from {BoldedStudy}: {Submitters}
        </div>
      ),
      title: 'Data submitter(s) successfully removed',
      success: true,
    };
  }

  // SAD PATHS
  else if (ni.notifierReason === NotificationType.SUBMITTERS_NOT_FOUND) {
    return {
      message: (
        <div>
          Submitter(s) could not be found: [{Submitters}]. Submtters need to be registered before
          adding them to a study.
        </div>
      ),
      title: 'Submtter(s) not found',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.STUDY_NOT_FOUND) {
    return {
      message: <div>Study {BoldedStudy} could not be found. Has it been created?</div>,
      title: 'Study not found',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.STUDY_ALREADY_EXISTS) {
    return {
      message: (
        <div>
          {BoldedStudy} already exists as a study ID. All studies require a unique study ID.
        </div>
      ),
      title: 'Your study could not be created',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.SUBMITTERS_ALREADY_IN_STUDY) {
    return {
      message: (
        <div>
          These submitters are already in {BoldedStudy}: {Submitters}
        </div>
      ),
      title: 'Submitter(s) could not be added',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.SUBMITTER_NOT_IN_STUDY) {
    return {
      message: (
        <div>
          Submitter {Submitters} is not a part of {BoldedStudy}. Can only remove submitters from
          study they are a part of.
        </div>
      ),
      title: 'Submitter could not be removed',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.FAILED_TO_CREATE_STUDY) {
    return {
      message: <div>{BoldedStudy} could not be created due to an unknown error.</div>,
      title: 'Your study could not be created',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY) {
    return {
      message: (
        <div>
          {Submitters} could not be removed from {BoldedStudy} due to an unknown error.
        </div>
      ),
      title: 'Submitter(s) could not be removed',
      success: false,
    };
  } else if (ni.notifierReason === NotificationType.FAILED_TO_ADD_SUBMITTERS_TO_STUDY) {
    return {
      message: (
        <div>
          {Submitters} could not be added to {BoldedStudy} due to an unknown error.
        </div>
      ),
      title: 'Submitter(s) could not be added',
      success: false,
    };
  } else {
    return {
      message: <div>Unexpected behavior has occured.</div>,
      title: 'Unexpected behavior has occured.',
      success: false,
    };
  }
}

export default createNotificationDivData;
