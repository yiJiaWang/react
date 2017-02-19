/**
 * Created by Administrator on 2/18.
 */
import fours from './things/fourS'
import _ from 'lodash'
import config from '../config'

export default class box {

	_init() {
		this.things.push(new fours());
	}

	_initStop() {
		const self = this
		const {things} = self
		self.things = _.last(things).fourArr.concat(_.dropRight(things))
		self._init()
	}

	_initHigh() {
		const __ = width => arr => width == 0 ? [0].concat(arr) : __(width - config.l)([width].concat(arr))
		const arr = __(config.width - config.l)([]);
		var high = {}
		_.map(arr, e => {
			high[e] = config.height - config.l
		})
		return high
	}

	constructor(option) {
		const self = this;
		self.things = [];
		self._init();
		self.high = self._initHigh()
		self.stop = false
	}

	run() {
		function _just(thing, high, config) {
			return (thing.y + thing.l) == (high[thing.x] || config.height)
		}
		const self = this;
		const things = self.things;
		let thing = things[things.length - 1];
		const res = thing.justify(self.high);
		res.flag ? res.high.stop ? self.stop = true : (self._initStop(), self.high = res.high) : thing.run();
		return self;
	}

	draw(context) {
		const self = this;
		context.clearRect(0, 0, config.width, config.height)
		_.map(self.things, e => e.draw(context));
		return this;
	}

	move(type) {
		debugger

	}
}
