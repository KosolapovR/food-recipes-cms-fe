import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { auth } from '../../api';
import { Button, TextField } from '../../components';
import { AuthTokenContext } from '../../context/auth-token-context';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Min length 3')
    .max(255, 'Max length 255')
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().min(4, 'Min length 4').required('Required'),
});

const Login = () => {
  const { setToken } = useContext(AuthTokenContext);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(auth);

  const { handleChange, handleSubmit, values, getFieldMeta } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (data) => {
      const res = await mutateAsync(data);
      setToken(res?.token);
      queryClient.setQueryData(['auth'], () => res);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-96 shadow-lg rounded-lg p-6 bg-white text-center">
        <span className="inline-block mb-4 text-xl font-bold">Sign in</span>
        <form>
          <TextField
            id="email"
            title="Email"
            placeholder="email"
            onChange={handleChange}
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
            meta={getFieldMeta('password')}
          />
          <Button
            type={'button'}
            title={'Submit'}
            onClick={() => handleSubmit()}
            isLoading={isLoading}
            className="w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
