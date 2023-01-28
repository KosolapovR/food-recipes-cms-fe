import { useQuery, useQueryClient } from '@tanstack/react-query';

import { IUserGroupDTO, ActivationUnionStatusType } from '../interfaces';
import { fetchUsers } from '../api';

export const useUsers = ({
  status,
}: {
  status?: ActivationUnionStatusType;
}) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['users', status] : ['users'];
  return useQuery<IUserGroupDTO[]>({
    queryKey,
    queryFn: fetchUsers,
    initialData: () =>
      queryClient.getQueryData<IUserGroupDTO[]>(queryKey) || [],
  });
};
