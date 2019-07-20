import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Input name="email" type="email" placeholder="E-mail" />
          <div className="input-border" />
        </div>
        <div className="input-wrapper">
          <Input name="password" type="password" placeholder="Password" />
          <div className="input-border" />
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/register">Create</Link>
        </p>
      </Form>
    </>
  );
}
