import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { RecipeForm } from '../../components/forms';
import { createRecipe, fetchRecipeById, updateRecipe } from '../../api/recipe';
import { IRecipe } from '../../interfaces';

export interface IRecipePageProps {
  id?: string;
}

const Recipe = ({ id }: IRecipePageProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { data, error } = useQuery(['recipes', id], fetchRecipeById, {
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

  const onError = () => toast.error('Something went wrong...');

  const createMutation = useMutation(createRecipe, {
    onSuccess: (created: IRecipe) => {
      toast.success('Recipe was created');
      queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
        return [...(old || []), created];
      });

      navigation({ to: `/recipes/${created.id}`, replace: true });
    },
    onError,
  });

  const updateMutation = useMutation(updateRecipe, {
    onSuccess: (updated: IRecipe) => {
      toast.success('Recipe was updated');
      queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
        return old.map((r) => (r.id === updated.id ? updated : r));
      });
    },
    onError,
  });

  const handleSubmit = useCallback(
    id ? updateMutation.mutate : createMutation.mutate,
    [id]
  );
  return (
    <RecipeForm
      {...data}
      onSubmit={handleSubmit}
      isLoading={id ? updateMutation.isLoading : createMutation.isLoading}
    />
  );
};

export default Recipe;
