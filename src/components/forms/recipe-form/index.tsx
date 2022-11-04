import React, { useCallback, useEffect, useState } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';

import { IUpdateRecipeBodyParams } from '../../../api/recipe';
import { Button, TextAreaField, TextField } from '../../index';
import FieldsBlock from '../../fields-block';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const RecipeStepSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Min length 2').max(255, 'Max length 255'),
  text: Yup.string().min(2, 'Min length 2').required('Required'),
  imagePath: Yup.string(),
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
  const formik = useFormik({
    initialValues: { id, title, steps, status, previewImagePath },
    validationSchema,
    onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    values,
    dirty,
    getFieldMeta,
    isSubmitting,
    resetForm,
    isValid,
    submitCount,
  } = formik;

  const [parent] = useAutoAnimate<HTMLDivElement>({});

  const [openedFieldBlocks, setOpenedFieldBLocks] = useState<number[]>([]);

  const toggleFieldBlock = useCallback(
    (index) => {
      if (
        openedFieldBlocks.length === 0 ||
        !openedFieldBlocks.includes(index)
      ) {
        return setOpenedFieldBLocks([index]);
      }
      setOpenedFieldBLocks([]);
    },
    [openedFieldBlocks]
  );

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
      <FormikProvider value={formik}>
        <form>
          <div className="font-semibold mt-4 mb-2">Main</div>
          <TextField
            id="title"
            title="Title"
            placeholder="title"
            onChange={handleChange}
            value={values.title}
            meta={getFieldMeta('title')}
          />
          <div className="font-semibold mt-4 mb-2">Steps</div>
          <FieldArray name="steps">
            {({ remove, push }) => (
              <div ref={parent}>
                {values.steps.map((step, index) => (
                  <FieldsBlock
                    key={step.id + index.toString()}
                    index={index}
                    remove={() => remove(index)}
                    isOpen={openedFieldBlocks.includes(index)}
                    toggle={toggleFieldBlock}
                    className="mb-2"
                  >
                    <TextField
                      id={`steps.${index}.title`}
                      title="Step title asdasd"
                      placeholder="step title"
                      onChange={handleChange}
                      value={values.steps[index].title}
                      meta={getFieldMeta(`steps.${index}.title`)}
                    />
                    <TextAreaField
                      id={`steps.${index}.text`}
                      title="Step text"
                      placeholder="step text"
                      onChange={handleChange}
                      value={values.steps[index].text}
                      meta={getFieldMeta(`steps.${index}.text`)}
                    />
                  </FieldsBlock>
                ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    toggleFieldBlock(values.steps.length);
                    push({ title: '', text: '', imagePath: '' });
                  }}
                >
                  Add Step
                </button>
              </div>
            )}
          </FieldArray>

          <Button
            type="button"
            title="Submit"
            disabled={!isValid && submitCount > 0}
            onClick={() => handleSubmit()}
            isLoading={isLoading}
            className="mt-4"
          />
        </form>
      </FormikProvider>
    </>
  );
};

export default RecipeForm;
