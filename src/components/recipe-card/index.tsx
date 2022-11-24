import React, { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import CommentIcon from '../icons/comment.svg';
import EyeIcon from '../icons/eye.svg';
import Button from '../button';
import { IRecipe, RecipeStatusType } from '../../interfaces/IRecipe';
import { removeRecipeById } from '../../api/recipe';
import Status from '../status';

export interface IRecipeCard {
  id: string;
  title: string;
  status: RecipeStatusType;
  commentsCount: number;
  viewCount: number;
  imageSrc: string;
}

const RecipeCard = ({
  id,
  title,
  commentsCount,
  status,
  viewCount,
}: IRecipeCard) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccessDelete = () => {
    toast.success('Recipe was deleted');

    queryClient.setQueryData<IRecipe[]>(['recipes'], (old) => {
      return old.filter((r) => r.id.toString() !== id);
    });
  };
  const onErrorDelete = () => toast.error('Something went wrong...');

  const mutation = useMutation(removeRecipeById, {
    onSuccess: onSuccessDelete,
    onError: onErrorDelete,
  });

  const handleDelete = useCallback(() => {
    mutation.mutate({ id });
  }, [id]);

  const handleEdit = useCallback(() => {
    navigate({ to: `/recipes/${id}`, replace: false });
  }, [id]);

  return (
    <div className="flex flex-col justify-s h-80 bg-white shadow-md hover:shadow-lg hover:bg-green-50 rounded rounded-lg">
      <div className="pt-4 px-4">
        <div className="flex justify-end h-6">
          <Status status={status} />
        </div>
      </div>
      <div
        // style={{ backgroundImage: `url(${baseUrl}/${imageSrc})` }}
        className="rounded-lg bg-center bg-cover grow border-b border-neutral-200 border-b-1 px-6 font-semibold"
      >
        {title}
      </div>
      <div className="border-b border-neutral-200 px-6 py-3 flex justify-center gap-5 items-center">
        <div className="flex justify-end gap-2 items-center">
          <EyeIcon fill="#999999" />
          <span>{viewCount}</span>
        </div>
        <div className="w-px h-full bg-neutral-200" />
        <div className="flex justify-start gap-2 items-center">
          <CommentIcon fill="#999999" />
          <span>{commentsCount}</span>
        </div>
      </div>
      <div className="flex justify-center gap-5 px-6 py-3">
        <Button
          title={'EDIT'}
          onClick={handleEdit}
          scale="SM"
          variant="outlined"
        />
        <Button
          title={'DELETE'}
          onClick={handleDelete}
          variant="outlined"
          color="regular"
          scale="SM"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
