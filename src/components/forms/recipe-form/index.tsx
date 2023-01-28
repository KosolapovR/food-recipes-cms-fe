import React, { useCallback, useEffect, useState } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { TextAreaField, TextField } from '../../index';
import FieldsBlock from '../../fields-block';
import { IActionInfo } from '../../action-buttons';
import FormHeader from '../../form-header';
import { IRecipeSingleDTO, IRecipeUpdateDTO } from '../../../interfaces';

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
  categoryId: Yup.string().required('Required'),
  steps: Yup.array(RecipeStepSchema).required('Required'),
});

export interface IRecipeFormProps {
  onSubmit: (values: Partial<IRecipeUpdateDTO>) => void;
  actions: IActionInfo[];
  data: Partial<IRecipeSingleDTO>;
}

const RecipeForm = ({ onSubmit, actions, data }: IRecipeFormProps) => {
  const { id, steps, status, previewImagePath, title, categoryId } = data;
  const formik = useFormik({
    initialValues: { id, title, categoryId, steps, status, previewImagePath },
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
    resetForm({
      values: { id, title, steps, status, previewImagePath, categoryId },
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
          id
            ? `Recipe ${title}`
            : `New Recipe ${values.title ? values.title : ''}`
        }
        actions={actions}
        onSave={handleSubmit}
        status={id ? status : undefined}
      />
      <FormikProvider value={formik}>
        <form className="max-w-screen-sm">
          <div className="font-semibold mt-4 mb-2">Main</div>
          <TextField
            id="title"
            title="Title"
            placeholder="title"
            onChange={handleChange}
            value={values.title}
            meta={getFieldMeta('title')}
          />
          <TextField
            id="categoryId"
            title="CategoryId"
            placeholder="categoryId"
            onChange={handleChange}
            value={values.categoryId}
            meta={getFieldMeta('categoryId')}
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
                      title="Title"
                      placeholder="step title"
                      onChange={handleChange}
                      value={values.steps[index].title}
                      meta={getFieldMeta(`steps.${index}.title`)}
                    />
                    <TextAreaField
                      id={`steps.${index}.text`}
                      title="Text"
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
        </form>
      </FormikProvider>
    </>
  );
};

export default RecipeForm;
