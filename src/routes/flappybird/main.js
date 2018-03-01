import common from './lib/common.js'
const {f_log, randomInt, getCanvas} = common
import _ from 'lodash'
window._ = _

import adata from './data/index.js'
import update from './update/index.js'
import render from './render/index.js'
import _event from './event/index.js'
const { touchHandler, eventsList, dealEvents } = _event
import collision from './collision/index.js'
import config from './config.js'

let ctx
export default function Main2() {
  window.canvas = document.getElementById('canv_f')
  const canvas = document.getElementById('canv_f')
  ctx = document.getElementById('canv_f').getContext('2d')
  canvas.width = config.width;
  canvas.height = config.height;
  main()
  bindEvent()
}

let data = {...adata};
let eventsL = eventsList;
let aniId;
const main = _ => {
  ctx.clearRect(0, 0, getCanvas().width, getCanvas().height)
  const _o = dealEvents(data, eventsL)
  eventsL = _o.eventsList
  data = update(_o.data)
  render(ctx, collision(data))
  if (data.state === 2) {
    window.cancelAnimationFrame(aniId)
    return
  }
  aniId = window.requestAnimationFrame(main)
  return data;
}

const bindEvent = () => {
  document.getElementById('canv_f').addEventListener('touchstart', e => {
    e.preventDefault()
    if (data.state === 2 || data.state === 0) {
      window.cancelAnimationFrame(aniId)
      data = ({...adata, state: 1});
      main();
      return
    }
    eventsL = touchHandler(e, data)
  })

}

