
const collision = data => {
  if (data.state !== 1) return data
  const {list, objName} = data
  const player = list[objName.player]
  const {x: x_, y: y_, w: w_, h: h_, thickness = 5} = player
  const x_p = x_ + thickness
  const y_p = y_ + thickness
  const w_p = w_ - 2 * thickness
  const h_p = h_ - 2 * thickness
  objName.pipe.map(e => {
    const {x, w, y, space, thickness = 5, pass} = list[e]
    const __judge = _isIn(x + thickness, y - thickness, w - 2 * thickness, space + 2 * thickness)
    if (__judge(x_p, y_p) || __judge(x_p + w_p, y_p) || __judge(x_p, y_p + h_p) || __judge(x_p + w_p, y_p + h_p)) {
      data.state = 2
    }
    if (pass === 0 && x_p > x + w / 2) {
      data.score = data.score + 1
      list[e].pass = 1
    }
  })
  return {...data, list}
}

const _isIn = (x, y, w, space) => (x_p, y_p) => x_p > x && x_p < x + w && (y_p < y || y_p > y + space)

export default collision
