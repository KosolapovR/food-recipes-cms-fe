import React from 'react';

export interface IRecipePageProps {
  id?: string;
}
const Recipe = ({ id }: IRecipePageProps) => {
  return <div>Recipe {id}</div>;
};

export default Recipe;
