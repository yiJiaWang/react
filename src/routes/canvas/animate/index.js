/**
 * Created by Administrator on 2/18.
 */
import Box from './box'
import _ from 'lodash'
import config from '../config'

const run = obj => obj.run()
const draw = _.curry((context, obj) => {
    return obj.draw(context)
})
const animate = _.curry((context, box) => {
        const _draw = box => {
            draw(context)(box)
            if (!box.stop) {
                setTimeout(x => _draw(box), config.aniHz)
            }
        }
        const _move = box => {
            run(box)
            if (!box.stop) {
                setTimeout(x => _move(box), config.hz)
            }
        }
        _draw(box)
        _move(box)
    }
)

function init() {
    const canvas = document.getElementById('canv');
    const context = canvas.getContext('2d');
    canvas.width = config.width;
    canvas.height = config.height;
    const box = new Box();
    setTimeout(x => animate(context)(box), 2000)
    return box
}

export default init
