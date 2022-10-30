import React, { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';

import { auth } from '../../api';
import { AuthTokenContext } from '../../context/auth-token-context';

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
  const mutation = useMutation(auth, {
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
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
          {({ errors, touched }) => (
            <Form className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" placeholder="password" />
              {errors.password && touched.password ? (
                <div className="text-red-600">{errors.password}</div>
              ) : null}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
