import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchRecipes } from '../../api';
import RecipeCard from '../../components/recipe-card';
import { IRecipe } from '../../interfaces';
import { Tabs } from '../../components/tabs';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Recipes = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('All');

  const { data } = useQuery<IRecipe[]>({
    queryKey: ['recipes', tab],
    queryFn: fetchRecipes,
    initialData: () => queryClient.getQueryData<IRecipe[]>(['recipes']),
  });

  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const handleChangeTab = useCallback((v) => {
    setTab(v);
  }, []);

  return (
    <div>
      <div className="flex space-between items-center gap-4 h-6 text-neutral-600 mb-4">
        <div className="text-xl">Recipes</div>
        <div className="w-px h-full bg-neutral-400" />
        <div className="text-xl">{data.length}</div>
      </div>
      <Tabs
        options={[
          { value: 'All', label: 'ALL RECIPES' },
          { value: 'Active', label: 'ACTIVE', badgeFill: 'success' },
          { value: 'Inactive', label: 'INACTIVE', badgeFill: 'critic' },
        ]}
        value={tab}
        onChange={handleChangeTab}
        className="mb-4"
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
