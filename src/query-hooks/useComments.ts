import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAll } from '../api/comment';
import { ICommentGroupDTO, ActivationUnionStatusType } from '../interfaces';

export const useComments = ({
  status,
}: {
  status?: ActivationUnionStatusType;
}) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['comments', status] : ['comments'];
  return useQuery<ICommentGroupDTO[]>({
    queryKey,
    queryFn: fetchAll,
    initialData: () =>
      queryClient.getQueryData<ICommentGroupDTO[]>(queryKey) || [],
  });
};
