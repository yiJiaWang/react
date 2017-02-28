/**
 * Created by Administrator on 2/16.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import {api} from '../api'

export const name = 'movieList'

const initState = Immutable.fromJS({
  showModel: 'grid',
  title: '电影列表',
  list: [],
  show: false,
  showSearch: false,
})

export const GET_LIST = 'GET_LIST';
export const GET_COMING_SOON_LIST = 'GET_COMING_SOON_LIST';
export const GET_SEARCH_LIST = 'GET_SEARCH_LIST';
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_SEARCH = 'SHOW_SEARCH';

export const api_const = {
  GET_LIST: {title: '正在热映', method: 'getList'},
  GET_COMING_SOON_LIST: {title: '即将上映', method: 'getComingSoonList'},
  // GET_SEARCH_LIST: {title: '电影搜索', method: 'getSearchList'},
}

export const actions = createActions({
    [GET_LIST]: async(city = '武汉') => {
      const data = await api.in_theaters({city})
      return data.subjects
    },
    [GET_COMING_SOON_LIST]: async(city = '武汉') => {
      const data = await api.coming_soon({city})
      return data.subjects
    },
    [GET_SEARCH_LIST]: async(q = '') => {
      const data = await api.search({q})
      return data.subjects
    },
    [SHOW_LOADING]: (type = 0) => type,
    [SHOW_SEARCH]: (type = 0) => type,
  },
)


export const reducer = handleActions({
  [GET_SEARCH_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], '电影搜索'),
  [GET_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], api_const[GET_LIST].title),
  [GET_COMING_SOON_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], api_const[GET_COMING_SOON_LIST].title),
  [SHOW_LOADING]: (s, a) => s.mergeIn(['show'], a.payload),
  [SHOW_SEARCH]: (s, a) => s.mergeIn(['showSearch'], a.payload),

}, initState);

