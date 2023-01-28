import React, { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Tabs, RecipeCard, Button } from '../../components';
import { ActivationUnionStatusType } from '../../interfaces';
import { useRecipes } from '../../query-hooks';

const Recipes = () => {
  const navigate = useNavigate();

  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const [tab, setTab] = useState<ActivationUnionStatusType>();

  const { data } = useRecipes({ status: tab });

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
        <Button title="+ ADD RECIPE" onClick={handleAddRecipe} />
      </div>
      <Tabs
        options={[
          { value: undefined, label: 'ALL RECIPES' },
          { value: 'Active', label: 'ACTIVE', badgeFill: 'success' },
          { value: 'Inactive', label: 'INACTIVE', badgeFill: 'critic' },
        ]}
        value={tab}
        onChange={handleChangeTab}
        className="mb-4 bg-slate-50 sticky top-16 z-10 -ml-1 -mr-1 px-1"
      />
      <div
        ref={parent}
        className="max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 xl:gap-5"
      >
        {data.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            {...recipe}
            commentsCount={0}
            viewCount={0}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
