import * as Yup from 'yup';

export const storeSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6),
});

export const updateSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .required()
    .email(),
  oldPassword: Yup.string()
    .min(6)
    .when('password', (password, field) =>
      password ? field.required() : field
    ),
  password: Yup.string().min(6),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});
