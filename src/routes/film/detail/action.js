/**
 * Created by Administrator on 3/1.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import {api} from '../api'

export const name = 'detail'

const initState = Immutable.fromJS({
  data: {},
  comments: {},
  start: 0,
  showLoading: false,
  showMoreIntro: false,

})

export const SHOW_LOADING = 'SHOW_LOADING';
export const GET_DATA = 'GET_DATA';
export const CHANGE_OPTION = 'CHANGE_OPTION';

export const actions = createActions({
    [GET_DATA]: async (id) => {
      const res = await api.subject('', id)
      return res
    },
  },
  SHOW_LOADING, CHANGE_OPTION
)


export const reducer = handleActions({
  [SHOW_LOADING]: (s, a) => s.mergeIn(['showLoading'], a.payload),
  [GET_DATA]: (s, a) => s.set('data', a.payload),
  [CHANGE_OPTION]: (s, {payload:{key = '-1', value}}) => s.mergeIn([key], value),
}, initState);

