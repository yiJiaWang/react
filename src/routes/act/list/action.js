/**
 * Created by Administrator on 2/16.
 */
import {connect} from 'react-redux'
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import * as api from '../api'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const GET_LIST = 'GET_LIST';

const initState = Immutable.fromJS({
	showModel: 'list',
	title: '电影列表',
	list: [],
})


const actions = createActions({
		[GET_LIST]: async(city = '武汉') => {
			const data = await api.in_theaters({city})
			return data.subjects
		}
	},
)

export const reducer = handleActions({
	INCREMENT: (state, action) => state,

	DECREMENT: (state, action) => ({
		num: state.num - action.payload
	}),

	[GET_LIST]: (s, a) => s.mergeIn(['list'], a.payload).mergeIn(['title'], '正在热映')

}, initState);

const asyncStoreName = 'movieList'

export const reducerObj = {
	key: asyncStoreName,
	reducer
}

const mapStateToProps = state => {
	return {[asyncStoreName]: state.get(asyncStoreName)};
}

export const handleC = c => connect(mapStateToProps, actions)(c)
