import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAll } from '../api/recipe';
import { IRecipeGroupDTO, ActivationUnionStatusType } from '../interfaces';

export const useRecipes = ({
  status,
}: {
  status?: ActivationUnionStatusType;
}) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['recipes', status] : ['recipes'];
  return useQuery<IRecipeGroupDTO[]>({
    queryKey,
    queryFn: fetchAll,
    initialData: () =>
      queryClient.getQueryData<IRecipeGroupDTO[]>(queryKey) || [],
  });
};
