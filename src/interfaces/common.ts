export type CommonUpdateDTOType<T> = {
  id: string;
} & T;

export type CommonSingleActionBodyType = {
  id: string;
};

export type CommonGroupActionBodyType = {
  ids: number[];
};

export type ActivationUnionStatusType = 'active' | 'inactive';

export interface IdRouteParams {
  id?: string;
}

export type ApiResponse<T> = { data: T };
