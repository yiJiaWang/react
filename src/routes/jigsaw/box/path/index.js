/**
 * Created by Administrator on 3/11.
 */
import _ from 'lodash'

/**
 * 拼图游戏算法
 */

// const dir = {
// 	up: old => [old[0], old[1] - 1],
// 	down: old => [old[0], old[1] + 1],
// 	right: old => [old[0] + 1, old[1]],
// 	left: old => [old[0] - 1, old[1]],
// }

/**
 * 判断成功方法
 * @param s
 * @returns {boolean}
 * @private
 */
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

// const dirToNum = {
// 	left: 37,
// 	right: 39,
// 	up: 38,
// 	down: 40
// }

/**
 * 37: // left
 * 39: // right
 * 38: // up
 * 40: // down
 * @param store
 * @private
 */
export const _move = {
	up: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[1] > 1) return s
		const newXy = [oldXy[0], oldXy[1] + 1]
		return _change({s, oldXy, newXy});
	},
	down: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[1] < 1) return s
		const newXy = [oldXy[0], oldXy[1] - 1]
		return _change({s, oldXy, newXy});
	},
	left: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[0] > 1) return s
		const newXy = [oldXy[0] + 1, oldXy[1]]
		return _change({s, oldXy, newXy});
	},
	right: s => {
		const oldXy = [s.getIn(['xy', '0']), s.getIn(['xy', '1'])]
		if (oldXy[0] < 1) return s
		const newXy = [oldXy[0] - 1, oldXy[1]]
		return _change({s, oldXy, newXy});
	},
}

// 查找节点
const _findXY = (s, n) => {
	let res = ''
	s.toJSON().data.forEach((e1, i1) => {
		e1.forEach((e, i) => {
			if (e === n) res = i1 * 3 + i
		})
	})
	return res
}

import {getDir} from './searchPath'
export const getAnswer = s => {
  return getDir([])(_findXY(s, ''), 0);
}




