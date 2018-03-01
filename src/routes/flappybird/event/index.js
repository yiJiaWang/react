import common from '../lib/common.js'
const {f_log} = common

const eventsList = []

const touchHandler = (e, data) => {
  return [{type: 'tap'}]
}

const eventsOpe = {
  tap: (data, option = -12) => {
    let list = data.list
    let _obj = list[data.objName.player]
    if (_obj) {
      list[data.objName.player] = {..._obj, v_y: _obj.c_v_y || option}
    }
    return {...data, list}
  }
}

const dealEvents = (data, eventsList = []) => {
  return {
    eventList: [],
    data: eventsList.reduce((data, event) => !(eventsOpe[event.type]) ? data : eventsOpe[event.type](data, event.option), data)
  }
}

export default {
  touchHandler,
  eventsList,
  dealEvents,
}
