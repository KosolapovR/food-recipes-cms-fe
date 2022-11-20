import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-location';

import { RecipeForm } from '../../components/forms';
import {
  activateRecipe,
  createRecipe,
  deactivateRecipe,
  fetchRecipeById,
  removeRecipeById,
  updateRecipe,
} from '../../api/recipe';
import { IRecipe } from '../../interfaces';
import { IActionInfo } from '../../components/action-buttons';

export interface IRecipePageProps {
  id?: string;
}

const Recipe = ({ id }: IRecipePageProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const location = useLocation();

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
      queryClient.setQueryData<IRecipe>(['recipes', id], () => {
        return updated;
      });
    },
    onError,
  });

  const handleSubmit = useCallback(
    id ? updateMutation.mutate : createMutation.mutate,
    [id]
  );

  const onSuccessDelete = () => {
    toast.success('Recipe was deleted');

    queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
      return old.filter((r) => r.id.toString() !== id);
    });

    location.history.back();
  };
  const onErrorDelete = () => toast.error('Something went wrong...');

  const removeMutation = useMutation(removeRecipeById, {
    onSuccess: onSuccessDelete,
    onError: onErrorDelete,
  });

  const handleDelete = useCallback(() => {
    removeMutation.mutate(id.toString());
  }, [id]);

  const onSuccessActivate = (updated: IRecipe) => {
    toast.success('Recipe was activated');
    queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
      return old?.map((r) => (r.id === updated.id ? updated : r));
    });
    queryClient.setQueryData<IRecipe>(['recipes', id], () => {
      return updated;
    });
  };
  const onErrorActivate = () => toast.error('Can not activate recipe');

  const activateMutation = useMutation(activateRecipe, {
    onSuccess: onSuccessActivate,
    onError: onErrorActivate,
  });

  const handleActivate = useCallback(() => {
    activateMutation.mutate({ id });
  }, [id]);

  const onSuccessDeactivate = (updated: IRecipe) => {
    toast.success('Recipe was deactivated');
    queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
      return old?.map((r) => (r.id === updated.id ? updated : r));
    });
    queryClient.setQueryData<IRecipe>(['recipes', id], () => {
      return updated;
    });
  };
  const onErrorDeactivate = () => toast.error('Can not deactivate recipe');

  const deactivateMutation = useMutation(deactivateRecipe, {
    onSuccess: onSuccessDeactivate,
    onError: onErrorDeactivate,
  });

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

export default Recipe;
