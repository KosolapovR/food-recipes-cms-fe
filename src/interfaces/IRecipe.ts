import { ActivationUnionStatusType, CommonUpdateDTOType } from './common';
import { ICommentSingleDTO } from './IComment';

export interface IRecipeStep {
  id: string;
  title?: string;
  text: string;
  imagePath?: string;
}

export interface IRecipeGroupDTO {
  id: string;
  title: string;
  categoryId: string;
  status: ActivationUnionStatusType;
  previewImagePath: string;
}

export interface IRecipeSingleDTO extends IRecipeGroupDTO {
  steps: IRecipeStep[];
  comments: ICommentSingleDTO[];
}

export type IRecipeCreateDTO = Omit<
  IRecipeSingleDTO,
  'id' | 'comments' | 'status'
>;

export type IRecipeUpdateDTO = CommonUpdateDTOType<
  IRecipeCreateDTO & { status?: string }
>;
