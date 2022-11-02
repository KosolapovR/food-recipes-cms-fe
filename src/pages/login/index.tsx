import React, { useContext } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { auth } from '../../api';
import { AuthTokenContext } from '../../context/auth-token-context';
import Input from '../../components/input';
import Button from '../../components/button';

const SignupSchema = Yup.object().shape({
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
  const mutation = useMutation(auth, {
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], () => ({
        email: data.email,
        isAdmin: data.isAdmin,
      }));
      setToken(data.token);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-96 shadow-lg rounded-lg p-6 bg-white text-center">
        <span className="inline-block mb-4 text-xl font-bold">Sign in</span>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            mutation.mutate(values);
            actions.setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <Field id="email" name="email" as={Input}>
                {(props: FieldProps) => (
                  <Input
                    id="email"
                    title="Email"
                    placeholder="email"
                    {...props}
                  />
                )}
              </Field>
              <Field name="password" placeholder="password">
                {(props: FieldProps) => (
                  <Input
                    id="password"
                    title="Password"
                    type="password"
                    placeholder="password"
                    {...props}
                  />
                )}
              </Field>
              <Button
                type={mutation.isLoading ? 'button' : 'submit'}
                title={'Submit'}
                isLoading={mutation.isLoading}
                className="mt-4"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
