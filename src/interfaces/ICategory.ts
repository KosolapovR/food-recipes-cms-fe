import { CommonUpdateDTOType } from './common';

export type ICategorySingleDTO = {
  id: string;
  name: string;
  subCategories?: ICategorySingleDTO[];
  parentId?: string;
};

export type ICategoryGroupDTO = Omit<
  ICategorySingleDTO,
  'subCategories' | 'parentId'
> & { parentName?: string };

export type ICategoryCreateDTO = Omit<
  ICategorySingleDTO,
  'subCategories' | 'id'
>;

export type ICategoryUpdateDTO = CommonUpdateDTOType<ICategoryCreateDTO>;
