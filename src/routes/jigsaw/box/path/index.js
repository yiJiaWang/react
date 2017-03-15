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
export const reversion = {
  'up': 'down',
  'down': 'up',
  'right': 'left',
  'left': 'right'
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

const _move_arr = (arr, s) => {
  let _s = s
  arr.forEach(e => _s = _move[e](_s))
  return _s
}

const _moveNumActions = {
  up: (s, num, walls = []) => {
    const _objNum = _findXY(s, num)
    let res = [],
      _walls = [...walls]
    _walls[_walls.length] = _objNum
    if (_objNum - 3 < 0) {
      return
    }
    res = getDir(_walls)(_findXY(s, ''), _objNum - 3)
    res[res.length] = 'up'
    return res
  },
  down: (s, num, walls = []) => {
    const _objNum = _findXY(s, num)
    let res = [],
      _walls = [...walls]
    _walls[_walls.length] = _objNum
    if (_objNum > 5) {
      return
    }
    res = getDir(_walls)(_findXY(s, ''), _objNum + 3)
    res[res.length] = 'down'
    return res
  },
  left: (s, num, walls = []) => {
    const _objNum = _findXY(s, num)
    let res = [],
      _walls = [...walls]
    _walls[_walls.length] = _objNum
    if (_objNum === 0 || _objNum === 3 || _objNum === 6) {
      return
    }
    res = getDir(_walls)(_findXY(s, ''), _objNum - 1)
    res[res.length] = 'left'
    return res
  },
  right: (s, num, walls = []) => {
    const _objNum = _findXY(s, num)
    let res = [],
      _walls = [...walls]
    _walls[_walls.length] = _objNum
    if (_objNum === 2 || _objNum === 5 || _objNum === 8) {
      return
    }
    res = getDir(_walls)(_findXY(s, ''), _objNum + 1)
    res[res.length] = 'right'
    return res
  },
}

import {getDir} from './searchPath'

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

const _moveNum = ({state, res}) => (n, target, walls) => {
  const pathFor = getDir(walls)(_findXY(state, n), target);
  pathFor.forEach(e => {
    const mA = _moveNumActions[reversion[e]](state, n, walls)
    state = _move_arr(mA, state)
    res = res.concat(mA)
  })
  return {state, res}
}

export const getAnswer = s => { // 核心步骤
  let _params = {
    state: s,
    res: []
  }, walls = []
  // 1. 将1移至左上角
  _params = _moveNum(_params)(1, 0, walls)
  // 2. 将2移至右上角(2) 2 -> 2
  walls = [0]
  _params = _moveNum(_params)(2, 2, walls)
  // 特殊判断 此时有可能3在2的位置 需特殊对待
  if (_findXY(_params.state, 3) === 1 || (_findXY(_params.state, 3) === 4 && _findXY(_params.state, '') === 1)) {
    // 3 -> 7
    _params = _moveNum(_params)(3, 7, walls)
    // 2 -> 2
    _params = _moveNum(_params)(2, 2, walls)
  }
  // 3 -> 5
  _params = _moveNum(_params)(3, 5, [0, 2])
  // 2 -> 1
  _params = _moveNum(_params)(2, 1, [0, 5])
  // 3 -> 2
  _params = _moveNum(_params)(3, 2, [0, 1])
  walls = [0, 1, 2]
  // 4 -> 6
  _params = _moveNum(_params)(4, 6, walls)
  // 特殊判断
  if (_findXY(_params.state, 7) === 3 || (_findXY(_params.state, 7) === 4 && _findXY(_params.state, '') === 3)) {
    // 7 -> 5
    _params = _moveNum(_params)(7, 5, walls)
    // 4 -> 6
    _params = _moveNum(_params)(4, 6, walls)
  }
  // 7 -> 7
  _params = _moveNum(_params)(7, 7, [0, 1, 2, 6])
  // 4 -> 3
  _params = _moveNum(_params)(4, 3, [0, 1, 2, 7])
  // 7 -> 6
  _params = _moveNum(_params)(7, 6, [0, 1, 2, 3])
  // 5 -> 4
  _params = _moveNum(_params)(5, 4, [0, 1, 2, 3, 6])
  // 6 -> 5
  _params = _moveNum(_params)(6, 5, [0, 1, 2, 3, 6, 4])
  // 8 -> 7
  _params = _moveNum(_params)(8, 7, [0, 1, 2, 3, 6, 4, 5])

  return _params.res
}




