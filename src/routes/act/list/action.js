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
	start: 0,
	count: 18,
	lastType: '',
	q_value: '',
	show: false,
	showSearch: false,
	noData: false,
})

export const GET_LIST = 'GET_LIST';
export const GET_COMING_SOON_LIST = 'GET_COMING_SOON_LIST';
export const GET_SEARCH_LIST = 'GET_SEARCH_LIST';
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const CHANGE_SHOW_MODEL = 'CHANGE_SHOW_MODEL';
export const SET_START = 'SET_START';
export const SET_Q_VALUE = 'SET_Q_VALUE';

export const api_const = {
	GET_LIST: {title: '正在热映', method: 'getList'},
	GET_COMING_SOON_LIST: {title: '即将上映', method: 'getComingSoonList'},
}
export const api_type_const = {
	...api_const,
	GET_SEARCH_LIST: {title: '电影搜索', method: 'getSearchList'},
}
export const show_model_const = {
	list: {title: '列表视图'},
	grid: {title: '卡片视图'}
}

export const actions = createActions({
		[GET_LIST]: async({start = 0, count = 18, city = '武汉'} = {}) => {
			const data = await api.in_theaters({start, count, city})
			return data
		},
		[GET_COMING_SOON_LIST]: async({start = 0, count = 18, city = '武汉'} = {}) => {
			const data = await api.coming_soon(({start, count, city}))
			return data
		},
		[GET_SEARCH_LIST]: async({start = 0, count = 18, q = ''} = {}) => {
			const data = await api.search({q, start, count})
			return {q, data}
		},
		[SHOW_LOADING]: (type = 0) => type,
		[SHOW_SEARCH]: (type = 0) => type,
		[CHANGE_SHOW_MODEL]: (type = 'list') => type,
	},
)

const _setList = (s, data) => {
	return data.start === 0 ? s.setIn(['list'], data.subjects).set('start', data.start).set('noData', data.subjects.length < data.count) : s.update('list', e => e.concat(data.subjects)).set('start', data.start).set('noData', data.subjects.length < data.count)
}

export const reducer = handleActions({

	[GET_SEARCH_LIST]: (s, a) => _setList(s, a.payload.data)
		.mergeIn(['title'], api_type_const[GET_SEARCH_LIST].title)
		.set('q_value', a.payload.q).set('lastType', GET_SEARCH_LIST),

	[GET_LIST]: (s, a) => _setList(s, a.payload)
		.mergeIn(['title'], api_const[GET_LIST].title).set('lastType', GET_LIST),

	[GET_COMING_SOON_LIST]: (s, a) => _setList(s, a.payload)
		.mergeIn(['title'], api_const[GET_COMING_SOON_LIST].title)
		.set('lastType', GET_COMING_SOON_LIST),

	[SHOW_LOADING]: (s, a) => s.mergeIn(['show'], a.payload),
	[SHOW_SEARCH]: (s, a) => s.mergeIn(['showSearch'], a.payload),
	[CHANGE_SHOW_MODEL]: (s, a) => s.mergeIn(['showModel'], a.payload),

}, initState);

