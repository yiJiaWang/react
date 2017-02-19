/**
 * Created by Administrator on 2/18.
 */
import _ from 'lodash'
import config from '../../config'
import Square from './square'

const l = config.l
const _type = {
	1: [[5 * l, -2 * l], [5 * l, -l], [6 * l, -2 * l], [6 * l, -l]]
}
const initF = type => {
	return _type[type].map(e => new Square({x: e[0], y: e[1]}))
}

export default class Fours {

	constructor({type = 1, l = config.l, style = "black", x = 0, y = 0}={}) {
		this.style = style
		this.x = x
		this.y = y
		this.l = l
		this.type = type
		this.fourArr = initF(type)
	}

	run() {
		const self = this;
		let {fourArr} = self
		fourArr.map(e => e.run())
		return self;
	}

	draw(context) {
		const self = this;
		let {fourArr} = self
		fourArr.map(e => e.draw(context))
		return self;
	}

	justify(high) {
		let res = {high}
		const flag = _.some(this.fourArr, e => {
			return e.justify(res.high).flag
		})
		flag ? _.forEach(this.fourArr, e => {
				high = e.changeHigh(high);
			})
			: 0
		res.flag = flag
		return res
	}

}
