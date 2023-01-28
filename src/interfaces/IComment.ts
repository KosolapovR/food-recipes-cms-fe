import { ActivationUnionStatusType, CommonUpdateDTOType } from './common';

export interface ICommentSingleDTO {
  id: string;
  text: string;
  status: ActivationUnionStatusType;
  date: string;
  userId: string;
  recipeId: string;
}

export type ICommentGroupDTO = ICommentSingleDTO;

export type ICommentCreateDTO = Omit<
  ICommentSingleDTO,
  'id' | 'status' | 'date'
>;

export type ICommentUpdateDTO = CommonUpdateDTOType<
  ICommentCreateDTO & { status?: string }
>;
