import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { UserForm } from '../../components/forms';
import { fetchUserById } from '../../api';
import { IdRouteParams } from '../../interfaces';
// import { getCommonMutationGenerator } from '../../common-mutations';

const UserPage = ({ id }: IdRouteParams) => {
  const navigation = useNavigate();
  const { data, error } = useQuery(['users', { id }], fetchUserById, {
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
  // const queryClient = useQueryClient();

  // const {
  //   // generateUpdateMutation,
  //   // generateDeactivateMutation,
  //   // generateActivateMutation,
  //   // generateRemoveMutation,
  // } = getCommonMutationGenerator<IUserSingleDTO>({
  //   queryClient,
  //   entityName: 'user',
  // });

  // const updateMutation = generateUpdateMutation<IUserUpdateDTO>({
  //   mainFunc: updateUser,
  // });
  // const activateMutation = generateActivateMutation<CommonSingleActionBodyType>(
  //   {
  //     mainFunc: activateUser,
  //   }
  // );
  // const deactivateMutation =
  //   generateDeactivateMutation<CommonSingleActionBodyType>({
  //     mainFunc: deactivateUser,
  //   });
  // const removeMutation = generateRemoveMutation<CommonSingleActionBodyType>({
  //   mainFunc: removeUserById,
  // });

  const handleSubmit = useCallback(() => {
    //updateMutation.mutate
  }, [id]);

  // const handleDelete = useCallback(() => {
  //   removeMutation.mutate({ id });
  // }, [id]);
  //
  // const handleActivate = useCallback(() => {
  //   activateMutation.mutate({ id });
  // }, [id]);

  // const handleDeactivate = useCallback(() => {
  //   deactivateMutation.mutate({ id });
  // }, [id]);

  // const actions: IActionInfo[] = [
  // {
  //   label: 'Save',
  //   name: 'save',
  //   action: () => undefined,
  // },
  // {
  //   label: 'Activate',
  //   name: 'activate',
  //   action: handleActivate,
  //   hidden: !id || data.status === 'active',
  // },
  // {
  //   label: 'Deactivate',
  //   name: 'deactivate',
  //   action: handleDeactivate,
  //   hidden: !id || data.status === 'inactive',
  // },
  // {
  //   label: 'Delete',
  //   name: 'delete',
  //   action: handleDelete,
  //
  //   hidden: !id,
  // },
  // ];

  return <UserForm data={data} onSubmit={handleSubmit} actions={[]} />;
};

export default UserPage;
