import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAll } from '../api/category';
import { ICategoryGroupDTO } from '../interfaces';

export const useCategories = () => {
  const queryClient = useQueryClient();
  const queryKey = ['categories'];
  return useQuery<ICategoryGroupDTO[]>({
    queryKey,
    queryFn: fetchAll,
    initialData: () =>
      queryClient.getQueryData<ICategoryGroupDTO[]>(queryKey) || [],
  });
};
