import { useQuery, useQueryClient } from '@tanstack/react-query';

import { IRecipe } from '../interfaces';
import { fetchRecipes } from '../api';
import { RecipeStatusType } from '../interfaces/IRecipe';

export const useRecipes = ({ status }: { status?: RecipeStatusType }) => {
  const queryClient = useQueryClient();
  const queryKey = status ? ['recipes', status] : ['recipes'];
  return useQuery<IRecipe[]>({
    queryKey,
    queryFn: fetchRecipes,
    initialData: () => queryClient.getQueryData<IRecipe[]>(queryKey) || [],
  });
};
