import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';

import { IUpdateRecipeBodyParams } from '../../../api/recipe';
import TextField from '../../inputs/text-field';
import Button from '../../button';

const RecipeStepSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Min length 2').max(255, 'Max length 255'),
  text: Yup.string().min(2, 'Min length 2').required('Required'),
  imagePath: Yup.string().required('Required'),
});
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Min length 2')
    .max(255, 'Max length 255')
    .required('Required'),
  steps: Yup.array(RecipeStepSchema).required('Required'),
});

export interface IRecipeFormProps extends IUpdateRecipeBodyParams {
  onSubmit: (values: IUpdateRecipeBodyParams) => void;
  isLoading?: boolean;
}

const RecipeForm = ({
  id,
  steps,
  status,
  previewImagePath,
  title,
  onSubmit,
  isLoading,
}: IRecipeFormProps) => {
  const {
    handleChange,
    handleSubmit,
    values,
    dirty,
    getFieldMeta,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: { id, title, steps, status, previewImagePath },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    resetForm({ values: { id, title, steps, status, previewImagePath } });
  }, [id]);

  usePrompt(
    'There are unsaved changes, are you sure you want to leave?',
    dirty && !isSubmitting
  );

  return (
    <>
      <div>
        {id
          ? `Recipe ${title}`
          : `New Recipe ${values.title ? values.title : ''}`}
      </div>
      <form>
        <TextField
          id="title"
          title="Title"
          placeholder="title"
          onChange={handleChange}
          value={values.title}
          meta={getFieldMeta('title')}
        />
        <Button
          type="button"
          title="Submit"
          onClick={() => handleSubmit()}
          isLoading={isLoading}
          className="mt-4"
        />
      </form>
    </>
  );
};

export default RecipeForm;
