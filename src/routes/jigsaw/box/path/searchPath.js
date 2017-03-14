/**
 * Created by Administrator on 3/13.
 */
import _ from 'lodash'

const _map = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]

const baseData = [
  [1, 3],
  [0, 2, 4],
  [1, 5],
  [0, 4, 6],
  [1, 3, 5, 7],
  [2, 4, 8],
  [3, 7],
  [4, 6, 8],
  [5, 7]
]

const _initMap = map => walls => {
  let res = map
  walls.map(n => {
    map[n] = []
    res = map.map(e => {
      return _.filter(e, e2 => e2 !== n)
    })
  })
  return res
}

const searchPath = ({map, start, end, path = [], flag = []}) => {
	const deal = (path, start) => {
		let res = [start],
			hand = start
		while (path[hand] !== hand) {
			const pre = path[hand];
			res[res.length] = pre
			hand = pre
		}
		return res
	}
	if (!Array.isArray(start)) {
		path[start] = start
		flag[start] = 1
		if (start === end) {
			return deal(path, start)
		}
		start = [start]
	}
	let index = -1,
		length = start.length,
		_start = []
	while (++index < length) {
		const startI = start[index];
		if (startI === end) {
			return deal(path, startI)
		}
		map[startI].map(e => {
			if(!flag[e]) {
				flag[e] = 1
				path[e] = startI
				_start[_start.length] = e
			}
		})
	}
  return searchPath({map, start: _start, end, path, flag})
}

export const test = () => {
  const s = _initMap(baseData)([1]);
  const searchPath2 = searchPath({map: baseData, start: 0, end: 7});
  debugger
}
