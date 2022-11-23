import { IUser } from './IUser';
import { IRecipe, IRecipeStep } from './IRecipe';
import { IComment } from './IComment';

type SaveFuncType<TData, TVariables> = (v: TVariables) => Promise<TData>;

export { IRecipe, IRecipeStep, IUser, IComment, SaveFuncType };
