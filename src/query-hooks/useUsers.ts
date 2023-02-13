import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAll } from '../api/user';
import { IUserGroupDTO, ActivationUnionStatusType } from '../interfaces';

export const useUsers = ({
  status,
}: {
  status?: ActivationUnionStatusType;
}) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['users', status] : ['users'];
  return useQuery<IUserGroupDTO[]>({
    queryKey,
    queryFn: fetchAll,
    initialData: () =>
      queryClient.getQueryData<IUserGroupDTO[]>(queryKey) || [],
  });
};
