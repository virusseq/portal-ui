import yup from '../../../../global/utils/validations';

export const CreateStudyValidations = yup
  .object()
  .shape({
    studyId: yup.string().trim().label('Study ID').required().max(15),
    organization: yup.string().trim().label('Organization').required(),
    name: yup.string().trim().label('Study Name').required(),
    description: yup.string().trim().label('Description'),
  })
  .defined();

export const AddSubmittersValidations = yup
  .object()
  .shape({
    studyId: yup.string().required().trim().label('Study ID').max(15).defined(),
    submitters: yup
      .array()
      .of(yup.string().trim().label('Email Address').required().email())
      .defined(),
  })
  .defined();
