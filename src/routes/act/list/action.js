/**
 * Created by Administrator on 2/16.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import {api} from '../api'

export const name = 'movieList'

const initState = Immutable.fromJS({
  showModel: 'list',
  title: '电影列表',
  list: [],
})

const GET_LIST = 'GET_LIST';
const GET_COMING_SOON_LIST = 'GET_COMING_SOON_LIST';

export const api_const = {
	GET_LIST: {title: '正在热映', method: 'getList'},
	GET_COMING_SOON_LIST: {title: '即将上映', method: 'getComingSoonList'},
}

export const actions = createActions({
    [GET_LIST]: async(city = '武汉') => {
      const data = await api.in_theaters({city})
      return data.subjects
    },
    [GET_COMING_SOON_LIST]: async(city = '武汉') => {
      const data = await api.coming_soon({city})
      return data.subjects
    }
  },
)

export const reducer = handleActions({
  [GET_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], api_const[GET_LIST].title),
  [GET_COMING_SOON_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], api_const[GET_COMING_SOON_LIST].title)

}, initState);

