import { Article } from '../../types/article';

export type AddClipAction = {
  type: 'ADD_CLIP';
  clip: Article;
};

export const AddClipAction = ({ clip }: { clip: Article }) => {
  return {
    type: 'ADD_CLIP',
    clip,
  };
};

export type DeleteClipAction = {
  type: 'DELETE_CLIP';
  clip: Article;
};

export const DeleteClipAction = ({ clip }: { clip: Article }) => {
  return {
    type: 'DELETE_CLIP',
    clip,
  };
};
