/**
 * Created by Administrator on 2/18.
 */
import _ from 'lodash'
import config from '../../config'

export default class Square {

	constructor({l = config.l, style = "black", x = 0, y = 0}={}) {
		this.style = style
		this.x = x
		this.y = y
		this.l = l
	}

	run() {
		const self = this;
		let {y, l} = self
		self.y = y + l
		return self;
	}

	draw(context) {
	    const _dd = 4
        const self = this;
        const {x, y, style, l} = self
	    const _drawOne = _ => {
            context.strokeRect(x+1, y+1, l-2, l-2);
            context.fillRect(x+_dd, y+_dd, l-2*_dd, l-2*_dd);
        }
		context.fillStyle = style
        _drawOne();
		return self;
	}

	justify(walls) {
		const self = this;
		const {x, y, l} = self
        const res = {}
        res.flag = !!walls[x][y+l]
        if (res.flag) {
            res.stop = y <= -l
        }
		return res
	}

	changeHigh(high) {
		const self = this;
		const {x, y, l} = self
		high[x] = _.min([high[x], y - l])
        if (!high.stop && high[x] <= -l) {
            high.stop = true
        }
		return high;
	}

	moveLeft() {
		const {x, l} = this
		this.x = x - l
	}
	moveRight() {
		const {x, l} = this
		this.x = x + l
	}

}
