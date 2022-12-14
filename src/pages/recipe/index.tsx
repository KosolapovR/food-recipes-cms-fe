import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { RecipeForm } from '../../components/forms';
import {
  activateRecipe,
  createRecipe,
  deactivateRecipe,
  fetchRecipeById,
  ICreateRecipeBodyParams,
  IUpdateRecipeBodyParams,
  removeRecipeById,
  updateRecipe,
} from '../../api/recipe';
import { IRecipe } from '../../interfaces';
import { IActionInfo } from '../../components/action-buttons';
import { getCommonMutationGenerator } from '../../common-mutations';

export interface IRecipePageProps {
  id?: string;
}

const RecipePage = ({ id }: IRecipePageProps) => {
  const navigation = useNavigate();

  const { data, error } = useQuery(['recipes', { id }], fetchRecipeById, {
    initialData: {
      id: undefined,
      title: undefined,
      steps: [],
      comments: [],
      status: 'inactive',
      previewImagePath: undefined,
    },
    enabled: !!id,
  });

  if (error) {
    toast.error('Something went wrong...');
    navigation({ to: '/recipes', replace: true });
  }
  const queryClient = useQueryClient();

  const {
    generateCreateMutation,
    generateUpdateMutation,
    generateDeactivateMutation,
    generateActivateMutation,
    generateRemoveMutation,
  } = getCommonMutationGenerator<IRecipe>({
    queryClient,
    entityName: 'recipe',
  });
  const createMutation = generateCreateMutation<ICreateRecipeBodyParams>({
    mainFunc: createRecipe,
  });
  const updateMutation = generateUpdateMutation<IUpdateRecipeBodyParams>({
    mainFunc: updateRecipe,
  });
  const activateMutation = generateActivateMutation<{ id: string }>({
    mainFunc: activateRecipe,
  });
  const deactivateMutation = generateDeactivateMutation<{ id: string }>({
    mainFunc: deactivateRecipe,
  });
  const removeMutation = generateRemoveMutation<{ id: string }>({
    mainFunc: removeRecipeById,
  });

  const handleSubmit = useCallback(
    id ? updateMutation.mutate : createMutation.mutate,
    [id]
  );

  const handleDelete = useCallback(() => {
    removeMutation.mutate({ id });
  }, [id]);

  const handleActivate = useCallback(() => {
    activateMutation.mutate({ id });
  }, [id]);

  const handleDeactivate = useCallback(() => {
    deactivateMutation.mutate({ id });
  }, [id]);

  const actions: IActionInfo[] = [
    {
      label: 'Save',
      name: 'save',
      action: () => undefined,
    },
    {
      label: 'Activate',
      name: 'activate',
      action: handleActivate,
      hidden: !id || data.status === 'active',
    },
    {
      label: 'Deactivate',
      name: 'deactivate',
      action: handleDeactivate,
      hidden: !id || data.status === 'inactive',
    },
    {
      label: 'Delete',
      name: 'delete',
      action: handleDelete,

      hidden: !id,
    },
  ];

  return <RecipeForm {...data} onSubmit={handleSubmit} actions={actions} />;
};

export default RecipePage;
