import { ActivationUnionStatusType, CommonUpdateDTOType } from './common';
import { IUserSingleDTO } from './IUser';
import { IRecipeSingleDTO } from './IRecipe';

export interface ICommentSingleDTO {
  id: string;
  text: string;
  status: ActivationUnionStatusType;
  date: string;
  userId: string;
  user: IUserSingleDTO;
  recipeId: string;
  recipe: IRecipeSingleDTO;
}

export type ICommentGroupDTO = Omit<ICommentSingleDTO, 'user' | 'recipe'>;

export type ICommentCreateDTO = Omit<
  ICommentSingleDTO,
  'id' | 'status' | 'date' | 'user' | 'recipe'
>;

export type ICommentUpdateDTO = CommonUpdateDTOType<
  ICommentCreateDTO & { status?: string }
>;
