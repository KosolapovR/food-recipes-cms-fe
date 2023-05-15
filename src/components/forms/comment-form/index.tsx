import React, { useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';

import { TextField, TextAreaField } from '../../index';
import { IActionInfo } from '../../action-buttons';
import FormHeader from '../../form-header';
import { ICommentSingleDTO, ICommentUpdateDTO } from '../../../interfaces';

const validationSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

export interface ICommentFormProps {
  onSubmit: (values: Partial<ICommentUpdateDTO>) => void;
  actions: IActionInfo[];
  data: Partial<ICommentSingleDTO>;
}

const CommentForm = ({ onSubmit, actions, data }: ICommentFormProps) => {
  const { id, status, user } = data;
  const formik = useFormik({
    initialValues: data,
    validationSchema,
    onSubmit: (params) => {
      onSubmit(params);
    },
  });
  const { handleSubmit, values, dirty, getFieldMeta, isSubmitting, resetForm } =
    formik;

  useEffect(() => {
    resetForm({
      values: data,
    });
  }, [id]);

  usePrompt(
    'There are unsaved changes, are you sure you want to leave?',
    dirty && !isSubmitting
  );

  return (
    <>
      <FormHeader
        title={id ? `Comment from ${user?.email}` : 'New Comment'}
        actions={actions}
        onSave={handleSubmit}
        status={id ? status : undefined}
      />
      <FormikProvider value={formik}>
        <form className="max-w-screen-sm">
          <div className="font-semibold mt-4 mb-2">Main</div>
          <TextField
            id="user.email"
            title="User"
            value={values.user?.email}
            meta={getFieldMeta('user.email')}
            className="mb-4"
            readOnly={true}
          />
          <TextField
            id="recipe.title"
            title="Recipe"
            value={values.recipe?.title}
            meta={getFieldMeta('recipe.title')}
            className="mb-4"
            readOnly={true}
          />
          <TextAreaField
            id="text"
            title="Text"
            placeholder="text"
            value={values.text}
            meta={getFieldMeta('text')}
            className="mb-4"
            readOnly={true}
          />
        </form>
      </FormikProvider>
    </>
  );
};

export default CommentForm;
