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
  let res = []
  walls.map(n => {
    map[n] = []
    res = map.map(e => {
      return _.filter(e, e2 => e2 !== n)
    })
  })
  return res
}

const searchPath = ({map, start, end}) => {

  return []
}

export const test = () => {
  const s = _initMap(baseData)();
}
