import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { CommentForm } from '../../components/forms';
import {
  CommonSingleActionBodyType,
  IdRouteParams,
  ICommentSingleDTO,
  ICommentUpdateDTO,
} from '../../interfaces';
import { getCommonMutationGenerator } from '../../common-mutations';
import {
  fetchById,
  activate,
  deactivate,
  removeById,
  update,
} from '../../api/comment';
import { IActionInfo } from '../../components/action-buttons';
import { useAuth } from '../../query-hooks';

const CommentPage = ({ id }: IdRouteParams) => {
  const authData = useAuth();
  const navigation = useNavigate();
  const { data, error } = useQuery(['comments', { id }], fetchById, {
    initialData: {
      id: undefined,
      user: undefined,
      userId: undefined,
      recipe: undefined,
      recipeId: undefined,
      status: 'inactive',
      text: undefined,
      date: undefined,
    },
    enabled: !!id,
  });

  if (error) {
    toast.error('Something went wrong...');
    navigation({ to: '/comments', replace: true });
  }
  const queryClient = useQueryClient();

  const {
    generateUpdateMutation,
    generateDeactivateMutation,
    generateActivateMutation,
    generateRemoveMutation,
  } = getCommonMutationGenerator<ICommentSingleDTO>({
    queryClient,
    entityName: 'comment',
  });

  const updateMutation = generateUpdateMutation<ICommentUpdateDTO>({
    mainFunc: update,
  });
  const activateMutation = generateActivateMutation<CommonSingleActionBodyType>(
    {
      mainFunc: activate,
    }
  );
  const deactivateMutation =
    generateDeactivateMutation<CommonSingleActionBodyType>({
      mainFunc: deactivate,
    });
  const removeMutation = generateRemoveMutation<CommonSingleActionBodyType>({
    mainFunc: removeById,
  });

  const handleSubmit = updateMutation.mutate;

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
      hidden: true,
      action: () => undefined,
    },
    {
      label: 'Activate',
      name: 'activate',
      action: handleActivate,
      hidden: !id || data.status === 'active' || !authData.isAdmin,
    },
    {
      label: 'Deactivate',
      name: 'deactivate',
      action: handleDeactivate,
      hidden: !id || data.status === 'inactive' || !authData.isAdmin,
    },
    {
      label: 'Delete',
      name: 'delete',
      action: handleDelete,
      hidden: !id || authData.id !== data.userId,
    },
  ];

  return <CommentForm data={data} onSubmit={handleSubmit} actions={actions} />;
};

export default CommentPage;
