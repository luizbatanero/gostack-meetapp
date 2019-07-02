import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string().required(),
});
