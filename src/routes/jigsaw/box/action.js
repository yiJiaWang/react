/**
 * Created by Administrator on 3/1.
 */
import {createActions, handleActions} from 'redux-actions'
import Immutable from 'immutable';
import _ from 'lodash'

export const name = 'jigsaw'

const _check = s => {
	if (s.getIn(['xy', '0']) !== 2 || s.getIn(['xy', '1']) !== 2) return false
	let n = 8
	while (n-- > 0) {
		if (s.getIn(['data', ~~(n / 3), n % 3]) !== n + 1) return false
	}
	return true;
}
const _change = ({s, oldXy, newXy}) => {
	const reOld = [oldXy[1], oldXy[0]],
		reNew = [newXy[1], newXy[0]],
		newS = s.updateIn(['data'], e => e.setIn(reOld, e.getIn(reNew)).setIn(reNew, '')).mergeIn(['xy'], newXy)
	return newS.mergeIn(['msg'], _check(newS) ? 'Success! Good Job!' : '')
}
/**
 * 37: // left
 * 39: // right
 * 38: // up
 * 40: // down
 * @param store
 * @private
 */
const _move = {
	38: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[1] > 1) return s
		const newXy = [oldXy[0], oldXy[1] + 1]
		return _change({s, oldXy, newXy});
	},
	40: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[1] < 1) return s
		const newXy = [oldXy[0], oldXy[1] - 1]
		return _change({s, oldXy, newXy});
	},
	37: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[0] > 1) return s
		const newXy = [oldXy[0] + 1, oldXy[1]]
		return _change({s, oldXy, newXy});
	},
	39: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[0] < 1) return s
		const newXy = [oldXy[0] - 1, oldXy[1]]
		return _change({s, oldXy, newXy});
	},
}

const _initData = x => {
	let n = 99,
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


export const actions = createActions({},
	CHANGE_OPTION, MOVE
)

export const reducer = handleActions({
	[CHANGE_OPTION]: (s, {payload:{key = '-1', value}}) => s.mergeIn([key], value),
	[MOVE]: (s, {payload}) => _move[payload] ? _move[payload](s) : s,
}, initState);

