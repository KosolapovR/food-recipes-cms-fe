import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

import { fetchRecipes } from '../../api';
import RecipeCard from '../../components/recipe-card';
import { IRecipe } from '../../interfaces';
import { Tabs } from '../../components/tabs';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Button from '../../components/button';

const Recipes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [tab, setTab] = useState('All');

  const { data } = useQuery<IRecipe[]>({
    queryKey: ['recipes', tab],
    queryFn: fetchRecipes,
    initialData: () =>
      queryClient.getQueryData<IRecipe[]>(['recipes', tab]) || [],
  });

  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const handleChangeTab = useCallback((v) => {
    setTab(v);
  }, []);

  const handleAddRecipe = useCallback(() => {
    navigate({ to: '/recipes/new', replace: false });
  }, []);

  return (
    <div>
      <div className="flex space-between items-center gap-4 h-6 text-neutral-600 mb-4">
        <div className="text-xl">Recipes</div>
        <div className="w-px h-full bg-neutral-400" />
        <div className="text-xl grow">{data.length}</div>
        <Button
          title="+ ADD RECIPE"
          onClick={handleAddRecipe}
          className="w-40"
        />
      </div>
      <Tabs
        options={[
          { value: 'All', label: 'ALL RECIPES' },
          { value: 'Active', label: 'ACTIVE', badgeFill: 'success' },
          { value: 'Inactive', label: 'INACTIVE', badgeFill: 'critic' },
        ]}
        value={tab}
        onChange={handleChangeTab}
        className="mb-4 bg-slate-50 sticky top-16 z-10 -ml-1 -mr-1 px-1"
      />
      <div
        ref={parent}
        className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 xl:gap-5"
      >
        {data.map((r) => (
          <RecipeCard
            key={r.id}
            id={r.id.toString()}
            title={r.title}
            commentsCount={r.comments.length}
            status={r.status}
            viewCount={0}
            imageSrc={r.previewImagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
