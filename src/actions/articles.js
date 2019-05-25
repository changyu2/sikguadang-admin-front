import types from './actionTypes/articles';
import * as api from '../services/api';

export const getArticleList = (offset, limit) => ({
  type: types.GET_ARTICLE_LIST,
  payload: {
    promise: api.getArticleList(offset, limit)
  }
});

export const postArticle = data => ({
  type: types.POST_ARTICLE,
  payload: {
    promise: api.postArticle(data)
  }
});

export const editArticle = (storyId, data) => ({
  type: types.EDIT_ARTICLE,
  payload: {
    promise: api.editArticle(storyId, data)
  }
});
