import types from '../actions/actionTypes/articles';
import update from 'immutability-helper';
import * as rs from '../utils/requestStatus';
const initialState = {
  articleList: [],
  articleListEnd: false,
  requests: {
    getArticleList: {
      ...rs.request
    },
    postArticle: {
      ...rs.request
    },
    editrticle: {
      ...rs.request
    }
  }
};

export default function article(state = initialState, action) {
  switch (action.type) {
    case types.GET_ARTICLE_LIST + rs._PENDING:
      return update(state, {
        requests: {
          getArticleList: { $set: rs.pending }
        }
      });
    case types.GET_ARTICLE_LIST + rs._FULFILLED:
      return update(state, {
        articleList: { $set: action.payload.data },
        requests: {
          getArticleList: { $set: rs.fulfilled }
        }
      });
    case types.GET_ARTICLE_LIST + rs._REJECTED:
      return update(state, {
        requests: {
          getArticleList: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.POST_ARTICLE + rs._PENDING:
      return update(state, {
        requests: {
          postArticle: { $set: rs.pending }
        }
      });
    case types.POST_ARTICLE + rs._FULFILLED:
      return update(state, {
        requests: {
          postArticle: { $set: rs.fulfilled }
        }
      });
    case types.POST_ARTICLE + rs._REJECTED:
      return update(state, {
        requests: {
          postArticle: { $set: { ...rs.rejected, error: action.payload } }
        }
      });

    case types.EDIT_ARTICLE + rs._PENDING:
      return update(state, {
        requests: {
          editArticle: { $set: rs.pending }
        }
      });
    case types.EDIT_ARTICLE + rs._FULFILLED:
      return update(state, {
        requests: {
          editArticle: { $set: rs.fulfilled }
        }
      });
    case types.EDIT_ARTICLE + rs._REJECTED:
      return update(state, {
        requests: {
          editArticle: { $set: { ...rs.rejected, error: action.payload } }
        }
      });
    default:
      return state;
  }
}
