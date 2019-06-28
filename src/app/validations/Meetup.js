import * as Yup from 'yup';

export const storeSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.date().required(),
  banner_id: Yup.number().required(),
});
