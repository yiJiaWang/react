/**
 * Created by Administrator on 3/11.
 */
import _ from 'lodash'

/**
 * 拼图游戏算法
 */

const dir = {
	up: old => [old[0], old[1] - 1],
	down: old => [old[0], old[1] + 1],
	right: old => [old[0] + 1, old[1]],
	left: old => [old[0] - 1, old[1]],
}

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

const dirToNum = {
	left: 37,
	right: 39,
	up: 38,
	down: 40
}
/**
 * 37: // left
 * 39: // right
 * 38: // up
 * 40: // down
 * @param store
 * @private
 */
export const _move = {
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

// 查找节点
const _findXY = (s, n) => {
	let res = []
	s.toJSON().data.map((e1, i1) => {
		e1.map((e, i) => {
			if (e === n) res = [i, i1]
		})
	})
	return res
}

// 判断是否可以移动
const _just = (coordinate, walls) => !_.some(walls, e => e[0] === coordinate[0] && e[1] === coordinate[1])

// 寻找路径
const _findPath = (data) => {
	const {start, end, walls, loss, res} = data,
		vector = [end[0] - start[0], end[1] - start[1]],
		// walls_pre = [...walls, ...path],
		mayRoad = []
	if (_just(dir.down(start), walls)) mayRoad[mayRoad.length] = 'down'
	if (_just(dir.up(start), walls)) mayRoad[mayRoad.length] = 'up'
	if (_just(dir.left(start), walls)) mayRoad[mayRoad.length] = 'left'
	if (_just(dir.right(start), walls)) mayRoad[mayRoad.length] = 'right'
	if (vector[1] === 0) {
		if (vector[0] > 0) {
			if (_.some(mayRoad, e => e === 'right')) {
				if (mayRoad.length > 1) {
					const _data = {...data, walls: [...walls, dir.right(start)]}
					loss[loss.length] = _data
				}
				walls[walls.length] = start
				res[res.length] = 'right'
				return _findPath({
					start: dir.right(start), end, walls, loss
				})
			}else {
				if (loss.length > 0) {
					const _data = loss[loss.length]
					if (mayRoad.length > 1) {
						_data.loss[_data.loss.length] = {...data, walls: [...walls, dir.right(start)]}
					}

					_findPath()
				}
			}
		}

	}
}

import {test} from './searchPath'
export const operate = s => {
  test();

	return []
}




