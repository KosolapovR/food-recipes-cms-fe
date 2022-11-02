export type CommentStatusType = 'hidden' | 'published' | 'archive';

export interface IComment {
  id: string;
  text: string;
  status: CommentStatusType;
  date: string;
  userId: string;
  recipeId: string;
}
