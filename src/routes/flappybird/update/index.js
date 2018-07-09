import common from '../lib/common.js'
const {f_log, randomInt, getCanvas} = common
import _ from 'lodash'

const isOut = ({x, y, w, h}) => (x > getCanvas().width || x + w < 0 || y > getCanvas().height || y + h < 0)
const updateSelf = option => data => ({...data, x: data.x + data.v_x, y: data.y + data.v_y, v_x: data.v_x + data.a_x, v_y: data.v_y + data.a_y})
const addInterval = (num, option = 'num11') => dealFun => data => (!data[option] || data[option] > num) ? ({...dealFun(data), [option]: 1}) : ({...data, [option]: data[option] + 1})
const changeRotate = data => ({...data, angle: (data.v_y) > 0 ? 14 : -14})
const goDown = n => data => ({...data, y: data.y + n})
const bounce = e => (e.y - getCanvas().height + e.h > 0 && e.v_y > 0) ? {...e, v_y: -(e.v_y - 1 > 0 ? e.v_y -1 : 0)} : e
const imgUpdate = data => ({...data, imgNum: data.imgNum > 1 ? 0 : data.imgNum + 1})

const __update = {
  bullet: _.flowRight(addInterval(1)(_.flowRight(updateSelf(),  changeRotate, bounce)), addInterval(5, 'img11')(imgUpdate)),

  backImg: data => data.x < -getCanvas().width ? ({...data, x: 0}) : _.flowRight(addInterval(1)(updateSelf()))(data),

  pipe: (data, _else) => data.x < -data.w ? ({...data, ..._else.initOnePipe({x: 600 - data.w})}) : _.flowRight(addInterval(1)(updateSelf()))(data),
}

const update = ({list, ..._else}) => {
  let _list = _.map(list, (data) => !__update[data.type] ? data : __update[data.type](data, _else))
  return {..._else, list: _list}
}

export default update
