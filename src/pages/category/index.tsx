import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { fetchAll, fetchById, removeById, update } from '../../api/category';
import {
  CommonSingleActionBodyType,
  IdRouteParams,
  ICategorySingleDTO,
  ICategoryUpdateDTO,
} from '../../interfaces';
import { getCommonMutationGenerator } from '../../common-mutations';
import { IActionInfo } from '../../components/action-buttons';
import { CategoryForm } from '../../components/forms';
import { IOption } from '../../components/inputs/select-field';

const CategoryPage = ({ id }: IdRouteParams) => {
  const navigation = useNavigate();
  const { data, error } = useQuery(['categories', { id }], fetchById, {
    initialData: {
      id: undefined,
      name: undefined,
      parentId: undefined,
    },
    enabled: !!id,
  });
  const { data: categories, error: allCategoriesError } = useQuery(
    ['categories'],
    fetchAll
  );

  if (error || allCategoriesError) {
    toast.error('Something went wrong...');
    navigation({ to: '/categories', replace: true });
  }
  const queryClient = useQueryClient();

  const { generateUpdateMutation, generateRemoveMutation } =
    getCommonMutationGenerator<ICategorySingleDTO>({
      queryClient,
      entityName: 'category',
    });

  const updateMutation = generateUpdateMutation<ICategoryUpdateDTO>({
    mainFunc: update,
  });

  const removeMutation = generateRemoveMutation<CommonSingleActionBodyType>({
    mainFunc: removeById,
  });

  const handleSubmit = updateMutation.mutate;

  const handleDelete = useCallback(() => {
    removeMutation.mutate({ id });
  }, [id]);

  const actions: IActionInfo[] = [
    {
      label: 'Save',
      name: 'save',
      action: () => undefined,
    },
    {
      label: 'Delete',
      name: 'delete',
      action: handleDelete,

      hidden: !id,
    },
  ];

  return (
    <CategoryForm
      data={data}
      onSubmit={handleSubmit}
      actions={actions}
      categoryOptions={categories.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      }))}
    />
  );
};

export default CategoryPage;
