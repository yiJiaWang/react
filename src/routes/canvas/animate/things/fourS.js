/**
 * Created by Administrator on 2/18.
 */
import _ from 'lodash'
import config from '../../config'
import Square from './square'
import typeShape from './type'

const l = config.l
const wid = _.floor((config.width / l) / 2)
const initF = type => (x, y) => dir => {
    return typeShape[type][dir].map(e => new Square({x: x + e[0] * l, y: y + e[1] * l}))
}

export default class Fours {

    constructor({type = 1, dir = 0, l = config.l, style = "black", x = wid * l, y = -l}={}) {
        this.style = style
        this.dir = dir
        this.x = x
        this.y = y
        this.l = l
        this.type = type
        this.fourArr = initF(type)(x,y)(dir)
    }

    run() {
        const self = this;
        let {fourArr, y} = self
        fourArr.map(e => e.run())
        self.y = y + l
        return self;
    }

    draw(context) {
        const self = this;
        let {fourArr} = self
        fourArr.map(e => e.draw(context))
        return self;
    }

    justify(walls) {
        let res = {}
        _.forEach(this.fourArr, e => {
            if (!res.flag) {
                res = e.justify(walls)
            }
        })
        return res
    }

    move(type, walls) {
        const {fourArr, x, y, dir} = this
        switch (type) {
            case 37: // left
                if (_.some(fourArr, e => walls[e.x - config.l][e.y]) || y < 0) break
                _.forEach(fourArr, e => e.moveLeft())
                this.x = x - l
                break
            case 39: // right
                if (_.some(fourArr, e => walls[e.x + config.l][e.y]) || y < 0) break
                _.forEach(fourArr, e => e.moveRight())
                this.x = x + l
                break
            case 38: // up
                const _dir = (dir+1)%4
                const _fourArr = initF(this.type)(x,y)(_dir)
                if (_.some(_fourArr, e => walls[e.x][e.y])) break
                this.fourArr = _fourArr
                this.dir = _dir
                break
            case 40: // down
            default:
                return
        }
    }

}
