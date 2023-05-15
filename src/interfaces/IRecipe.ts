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
  commentCount: number;
  likeCount: number;
}

export interface IRecipeSingleDTO extends IRecipeGroupDTO {
  steps: IRecipeStep[];
  comments: ICommentSingleDTO[];
  isLiked?: boolean;
}

export type IRecipeCreateDTO = Omit<
  IRecipeSingleDTO,
  'id' | 'comments' | 'status' | 'isLiked'
>;

export type IRecipeUpdateDTO = CommonUpdateDTOType<
  IRecipeCreateDTO & { status?: string }
>;
