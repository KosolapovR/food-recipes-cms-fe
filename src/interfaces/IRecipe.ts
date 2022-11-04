import { IComment } from './IComment';

export interface IRecipeStep {
  id: number;
  title?: string;
  text: string;
  imagePath?: string;
}

export type RecipeStatusType = 'inactive' | 'active';

export interface IRecipe {
  id: number;
  title: string;
  steps: IRecipeStep[];
  status: RecipeStatusType;
  comments: IComment[];
  previewImagePath: string;
}
