import config from '../config.js'

import imgsrc from '../images/flappybird/index.js'

const f_log = data => {
  console.log(data);
  return data
}

const randomInt = num => ~~(Math.random() * num)

const toImg = src => {
  let img = new Image()
  const _name = src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
  img.src = imgsrc[_name]

  return img
}

const getCanvas = (id = '') => window.canvas ? window.canvas : {width: config.width, height: config.height}

export default {
  f_log,
  randomInt,
  toImg,
  getCanvas,
}

