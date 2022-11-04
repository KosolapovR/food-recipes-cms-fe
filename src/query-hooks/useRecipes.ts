import { useQuery, useQueryClient } from '@tanstack/react-query';

import { IRecipe } from '../interfaces';
import { fetchRecipes } from '../api';
import { RecipeStatusType } from '../interfaces/IRecipe';

export const useRecipes = ({ status }: { status?: RecipeStatusType }) => {
  const queryClient = useQueryClient();
  const query = useQuery<IRecipe[]>({
    queryKey: ['recipes', status],
    queryFn: fetchRecipes,
    initialData: () =>
      queryClient.getQueryData<IRecipe[]>(['recipes', status]) || [],
  });

  return query;
};
