import {
  IUserUpdateDTO,
  IUserGroupDTO,
  IUserSingleDTO,
  IUserCreateDTO,
} from './IUser';
import {
  IRecipeCreateDTO,
  IRecipeStep,
  IRecipeGroupDTO,
  IRecipeSingleDTO,
  IRecipeUpdateDTO,
} from './IRecipe';
import {
  ICommentCreateDTO,
  ICommentSingleDTO,
  ICommentUpdateDTO,
  ICommentGroupDTO,
} from './IComment';
import { IFileStorageResponse } from './IFileStorage';
import {
  CommonGroupActionBodyType,
  CommonSingleActionBodyType,
  ActivationUnionStatusType,
  CommonUpdateDTOType,
  IdRouteParams,
  ApiResponse,
} from './common';

type BaseFuncType<TData, TVariables> = (v: TVariables) => Promise<TData>;

export {
  IUserUpdateDTO,
  IUserGroupDTO,
  IUserSingleDTO,
  IUserCreateDTO,
  IRecipeCreateDTO,
  IRecipeStep,
  IRecipeGroupDTO,
  IRecipeSingleDTO,
  IRecipeUpdateDTO,
  ICommentCreateDTO,
  ICommentSingleDTO,
  ICommentUpdateDTO,
  ICommentGroupDTO,
  IFileStorageResponse,
  BaseFuncType,
  CommonGroupActionBodyType,
  CommonSingleActionBodyType,
  ActivationUnionStatusType,
  CommonUpdateDTOType,
  IdRouteParams,
  ApiResponse,
};
