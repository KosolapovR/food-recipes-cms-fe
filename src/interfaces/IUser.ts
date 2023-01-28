import { ActivationUnionStatusType, CommonUpdateDTOType } from './common';

export interface IUserGroupDTO {
  id: string;
  email: string;
  isAdmin?: boolean;
  status: ActivationUnionStatusType;
}

export interface IUserSingleDTO extends IUserGroupDTO {
  token: string;
}

export type IUserCreateDTO = Omit<IUserSingleDTO, 'id' | 'status' | 'token'> & {
  password?: string;
};

export type IUserUpdateDTO = CommonUpdateDTOType<
  IUserCreateDTO & { status?: string }
>;
