import { useQuery, useQueryClient } from '@tanstack/react-query';

import { IRecipeGroupDTO, ActivationUnionStatusType } from '../interfaces';
import { fetchRecipes } from '../api';

export const useRecipes = ({
  status,
}: {
  status?: ActivationUnionStatusType;
}) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['recipes', status] : ['recipes'];
  return useQuery<IRecipeGroupDTO[]>({
    queryKey,
    queryFn: fetchRecipes,
    initialData: () =>
      queryClient.getQueryData<IRecipeGroupDTO[]>(queryKey) || [],
  });
};
