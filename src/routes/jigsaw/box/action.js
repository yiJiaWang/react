/**
 * Created by Administrator on 3/1.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import _ from 'lodash'
import {_move, operate} from './path'

export const name = 'jigsaw'

const _initData = x => {
	let n = 999,
		xy = [2, 2],
		data = [[1, 2, 3], [4, 5, 6], [7, 8, '']],
		_state = Immutable.fromJS({
			data, xy, msg: ''
		})
	while (n-- > 0) {
		_state = _move[_.random(37, 40)](_state)
	}
	return _state
}

const initState = _initData();

export const CHANGE_OPTION = 'CHANGE_OPTION';
export const MOVE = 'MOVE';
export const GET_ANSWER = 'GET_ANSWER'


export const actions = createActions({},
	CHANGE_OPTION, MOVE, GET_ANSWER
)

export const reducer = handleActions({
	[CHANGE_OPTION]: (s, {payload:{key = '-1', value}}) => s.mergeIn([key], value),
	[MOVE]: (s, {payload}) => _move[payload] ? _move[payload](s) : s,
	[GET_ANSWER]: (s, {payload}) => (operate(s), s)
}, initState);

