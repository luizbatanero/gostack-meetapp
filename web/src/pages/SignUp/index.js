import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Input name="name" type="text" placeholder="Name" />
          <div className="input-border" />
        </div>
        <div className="input-wrapper">
          <Input name="email" type="email" placeholder="E-mail" />
          <div className="input-border" />
        </div>
        <div className="input-wrapper">
          <Input name="password" type="password" placeholder="Password" />
          <div className="input-border" />
        </div>

        <button type="submit" disabled={loading}>
          Create account
        </button>

        <p>
          Already have an account?
          <Link to="/">Login</Link>
        </p>
      </Form>
    </>
  );
}
