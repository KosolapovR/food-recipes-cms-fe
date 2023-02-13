import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { UserForm } from '../../components/forms';
import { fetchById } from '../../api/user';
import {
  CommonSingleActionBodyType,
  IdRouteParams,
  IUserSingleDTO,
  IUserUpdateDTO,
} from '../../interfaces';
import { getCommonMutationGenerator } from '../../common-mutations';
import { activate, deactivate, removeById, update } from '../../api/user';
import { IActionInfo } from '../../components/action-buttons';

const UserPage = ({ id }: IdRouteParams) => {
  const navigation = useNavigate();
  const { data, error } = useQuery(['users', { id }], fetchById, {
    initialData: {
      id: undefined,
      isAdmin: undefined,
      status: 'inactive',
      email: undefined,
      token: undefined,
    },
    enabled: !!id,
  });

  if (error) {
    toast.error('Something went wrong...');
    navigation({ to: '/users', replace: true });
  }
  const queryClient = useQueryClient();

  const {
    generateUpdateMutation,
    generateDeactivateMutation,
    generateActivateMutation,
    generateRemoveMutation,
  } = getCommonMutationGenerator<IUserSingleDTO>({
    queryClient,
    entityName: 'user',
  });

  const updateMutation = generateUpdateMutation<IUserUpdateDTO>({
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

  return <UserForm data={data} onSubmit={handleSubmit} actions={actions} />;
};

export default UserPage;
