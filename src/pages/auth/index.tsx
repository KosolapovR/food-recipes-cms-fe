import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { auth } from '../../api/auth';
import { register } from '../../api/register';
import { Button, TextField, Link } from '../../components';
import { AuthTokenContext } from '../../context/auth-token-context';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Min length 3')
    .max(255, 'Max length 255')
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().min(4, 'Min length 4').required('Required'),
});

const registrationFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Min length 3')
    .max(255, 'Max length 255')
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().min(4, 'Min length 4').required('Required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const Auth = () => {
  const { setToken } = useContext(AuthTokenContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const { mutateAsync, isLoading } = useMutation(isLoginForm ? auth : register);

  const { handleChange, handleSubmit, values, getFieldMeta } = useFormik({
    initialValues: {
      email: undefined,
      password: undefined,
      repeat_password: undefined,
    },
    validationSchema: isLoginForm
      ? loginFormValidationSchema
      : registrationFormValidationSchema,
    onSubmit: async ({ email, password }) => {
      const res = await mutateAsync({ email, password });
      if (res instanceof AxiosError) {
        toast.error(res.response.data, {
          data: res,
        });
        return;
      }
      const token = res.token;
      setToken(token);
      queryClient.setQueryData(['auth'], () => res);
      if (token) navigate({ to: '/recipes', replace: true });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-96 shadow-lg rounded-lg p-6 bg-white text-center">
        <span className="inline-block mb-4 text-xl font-bold">
          {isLoginForm ? 'Sign in' : 'Sign up'}
        </span>
        <form name="auth" onSubmit={handleSubmit}>
          <TextField
            id="email"
            title="Email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="email"
            value={values.email}
            meta={getFieldMeta('email')}
          />
          <TextField
            id="password"
            title="Password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={values.password}
            autoComplete={'current-password'}
            meta={getFieldMeta('password')}
          />
          {!isLoginForm && (
            <TextField
              id="repeat_password"
              title="Repeat Password"
              type="password"
              placeholder="repeat password"
              onChange={handleChange}
              value={values.repeat_password}
              autoComplete={'new-password'}
              meta={getFieldMeta('repeat_password')}
            />
          )}
          <Link
            className={
              'text-sm text-blue-500 hover:text-blue-700 cursor-pointer'
            }
            onClick={() => {
              setIsLoginForm((x) => !x);
            }}
          >
            {isLoginForm
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </Link>
          <Button
            type="submit"
            title="Submit"
            isLoading={isLoading}
            className="w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Auth;
