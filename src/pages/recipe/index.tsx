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
  removeRecipeById,
  updateRecipe,
} from '../../api/recipe';
import {
  CommonSingleActionBodyType,
  IdRouteParams,
  IRecipeCreateDTO,
  IRecipeSingleDTO,
  IRecipeUpdateDTO,
} from '../../interfaces';
import { IActionInfo } from '../../components/action-buttons';
import { getCommonMutationGenerator } from '../../common-mutations';
import { useAuth } from '../../query-hooks';

const RecipePage = ({ id }: IdRouteParams) => {
  const navigation = useNavigate();

  const { data, error } = useQuery(['recipes', { id }], fetchRecipeById, {
    initialData: {
      id: undefined,
      title: undefined,
      steps: [],
      comments: [],
      categoryId: '',
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
  const authData = useAuth();

  const {
    generateCreateMutation,
    generateUpdateMutation,
    generateDeactivateMutation,
    generateActivateMutation,
    generateRemoveMutation,
  } = getCommonMutationGenerator<IRecipeSingleDTO>({
    queryClient,
    entityName: 'recipe',
  });
  const createMutation = generateCreateMutation<IRecipeCreateDTO>({
    mainFunc: createRecipe,
  });
  const updateMutation = generateUpdateMutation<IRecipeUpdateDTO>({
    mainFunc: updateRecipe,
  });
  const activateMutation = generateActivateMutation<CommonSingleActionBodyType>(
    {
      mainFunc: activateRecipe,
    }
  );
  const deactivateMutation =
    generateDeactivateMutation<CommonSingleActionBodyType>({
      mainFunc: deactivateRecipe,
    });
  const removeMutation = generateRemoveMutation<CommonSingleActionBodyType>({
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
      hidden: !id || data.status === 'active' || !authData?.isAdmin,
    },
    {
      label: 'Deactivate',
      name: 'deactivate',
      action: handleDeactivate,
      hidden: !id || data.status === 'inactive' || !authData?.isAdmin,
    },
    {
      label: 'Delete',
      name: 'delete',
      action: handleDelete,
      hidden: !id || !authData?.isAdmin,
    },
  ];

  return <RecipeForm data={data} onSubmit={handleSubmit} actions={actions} />;
};

export default RecipePage;
