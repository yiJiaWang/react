import common from '../lib/common.js'
const {f_log, randomInt, toImg, getCanvas} = common

const render = (ctx, {list, state, objName, ..._else}) => {
  list.map(({type, ...data}) => {
    if (__render[type]) {
      __render[type](ctx, data, state, _else)
    }
  })
}

const _collision = data => data

const __render = {
  bullet: (ctx, data, state) => {
    if (state === 0) return
    const {img, imgNum, x, y, w = 20, h = 50, angle = 40} = data
    ctx.save()
    ctx.translate(x + w / 2,  y + h / 2)
    ctx.rotate(angle * Math.PI / 180)
    ctx.drawImage(data['img' + imgNum], - w / 2, - h / 2, w, h)
    ctx.restore()
  },
  backImg: (ctx, data) => {
    const {img, x, y, w = 20, h = 50} = data
    ctx.drawImage(img, x, y, w, h)
    ctx.drawImage(img, x + w, y, w, h)
  },
  pipe: (ctx, data) => {
    const {img_up, img_down, x, y, w, h, space} = data
    ctx.drawImage(img_down, x, y - h, w, h)
    ctx.drawImage(img_up, x, y + space, w, h)
  },
  gameOver: (ctx, data, state) => {
    if (state === 2) {
      const {img, x, y, w, h} = data
      ctx.drawImage(img, x, y, w, h)
    }
  },
  gameStart: (ctx, data, state) => {
    if (state === 0) {
      const {img, x, y, w, h} = data
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, getCanvas().width, getCanvas().height)
      ctx.drawImage(img, x, y, w, h)
    }
  },
  score: (ctx, data, state, _else) => {
    if (state === 1) {
      const {x, y, w, h} = data
      const { score } = _else
      const scoList = ('' + score).split('')
      scoList.map((e, i) => {
        ctx.drawImage(toImg('images/flappybird/font_0'+(48+~~e)+'.png'), x - w * scoList.length / 2 + i * w, y, w, h)
      })
    }
  },
}

export default render
