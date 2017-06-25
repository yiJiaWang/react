/**
 * Created by Administrator on 2/18.
 */
import Box from './box'
import _ from 'lodash'
import config from '../config'

/**
 * 实现动画功能
 * 尝试用函数式编程方式
 */
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
            }else {
                if (location.href.indexOf('canvas') !== -1) alert('Game Over -_- ')
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
