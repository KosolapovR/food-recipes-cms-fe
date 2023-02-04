import React, { useEffect } from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';

import { TextField } from '../../index';
import { IActionInfo } from '../../action-buttons';
import FormHeader from '../../form-header';
import { IUserUpdateDTO, IUserSingleDTO } from '../../../interfaces';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is not valid').required('Required'),
});

export interface IUserFormProps {
  onSubmit: (values: Partial<IUserUpdateDTO>) => void;
  actions: IActionInfo[];
  data: Partial<IUserSingleDTO>;
}

const UserForm = ({ onSubmit, actions, data }: IUserFormProps) => {
  const { id, email, status, isAdmin } = data;
  const formik = useFormik({
    initialValues: { id, email, status, isAdmin },
    validationSchema,
    onSubmit: (params) => {
      onSubmit(params);
    },
  });
  const {
    handleSubmit,
    handleChange,
    values,
    dirty,
    getFieldMeta,
    isSubmitting,
    resetForm,
  } = formik;

  useEffect(() => {
    resetForm({
      values: { id, email, status, isAdmin },
    });
  }, [id]);

  usePrompt(
    'There are unsaved changes, are you sure you want to leave?',
    dirty && !isSubmitting
  );

  return (
    <>
      <FormHeader
        title={
          id ? `User ${email}` : `New User ${values.email ? values.email : ''}`
        }
        actions={actions}
        onSave={handleSubmit}
        status={id ? status : undefined}
      />
      <FormikProvider value={formik}>
        <form className="max-w-screen-sm">
          <div className="font-semibold mt-4 mb-2">Main</div>
          <TextField
            id="email"
            title="Email"
            placeholder="email"
            onChange={handleChange}
            value={values.email}
            meta={getFieldMeta('email')}
          />
          <label title="Admin">
            <Field type="checkbox" name="isAdmin" />
            {`${values.isAdmin}`}
          </label>
        </form>
      </FormikProvider>
    </>
  );
};

export default UserForm;
