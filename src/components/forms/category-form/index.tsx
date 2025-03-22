import React, { useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { usePrompt } from '@tanstack/react-location';

import { TextField } from '../../index';
import { IActionInfo } from '../../action-buttons';
import FormHeader from '../../form-header';
import { ICategorySingleDTO, ICategoryUpdateDTO } from '../../../interfaces';
import { SelectField } from '../../inputs';
import { IOption } from '../../inputs/select-field';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

export interface ICategoryFormProps {
  onSubmit: (values: Partial<ICategoryUpdateDTO>) => void;
  actions: IActionInfo[];
  data: Partial<ICategorySingleDTO>;
  categoryOptions: IOption[];
}

const CategoryForm = ({
  onSubmit,
  actions,
  data,
  categoryOptions,
}: ICategoryFormProps) => {
  const { id, name, parentId } = data;
  const formik = useFormik({
    initialValues: { id, name, parentId },
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
      values: { id, name, parentId },
    });
  }, [id]);

  usePrompt(
    'There are unsaved changes, are you sure you want to leave?',
    dirty && !isSubmitting
  );

  return (
    <>
      <FormHeader
        title={id ? `Category ${values.name}` : `New Category`}
        actions={actions}
        onSave={handleSubmit}
      />
      <FormikProvider value={formik}>
        <form className="max-w-screen-sm">
          <div className="font-semibold mt-4 mb-2">Main</div>
          <TextField
            id="name"
            title="Name"
            placeholder="name"
            onChange={handleChange}
            value={values.name}
            meta={getFieldMeta('name')}
            className="mb-4"
          />
          <SelectField
            id="parentId"
            title="ParentId"
            placeholder="parentId"
            onChange={handleChange}
            value={values.parentId}
            meta={getFieldMeta('parentId')}
            options={categoryOptions}
          />
        </form>
      </FormikProvider>
    </>
  );
};

export default CategoryForm;
