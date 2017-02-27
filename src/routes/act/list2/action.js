/**
 * Created by Administrator on 2/16.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import * as api from '../api'

export const name = 'movieList2'

const initState = Immutable.fromJS({
	showModel: 'list',
	title: '电影列表',
	list: [],
})

const GET_LIST = 'GET_LIST2';

export const actions = createActions({
		[GET_LIST]: async(city = '武汉') => {
			const data = await api.in_theaters({city})
			return data.subjects
		}
	},
)

export const reducer = handleActions({

	[GET_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], '正在热映')

}, initState);

